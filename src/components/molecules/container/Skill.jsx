import React, { useEffect, useRef, useState } from "react";
import { FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { TbBrandTypescript, TbBrandNextjs } from "react-icons/tb";
import {
  SiTailwindcss,
  SiZigbee2Mqtt,
  SiRedux,
  SiExpress,
  SiShadcnui,
  SiAntdesign,
  SiInfluxdb,
  SiJest,
} from "react-icons/si";
import { BsRouterFill, BsBroadcast } from "react-icons/bs";

// Proficiency label mapping
const PROFICIENCY = {
  98: { label: "Master", color: "text-accent-2", bar: "from-accent to-accent-2" },
  95: { label: "Expert", color: "text-accent-2", bar: "from-accent to-accent-2" },
  92: { label: "Expert", color: "text-accent-2", bar: "from-accent to-accent-2" },
  90: { label: "Advanced", color: "text-secondary", bar: "from-primary to-secondary" },
  88: { label: "Advanced", color: "text-secondary", bar: "from-primary to-secondary" },
  85: { label: "Proficient", color: "text-tenary", bar: "from-tenary/70 to-tenary" },
  82: { label: "Proficient", color: "text-tenary", bar: "from-tenary/70 to-tenary" },
  80: { label: "Proficient", color: "text-tenary", bar: "from-tenary/70 to-tenary" },
};

const getProf = (pct) => {
  const key = Object.keys(PROFICIENCY)
    .map(Number)
    .sort((a, b) => b - a)
    .find((k) => pct >= k);
  return (
    PROFICIENCY[key] ?? {
      label: "Familiar",
      color: "text-text/60",
      bar: "from-white/20 to-white/40",
    }
  );
};

const skillGroups = [
  {
    group: "Frontend Core",
    icon: "⬡",
    accent: "accent-2",
    skills: [
      { name: "TypeScript", icon: <TbBrandTypescript size={20} />, pct: 92 },
      { name: "React JS", icon: <FaReact size={20} />, pct: 95 },
      { name: "Next JS", icon: <TbBrandNextjs size={20} />, pct: 90 },
      { name: "Vue JS", icon: <FaVuejs size={20} />, pct: 90 },
    ],
  },
  {
    group: "State Management",
    icon: "◈",
    accent: "secondary",
    skills: [
      { name: "Redux & Zustand", icon: <SiRedux size={20} />, pct: 95 },
      { name: "Pinia", icon: <FaVuejs size={20} />, pct: 90 },
    ],
  },
  {
    group: "UI & Design System",
    icon: "◉",
    accent: "tenary",
    skills: [
      { name: "Tailwind & Shadcn", icon: <SiShadcnui size={20} />, pct: 98 },
      { name: "Ant Design", icon: <SiAntdesign size={20} />, pct: 88 },
    ],
  },
  {
    group: "Real-Time & IoT",
    icon: "⟁",
    accent: "accent",
    skills: [
      { name: "WebSocket", icon: <BsBroadcast size={20} />, pct: 92 },
      { name: "MQTT", icon: <SiZigbee2Mqtt size={20} />, pct: 90 },
      { name: "TR-069", icon: <BsRouterFill size={20} />, pct: 85 },
    ],
  },
  {
    group: "Backend & Infra",
    icon: "⬡",
    accent: "primary",
    skills: [
      { name: "Node JS", icon: <FaNodeJs size={20} />, pct: 82 },
      { name: "Express", icon: <SiExpress size={20} />, pct: 80 },
    ],
  },
  {
    group: "Testing & Telemetry",
    icon: "◈",
    accent: "secondary",
    skills: [
      { name: "Jest DOM", icon: <SiJest size={20} />, pct: 85 },
      { name: "InfluxDB / NetFlow", icon: <SiInfluxdb size={20} />, pct: 85 },
    ],
  },
];

// Animated bar component — fills when in view
function SkillBar({ pct, animated }) {
  const prof = getProf(pct);
  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${prof.color}`}>
          {prof.label}
        </span>
        <span className="text-[10px] font-mono text-text/40">{pct}%</span>
      </div>
      {/* Bar track */}
      <div className="relative h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${prof.bar} transition-all duration-1000 ease-out`}
          style={{ width: animated ? `${pct}%` : "0%" }}
        />
        {/* Shimmer overlay */}
        {animated && (
          <div
            className="absolute inset-y-0 left-0 rounded-full opacity-40"
            style={{
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
              animation: "shimmer 2s ease-in-out 0.8s infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

// Dot-grid proficiency indicator (5 dots)
function DotMeter({ pct }) {
  const filled = Math.round((pct / 100) * 5);
  const prof = getProf(pct);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i < filled
              ? `bg-gradient-to-br ${prof.bar} shadow-sm`
              : "bg-white/[0.08]"
          }`}
        />
      ))}
    </div>
  );
}

// Skill card
function SkillCard({ skill, animated }) {
  const prof = getProf(skill.pct);
  return (
    <div className="group relative p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-secondary/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-3">
      {/* Top: icon + name */}
      <div className="flex items-center gap-2.5">
        <div className={`shrink-0 ${prof.color} group-hover:scale-110 transition-transform duration-200`}>
          {skill.icon}
        </div>
        <span className="text-xs sm:text-[13px] font-semibold text-white/90 leading-tight truncate">
          {skill.name}
        </span>
      </div>
      {/* Dot meter */}
      <DotMeter pct={skill.pct} />
      {/* Bar */}
      <SkillBar pct={skill.pct} animated={animated} />
    </div>
  );
}

// Group header accent colors
const accentBorder = {
  "accent-2": "border-accent-2/30",
  secondary: "border-secondary/30",
  tenary: "border-tenary/30",
  accent: "border-accent/30",
  primary: "border-primary/30",
};
const accentText = {
  "accent-2": "text-accent-2",
  secondary: "text-secondary",
  tenary: "text-tenary",
  accent: "text-accent",
  primary: "text-primary",
};

export default function Skill() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/40 hover:border-secondary/30 transition-all duration-300"
    >
      {/* Top inner glow line */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] mb-8 gap-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent-2/90 font-medium">
            Verified Tech Stack
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
        </div>
        <span className="text-xs font-mono text-text/40 hidden sm:inline">
          ~/stack/proficiencies
        </span>
      </div>

      {/* Proficiency legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8">
        {[
          { label: "Master / Expert", dotClass: "from-accent to-accent-2" },
          { label: "Advanced", dotClass: "from-primary to-secondary" },
          { label: "Proficient", dotClass: "from-tenary/70 to-tenary" },
        ].map(({ label, dotClass }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${dotClass}`} />
            <span className="text-[11px] font-mono text-text/50">{label}</span>
          </div>
        ))}
      </div>

      {/* Skill Groups */}
      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.group}>
            {/* Group Label */}
            <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${accentBorder[group.accent] ?? "border-white/[0.06]"}`}>
              <span className={`font-mono text-base ${accentText[group.accent] ?? "text-text/60"}`}>
                {group.icon}
              </span>
              <span className={`text-[11px] font-mono uppercase tracking-widest font-bold ${accentText[group.accent] ?? "text-text/60"}`}>
                {group.group}
              </span>
              <span className="ml-auto text-[10px] font-mono text-text/30">
                {group.skills.length} skill{group.skills.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {group.skills.map((skill, idx) => (
                <SkillCard key={idx} skill={skill} animated={animated} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats footer */}
      <div className="mt-8 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-center">
        {[
          { value: "15+", label: "Technologies" },
          { value: "3+", label: "Years Hands-on" },
          { value: "6", label: "Domains Covered" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-xl sm:text-2xl font-bold text-white font-mono">{value}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-text/40">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
