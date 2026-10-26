import React, { useState } from "react";
import { FaTimes, FaMinus, FaExpandAlt } from "react-icons/fa";

export default function Card({ children, title, hide, onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/40 hover:border-secondary/30 transition-all duration-300 group"
    >
      {/* Subtle top inner glow */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {!hide && (
        <section className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-5">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              aria-label="Close"
              className="relative w-3.5 h-3.5 bg-red-500/80 hover:bg-red-500 rounded-full cursor-pointer transition-colors flex items-center justify-center group/btn"
              onClick={() => onClose && onClose(title)}
            >
              <FaTimes
                className="text-black/80 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                size={8}
              />
            </button>
            <button
              type="button"
              aria-label="Minimize"
              className="relative w-3.5 h-3.5 bg-yellow-500/80 hover:bg-yellow-500 rounded-full cursor-pointer transition-colors flex items-center justify-center group/btn"
              onClick={() => setIsMinimized(true)}
            >
              <FaMinus
                className="text-black/80 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                size={8}
              />
            </button>
            <button
              type="button"
              aria-label="Expand"
              className="relative w-3.5 h-3.5 bg-green-500/80 hover:bg-green-500 rounded-full cursor-pointer transition-colors flex items-center justify-center group/btn"
              onClick={() => setIsMinimized(false)}
            >
              <FaExpandAlt
                className="text-black/80 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                size={7}
              />
            </button>
          </div>

          {title && (
            <span className="text-xs font-mono text-text/40 tracking-wider uppercase">
              ~/portfolio/{title}
            </span>
          )}
        </section>
      )}

      <section>
        <div
          className={`transition-all duration-500 ease-in-out ${
            isMinimized
              ? "max-h-0 scale-y-0 opacity-0 overflow-hidden"
              : "max-h-fit scale-y-100 opacity-100"
          }`}
        >
          {children}
        </div>

        {isMinimized && (
          <div
            className="py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] cursor-pointer transition-all flex items-center justify-between group/min"
            onClick={() => setIsMinimized(false)}
          >
            <span className="text-sm font-medium text-accent-2 capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-2/60 animate-ping" />
              {title || "Section"} (minimized)
            </span>
            <span className="text-xs text-text/50 group-hover/min:text-text transition-colors">
              Click to restore ↗
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
