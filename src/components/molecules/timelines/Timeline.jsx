import { Chip } from "@material-tailwind/react";
import React from "react";

const Timeline = ({ events }) => {
  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={index} className="relative pl-6 border-l border-gray-300">
          <div className="absolute left-0 w-3 h-3 bg-accent rounded-full -ml-1.5 top-1.5"></div>
          <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
            <div>
              <h2 className="text-lg font-medium text-text hover:underline hover:text-accent-2">
                <a
                  href={event.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.name}
                </a>
              </h2>
              <p className="text-sm text-text-2">
                {event.role} {event.type}
              </p>
            </div>
            <div className="flex flex-col sm:items-end items-start sm:gap-1 gap-0">
              <p className="text-sm text-text-2">{event.duration}</p>
              <p className="text-sm text-text-2">{event.location}</p>
            </div>
          </div>
          {event.descriptions && (
            <ul className="mt-2 text-sm text-gray-400 list-disc list-inside ">
              {event.descriptions.map((desc, i) => (
                <li className="py-1" key={i}>
                  {desc}
                </li>
              ))}
            </ul>
          )}
          <div className="pt-4 flex flex-wrap gap-2">
            {event.skills.map((skill, i) => (
              <Chip
                key={i}
                value={skill}
                size="sm"
                className="bg-accent-2/15 border border-accent-2/20 text-xs font-normal rounded-full"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
