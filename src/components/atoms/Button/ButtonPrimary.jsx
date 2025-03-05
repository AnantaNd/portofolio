import { Button } from "@material-tailwind/react";
import React from "react";

export default function ButtonPrimary({ icon, title, onClick }) {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className="bg-tenary/20 hover:bg-tenary/60 text-text border border-tenary/30 transition-all  shadow-md hover:shadow-lg flex flex-row gap-2 items-center rounded-full"
    >
      {icon}
      <h1 className="ml-2">{title}</h1>
    </Button>
  );
}
