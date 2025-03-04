import { Button } from "@material-tailwind/react";
import React from "react";

export default function ButtonPrimary({ icon, title, onClick }) {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className="bg-accent-2/20 hover:bg-accent-2/50 text-white border border-accent-2/30 transition-all hover:scale-110 shadow-md hover:shadow-lg flex flex-row gap-2 items-center rounded-full"
    >
      {icon}
      <h1 className="ml-2">{title}</h1>
    </Button>
  );
}
