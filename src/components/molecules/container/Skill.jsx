import React from "react";
import { FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript, TbBrandNextjs } from "react-icons/tb";
import {
  SiTailwindcss,
  SiZigbee2Mqtt,
  SiRedux,
  SiExpress,
  SiShadcnui,
  SiAntdesign,
  SiInfluxdb,
} from "react-icons/si";
import { BsRouterFill, BsBroadcast } from "react-icons/bs";
import { GiGiantSquid } from "react-icons/gi";

// Tech stack accurately matched to CV
const skills = [
  { name: "TypeScript", icon: <TbBrandTypescript size={22} />, tag: "Core", level: "92%" },
  { name: "React JS", icon: <FaReact size={22} />, tag: "Frontend", level: "95%" },
  { name: "Next JS", icon: <TbBrandNextjs size={22} />, tag: "Full-Stack", level: "90%" },
  { name: "Vue JS", icon: <FaVuejs size={22} />, tag: "Frontend", level: "90%" },
  { name: "Redux & Zustand", icon: <SiRedux size={22} />, tag: "State Management", level: "95%" },
  { name: "Pinia", icon: <FaVuejs size={22} />, tag: "State Management", level: "90%" },
  { name: "Tailwind & Shadcn", icon: <SiShadcnui size={22} />, tag: "Design System", level: "98%" },
  { name: "Ant Design", icon: <SiAntdesign size={22} />, tag: "UI Framework", level: "88%" },
  { name: "WebSocket", icon: <BsBroadcast size={22} />, tag: "Real-Time / IoT", level: "92%" },
  { name: "MQTT", icon: <SiZigbee2Mqtt size={22} />, tag: "IoT Protocol", level: "90%" },
  { name: "TR-069", icon: <BsRouterFill size={22} />, tag: "Device Management", level: "85%" },
  { name: "Node JS", icon: <FaNodeJs size={22} />, tag: "Backend", level: "82%" },
  { name: "Express", icon: <SiExpress size={22} />, tag: "Backend", level: "80%" },
  { name: "Jest Dom", icon: <GiGiantSquid size={22} />, tag: "Testing", level: "85%" },
  { name: "InfluxDB / NetFlow", icon: <SiInfluxdb size={22} />, tag: "Telemetry", level: "85%" },
];

export default function Skill() {
  return (
    <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/40 hover:border-secondary/30 transition-all duration-300">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] mb-6 gap-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent-2/90 font-medium">
            Verified Tech Stack
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Skills &amp; Technologies</h2>
        </div>
        <span className="text-xs font-mono text-text/40 hidden sm:inline">
          ~/stack/proficiencies
        </span>
      </div>

      {/* Modern Grid of Skill Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {skills.map((item, idx) => (
          <div
            key={idx}
            className="group relative p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/[0.06] hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-text/70 group-hover:text-accent-2 transition-colors">
                {item.icon}
              </div>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-white/[0.04] text-text/50">
                {item.tag}
              </span>
            </div>

            <div className="mt-3">
              <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-white transition-colors truncate">
                {item.name}
              </h4>
              <div className="mt-2 w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-accent-2 rounded-full transition-all duration-700"
                  style={{ width: item.level }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
