import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSquareJs } from "react-icons/fa6";
import { FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import Card from "../../atoms/Card/Card";
import Sliders from "../Sliders/Slider";

const skills = [
  {
    name: "JavaScript",
    description: "A versatile programming language.",
    icon: <FaSquareJs size={20} />,
  },
  {
    name: "React Js",
    description: "A JavaScript library for building user interfaces.",
    icon: <FaReact size={20} />,
  },
  {
    name: "Vue Js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
    icon: <FaVuejs size={20} />,
  },
  {
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
    icon: <FaNodeJs size={20} />,
  },
  // Add more skills as needed
];

export default function Skill() {
  return (
    <Card>
      <section>
        <h1 className="text-xl font-semibold text-accent-2">Skills</h1>
      </section>
      <section>
        <Sliders data={skills} />
      </section>
    </Card>
  );
}
