import React, { useEffect, useState } from "react";
import CtaV2 from "../components/molecules/cta/CtaV2";

export default function Projects() {
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
    return <div className="min-h-svh"></div>;
  }
  return (
    <main
      className={`py-4 flex flex-col gap-6 transition-opacity duration-1000 min-h-screen ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section>
        <div className="flex justify-center">
          <CtaV2
            title={"Check Out What I've Been Up To"}
            desc={
              "Hey there! Take a look at some of the cool projects I've been working on lately. From fun experiments to serious builds, see what I've been up to and get a feel for my creative process."
            }
          />
        </div>
      </section>
    </main>
  );
}
