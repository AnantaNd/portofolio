import React from "react";
import Timeline from "../timelines/Timeline";
import { FaGraduationCap, FaHandsHelping } from "react-icons/fa";

const educations = [
  {
    name: "Telkom University",
    role: "Bachelor of Information Technology",
    type: "Cum Laude",
    duration: "Aug 2019 - Jul 2023",
    location: "Bandung, Indonesia",
    homepage: "https://telkomuniversity.ac.id",
    descriptions: [
      "Graduated with a Bachelor's degree in Information Technology with Cum Laude distinction (GPA 3.54 / 4.00).",
      "Specialized in Software Engineering, Web Systems, and Distributed Computing.",
    ],
    skills: [
      "Information Technology",
      "Web Architecture",
      "Software Development",
      "Algorithms",
    ],
  },
];

const organizations = [
  {
    name: "Informatics Laboratory, Telkom University",
    role: "Laboratory Assistant — Web Programming",
    duration: "Sep 2022 - Jan 2023",
    location: "Bandung, Indonesia",
    descriptions: [
      "Guided and mentored undergraduate students through practical laboratory sessions on modern web programming, JavaScript, client-server concepts, and database integrations.",
      "Evaluated student lab submissions and assisted in curriculum preparation.",
    ],
    skills: ["Web Programming", "Mentoring", "JavaScript", "Lab Instruction"],
  },
  {
    name: "Telkom University",
    role: "Lecture Assistant — Software Development",
    duration: "Sep 2022 - Jan 2023",
    location: "Bandung, Indonesia",
    descriptions: [
      "Assisted course lecturers in delivering Software Development coursework and facilitating code reviews and student engineering projects.",
    ],
    skills: ["Software Engineering", "Code Reviews", "Academic Assistance"],
  },
];

export default function Education() {
  return (
    <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/40 hover:border-secondary/30 transition-all duration-300 flex flex-col gap-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Education Block */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/15 text-accent-2 border border-accent/25">
              <FaGraduationCap size={18} />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent-2/90 font-medium">
                Academic Background
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Education</h2>
            </div>
          </div>
          <span className="text-xs font-mono text-text/40 hidden sm:inline">
            ~/education/degree
          </span>
        </div>
        <Timeline events={educations} />
      </div>

      {/* Organization & Academic Leadership */}
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary/15 text-secondary border border-secondary/25">
              <FaHandsHelping size={18} />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-secondary font-medium">
                Leadership &amp; Academic Service
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Organization Experiences</h2>
            </div>
          </div>
          <span className="text-xs font-mono text-text/40 hidden sm:inline">
            ~/leadership/assistantships
          </span>
        </div>
        <Timeline events={organizations} />
      </div>
    </div>
  );
}
