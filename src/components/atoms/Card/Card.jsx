import React from "react";
import { FaTimes, FaMinus, FaExpandAlt } from "react-icons/fa";

export default function Card({ children }) {
  return (
    <div className=" mx-auto bg-primary/10 backdrop-blur-2xl border border-primary/20 rounded-[3.5rem] p-6 md:p-10 shadow-md shadow-primary/40">
      <section>
        <div className="flex items-center space-x-2 px-2 pb-4">
          <div className="relative w-3 h-3 bg-red-500 rounded-full cursor-pointer group">
            <FaTimes
              className="absolute inset-0 m-auto text-primary opacity-0 group-hover:opacity-100"
              size={8}
            />
          </div>
          <div className="relative w-3 h-3 bg-yellow-500 rounded-full cursor-pointer group">
            <FaMinus
              className="absolute inset-0 m-auto text-primary opacity-0 group-hover:opacity-100"
              size={8}
            />
          </div>
          <div className="relative w-3 h-3 bg-green-500 rounded-full cursor-pointer group">
            <FaExpandAlt
              className="absolute inset-0 m-auto text-primary opacity-0 group-hover:opacity-100"
              size={8}
            />
          </div>
        </div>
      </section>
      <section>
        <div>{children}</div>
      </section>
    </div>
  );
}
