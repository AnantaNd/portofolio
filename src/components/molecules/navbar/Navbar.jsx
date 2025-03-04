import React, { useState, useEffect } from "react";
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome className="sm:rotate-0 -rotate-90" />,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <FaProjectDiagram className="sm:rotate-0 -rotate-90" />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <FaEnvelope className="sm:rotate-0 -rotate-90" />,
  },
];

export default function Navbar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 95) return 100;
        return oldProgress + 5;
      });
    }, 100);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  return (
    <nav
      className={`backdrop-blur-xl shadow-md border bg-primary/10 shadow-primary/40 border-primary hover:border-accent/50 hover:shadow-accent/20 p-2 sticky z-50 mx-auto w-fit rounded-full top-4 flex justify-center items-center overflow-hidden transition-all duration-500 ease-in-out transform translate-y-0`}
    >
      {loading && (
        <div
          className="absolute inset-0  bg-secondary/10  rounded-full transition-all duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      )}

      <ul className="flex gap-6 items-center justify-center">
        {navItems.map((item, index) => (
          <li key={index} className="uppercase flex items-center">
            <Link
              to={item.path}
              className={`flex items-center gap-2 sm:py-2 sm:px-4 py-3 px-3  rounded-full transition-all duration-300 ease-in-out transform 
                ${
                  location.pathname === item.path
                    ? "bg-accent/10 text-accent shadow-md border border-accent/30 scale-105"
                    : "text-text/80 hover:bg-text/10 border border-transparent hover:border-text/30 hover:scale-105"
                } active:scale-95`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
