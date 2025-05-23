import React from "react";
import Card from "../../atoms/Card/Card";

import SimpleCard from "../../atoms/Card/SimpleCard";

import { Chip } from "@material-tailwind/react";
import ButtonIcons from "../../atoms/Button/ButtonIcons";

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
      <div className="md:h-[275px] h-auto">
        <section>
          <div className="pb-4 px-2 flex flex-row items-center justify-between ">
            <div className="w-full ">
              <h1 className="text-xl font-semibold text-accent-2">
                Netcontrol
              </h1>
            </div>
            <div className="w-full flex flex-row justify-end">
              <ButtonIcons
                icon={
                  <img src="/netcontrol.svg" alt="logo" className="w-10 h-10" />
                }
              />
            </div>
          </div>
        </section>
        <section>
          <SimpleCard>
            <div className="flex flex-col gap-3">
              <section>
                <div className="flex flex-wrap gap-1 py-2">
                  {netContStack &&
                    netContStack.map((item, i) => (
                      <Chip
                        key={i}
                        value={item.name}
                        size="sm"
                        className="bg-accent-2/15 border border-accent-2/20 rounded-full text-xs font-normal"
                      />
                    ))}
                </div>
              </section>
              <section>
                <div className="text-text-2 text-sm pb-2 h-28 overflow-y-auto">
                  <ol className="list-decimal list-inside space-y-1">
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
