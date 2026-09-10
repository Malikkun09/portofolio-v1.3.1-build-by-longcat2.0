'use client';

import { contact, domains, socials } from '@/data/profile';

export function Contact() {
  return (
    <section id="contact" className="relative bg-ink py-28 md:py-40">
      <div className="frame">
        <p className="section-kicker">Contact</p>
        <h2 className="display mt-6 max-w-5xl text-[clamp(2.8rem,9vw,8rem)]">
          Let&apos;s build something interesting.
        </h2>
        <p className="mt-8 max-w-lg text-mist">{contact.note}</p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              href={contact.whatsappHref}
              data-cursor="open"
              className="font-display text-3xl uppercase tracking-display text-brass md:text-5xl"
            >
              WhatsApp
              <span className="mt-2 block font-mono text-sm tracking-[0.16em] text-paper">
                {contact.whatsappDisplay}
              </span>
            </a>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="block border-t border-line pt-4"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-lg">{item.sub}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <p className="section-kicker">Domains</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((item) => (
              <li key={item.domain}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-paper/80 hover:text-brass"
                >
                  {item.domain}
                  <span className="ml-3 text-mist">{item.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
