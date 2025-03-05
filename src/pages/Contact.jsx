import React, { useEffect, useState } from "react";
import CTAV2 from "../components/molecules/cta/CTAV2";

export default function Contact() {
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
      <CTAV2
        hide={false}
        title={"Keep in Touch"}
        desc={
          "Hey there! I'd love to hear from you. Whether you have a question, a project idea, or just want to say hi, feel free. Let's connect and see where our conversation takes us!"
        }
      />
      <section></section>
    </main>
  );
}
