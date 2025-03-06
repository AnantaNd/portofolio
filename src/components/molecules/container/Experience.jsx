import React from "react";
import Card from "../../atoms/Card/Card";
import Timeline from "../timelines/Timeline";

const experiences = [
  {
    name: "PT. Varnion Technology Semesta",
    role: "Frontend Developer",
    type: "Full-time",
    duration: "Oct 2023 - Present • 1 yr 6 mos",
    location: "Jakarta, Indonesia • On-site",
    homepage: "https://www.varnion.com",
    descriptions: [
      "Developed a remote ONT control system using Vue.js with MQTT for real-time communication.",
      "Implemented reusable React/Vue components, reducing development time by 30%",
      "Improved network device control UI, reducing response time by 40%",
      "Collaborated with backend teams to optimize API calls for TR-069 provisioning.",
      "Collaborated and optimized InfluxDB queries for time-series data analytics",
      "Enhanced application security by implementing JWT authentication and role-based access control (RBAC)",
    ],
    skills: [
      "React.Js",
      "Redux.Js",
      "Pinia",
      "Vue.Js",
      "Material Tailwind",
      "Networking",
      "TR-069",
      "MQTT",
    ],
  },
  {
    name: "Telkom Indonesia",
    role: "Frontend Developer",
    type: "Contract",
    duration: "Feb 2023 - Jul 2023 • 1 yr",
    location: "Indonesia • Remote",
    homepage: "https://www.telkom.co.id",
    descriptions: [
      "I am entering the second stage of the Join Development Program as a Frontend Developer based on the project at Telkom Indonesia (LPE).",
      "Collaborated with backend teams for develope apps Loyalty Point Exchange.",
      "I work such as implementing designs system and concepts.",
      "Implemented reusable React components and React Redux, reducing development time by 45%",
      "Implemented comprehensive unit testing with Jest DOM, covering key UI interactions and component behaviors, resulting in a more stable and maintainable codebase",
      "Utilized Jira for agile project management, tracking tasks, and managing sprints to optimize development workflow.",
    ],
    skills: [
      "React.Js",
      "Redux.Js",
      "Material UI",
      "Node.js",
      "Jest Dom",
      "Jira",
    ],
  },
  {
    name: "Telkom Indonesia",
    role: "Frontend Developer",
    type: "Internship",
    duration: "Feb 2022 - Jan 2023 • 6 mos",
    location: "Indonesia",
    homepage: "https://www.telkom.co.id",
    descriptions: [
      "As a Frontend Developer Intern at PT. Telkom Indonesia through the Forum Human Capital Indonesia (FHCI) program.",
      "My tasks include participating in all 4 chapters of learning and creating frontend.",
    ],
    skills: ["Next.js", "React.js"],
  },
];

export default function Experience({ title, onClose, isClose }) {
  return (
    <Card title={title} onClose={onClose} isClosed={isClose}>
      <section>
        <h1 className="text-xl font-semibold text-accent-2 mb-4">
          Work Experience
        </h1>
      </section>
      <section>
        <Timeline events={experiences} />
      </section>
    </Card>
  );
}
