import React, { useEffect, useState } from "react";
import CTAV2 from "../components/molecules/cta/CTAV2";
import SimpleCard from "../components/atoms/Card/SimpleCard";

const projectsData = [
  {
    id: 1,
    title: "Remote ONT Control System",
    description:
      "Built a remote ONT control system with Vue.js, MQTT, TR-069, and InfluxDB for real-time communication and analytics.",
    technologies: ["Vue.js", "MQTT", "TR-069", "InfluxDB"],
  },
  {
    id: 2,
    title: "Manage Advertisements for WiFi Connection",
    description:
      "Created a system for managing WiFi ads with Vue.js, Axios, and chart visualizations for analytics.",
    technologies: ["Vue.js", "Axios"],
  },
  {
    id: 3,
    title: "Role-Based Access Control (RBAC) System",
    description:
      "Developed an RBAC system with Vue.js, Pinia, and Axios for secure role management and dynamic UI updates.",
    technologies: ["Vue.js", "Axios", "Pinia"],
  },
  {
    id: 4,
    title: "Loyalty Points Exchange System",
    description:
      "Built a React-based system for loyalty points exchange with Redux for state management and Jest for testing.",
    technologies: ["React Js", "React Redux", "Jest Dom"],
  },
  {
    id: 5,
    title: "Payment Dashboard",
    description:
      "Developed a React payment dashboard with RBAC, Redux for state management, and Tailwind CSS for responsive UI.",
    technologies: ["React Js", "React Redux", "Tailwind CSS"],
  },
  {
    id: 6,
    title: "Smart Event CCTV Monitoring System",
    description:
      "Built a real-time CCTV monitoring system with React, Zustand, and WebSocket for live attendee tracking and seamless updates.",
    technologies: ["Next Js", "Zustand", "WebSocket"],
  },
];

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="min-h-svh"></div>;
  }
  return (
    <main
      className={`py-4 flex flex-col gap-6 transition-opacity duration-1000 min-h-screen ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section>
        <div className="flex justify-center">
          <CTAV2
            title={"Check Out What I've Been Up To"}
            desc={
              "Hey there! Take a look at some of the cool projects I've been working on lately. From fun experiments to serious builds, see what I've been up to and get a feel for my creative process."
            }
          />
        </div>
      </section>
      <section>
        <h1 className="text-accent-2 text-center text-xl font-semibold capitalize">
          Hightlight Projects
        </h1>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {projectsData.map((project) => (
          <SimpleCard key={project.id}>
            <h1 className="text-accent-2 text-xl font-semibold capitalize">
              {project.title}
            </h1>
            <p className="text-xs text-justify text-text-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-accent-2/15 border border-accent-2/20 rounded-full text-xs font-normal px-2 py-1 text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SimpleCard>
        ))}
      </section>
    </main>
  );
}
