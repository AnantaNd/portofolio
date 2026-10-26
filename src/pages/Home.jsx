import { FaArrowDown } from 'react-icons/fa';
import IphoneLiquidGlass from '../components/atoms/Iphone/IphoneLiquidGlass';
import About from '../components/molecules/container/About';
import Education from '../components/molecules/container/Education';
import Experience from '../components/molecules/container/Experience';
import Highlight from '../components/molecules/container/Highlight';
import Skill from '../components/molecules/container/Skill';
import Cta from '../components/molecules/cta/Cta';

export default function Home() {
  return (
    <main className="py-2 flex flex-col gap-10">
      {/* Hero Showcase with Liquid Glass iPhone & Introduction */}
      <section className="relative pt-2 pb-6">
        {/* Glow backdrop behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-accent/15 via-secondary/15 to-tenary/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: CTA & High-impact introduction (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Cta />
            <Highlight />
          </div>

          {/* Right Column: Liquid Glass iPhone Interactive Device with Gentle Float (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full overflow-visible">
            <div className="text-center mb-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-accent-2/90 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                Cosmic OS • Event Horizon
              </span>
            </div>

            <div className="animate-float flex justify-center w-full">
              <IphoneLiquidGlass />
            </div>

            <p className="text-[11px] font-mono text-text/40 text-center mt-3">
              Tap bottom dock icons to interact • Live widgets
            </p>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-accent/30 text-xs font-mono text-text/60 hover:text-white transition-all duration-300"
          >
            <span>Descend into Orbit</span>
            <FaArrowDown size={10} className="animate-bounce text-accent" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <About title="about" />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <Experience />
      </section>

      {/* Education Section */}
      <section id="education">
        <Education />
      </section>
      {/* Skills Section */}
      <section id="skills">
        <Skill />
      </section>
    </main>
  );
}
