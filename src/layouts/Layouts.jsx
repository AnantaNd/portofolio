import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/molecules/footer/Footer";
import Navbar from "../components/molecules/navbar/Navbar";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Layouts() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
        setShowScrollTop(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLight = theme === "light";

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-accent/30 selection:text-white overflow-x-hidden">
      {/* 🌠 Cosmic Shooting Stars Effect */}
      <div className="shooting-star-1" />
      <div className="shooting-star-2" />

      {/* 🌌 Top Viewport Scroll Progress Line */}
      <div className="fixed top-0 inset-x-0 h-[2px] z-50 pointer-events-none bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-accent via-accent-2 to-secondary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navbar Container */}
      <header className="fixed bottom-4 sm:bottom-auto sm:top-6 inset-x-0 z-50 pointer-events-none flex justify-center px-3 sm:px-4">
        <div className="pointer-events-auto max-w-fit w-auto shadow-2xl">
          <Navbar />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 pt-6 sm:pt-28 pb-28 sm:pb-8 flex-1">
        <Outlet />
      </div>

      {/* 🛸 Smooth Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-5 bottom-20 sm:bottom-6 z-40 p-3 rounded-full backdrop-blur-xl border shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
          ${isLight
            ? "bg-[#0f1026]/90 border-purple-400/30 text-white shadow-purple-950/60 hover:border-accent/50"
            : "bg-black/85 border-white/10 text-white shadow-black hover:border-accent/50 hover:shadow-accent/20"
          }
          ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <FaArrowUp size={14} className="text-accent-2" />
      </button>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto py-6 border-t border-white/[0.06] mb-16 sm:mb-0">
        <Footer />
      </div>
    </div>
  );
}
