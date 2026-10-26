import React, { useState, useEffect } from "react";
import {
  FaWifi,
  FaBatteryFull,
  FaCode,
  FaFolderOpen,
  FaTerminal,
  FaBolt,
  FaLayerGroup,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function IphoneLiquidGlass() {
  const [activeTab, setActiveTab] = useState("preview");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-[320px] sm:w-[350px] min-w-[320px] max-w-[350px] flex-shrink-0 select-none perspective-1000 group">
      {/* Black Hole Accretion Halo behind iPhone */}
      <div className="absolute -inset-5 bg-gradient-to-tr from-accent/30 via-secondary/35 to-tenary/25 rounded-[3.8rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* iPhone Outer Titanium Chassis with Space Finish */}
      <div className="relative rounded-[3.2rem] p-[10px] bg-gradient-to-b from-white/25 via-white/10 to-accent/15 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-2xl">
        {/* Inner Bezel Ring */}
        <div className="relative rounded-[2.7rem] bg-[#050212] border border-black/90 overflow-hidden shadow-inner flex flex-col h-[580px]">
          {/* Top Status Bar with Dynamic Island */}
          <div className="relative z-20 pt-3 px-6 flex items-center justify-between text-white text-[12px] font-semibold">
            <span>{currentTime || "09:41"}</span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 border border-white/10 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <div className="flex items-center gap-1 text-[9px] text-accent-2 font-mono">
                <FaBolt className="text-[8px] animate-bounce" /> Orbit
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-tenary" />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] opacity-80">
              <FaWifi size={11} />
              <FaBatteryFull size={14} />
            </div>
          </div>

          {/* Liquid Glass Screen Body with Cosmic Nebulae */}
          <div className="relative flex-1 p-4 pt-5 flex flex-col justify-between overflow-hidden">
            {/* Cosmic ambient blobs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

            {/* Screen Content Tabs */}
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Profile Card Widget */}
              {activeTab === "preview" && (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  {/* Frosted Widget */}
                  <div className="p-4 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group/wid">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 group-hover/wid:animate-liquid-sheen" />
                    <div className="relative w-16 h-16 mx-auto mb-2 rounded-2xl p-0.5 bg-gradient-to-tr from-accent to-secondary shadow-lg shadow-accent/20">
                      <img
                        src="/profile.png"
                        alt="Ananta"
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    </div>
                    <h3 className="text-white font-bold text-base tracking-tight">
                      Ananta Noviandanu
                    </h3>
                    <p className="text-[11px] text-accent-2 font-mono mt-0.5">
                      Senior Frontend Engineer
                    </p>
                    <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-accent-2 bg-accent/10 py-1 px-3 rounded-full border border-accent/20 w-fit mx-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                      Station: Available for Projects
                    </div>
                  </div>

                  {/* Quick Stat Widgets */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-white/[0.05] backdrop-blur-lg border border-white/15 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-secondary">
                        <FaLayerGroup size={14} />
                        <span className="text-[10px] font-mono text-white/50">EXP</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xl font-bold text-white tracking-tight">2+ Yrs</div>
                        <div className="text-[10px] text-text/60">Enterprise &amp; IoT</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.05] backdrop-blur-lg border border-white/15 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-accent-2">
                        <FaCode size={14} />
                        <span className="text-[10px] font-mono text-white/50">TECH</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xl font-bold text-white tracking-tight">React/Vue</div>
                        <div className="text-[10px] text-text/60">TypeScript Ready</div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Spotlight snippet */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-secondary/15 via-accent/10 to-transparent backdrop-blur-md border border-white/15">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-accent-2 uppercase tracking-wider font-semibold">
                        Telemetry Spotlight
                      </span>
                      <Link
                        to="/showcase"
                        className="text-[10px] text-white/80 hover:text-white flex items-center gap-1"
                      >
                        All ↗
                      </Link>
                    </div>
                    <div className="text-xs font-semibold text-white mt-1">
                      Remote ONT Control System
                    </div>
                    <p className="text-[11px] text-text/70 mt-0.5 line-clamp-2">
                      MQTT + TR-069 real-time bidirectional telemetry for Telco infrastructure.
                    </p>
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="flex flex-col gap-2.5 animate-fadeIn">
                  <div className="text-xs font-mono text-accent-2/90 uppercase tracking-wider px-1">
                    Cosmic Stack Matrix
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { name: "React.js / Next", level: "95%", col: "text-tenary" },
                      { name: "Vue.js / Pinia", level: "90%", col: "text-secondary" },
                      { name: "Tailwind CSS", level: "100%", col: "text-accent-2" },
                      { name: "MQTT / WebSockets", level: "85%", col: "text-accent" },
                      { name: "Redux Toolkit", level: "90%", col: "text-indigo-400" },
                      { name: "TR-069 & IoT", level: "80%", col: "text-amber-400" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10"
                      >
                        <div className="text-white font-medium text-[11px] truncate">
                          {item.name}
                        </div>
                        <div className={`text-[10px] font-mono font-bold mt-1 ${item.col}`}>
                          {item.level}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://drive.google.com/file/d/16zOShq4kM83U9G5H_MSH06S8s4Ugm1FF/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 py-2 px-3 rounded-xl bg-accent/25 hover:bg-accent/40 border border-accent/40 text-center text-xs text-white font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FaDownload size={11} /> Download Complete Dossier
                  </a>
                </div>
              )}

              {/* Terminal View */}
              {activeTab === "terminal" && (
                <div className="p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-accent-2 leading-relaxed flex-1 flex flex-col justify-between animate-fadeIn">
                  <div className="space-y-1.5">
                    <p className="text-white/40"># Black Hole Station Terminal</p>
                    <p>
                      <span className="text-accent">pilot@event-horizon</span>:~$ status
                    </p>
                    <p className="text-text/80">→ Frontend Specialist</p>
                    <p className="text-text/80">→ Coordinates: Jakarta, ID</p>
                    <p className="text-text/80">→ Mission: Scalable Web Systems</p>
                    <p>
                      <span className="text-accent">pilot@event-horizon</span>:~$ ping
                    </p>
                    <p className="text-tenary">→ ananta.nov2@gmail.com</p>
                  </div>
                  <div className="flex items-center gap-1 text-white/50 text-[10px] pt-2 border-t border-white/10">
                    <span className="w-1.5 h-3 bg-accent animate-pulse inline-block" />
                    <span>deep-space telemetry active</span>
                  </div>
                </div>
              )}
            </div>

            {/* iOS Liquid Glass Dock */}
            <div className="relative z-20 mt-4 p-2 rounded-2xl bg-white/[0.1] backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-around">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`p-2.5 rounded-xl transition-all ${
                  activeTab === "preview"
                    ? "bg-white/25 text-white shadow-md scale-110"
                    : "text-white/60 hover:text-white"
                }`}
                title="Profile"
              >
                <FaFolderOpen size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className={`p-2.5 rounded-xl transition-all ${
                  activeTab === "skills"
                    ? "bg-white/25 text-white shadow-md scale-110"
                    : "text-white/60 hover:text-white"
                }`}
                title="Skills"
              >
                <FaCode size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("terminal")}
                className={`p-2.5 rounded-xl transition-all ${
                  activeTab === "terminal"
                    ? "bg-white/25 text-white shadow-md scale-110"
                    : "text-white/60 hover:text-white"
                }`}
                title="Terminal"
              >
                <FaTerminal size={16} />
              </button>
            </div>

            {/* iPhone Home Bar */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto mt-2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
