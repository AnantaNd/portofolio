import { useEffect, useState } from 'react';
import { FaCampground, FaEnvelope, FaProjectDiagram } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';

const navItems = [
  {
    path: '/',
    name: 'Home',
    icon: <FaCampground size={16} />,
  },
  {
    path: '/showcase',
    name: 'Showcase',
    icon: <FaProjectDiagram size={16} />,
  },
  {
    path: '/contact',
    name: 'Contact',
    icon: <FaEnvelope size={16} />,
  },
];

export default function Navbar() {
  const location = useLocation();
  const [animState, setAnimState] = useState('idle');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setAnimState('idle');

    const raf = requestAnimationFrame(() => {
      setAnimState('running');
    });

    const finishTimeout = setTimeout(() => {
      setAnimState('finishing');
    }, 750);

    const idleTimeout = setTimeout(() => {
      setAnimState('idle');
    }, 1150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finishTimeout);
      clearTimeout(idleTimeout);
    };
  }, [location.pathname]);

  const isVisible = animState === 'running' || animState === 'finishing';
  const isFilled = animState === 'running' || animState === 'finishing';
  const isFading = animState === 'finishing';

  return (
    <nav className="relative overflow-hidden flex items-center justify-between sm:justify-start gap-1 p-1.5 sm:p-2 rounded-full backdrop-blur-2xl bg-[#090518]/90 border border-white/[0.12] shadow-2xl shadow-black/80 transition-all duration-300 hover:border-accent/40 max-w-full">
      {/* 💧 Pure Liquid Water Chamber */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full overflow-hidden transition-opacity duration-400 ease-out ${
          isVisible && !isFading ? 'opacity-100' : isFading ? 'opacity-0' : 'opacity-0'
        }`}
      >
        <div
          className="relative w-full h-full origin-left will-change-transform"
          style={{
            transform: isFilled ? 'scaleX(1)' : 'scaleX(0)',
            transition: isFilled ? 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          {/* Water Refraction */}
          <div className="absolute inset-0 bg-white/[0.14] backdrop-blur-md" />
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-white/45" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/15" />
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 rounded-r-full blur-[1px] border-r border-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <div className="absolute inset-y-0 -left-12 w-28 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-water-glint pointer-events-none" />
        </div>
      </div>

      {/* Brand Monogram */}
      {/* <Link
        to="/"
        className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] hover:bg-accent/20 border border-white/20 hover:border-accent/40 text-white font-mono font-bold text-xs shadow-inner hover:scale-105 transition-all mr-0.5 sm:mr-2 flex-shrink-0"
        title="Ananta Noviandanu"
      >
        <span>&lt;AN/&gt;</span>
      </Link> */}

      {/* Nav items list */}
      <ul className="relative z-10 flex items-center gap-1 sm:gap-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-white/[0.18] border border-white/25 shadow-inner backdrop-blur-md'
                    : 'text-text/75 hover:text-white hover:bg-white/[0.06]'
                } active:scale-95`}
              >
                {/* Active indicator dot */}
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                {item.icon}
                {/* Label: Always visible, properly sized on mobile & desktop */}
                <span className="text-xs sm:text-sm tracking-tight">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to Starlight mode' : 'Switch to Ultra-Dark mode'}
        className={`relative z-10 ml-1 sm:ml-2 flex items-center justify-center w-8 h-8 rounded-full border hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex-shrink-0 ${
          theme === 'dark'
            ? 'bg-white/[0.04] border-white/15 hover:bg-amber-400/20 hover:border-amber-400/40'
            : 'bg-indigo-950/60 border-purple-400/40 hover:bg-purple-900/40 hover:border-accent-2/60 shadow-inner'
        }`}
        title={theme === 'dark' ? 'Switch to Starlight Mode' : 'Switch to Ultra-Dark Mode'}
      >
        {theme === 'dark' ? (
          <HiSun size={15} className="text-amber-300" />
        ) : (
          <HiMoon size={15} className="text-secondary" />
        )}
      </button>
    </nav>
  );
}
