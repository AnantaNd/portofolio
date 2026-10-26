import { useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaMedium } from 'react-icons/fa6';
import { FiCheck, FiCopy, FiRadio } from 'react-icons/fi';
import { PiGithubLogoFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import ButtonIcons from '../../atoms/Button/ButtonIcons';
import Card from '../../atoms/Card/Card';

export default function Cta() {
  const [copied, setCopied] = useState(false);
  const email = 'ananta.nov2@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card hide={true}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-2">
        <section className="flex-1 text-center md:text-left">
          {/* Cosmic Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent-2 text-xs font-mono mb-3 backdrop-blur-md shadow-sm shadow-accent/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2"></span>
            </span>
            <span className="flex items-center gap-1.5">
              <FiRadio size={12} className="animate-pulse" />
              <span> Open for Opportunities</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-accent via-accent-2 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.35)]">
              Ananta Noviandanu
            </span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-text/85 font-normal leading-relaxed">
            Frontend Engineer specializing in{' '}
            <span className="text-white font-medium">
              React.js, Next.js, Vue.js &amp; TypeScript
            </span>
            . Building scalable enterprise systems, real-time IoT architectures, and
            high-performance UIs.
          </p>

          {/* Social Icons & Quick Copy */}
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-5">
            <Link
              to="https://www.linkedin.com/in/anantanoviandanu/"
              target="_blank"
              rel="noreferrer"
            >
              <ButtonIcons icon={<FaLinkedinIn size={18} />} title="LinkedIn Profile" />
            </Link>
            <Link to="https://github.com/AnantaNd" target="_blank" rel="noreferrer">
              <ButtonIcons icon={<PiGithubLogoFill size={18} />} title="GitHub Profile" />
            </Link>
            <Link to="https://medium.com/@nantd" target="_blank" rel="noreferrer">
              <ButtonIcons icon={<FaMedium size={18} />} title="Medium Articles" />
            </Link>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-text/90 border border-white/[0.08] hover:border-accent/40 transition-all cursor-pointer backdrop-blur-md"
              title="Click to copy email"
            >
              {copied ? (
                <>
                  <FiCheck className="text-accent-2" size={14} />
                  <span className="text-accent-2">Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy size={14} />
                  <span>{email}</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Profile Avatar with Accretion Disk Halo */}
        <section className="relative flex-shrink-0">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-accent/50 via-secondary/40 to-tenary/40 blur-xl opacity-75 animate-pulse" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-accent/40 p-1 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            <img
              src="/profile.png"
              alt="Ananta Noviandanu"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </section>
      </div>
    </Card>
  );
}
