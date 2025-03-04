import React, { useState } from "react";
import { FaTimes, FaMinus, FaExpandAlt } from "react-icons/fa";

export default function Card({ children, title }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="mx-auto bg-primary/10 backdrop-blur-2xl border border-primary/20 rounded-[2.5rem] p-6 md:p-10 shadow-md shadow-primary/40 transition-all duration-300">
      <section>
        <div className="flex items-center space-x-2 px-2 pb-4">
          <div className="relative w-[14px] h-[14px] bg-red-500 rounded-full cursor-pointer group">
            <FaTimes
              className="absolute inset-0 m-auto text-background opacity-0 group-hover:opacity-100"
              size={10}
            />
          </div>
          <div
            className="relative w-[14px] h-[14px] bg-yellow-500 rounded-full cursor-pointer group"
            onClick={() => setIsMinimized(true)}
          >
            <FaMinus
              className="absolute inset-0 m-auto text-background opacity-0 group-hover:opacity-100"
              size={10}
            />
          </div>
          <div
            className="relative w-[14px] h-[14px] bg-green-500 rounded-full cursor-pointer group"
            onClick={() => setIsMinimized(false)}
          >
            <FaExpandAlt
              className="absolute inset-0 m-auto text-background opacity-0 group-hover:opacity-100"
              size={10}
            />
          </div>
        </div>
      </section>
      <section>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isMinimized
              ? "max-h-0 scale-y-0 opacity-0"
              : "max-h-fit scale-y-100 opacity-100"
          }`}
        >
          {children}
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            !isMinimized ? "max-h-0  opacity-0" : "max-h-fit  opacity-100"
          }`}
        >
          <h1 className="text-accent-2 text-xl font-semibold capitalize ">
            {title}{" "}
          </h1>
        </div>
      </section>
    </div>
  );
}
