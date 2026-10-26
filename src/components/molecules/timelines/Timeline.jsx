import React from "react";
import { FiCalendar, FiMapPin, FiExternalLink } from "react-icons/fi";

const Timeline = ({ events }) => {
  return (
    <div className="relative border-l-2 border-white/[0.08] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
      {events.map((event, index) => (
        <div key={index} className="relative group">
          {/* Glowing timeline node dot */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0c0915] timeline-dot-bg border-2 border-accent-2 group-hover:scale-125 group-hover:border-white transition-all shadow-[0_0_12px_rgba(244,114,182,0.6)]" />

          {/* Card Header & Role */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-accent-2 transition-colors flex items-center gap-2">
                <a
                  href={event.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1.5"
                >
                  {event.name}
                  <FiExternalLink size={13} className="opacity-60" />
                </a>
              </h3>
              <p className="text-sm font-medium text-secondary">
                {event.role} {event.type && <span className="text-text/40">• {event.type}</span>}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-text/60 font-mono mt-1 sm:mt-0">
              <span className="flex items-center gap-1">
                <FiCalendar size={12} />
                {event.duration}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin size={12} />
                {event.location}
              </span>
            </div>
          </div>

          {/* Bullet points */}
          {event.descriptions && (
            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-text/75 leading-relaxed">
              {event.descriptions.map((desc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-secondary font-mono mt-0.5">▸</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Skill Pills */}
          {event.skills && event.skills.length > 0 && (
            <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
              {event.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-text/80 border border-white/[0.08]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
