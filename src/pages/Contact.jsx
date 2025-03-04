import React, { useEffect, useState } from "react";

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
    return <div className="max-h-svh"></div>;
  }
  return (
    <main
      className={`py-4 flex flex-col gap-6 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section>
        <div className="flex justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-accent-2">
            Contacts
          </h1>
        </div>
      </section>
    </main>
  );
}
