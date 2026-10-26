import React from "react";

export default function SimpleCard({ children, className = "" }) {
  return (
    <div
      className={`relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-secondary/30 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-secondary/10 ${className}`}
    >
      {/* Top subtle highlight */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div>{children}</div>
    </div>
  );
}
