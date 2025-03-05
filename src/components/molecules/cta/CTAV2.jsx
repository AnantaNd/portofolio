import React from "react";

import ButtonPrimary from "../../atoms/Button/ButtonPrimary";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CtaV2({ title, desc, hide = true }) {
  return (
    <main className="border-b border-secondary/20 py-4 pb-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-accent-2 uppercase text-center">
          {title}
        </h1>
        <p className="text-center text-text capitalize">{desc}</p>
      </div>
      <div className="pt-12">
        {hide && (
          <div className="flex items-center justify-center">
            <Link to="https://github.com/AnantaNd" target="_blank">
              <ButtonPrimary
                title={"show all project"}
                icon={<FaGithub size={25} />}
              />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
