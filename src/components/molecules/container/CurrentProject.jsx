import React from "react";
import Card from "../../atoms/Card/Card";

import GalleryCard from "../../atoms/Card/GalleryCard";

export default function CurrentProject() {
  const netContStack = [
    { name: "vue.js" },
    { name: "ant design" },
    { name: "tailwind" },
  ];
  return (
    <Card title={"current projects"} hide={true}>
      <div className="h-72">
        <section>
          <div className="pb-4">
            <h1 className="text-xl font-semibold text-accent-2">
              Current Projects
            </h1>
          </div>
        </section>
        <section>
          <div>
            <GalleryCard
              imageSrc={"/netcontrol.svg"}
              title={"NetControl"}
              desc={"An application to control ONT from long range "}
              data={netContStack}
              styleImg={"object-fill"}
            />
          </div>
        </section>
      </div>
    </Card>
  );
}
