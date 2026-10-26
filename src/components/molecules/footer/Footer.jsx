import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import { FaMedium } from "react-icons/fa6";
import { PiGithubLogoFill } from "react-icons/pi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-text/70 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <p className="text-center sm:text-left">
          © {currentYear}{" "}
          <span className="font-semibold text-white">Ananta Noviandanu</span>.
          Crafted with React, Tailwind &amp; modern aesthetics.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="https://www.linkedin.com/in/anantanoviandanu/"
            target="_blank"
            rel="noreferrer"
          >
            <ButtonIcons icon={<FaLinkedinIn size={16} />} title="LinkedIn" className="!w-9 !h-9" />
          </Link>
          <Link to="https://github.com/AnantaNd" target="_blank" rel="noreferrer">
            <ButtonIcons icon={<PiGithubLogoFill size={16} />} title="GitHub" className="!w-9 !h-9" />
          </Link>
          <Link to="https://medium.com/@nantd" target="_blank" rel="noreferrer">
            <ButtonIcons icon={<FaMedium size={16} />} title="Medium" className="!w-9 !h-9" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
