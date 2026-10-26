import React from "react";
import Card from "../../atoms/Card/Card";
import ButtonPrimary from "../../atoms/Button/ButtonPrimary";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About({ title, onClose, isClose }) {
  return (
    <Card title={title} onClose={onClose} isClosed={isClose}>
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent-2/90 font-medium">
            Professional Summary
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">About Me</h2>
        </div>
        <Link
          to="https://drive.google.com/file/d/16zOShq4kM83U9G5H_MSH06S8s4Ugm1FF/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <ButtonPrimary
            icon={<FaDownload size={14} />}
            title="Download Resume"
          />
        </Link>
      </section>

      {/* Description Section aligned with latest CV */}
      <section className="mt-4 text-text/85 text-sm sm:text-base leading-relaxed space-y-4">
        <p>
          I am a motivated <span className="text-white font-semibold">Frontend Developer</span> with{" "}
          <span className="text-accent-2 font-medium">over 3 years of professional experience</span> specializing
          in <span className="text-white">React.js, Next.js, and Vue.js</span>. I graduated with a{" "}
          <span className="text-white font-medium">Cum Laude Bachelor's degree in Information Technology</span> from{" "}
          <strong>Telkom University (GPA 3.54 / 4.00)</strong>.
        </p>

        <p>
          I build scalable, user-friendly applications using{" "}
          <span className="text-white">Redux Toolkit, Zustand, Pinia, Tailwind CSS, Shadcn UI, and Ant Design</span>.
          Beyond standard frontend interfaces, I possess solid engineering knowledge in{" "}
          <span className="text-accent-2 font-mono">MQTT, WebSocket, TR-069, NetFlow, and wireless networking</span> to
          power real-time IoT dashboards, device management systems, and large-scale enterprise platforms.
        </p>

        <p>
          With a proven track record delivering mission-critical applications at{" "}
          <strong className="text-white">PT. Varnion Technology Semesta</strong>,{" "}
          <strong className="text-white">PT. Solusi Integrasi Teknomedia</strong>, and{" "}
          <strong className="text-white">PT. Telkom Indonesia</strong>, I focus on standardized codebase architectures,
          comprehensive unit testing with Jest DOM, and high-fidelity UX/UI design systems.
        </p>
      </section>
    </Card>
  );
}
