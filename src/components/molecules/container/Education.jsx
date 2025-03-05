import React from "react";
import Card from "../../atoms/Card/Card";
import Timeline from "../timelines/Timeline";
const educations = [
  {
    name: "Telkom University",
    role: "Bachelor of Information Technology",
    duration: "2019 - 2023",
    location: "Bandung, Indonesia",
    homepage: "https://telkomuniversity.ac.id",
    descriptions: [
      "Graduated with a Bachelor's degree in Information Technology with a 3.54 GPA.",
      "Achieved cumlaude distinction.",
      "Served as a Practicum Assistant for Web Programming at the Informatics Laboratory.",
      "Gained expertise in JavaScript, React.js, and frontend development through academic and professional experience.",
    ],
    skills: [
      "JavaScript",
      "Algorithms",
      "Web Programming",
      "Structures Data",
      "Networking",
    ],
  },
];

export default function Education({ title, onClose, isClose }) {
  return (
    <Card title={title} onClose={onClose} isClosed={isClose}>
      <section>
        <h1 className="text-xl font-semibold text-accent-2 mb-4">Educations</h1>
      </section>
      <section>
        <Timeline events={educations} />
      </section>
    </Card>
  );
}
