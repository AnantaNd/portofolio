import React, { useState } from "react";
import CTAV2 from "../components/molecules/cta/CTAV2";
import SimpleCard from "../components/atoms/Card/SimpleCard";
import { FaLaptopCode, FaGithub, FaStar } from "react-icons/fa";

const projectsData = [
  {
    id: "netcontrol",
    title: "Netcontrol — FTTH & ONT Network Management",
    category: "Telecom / IoT Architecture",
    featured: true,
    githubUrl: "https://github.com/AnantaNd/netcontrol",
    description:
      "Enterprise-grade network provisioning and device management platform for FTTH infrastructures. Features interactive topology mapping, live ONT device telemetry over MQTT, WiFi analyzer charts, WAN connection configuration, LAN port overview, SSID management, downtime tracking via InfluxDB, and multi-tenant network/regional assignment with RBAC.",
    features: [
      "FTTH Network Topology (OLT → PON → FDT → FAT → ONT)",
      "Live Device Telemetry & WiFi Analyzer via MQTT",
      "Network, Region & Multi-tenant Device Assignment",
      "WAN Connection Config & LAN Port Overview",
      "WiFi Information, Remote SSID & Security Setup",
      "Downtime Monitoring & Telemetry via InfluxDB",
      "Granular RBAC Device & Regional Access Control",
    ],
    technologies: [
      "Vue JS",
      "MQTT",
      "TR-069",
      "InfluxDB",
      "Topology Graph",
      "Pinia",
      "Tailwind CSS",
      "Ant Design",
    ],
  },
  {
    id: "prosky-cms",
    title: "ProSky CMS — Enterprise Network & Captive Ads Suite",
    category: "Full-Stack Enterprise / CMS",
    featured: true,
    githubUrl: "https://github.com/AnantaNd/prosky-cms",
    description:
      "All-in-one telecommunications & captive portal management platform. Features customer support ticketing, real-time live chat, granular RBAC role access, captive video advertising scheduler, RADIUS traffic overview (clients & services), and dual analytics engines for CMS content and advertising performance.",
    features: [
      "Ticketing & Helpdesk System",
      "Real-time Live Chat Support",
      "Granular RBAC Role Management",
      "Captive Portal Video Ads & Scheduling",
      "RADIUS Traffic Overview & Client Services",
      "CMS Analytics & Ad Campaign Insights",
    ],
    technologies: [
      "React JS",
      "TypeScript",
      "Redux Toolkit",
      "RADIUS Protocol",
      "WebSocket",
      "Tailwind CSS",
      "Shadcn UI",
    ],
  },
  {
    id: 2,
    title: "IoT Event & Exhibition CCTV Analytics",
    category: "Real-time / IoT",
    featured: false,
    description:
      "Developed a real-time visitor tracking and crowd density analytics dashboard integrating CCTV feeds with WebSocket data streaming, visitor movement heatmaps, and live engagement zones.",
    technologies: ["React JS", "WebSocket", "Zustand", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Enterprise SSO & Role-Based Access Control (RBAC)",
    category: "Architecture",
    featured: false,
    description:
      "Architected a centralized Single Sign-On (SSO) authentication & authorization system across internal apps, implementing fine-grained RBAC and standardized clean codebases.",
    technologies: ["React JS", "TypeScript", "Redux Toolkit", "RBAC"],
  },
  {
    id: 4,
    title: "Billing & Customer Operations Dashboard",
    category: "Fintech / Operations",
    featured: false,
    description:
      "Developed a mission-critical billing dashboard integrated with SSO using React TypeScript and Redux Toolkit, managing Transactions, Promos, Homepass, Area Radius, and Payment History.",
    technologies: ["React JS", "TypeScript", "Redux Toolkit", "Shadcn UI"],
  },
  {
    id: 5,
    title: "Captive Portal Video Ads Management System",
    category: "AdTech",
    featured: false,
    description:
      "Built a centralized video advertising dashboard for captive WiFi portals featuring geo-location targeting, campaign scheduling, performance analytics, and role-based user management.",
    technologies: ["Vue JS", "Pinia", "Axios", "Ant Design"],
  },
  {
    id: 6,
    title: "NetFlow Real-Time Network Traffic Analytics",
    category: "Networking",
    featured: false,
    description:
      "Implemented NetFlow telemetry in a network management system to monitor and visualize live bandwidth usage, protocol statistics, and traffic origins for infrastructure planning.",
    technologies: ["Vue JS", "NetFlow", "InfluxDB", "Tailwind CSS"],
  },
  {
    id: 7,
    title: "Telkom Loyalty Point Exchange (LPE) Analytics",
    category: "Enterprise",
    featured: false,
    description:
      "Developed an analytics dashboard for Telkom's Loyalty Point Exchange to track customer redemptions in real-time, with reusable React components, Redux state, and comprehensive Jest DOM tests.",
    technologies: ["React JS", "Redux", "Jest DOM", "Jira"],
  },
  {
    id: 8,
    title: "Standardized React & Vue Enterprise Architecture",
    category: "Frontend Core",
    featured: false,
    description:
      "Designed standardized boilerplate repositories for React JS and Vue JS projects featuring Shadcn UI, organized state trees, strict coding conventions, and reusable atomic design components.",
    technologies: ["TypeScript", "React JS", "Vue JS", "Shadcn UI", "Pinia"],
  },
];

const categories = ["All", "Featured", "Vue JS", "React JS", "Real-Time / IoT", "Networking"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projectsData.filter((item) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Featured") {
      return item.featured === true;
    }
    if (selectedCategory === "React JS") {
      return item.technologies.some((t) => t.toLowerCase().includes("react"));
    }
    if (selectedCategory === "Vue JS") {
      return item.technologies.some((t) => t.toLowerCase().includes("vue"));
    }
    if (selectedCategory === "Real-Time / IoT") {
      return item.technologies.some((t) =>
        ["mqtt", "websocket", "influxdb", "iot"].some((k) =>
          t.toLowerCase().includes(k)
        )
      );
    }
    if (selectedCategory === "Networking") {
      return item.technologies.some((t) =>
        ["netflow", "tr-069", "mqtt", "telecom", "radius", "topology"].some((k) =>
          t.toLowerCase().includes(k)
        )
      );
    }
    return true;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);
  const isFeaturedOnly = selectedCategory === "Featured";

  const renderProjectCard = (project) => (
    <div key={project.id} className="h-full">
      <SimpleCard
        className={`h-full flex flex-col justify-between hover:-translate-y-1 group transition-all duration-300 ${
          project.featured
            ? "border-accent/40 bg-gradient-to-br from-white/[0.05] via-accent/[0.03] to-secondary/[0.04] shadow-2xl shadow-accent/10"
            : ""
        }`}
      >
        <div>
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 flex-wrap">
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-2 border border-accent/40 text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                  <FaStar size={10} className="text-accent animate-pulse" /> Flagship Project
                </span>
              )}
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent-2/90 font-medium">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-accent/20 text-white/70 hover:text-white border border-white/10 hover:border-accent/40 transition-all flex items-center gap-1.5 text-xs font-mono"
                  title="View GitHub Repository"
                >
                  <FaGithub size={14} />
                  <span className="hidden sm:inline">Repo ↗</span>
                </a>
              )}
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-text/60 group-hover:text-accent-2 transition-colors">
                <FaLaptopCode size={14} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-white mt-3 group-hover:text-accent-2 transition-colors ${
              project.featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm text-text/75 leading-relaxed">
            {project.description}
          </p>

          {/* Highlighted Feature Badges for Featured Projects */}
          {project.features && (
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent-2/80 font-semibold block mb-2">
                Core Modules &amp; Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-1.5 text-xs text-text/80 bg-white/[0.03] border border-white/[0.06] rounded-xl px-2.5 py-1.5"
                  >
                    <span className="text-accent font-mono text-xs">▸</span>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technologies footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-text/80 border border-white/[0.08]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </SimpleCard>
    </div>
  );

  return (
    <main className="py-2 flex flex-col gap-8 animate-fadeIn">
      <CTAV2
        title="Featured Projects & Systems"
        desc="Enterprise platforms, FTTH network suites, full-stack CMS solutions, and real-time IoT architectures engineered across Varnion, Telkom, and custom solutions."
        hide={true}
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                : "bg-white/[0.04] text-text/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🚀 Flagship Projects (Grid 2 Kolom) */}
      {featuredProjects.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <h2 className="text-lg font-bold text-white tracking-tight uppercase font-mono text-xs sm:text-sm">
              Flagship Projects ({featuredProjects.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {featuredProjects.map(renderProjectCard)}
          </div>
        </section>
      )}

      {/* 💻 Standard Projects (Grid 3 Kolom) */}
      {!isFeaturedOnly && regularProjects.length > 0 && (
        <section className="flex flex-col gap-4 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-lg font-bold text-white/80 tracking-tight uppercase font-mono text-xs sm:text-sm">
              Other Systems &amp; Deployments ({regularProjects.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {regularProjects.map(renderProjectCard)}
          </div>
        </section>
      )}
    </main>
  );
}
