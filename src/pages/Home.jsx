import React, { useEffect, useState } from "react";
import Cta from "../components/molecules/cta/Cta";
import About from "../components/molecules/container/About";
import Skill from "../components/molecules/container/Skill";
import Education from "../components/molecules/container/Education";
import CurrentProject from "../components/molecules/container/CurrentProject";
import Experience from "../components/molecules/container/Experience";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="max-h-svh"></div>;
  }

  return (
    <main
      className={`py-4 flex flex-col gap-6 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section>
        <div className="flex flex-row items-center gap-6 lg:flex-nowrap flex-wrap">
          <div className="w-full">
            <Cta />
          </div>
          <div className="w-full">
            <CurrentProject />
          </div>
        </div>
      </section>
      <section>
        <About />
      </section>
      <section>
        <Skill />
      </section>
      <section>
        <Experience />
      </section>
      <section>
        <Education />
      </section>
    </main>
  );
}
