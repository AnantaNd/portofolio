import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/molecules/footer/Footer";
import Navbar from "../components/molecules/navbar/Navbar";

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
      <div className="max-w-6xl mx-auto py-4  border-t border-secondary/20">
        <Footer />
      </div>
    </>
  );
}
