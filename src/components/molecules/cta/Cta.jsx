import { Badge, Chip } from "@material-tailwind/react";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Card from "../../atoms/Card/Card";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import { PiGithubLogoFill } from "react-icons/pi";

export default function Cta() {
  return (
    <Card hide={true}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:h-[275px] h-[450px]">
        <section>
          <div className="flex flex-col gap-3 py-3 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              Hi, I'm{" "}
              <span className="text-4xl font-extrabold text-accent-2">
                Ananta Noviandanu
              </span>
            </h1>
            <p className="text-base md:text-lg text-text/80">
              🚀 Frontend Developer | React.js | Next.js | Vue.js
            </p>
            <div className="flex flex-row items-center gap-3 justify-center md:justify-start">
              <Badge className="animate-pulse bg-green-500">
                <Chip
                  size="lg"
                  value="Available For Freelance"
                  className="bg-accent-2/15 border border-accent-2/20 w-fit mx-auto md:mx-0 rounded-full"
                />
              </Badge>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 justify-center md:justify-start pt-4 ">
            <Link
              to="https://www.linkedin.com/in/anantanoviandanu/"
              target="_blank"
            >
              <ButtonIcons icon={<FaLinkedinIn size={20} />} />
            </Link>
            <Link to="https://github.com/AnantaNd" target="_blank">
              <ButtonIcons icon={<PiGithubLogoFill size={20} />} />
            </Link>
            <Link to="https://medium.com/@nantd" target="_blank">
              <ButtonIcons icon={<FaMedium size={20} />} />
            </Link>
          </div>
        </section>
        <section>
          <div className=" w-40 h-40 object-cover aspect-square backdrop-blur-xl border-4 border-primary/20 rounded-full">
            <img
              src="/profile.png"
              alt="Ananta Noviandanu"
              className="rounded-full "
            />
          </div>
        </section>
      </div>
    </Card>
  );
}
