import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/molecules/footer/Footer";
import Navbar from "../components/molecules/navbar/Navbar";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Layouts() {
  return (
    <>
      <div className="sticky top-4 z-50 sm:block hidden">
        <Navbar />
      </div>
      <div className="fixed bottom-52 -right-12 rotate-90 z-50 sm:hidden block ">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 ">
        <Outlet />
      </div>
      {/* <div
        className="fixed flex items-center justify-center bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 w-16 h-16 rounded-full animate-bounce border bg-secondary/20 hover:bg-accent-2/20 hover:border-accent-2/30 text-text border-secondary/30 cursor-pointer z-50"
        onClick={scrollToTop}
      >
        <SiRocket size={40} className="transform -rotate-90 p-1" />
      </div> */}

      <div className="max-w-6xl mx-auto py-4  border-t border-secondary/20">
        <Footer />
      </div>
    </>
  );
}
