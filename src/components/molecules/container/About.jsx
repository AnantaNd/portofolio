import React from "react";
import Card from "../../atoms/Card/Card";
import ButtonPrimary from "../../atoms/Button/ButtonPrimary";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Card title={"About"}>
      {/* Header Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-xl font-semibold text-accent-2">About Me</h1>
        <Link
          to={
            "https://drive.google.com/file/d/16zOShq4kM83U9G5H_MSH06S8s4Ugm1FF/view?usp=sharing"
          }
          target="_blank"
        >
          <ButtonPrimary
            icon={<FaDownload />}
            title="Download Resume"
            className="transition-all duration-300 transform hover:scale-105"
          />
        </Link>
      </section>

      {/* Description Section */}
      <section className="mt-4">
        <div className="">
          <p className="text-lg text-text leading-relaxed text-justify">
            I am a highly motivated Frontend Developer with{" "}
            <span className="font-semibold underline underline-offset-2 ">
              2 years of professional experience
            </span>{" "}
            and. Specializing in React.js, Next.js and Vue.js, I build
            efficient, scalable, and user-friendly applications using Redux,
            Pinia, Tailwind CSS, and Ant Design to create seamless and intuitive
            user experiences.
          </p>

          <p className="mt-3 text-lg text-text leading-relaxed text-justify">
            Beyond frontend development, I have strong technical skills in MQTT,
            TR-069, and wireless networking, enabling smooth system integrations
            and effective large-scale project management. I have successfully
            delivered impactful solutions at PT. Varnion Technology Semesta and
            Telkom Indonesia, collaborating with cross-functional teams to
            develop high-performance applications.
          </p>

          <p className="mt-3 text-lg text-text leading-relaxed text-justify">
            Passionate about clean code, performance optimization, and UX/UI
            excellence, I thrive in collaborative environments and continuously
            expand my knowledge to stay ahead of industry trends. I am eager to
            contribute my technical expertise and problem-solving mindset to
            innovative teams focused on building cutting-edge solutions.
          </p>
        </div>
      </section>
    </Card>
  );
}
