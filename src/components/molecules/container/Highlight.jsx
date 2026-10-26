import React from "react";
import Card from "../../atoms/Card/Card";
import SimpleCard from "../../atoms/Card/SimpleCard";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import { FaGithub } from "react-icons/fa";

export default function Highlight() {
  const highlightStack = [
    { name: "Vue.js" },
    { name: "MQTT" },
    { name: "TR-069" },
    { name: "InfluxDB" },
    { name: "Topology Engine" },
    { name: "RBAC" },
  ];

  return (
    <Card title={"featured-system"} hide={true}>
      <div className="flex flex-col justify-between h-full">
        <section className="pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-2/90 font-medium">
              Enterprise Telecom &amp; Network Automation
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Netcontrol — FTTH &amp; ONT Management
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/AnantaNd/netcontrol"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-accent/20 text-white/70 hover:text-white border border-white/10 hover:border-accent/40 transition-all flex items-center gap-1.5 text-xs font-mono"
              title="View Netcontrol GitHub Repository"
            >
              <FaGithub size={15} />
              <span className="hidden sm:inline">Repo ↗</span>
            </a>
            <ButtonIcons
              icon={<img src="/netcontrol.svg" alt="Netcontrol" className="w-6 h-6 object-contain" />}
              title="Enterprise Device Platform"
            />
          </div>
        </section>

        <section className="mt-2">
          <SimpleCard className="border-white/[0.06] bg-black/20">
            <div className="flex flex-col gap-3">
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5">
                {highlightStack.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-accent-2 border border-accent/25"
                  >
                    {item.name}
                  </span>
                ))}
              </div>

              {/* Highlights Bullet points from actual netcontrol repo features */}
              <div className="text-text/80 text-xs sm:text-sm leading-relaxed pt-1 space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-accent-2 font-mono">▸</span>
                  <span><strong>End-to-End FTTH Topology:</strong> Interactive network canvas visualizer mapping <strong>OLT → PON → FDT → FAT → ONT</strong> hierarchies.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-2 font-mono">▸</span>
                  <span><strong>Live Device Telemetry via MQTT:</strong> Real-time device health, WiFi analyzer graphs, WAN connection config, and LAN port overview.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-2 font-mono">▸</span>
                  <span><strong>Network &amp; Regional Multi-Tenancy:</strong> Dynamic device assignments to networks/regions with granular RBAC permissions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-2 font-mono">▸</span>
                  <span><strong>Remote Operations &amp; Downtime Tracker:</strong> Live SSID &amp; WiFi configuration, remote provisioning via TR-069, and InfluxDB downtime telemetry.</span>
                </div>
              </div>
            </div>
          </SimpleCard>
        </section>
      </div>
    </Card>
  );
}
