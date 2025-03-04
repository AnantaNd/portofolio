import React from "react";

export default function SimpleCard({ children }) {
  return (
    <div className="mx-auto bg-primary/10 border border-primary/20 rounded-[2rem] px-8 py-4">
      <div>{children}</div>
    </div>
  );
}
