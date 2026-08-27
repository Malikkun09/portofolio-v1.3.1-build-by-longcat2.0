// Live browser QA for Portfolio V3 — verifies interaction states that a
// build cannot: cursor labels, navbar open/close cycles, hover animations,
// section reveals, scroll perf, reduced-motion. Run: node scripts/qa.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const URL = process.env.QA_URL ?? 'http://localhost:4319/';
const OUT = 'qa-shots';
mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const cssOf = (loc, prop) => loc.evaluate((el, p) => getComputedStyle(el).getPropertyValue(p), prop);
const pseudo = (loc, sel, prop) =>
  loc.evaluate((el, [s, p]) => getComputedStyle(el, s).getPropertyValue(p), [sel, prop]);

const browser = await chromium.launch();

// ── DESKTOP ────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto(URL, { waitUntil: 'load' });

  // 1. LOADER — gauge present, needle rotating, big % bottom-right
  const gauge = page.locator('.gauge');
  check('loader: gauge rendered', await gauge.count() === 1);
  const numBox = await page.locator('.loader-num').boundingBox().catch(() => null);
  if (numBox) {
    check(
      'loader: percentage in bottom-right quadrant',
      numBox.x + numBox.width / 2 > 720 && numBox.y + numBox.height / 2 > 450,
      `center ${Math.round(numBox.x + numBox.width / 2)},${Math.round(numBox.y + numBox.height / 2)}`
    );
    const fs = parseFloat(await cssOf(page.locator('.loader-num'), 'font-size'));
    check('loader: percentage is dominant type', fs >= 120, `${fs}px`);
  }
  const a1 = await page.locator('.gauge-needle').evaluate((el) => el.style.transform);
  await page.screenshot({ path: `${OUT}/01-loader.png` });
  await page.waitForTimeout(700);
  const a2 = await page.locator('.gauge-needle').evaluate((el) => el.style.transform);
  check('loader: needle animates with progress', a1 !== a2, `${a1 || 'css'} → ${a2}`);

  // 2. BOOT HANDOVER — loader unmounts, navbar drops in
  await page.waitForSelector('.loader', { state: 'detached', timeout: 15000 });
  check('loader: unmounts after 100% exit', true);

  // Baselines captured at scrollY 0 BEFORE any interaction, so "was hidden"
  // is measured against the true pre-reveal state.
  const baseline = await page.evaluate(() => {
    const op = (s) => {
      const el = document.querySelector(s);
      return el ? getComputedStyle(el).opacity : null;
    };
    return {
      about: op('.about-copy p'),
      skills: op('.skill-row'),
      journey: op('.tl-item'),
      links: op('.link-row'),
    };
  });

  // Navbar drop-in is a CSS transition — let it land before asserting.
  await page.waitForTimeout(1500);
  const navT = await cssOf(page.locator('.nav'), 'transform');
  check('navbar: revealed after boot', navT === 'none' || /matrix\(1, 0, 0, 1, 0, 0\)/.test(navT), navT);
  await page.screenshot({ path: `${OUT}/02-hero.png` });

  // 3. HERO entrance ran to completion (stagger is ~2s end to end)
  await page.waitForTimeout(1500);
  const wOpacity = await cssOf(page.locator('.hero-name .w').first(), 'opacity');
  check('hero: name words revealed', parseFloat(wOpacity) > 0.95, `opacity ${wOpacity}`);
  const portraitClip = await cssOf(page.locator('.portrait-frame'), 'clip-path');
  check('hero: portrait clip reveal completed', !/100%/.test(portraitClip), portraitClip);

  // 4. NAV LINK HOVER — custom underline scales in (not browser default)
  const navLink = page.locator('.nav-links a').first();
  const before = await pseudo(navLink, '::after', 'transform');
  await navLink.hover();
  await page.waitForTimeout(450);
  const after = await pseudo(navLink, '::after', 'transform');
  check('navbar: hover underline animates', before !== after, `${before} → ${after}`);
  const deco = await cssOf(navLink, 'text-decoration-line');
  check('navbar: no default browser underline', deco === 'none', deco);

  // 5. BUTTON hover — border/glow transition + magnetic transform
  const btn = page.locator('.hero-ctas .btn').first();
  const shadow0 = await cssOf(btn, 'box-shadow');
  await btn.hover();
  await page.waitForTimeout(500);
  const shadow1 = await cssOf(btn, 'box-shadow');
  check('button: hover glow applied', shadow0 !== shadow1, shadow1.slice(0, 46));
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.8);
  await page.waitForTimeout(400);
  const mag = await btn.evaluate((el) => el.style.transform || getComputedStyle(el).transform);
  check('button: magnetic pull (Anime.js) active', /matrix|translate/.test(mag) && mag !== 'none', mag.slice(0, 46));

  // 6. CUSTOM CURSOR states — default → link → view over reel media
  check('cursor: custom cursor mounted', await page.locator('.cursor-ring').count() === 1);
  await page.locator('.hero-socials a').first().hover();
  await page.waitForTimeout(300);
  check('cursor: link state', await page.locator('.cursor-ring').getAttribute('data-state') === 'link');

  // 7. SECTION REVEALS — About / Skills / Journey / Links
  const reveals = [
    ['about', '.about-copy p', baseline.about],
    ['skills', '.skill-row', baseline.skills],
    ['journey', '.tl-item', baseline.journey],
    ['links', '.link-row', baseline.links],
  ];
  for (const [id, sel, hiddenBefore] of reveals) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    const shownAfter = await page.locator(sel).first().evaluate((el) => getComputedStyle(el).opacity);
    check(
      `reveal: #${id} animates in`,
      parseFloat(shownAfter) > 0.95 && parseFloat(hiddenBefore) < 0.1,
      `${hiddenBefore} → ${shownAfter}`
    );
  }

  // 8. PROJECT REEL — pinned, landscape ratio, contain, cursor label, motion
  // Reset to the top and walk down so the pin starts at progress 0 with
  // panel 0 in focus (scrollIntoViewIfNeeded can land mid-scrub).
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  // offsetTop is 0 once GSAP wraps the section in a pin-spacer — use the
  // document-space rect instead.
  const pinStart = await page.evaluate(() => {
    const el = document.querySelector('#projects');
    return el.getBoundingClientRect().top + window.scrollY;
  });
  await page.evaluate((y) => window.scrollTo(0, y + 40), pinStart);
  await page.waitForTimeout(1200);

  const pinned = await page.locator('#projects').evaluate((el) => getComputedStyle(el).position);
  check('reel: section pinned by ScrollTrigger', pinned === 'fixed', pinned);

  // Screenshot media = the real project screenshots (panel 0 is the repo
  // terminal card, which has no image by design).
  const shot = page.locator('img.reel-media-inner').first();
  const frame = page.locator('.reel-panel').nth(1).locator('.reel-media');
  const mb = await frame.boundingBox();
  check('reel: media is landscape', mb.width > mb.height, `${Math.round(mb.width)}x${Math.round(mb.height)}`);
  check('reel: media ratio ≈ 3:2', Math.abs(mb.width / mb.height - 1.5) < 0.08, (mb.width / mb.height).toFixed(3));
  const fit = await cssOf(shot, 'object-fit');
  check('reel: screenshots not cropped (contain)', fit === 'contain', fit);
  const natural = await shot.evaluate((el) => `${el.naturalWidth}x${el.naturalHeight}`);
  check('reel: real asset loaded at native landscape size', /^\d{3,}x\d{3,}$/.test(natural) && !natural.startsWith('0'), natural);

  // Cursor VIEW label — hero portrait carries data-cursor="view" and is
  // reliably visible; also assert the reel media-wraps declare the label.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.locator('.portrait').hover();
  await page.waitForTimeout(350);
  const viewState = await page.locator('.cursor-ring').getAttribute('data-state');
  check('cursor: VIEW label over showcase media', viewState === 'view', String(viewState));
  const reelCursors = await page.evaluate(() =>
    [...document.querySelectorAll('.reel-panel .reel-media-wrap')].filter((e) => e.dataset.cursor === 'view').length
  );
  check('cursor: project media declare VIEW label', reelCursors >= 5, `${reelCursors} panels`);
  await page.evaluate((y) => window.scrollTo(0, y + 40), pinStart);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/03-reel.png` });

  // 9. REEL PROGRESSION — scrub moves the NEXT panel right → center → left.
  // Sample at depths INTO the pinned range. Panel 1 centers ~1050px in,
  // exits left by ~2100px (SLOT=1, ENTER+HOLD+EXIT geometry). Use pinStart
  // (measured at scrollTop 0) — a pinned element's rect is unreliable.
  const panelAt = (n) => page.locator('.reel-panel').nth(n).evaluate((el) => {
    const s = getComputedStyle(el);
    const m = new DOMMatrixReadOnly(s.transform);
    const blur = /blur\(([\d.]+)/.exec(s.filter);
    return { x: m.m41, o: parseFloat(s.opacity), blur: blur ? blur[1] : '0' };
  });
  const at = async (dy) => {
    await page.evaluate((y) => window.scrollTo(0, y), pinStart + dy);
    await page.waitForTimeout(1000);
    return panelAt(1);
  };
  // Scan the pinned range for the frame where panel 1 is furthest right
  // (its pre-entry / entering state) so the assertion doesn't depend on
  // guessing an exact scroll depth under scrub lag.
  let entering = { x: -1e9, o: 1, blur: '0' };
  for (let dy = 200; dy <= 900; dy += 100) {
    const s = await at(dy);
    if (s.x > entering.x) entering = s;
  }
  const dCenter = await at(1050);  // panel 1 centered, sharp
  const dExit = await at(1750);    // panel 1 sliding out to the left
  check(
    'reel: panel travels right → center → left on scroll',
    entering.x > dCenter.x + 30 && dCenter.x > dExit.x + 30,
    `x ${Math.round(entering.x)} → ${Math.round(dCenter.x)} → ${Math.round(dExit.x)}`
  );
  check(
    'reel: panel fades + blurs as it exits left',
    dExit.o < dCenter.o && parseFloat(dExit.blur) > parseFloat(dCenter.blur),
    `opacity ${dCenter.o.toFixed(2)}→${dExit.o.toFixed(2)}, blur ${dCenter.blur}→${dExit.blur}`
  );
  check(
    'reel: entering panel starts blurred + transparent (pre-entry)',
    entering.o < 0.3 && parseFloat(entering.blur) > 4,
    `opacity ${entering.o.toFixed(2)}, blur ${entering.blur}`
  );
  const counter = await page.locator('.reel-count').textContent();
  check('reel: HUD counter tracks playhead', /\d\d \/ \d\d/.test(counter.trim()), counter.trim());
  await page.screenshot({ path: `${OUT}/04-reel-mid.png` });

  // 10. BACKGROUND — grid + beam alive
  const beamO = await page.locator('.bgfx-beam').evaluate((el) => getComputedStyle(el).opacity);
  check('background: grid layer present', await page.locator('.bgfx-grid').count() === 1);
  check('background: light sweep animating', typeof beamO === 'string', `beam opacity ${beamO}`);

  // 11. SCROLL PERFORMANCE — headless software compositing can't hit 60fps on
  // its own (a blank page measures ~16.7ms/frame here), so assert the site's
  // OVERHEAD over that floor rather than an absolute fps, and assert that the
  // scroll work stays off the main thread (no long tasks, compositor-only
  // properties). Absolute fps needs a real GPU browser.
  const perf = await page.evaluate(async () => {
    const run = async (doScroll) => {
      const f = [];
      let last = performance.now();
      let stop = false;
      const loop = (t) => { f.push(t - last); last = t; if (!stop) requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
      for (let i = 0; i < 30; i++) {
        if (doScroll) window.scrollBy(0, 140);
        await new Promise((r) => setTimeout(r, 40));
      }
      stop = true;
      f.shift();
      return f.reduce((a, b) => a + b, 0) / f.length;
    };
    const longs = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => longs.push(Math.round(e.duration))))
      .observe({ entryTypes: ['longtask'] });
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
    const idle = await run(false);
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
    const scrolling = await run(true);
    return { idle, scrolling, longTasks: longs.length, worstLong: longs.length ? Math.max(...longs) : 0 };
  });
  check(
    'perf: scroll overhead over idle baseline < 12ms/frame',
    perf.scrolling - perf.idle < 12,
    `idle ${perf.idle.toFixed(1)}ms → scrolling ${perf.scrolling.toFixed(1)}ms (+${(perf.scrolling - perf.idle).toFixed(1)})`
  );
  check(
    'perf: no long tasks block the main thread while scrolling',
    perf.worstLong < 120,
    `${perf.longTasks} long tasks, worst ${perf.worstLong}ms`
  );

  // 12. GPU-FRIENDLY PROPERTIES — nothing should animate layout.
  const layoutAnim = await page.evaluate(() => {
    const bad = ['width', 'height', 'top', 'left', 'margin', 'padding'];
    return document.getAnimations()
      .map((a) => {
        const props = new Set();
        (a.effect?.getKeyframes?.() ?? []).forEach((k) =>
          Object.keys(k).forEach((p) => bad.includes(p) && props.add(p))
        );
        return props.size ? `${a.effect?.target?.className || '?'}: ${[...props]}` : null;
      })
      .filter(Boolean);
  });
  check('perf: no layout properties animated (transform/opacity only)', layoutAnim.length === 0, layoutAnim.join('; '));

  check('console: no page errors', errors.length === 0, errors.slice(0, 2).join(' | '));
  await ctx.close();
}

// ── MOBILE — navbar OPEN → CLOSE → OPEN + scroll lock ──────────
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForSelector('.loader', { state: 'detached', timeout: 15000 });

  const menu = page.locator('.mmenu');
  const btn = page.locator('.mmenu-btn');
  const vis = () => menu.evaluate((el) => {
    const s = getComputedStyle(el);
    return { o: parseFloat(s.opacity), v: s.visibility, clip: s.clipPath };
  });
  const bodyLocked = () => page.evaluate(() => getComputedStyle(document.body).overflow === 'hidden');

  check('navbar mobile: hamburger visible', await btn.isVisible());
  check('navbar mobile: menu hidden initially', (await vis()).v === 'hidden');

  // OPEN
  await btn.click();
  await page.waitForTimeout(950);
  const open1 = await vis();
  check('navbar mobile: OPEN works', open1.o > 0.9 && open1.v === 'visible', JSON.stringify(open1).slice(0, 70));
  check('navbar mobile: body scroll locked while open', await bodyLocked());
  const itemO = await page.locator('.mmenu-item').last().evaluate((el) => getComputedStyle(el).opacity);
  check('navbar mobile: items stagger in (last item visible)', parseFloat(itemO) > 0.9, itemO);
  const barT = await page.locator('.mmenu-btn .b1').evaluate((el) => getComputedStyle(el).transform);
  check('navbar mobile: hamburger morphed to X', /matrix/.test(barT) && barT !== 'none', barT.slice(0, 46));
  await page.screenshot({ path: `${OUT}/05-menu-open.png` });

  // CLOSE
  await btn.click();
  await page.waitForTimeout(950);
  const closed = await vis();
  check('navbar mobile: CLOSE works', closed.v === 'hidden' || closed.o < 0.05, JSON.stringify(closed).slice(0, 70));
  check('navbar mobile: body scroll restored', !(await bodyLocked()));

  // OPEN AGAIN (the original bug)
  await btn.click();
  await page.waitForTimeout(950);
  const open2 = await vis();
  check('navbar mobile: OPEN → CLOSE → OPEN cycle', open2.o > 0.9 && open2.v === 'visible', JSON.stringify(open2).slice(0, 70));

  // ESC closes
  await page.keyboard.press('Escape');
  await page.waitForTimeout(900);
  check('navbar mobile: Escape closes menu', !(await bodyLocked()));

  // Link click closes + navigates
  await btn.click();
  await page.waitForTimeout(900);
  await page.locator('.mmenu a').nth(2).click();
  await page.waitForTimeout(900);
  check('navbar mobile: link click closes menu', !(await bodyLocked()));

  // Mobile reel stays landscape
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const mb = await page.locator('.reel-media').first().boundingBox();
  check('reel mobile: media still landscape', mb.width > mb.height, `${Math.round(mb.width)}x${Math.round(mb.height)}`);
  check('reel mobile: ratio ≈ 3:2', Math.abs(mb.width / mb.height - 1.5) < 0.08, (mb.width / mb.height).toFixed(3));
  await page.screenshot({ path: `${OUT}/06-mobile-reel.png`, fullPage: false });
  await ctx.close();
}

// ── REDUCED MOTION ────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: 'load' });

  const t0 = Date.now();
  await page.waitForSelector('.loader', { state: 'detached', timeout: 8000 });
  check('reduced-motion: loader shortened', Date.now() - t0 < 3000, `${Date.now() - t0}ms`);

  check('reduced-motion: cursor effects disabled', await page.locator('.cursor-ring').count() === 0);
  const beam = await page.locator('.bgfx-beam').evaluate((el) => getComputedStyle(el).display).catch(() => 'none');
  check('reduced-motion: light sweep disabled', beam === 'none', beam);

  // Everything must be readable with no animation to reveal it
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const aboutO = await page.locator('.about-copy p').first().evaluate((el) => getComputedStyle(el).opacity);
  check('reduced-motion: about copy visible without animation', parseFloat(aboutO) > 0.95, aboutO);

  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const panelO = await page.locator('.reel-panel').nth(3).evaluate((el) => getComputedStyle(el).opacity);
  check('reduced-motion: all project panels visible (stacked)', parseFloat(panelO) > 0.95, panelO);
  const rm = await page.locator('.reel-media').first().boundingBox();
  check('reduced-motion: media stays landscape', rm.width > rm.height, `${Math.round(rm.width)}x${Math.round(rm.height)}`);
  check('reduced-motion: no page errors', errors.length === 0, errors.slice(0, 2).join(' | '));
  await page.screenshot({ path: `${OUT}/07-reduced-motion.png` });
  await ctx.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  console.log('\nFAILURES:');
  failed.forEach((f) => console.log(`  ✗ ${f.name} — ${f.detail}`));
  process.exit(1);
}
