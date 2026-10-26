import React from "react";

export default function ButtonIcons({ icon, onClick, className = "", title = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title || "button-icon"}
      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-text border border-white/[0.08] hover:border-secondary/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer backdrop-blur-md ${className}`}
    >
      {icon}
    </button>
  );
}
