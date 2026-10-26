import React from "react";
import ButtonPrimary from "../../atoms/Button/ButtonPrimary";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CTAV2({ title, desc, hide = true }) {
  return (
    <section className="relative py-8 md:py-12 text-center">
      {/* Background ambient shine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-secondary/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-text to-text/80 bg-clip-text text-transparent">
          {title}
        </h1>
        {desc && (
          <p className="text-sm sm:text-base text-text/70 leading-relaxed max-w-xl">
            {desc}
          </p>
        )}
      </div>

      {hide && (
        <div className="relative pt-6 flex justify-center">
          <Link to="https://github.com/AnantaNd" target="_blank" rel="noreferrer">
            <ButtonPrimary
              title="View GitHub Repository"
              icon={<FaGithub size={18} />}
            />
          </Link>
        </div>
      )}
    </section>
  );
}
