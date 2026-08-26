import { useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundFX from './components/BackgroundFX';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import ProjectReel from './sections/ProjectReel';
import Lab from './sections/Lab';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Links from './sections/Links';
import Contact from './sections/Contact';
import useMicroInteractions from './animations/useMicroInteractions';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [booted, setBooted] = useState(false);

  const handleBooted = useCallback(() => {
    setBooted(true);
    // Let the hero timeline start before measuring pinned sections
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  // Micro interactions (Anime.js) — active after boot
  useMicroInteractions(booted);

  return (
    <>
      {!booted && <Loader onComplete={handleBooted} />}

      <a className="skip-link" href="#projects">
        Lewati ke project
      </a>
      <BackgroundFX />
      <CustomCursor />

      <div className="app-content" data-booted={booted || undefined}>
        <Navbar />
        <main>
          <Hero started={booted} />
          <About />
          <ProjectReel />
          <Lab />
          <Skills />
          <Journey />
          <Links />
          <Contact />
        </main>
      </div>
    </>
  );
}
