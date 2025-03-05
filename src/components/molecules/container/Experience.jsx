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
      "I work such as implementing designs and concepts.",
    ],
    skills: ["React.Js", "Redux.Js", "Material UI", "Node.js", "Jest Dom"],
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
