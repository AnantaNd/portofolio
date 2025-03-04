import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaFigma } from "react-icons/fa6";
import { FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";

import Card from "../../atoms/Card/Card";
import Sliders from "../Sliders/Slider";

const skills = [
  {
    name: "JavaScript",
    icon: <TbBrandJavascript size={20} />,
  },
  {
    name: "React Js",
    icon: <FaReact size={20} />,
  },
  {
    name: "Vue Js",
    icon: <FaVuejs size={20} />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs size={20} />,
  },
  {
    name: "Figma",
    icon: <FaFigma size={20} />,
  },
];

export default function Skill() {
  return (
    <Card title={"skills"}>
      <section>
        <h1 className="text-xl font-semibold text-accent-2">Skills</h1>
      </section>
      <section>
        <Sliders data={skills} />
      </section>
    </Card>
  );
}
