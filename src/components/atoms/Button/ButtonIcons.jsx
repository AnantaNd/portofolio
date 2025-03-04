import { IconButton } from "@material-tailwind/react";
import React from "react";

export default function ButtonIcons({ icon, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      size="md"
      className="bg-secondary/20 hover:bg-secondary/50 text-text border border-secondary/30 transition-all  shadow-md hover:shadow-lg rounded-full"
    >
      {icon}
    </IconButton>
  );
}
