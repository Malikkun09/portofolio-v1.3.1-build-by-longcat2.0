import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { ProjectShowcase } from '@/components/projects/ProjectShowcase';
import { Experiments } from '@/components/experiments/Experiments';
import { Certificates } from '@/components/certificates/Certificates';
import { Toolkit } from '@/components/journey/Toolkit';
import { Journey } from '@/components/journey/Journey';
import { Contact } from '@/components/contact/Contact';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="frame py-6 md:py-10">
        <div className="aperture h-[22vh] min-h-[140px] md:h-[30vh]" aria-hidden="true" />
      </div>
      <About />
      <ProjectShowcase />
      <div className="frame py-6 md:py-10">
        <div className="aperture h-[18vh] min-h-[120px]" aria-hidden="true" />
      </div>
      <Experiments />
      <Certificates />
      <Toolkit />
      <Journey />
      <Contact />
      <Footer />
    </>
  );
}
