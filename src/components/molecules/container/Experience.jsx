import React from "react";
import Timeline from "../timelines/Timeline";

const experiences = [
  {
    name: "PT. Varnion Technology Semesta",
    role: "Frontend Developer Staff",
    type: "Full-time",
    duration: "Oct 2023 - Present",
    location: "Jakarta, Indonesia • On-site",
    homepage: "https://www.varnion.com",
    descriptions: [
      "Conducted thorough code reviews to uphold code quality, enforce development standards, and improve application scalability.",
      "Designed and developed standardized codebases for React JS and Vue JS projects with Shadcn UI, Redux Toolkit, and Pinia to establish unified architecture and eliminate code duplication.",
      "Built and maintained a remote ONT monitoring & control dashboard using Vue.js and MQTT with InfluxDB time-series queries for daily downtime tracking.",
      "Engineered an enterprise billing dashboard integrated with Single Sign-On (SSO) using React TypeScript, Redux Toolkit, managing Transactions, Promos, Homepass, Area Radius, and Payment History.",
      "Developed a Single Sign-On (SSO) authentication & authorization system across internal apps with Role-Based Access Control (RBAC) and architectural refactoring.",
      "Built a captive portal video advertisement management dashboard featuring ad analytics, scheduling, geo-location targeting, and access management.",
      "Implemented NetFlow traffic analytics in a network management system to visualize real-time bandwidth consumption, protocol distributions, and routing sources.",
    ],
    skills: [
      "TypeScript",
      "React JS",
      "Vue JS",
      "Redux Toolkit",
      "Pinia",
      "Shadcn UI",
      "MQTT",
      "InfluxDB",
      "TR-069",
      "SSO & RBAC",
      "NetFlow",
    ],
  },
  {
    name: "PT. Solusi Integrasi Teknomedia",
    role: "Frontend Developer",
    type: "Freelance",
    duration: "Jul 2024 - Aug 2024",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Developed an IoT-based Event & Exhibition analytics dashboard utilizing CCTV integration and WebSocket for real-time visitor tracking and behavior analysis.",
      "Engineered interactive dashboards to visualize crowd movement, density heatmaps, traffic flow, and engagement zones.",
      "Implemented real-time data streaming over WebSocket to deliver live insights without page refresh, accelerating operational decision-making.",
      "Collaborated with backend and IoT computer-vision teams to parse high-frequency CCTV telemetry into responsive visualizations.",
    ],
    skills: [
      "React JS",
      "WebSocket",
      "Zustand",
      "IoT Analytics",
      "CCTV Telemetry",
      "Tailwind CSS",
    ],
  },
  {
    name: "PT. Telkom Indonesia",
    role: "Frontend Developer Staff",
    type: "Contract",
    duration: "Jul 2022 - Jan 2023",
    location: "Bandung, Indonesia",
    homepage: "https://www.telkom.co.id",
    descriptions: [
      "Developed an Analytics Dashboard for the Loyalty Point Exchange (LPE) platform to track and analyze customer point redemption in real-time.",
      "Engineered resilient interfaces using React.js and Redux, writing unit tests with Jest DOM to ensure feature stability.",
      "Designed design systems and reusable React components, slashing development time by up to 45% and elevating UX consistency.",
      "Collaborated in Agile sprints using Jira to track backlog items and streamline delivery.",
    ],
    skills: [
      "React JS",
      "Redux",
      "Jest DOM",
      "Unit Testing",
      "Jira",
      "Agile",
    ],
  },
  {
    name: "PT. Telkom Indonesia",
    role: "Frontend Developer",
    type: "Internship (FHCI Program)",
    duration: "Feb 2022 - Jul 2022",
    location: "Bandung, Indonesia",
    homepage: "https://www.telkom.co.id",
    descriptions: [
      "Completed a structured 4-phase Frontend Development internship through the Forum Human Capital Indonesia (FHCI) program.",
      "Built responsive, user-friendly frontend modules using React.js and Next.js while adopting modern workflows and best practices.",
    ],
    skills: ["React JS", "Next JS", "JavaScript ES6+", "Responsive UI"],
  },
];

export default function Experience() {
  return (
    <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/40 hover:border-secondary/30 transition-all duration-300">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent-2/90 font-medium">
            Career Timeline
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Work Experiences</h2>
        </div>
        <span className="text-xs font-mono text-text/40 hidden sm:inline">
          ~/career/experiences
        </span>
      </div>
      <Timeline events={experiences} />
    </div>
  );
}
