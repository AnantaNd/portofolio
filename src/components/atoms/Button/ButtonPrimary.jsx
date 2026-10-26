import React from "react";

export default function ButtonPrimary({ icon, title, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm text-white bg-gradient-to-r from-secondary/80 to-tenary/80 hover:from-secondary hover:to-tenary border border-white/20 shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer ${className}`}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{title}</span>
    </button>
  );
}
