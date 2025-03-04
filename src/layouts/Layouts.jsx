import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/molecules/navbar/Navbar";
import { SiRocket } from "react-icons/si";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Layouts() {
  return (
    <>
      <div className="sticky top-4 z-50">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 ">
        <Outlet />
      </div>
      <div
        className="fixed flex items-center justify-center bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 w-16 h-16 rounded-full animate-bounce border bg-secondary/20 hover:bg-secondary/50 text-white border-secondary/30 cursor-pointer"
        onClick={scrollToTop}
      >
        <SiRocket size={40} className="transform -rotate-90 p-1" />
      </div>
    </>
  );
}
