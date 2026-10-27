import { useState } from 'react';
import { BsBroadcast } from 'react-icons/bs';
import {
  FaArrowDown,
  FaGamepad,
  FaGithub,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
  FaVuejs,
} from 'react-icons/fa';
import { FaMedium } from 'react-icons/fa6';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { MdSchool } from 'react-icons/md';
import { PiGithubLogoFill } from 'react-icons/pi';
import { SiRedux, SiTailwindcss, SiZigbee2Mqtt } from 'react-icons/si';
import { TbBrandNextjs, TbBrandTypescript } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import About from '../components/molecules/container/About';
import Education from '../components/molecules/container/Education';
import Experience from '../components/molecules/container/Experience';
import Skill from '../components/molecules/container/Skill';
import MeteorShooterModal from '../components/molecules/game/MeteorShooterModal';

const techStack = [
  { icon: <TbBrandTypescript size={20} className="text-blue-400" />, name: 'TypeScript' },
  { icon: <FaReact size={20} className="text-cyan-400" />, name: 'React JS' },
  { icon: <TbBrandNextjs size={20} className="text-white" />, name: 'Next JS' },
  { icon: <FaVuejs size={20} className="text-emerald-400" />, name: 'Vue JS' },
  { icon: <SiRedux size={20} className="text-purple-400" />, name: 'Redux' },
  { icon: <SiTailwindcss size={20} className="text-sky-400" />, name: 'Tailwind' },
  { icon: <FaNodeJs size={20} className="text-green-400" />, name: 'Node JS' },
  { icon: <SiZigbee2Mqtt size={20} className="text-amber-400" />, name: 'MQTT' },
  { icon: <BsBroadcast size={20} className="text-orange-400" />, name: 'WebSocket' },
];

function BentoCard({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent/30 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-lg shadow-black/30 hover:-translate-y-0.5 group ${className}`}
    >
      {/* Inner top glow line */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const email = 'ananta.nov2@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="py-2 flex flex-col gap-8">
      {/* ── BENTO GRID HERO ─────────────────────────────────── */}
      <section className="relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-accent/12 via-secondary/10 to-tenary/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch auto-rows-auto">
          {/* ── CELL 1: Main CTA Hero — spans 2 cols on all, 3 cols on lg ── */}
          <BentoCard className="col-span-2 lg:col-span-3 p-6 sm:p-8">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-2 text-xs font-mono mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2" />
              </span>
              Open for Full-time &amp; Freelance
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-accent via-accent-2 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                Ananta Noviandanu
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-text/80 max-w-xl leading-relaxed">
              Frontend Engineer with <span className="text-white font-semibold">3+ years</span>{' '}
              building enterprise-grade platforms, real-time IoT dashboards, and scalable UIs using{' '}
              <span className="text-white font-medium">React, Next.js, Vue &amp; TypeScript</span>.
            </p>

            {/* Action Row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="https://www.linkedin.com/in/anantanoviandanu/"
                target="_blank"
                rel="noreferrer"
              >
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-accent/40 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer">
                  <FaLinkedinIn size={14} className="text-accent-2" /> LinkedIn
                </button>
              </Link>
              <Link to="https://github.com/AnantaNd" target="_blank" rel="noreferrer">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-accent/40 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer">
                  <PiGithubLogoFill size={14} className="text-accent-2" /> GitHub
                </button>
              </Link>
              <Link to="https://medium.com/@nantd" target="_blank" rel="noreferrer">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-accent/40 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer">
                  <FaMedium size={14} className="text-accent-2" /> Medium
                </button>
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-accent/40 text-text/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck size={13} className="text-accent-2" />
                    <span className="text-accent-2">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={13} />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>
          </BentoCard>

          {/* ── CELL 2: Profile Avatar ── */}
          <BentoCard className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-6 gap-3">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-accent/60 via-secondary/40 to-tenary/40 blur-lg opacity-70 animate-pulse" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-accent/40 bg-black/60 shadow-[0_0_25px_rgba(249,115,22,0.25)]">
                <img
                  src="/profile.png"
                  alt="Ananta Noviandanu"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">Ananta Noviandanu</p>
              <p className="text-accent-2 text-xs font-mono">Frontend Engineer</p>
              <p className="text-text/50 text-xs mt-0.5">Jakarta, Indonesia 🇮🇩</p>
            </div>
          </BentoCard>

          {/* ── CELL 3: Experience Stats ── */}
          <BentoCard className="col-span-1 p-5 flex flex-col justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-2/80">
              Experience
            </span>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white leading-none">3+</div>
              <div className="text-xs text-text/60 mt-1">Years Enterprise &amp; IoT</div>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-accent to-accent-2 rounded-full" />
            </div>
          </BentoCard>

          {/* ── CELL 4: Projects Count ── */}
          <BentoCard className="col-span-1 p-5 flex flex-col justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">
              Projects
            </span>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white leading-none">8+</div>
              <div className="text-xs text-text/60 mt-1">Enterprise Platforms</div>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full w-[90%] bg-gradient-to-r from-secondary to-tenary rounded-full" />
            </div>
          </BentoCard>

          {/* ── CELL 5: Education Badge ── */}
          <BentoCard className="col-span-2 p-5 flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-secondary/20 border border-white/15 flex items-center justify-center text-2xl flex-shrink-0">
              <MdSchool />
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">Telkom University</p>
              <p className="text-text/70 text-xs">Bachelor of Information Technology</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent-2 border border-accent/25 text-[10px] font-mono">
                  Cum Laude
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-text/60 border border-white/[0.08] text-[10px] font-mono">
                  GPA 3.54
                </span>
              </div>
            </div>
          </BentoCard>

          {/* ── CELL 6: Tech Stack Scroll ── */}
          <BentoCard className="col-span-2 lg:col-span-4 p-5 overflow-hidden">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-2/80 block mb-3">
              Core Stack
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              {techStack.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-accent/30 hover:bg-white/[0.08] transition-all group/tech cursor-default"
                >
                  {item.icon}
                  <span className="text-xs font-medium text-text/80 group-hover/tech:text-white transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── CELL 7: Featured Project Preview ── */}
          <BentoCard className="col-span-2 lg:col-span-2 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-2/80">
                  Flagship Project
                </span>
                <Link to="/showcase">
                  <span className="text-[10px] text-text/50 hover:text-accent-2 transition-colors cursor-pointer font-mono">
                    All ↗
                  </span>
                </Link>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-accent-2 transition-colors">
                Netcontrol — FTTH &amp; ONT Management
              </h3>
              <p className="text-xs text-text/65 mt-1.5 leading-relaxed line-clamp-2">
                Enterprise FTTH provisioning platform with interactive network topology (OLT → PON →
                FDT → FAT → ONT) and live MQTT device telemetry.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
              {['Vue JS', 'MQTT', 'TR-069', 'InfluxDB', 'RBAC'].map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[10px] bg-white/[0.05] border border-white/[0.08] text-text/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* ── CELL 8: ProSky CMS Preview ── */}
          <BentoCard className="col-span-2 lg:col-span-2 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-2/80">
                  Flagship Project
                </span>
                <a href="https://github.com/AnantaNd/prosky-cms" target="_blank" rel="noreferrer">
                  <span className="text-[10px] text-text/50 hover:text-accent-2 transition-colors cursor-pointer font-mono flex items-center gap-1">
                    <FaGithub size={11} /> Repo ↗
                  </span>
                </a>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-accent-2 transition-colors">
                ProSky CMS — Captive Portal &amp; Ads Suite
              </h3>
              <p className="text-xs text-text/65 mt-1.5 leading-relaxed line-clamp-2">
                All-in-one CMS platform with ticketing, live chat, RBAC, video ad scheduling, RADIUS
                monitoring, and dual analytics engines.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
              {['React JS', 'TypeScript', 'Redux', 'WebSocket', 'Shadcn UI'].map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[10px] bg-white/[0.05] border border-white/[0.08] text-text/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* ── CELL 9: Meteor Strike Interactive Game Easter Egg ── */}
          <BentoCard className="col-span-2 lg:col-span-4 p-5 sm:p-6 bg-gradient-to-r from-accent/10 via-purple-950/20 to-secondary/10 border-accent/25 hover:border-accent/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent to-secondary p-0.5 shadow-lg shadow-accent/25 flex-shrink-0">
                  <div className="w-full h-full bg-[#050212] rounded-[14px] flex items-center justify-center">
                    <IoRocketOutline size={22} className="text-accent-2 rotate-45 animate-bounce" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-2 font-bold">
                      Interactive Easter Egg
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[9px] font-mono border border-accent/30 font-bold">
                      MINI GAME
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                    Orbital Station Meteor Defense
                  </h3>
                  <p className="text-xs text-text/70 mt-1 max-w-xl leading-relaxed">
                    Pilot your starfighter through asteroid storms, blast incoming meteors with neon
                    lasers, collect energy shields &amp; 3X blaster upgrades!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGameOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold text-xs tracking-wider shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
              >
                <FaGamepad size={14} /> PLAY GAME
              </button>
            </div>
          </BentoCard>
        </div>

        {/* Scroll Cue */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-accent/30 text-xs font-mono text-text/60 hover:text-white transition-all duration-300"
          >
            <span>Explore the Timeline</span>
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

      {/* Meteor Defense Mini Game Modal */}
      <MeteorShooterModal isOpen={gameOpen} onClose={() => setGameOpen(false)} />
    </main>
  );
}
