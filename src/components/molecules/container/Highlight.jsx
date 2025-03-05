import React from "react";
import Card from "../../atoms/Card/Card";

import SimpleCard from "../../atoms/Card/SimpleCard";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import { Chip } from "@material-tailwind/react";

export default function Highlight() {
  const netContStack = [
    { name: "vue.js" },
    { name: "ant design" },
    { name: "tailwind" },
    { name: "TR-069" },
    { name: "Influx Db" },
  ];
  return (
    <Card title={"Highlight"} hide={true}>
      <div className="h-72">
        <section>
          <div className="pb-4">
            <h1 className="text-xl font-semibold text-accent-2">Highlight</h1>
          </div>
        </section>
        <section>
          <SimpleCard>
            <div className="flex flex-col gap-3">
              <section>
                <div className="flex flex-row justify-between items-center gap-6">
                  <h1 className="text-lg text-accent-2">NetControl</h1>
                  <ButtonIcons
                    icon={
                      <img
                        src="/netcontrol.svg"
                        alt="logo"
                        className="w-fit h-8 object-center"
                      />
                    }
                  />
                </div>
              </section>
              <section>
                <div className="flex flex-row gap-2 flex-wrap py-2">
                  {netContStack &&
                    netContStack.map((item, i) => (
                      <Chip
                        key={i}
                        value={item.name}
                        size="sm"
                        className="bg-accent-2/15 border border-accent-2/20 rounded-full text-xs font-normal capitalize"
                      />
                    ))}
                </div>
              </section>
              <section>
                <div className=" text-text text-xs pb-2">
                  <ol className="list-decimal  list-inside space-y-2 ">
                    <li>
                      Developed a remote ONT control system using Vue.js with
                      MQTT for real-time communication
                    </li>
                    <li>
                      Integrated TR-069 for device provisioning and management
                    </li>
                    <li>
                      Optimized InfluxDB queries for time-series data analytics
                    </li>
                  </ol>
                </div>
              </section>
            </div>
          </SimpleCard>
        </section>
      </div>
    </Card>
  );
}
