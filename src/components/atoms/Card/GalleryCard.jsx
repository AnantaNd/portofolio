import { Chip } from "@material-tailwind/react";
import React from "react";

export default function GalleryCard({ imageSrc, title, desc, data }) {
  return (
    <div className="mx-auto bg-primary/5 border border-primary/20 rounded-3xl relative backdrop-filter backdrop-blur-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <img
          src={imageSrc}
          alt={title}
          className={`w-full h-20  rounded-t-2xl`}
        />
      </div>
      <div className="p-4">
        <h2 className="text-text text-lg font-semibold">{title}</h2>
        <div>
          <p className="text-text text-sm">{desc}</p>
        </div>
        <div className="flex flex-row gap-2 pt-2">
          {data &&
            data.map((item, i) => (
              <Chip
                key={i}
                value={item.name}
                size="sm"
                className="bg-accent-2/15 border border-accent-2/20 rounded-full text-sm font-normal capitalize"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
