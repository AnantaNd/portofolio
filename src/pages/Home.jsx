import React, { useEffect, useState } from "react";
import Cta from "../components/molecules/cta/Cta";
import About from "../components/molecules/container/About";
import Skill from "../components/molecules/container/Skill";
import Education from "../components/molecules/container/Education";
import Highlight from "../components/molecules/container/Highlight";
import Experience from "../components/molecules/container/Experience";
import ButtonIcons from "../components/atoms/Button/ButtonIcons";
import { FaPerson } from "react-icons/fa6";
import { BiLogoVisualStudio } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isAbout, setIsAbout] = useState(true);
  const [isSkill, setIsSkill] = useState(false);
  const [isExp, setIsExp] = useState(true);
  const [isEdu, setIsEdu] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  if (isLoading) {
    return <div className="min-h-svh"></div>;
  }

  return (
    <main
      className={`py-4 flex flex-col gap-6 transition-opacity duration-1000 min-h-screen ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section>
        <div className="flex flex-row flex-wrap gap-6 lg:flex-nowrap">
          <div className="w-full lg:w-1/2">
            <Cta />
          </div>
          <div className="w-full lg:w-1/2">
            <Highlight />
          </div>
        </div>
      </section>

      <section className={isAbout ? "" : "hidden"} id="about">
        <About
          title={"about"}
          isClose={isAbout}
          onClose={() => setIsAbout(false)}
        />
      </section>
      <section className={isSkill ? "" : "hidden"} id="skill">
        <Skill
          title={"skills"}
          isClose={isSkill}
          onClose={() => setIsSkill(false)}
        />
      </section>
      <section className={isExp ? "" : "hidden"} id="exp">
        <Experience
          title={"experiences"}
          isClose={isExp}
          onClose={() => setIsExp(false)}
        />
      </section>
      <section className={isEdu ? "" : "hidden"} id="edu">
        <Education
          title={"educations"}
          isClose={isEdu}
          onClose={() => setIsEdu(false)}
        />
      </section>
      <section>
        <div
          className={`fixed right-4 top-[45%] transform -translate-y-1/2 bg-primary/10 border border-primary/20 rounded-full sm:px-2 px-3 py-2 ${
            isAbout && isSkill && isExp && isEdu ? "hidden" : ""
          }`}
        >
          <div className="flex flex-col gap-2 items-center">
            <div className={isAbout ? "hidden" : ""}>
              <a href="#about">
                <ButtonIcons
                  onClick={() => setIsAbout(true)}
                  icon={<FaPerson size={20} />}
                />
              </a>
            </div>
            <div className={isSkill ? "hidden" : ""}>
              <a href="#skill">
                <ButtonIcons
                  onClick={() => setIsSkill(true)}
                  icon={<BiLogoVisualStudio size={20} />}
                />
              </a>
            </div>
            <div className={isExp ? "hidden" : ""}>
              <a href="#exp">
                <ButtonIcons
                  onClick={() => setIsExp(true)}
                  icon={<MdWorkHistory size={20} />}
                />
              </a>
            </div>
            <div className={isEdu ? "hidden" : ""}>
              <a href="#edu">
                <ButtonIcons
                  onClick={() => setIsEdu(true)}
                  icon={<IoMdSchool size={20} />}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
