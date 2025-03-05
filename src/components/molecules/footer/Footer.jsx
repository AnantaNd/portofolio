import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import { FaMedium } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className=" text-text p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © 2025{" "}
          <span className="underline font-semibold text-accent-2">
            Ananta Noviandanu.
          </span>{" "}
          All rights reserved.
        </p>
        <div className="flex flex-row items-center gap-4 justify-center pt-4 ">
          <Link
            to="https://www.linkedin.com/in/anantanoviandanu/"
            target="_blank"
          >
            <ButtonIcons icon={<FaLinkedinIn size={20} />} />
          </Link>
          <Link to="https://github.com/AnantaNd" target="_blank">
            <ButtonIcons icon={<FaGithub size={20} />} />
          </Link>
          <Link to="https://medium.com/@nantd" target="_blank">
            <ButtonIcons icon={<FaMedium size={20} />} />
          </Link>
        </div>
      </div>
    </div>
  );
}
