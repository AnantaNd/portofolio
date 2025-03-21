import React, { useEffect, useState } from "react";
import CTAV2 from "../components/molecules/cta/CTAV2";
import SimpleCard from "../components/atoms/Card/SimpleCard";
import { AiOutlineMail, AiFillLinkedin, AiOutlinePhone } from "react-icons/ai";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const contacts = [
    {
      id: 1,
      name: "Email",
      information: "ananta.nov2@gmail.com",
      description: "Reach out to me via email for any inquiries.",
      icon: <AiOutlineMail className=" text-accent-2" />,
      link: "mailto:ananta.nov2@gmail.com",
    },
    {
      id: 2,
      name: "LinkedIn",
      information: "anantanoviandanu",
      description: "Connect with me on LinkedIn for professional networking.",
      icon: <AiFillLinkedin className=" text-accent-2" />,
      link: "https://linkedin.com/in/anantanoviandanu",
    },
    {
      id: 3,
      name: "Contact",
      information: "+6281217720834",
      description: "Feel free to call me",
      icon: <AiOutlinePhone className=" text-accent-2" />,
      link: "https://wa.me/6281217720834",
    },
  ];

  if (isLoading) {
    return <div className="min-h-svh"></div>;
  }
  return (
    <main
      className={`py-4 flex flex-col gap-6 transition-opacity duration-1000 min-h-screen ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <CTAV2
        hide={false}
        title={"Keep in Touch"}
        desc={
          "Hey there! I'd love to hear from you. Whether you have a question, a project idea, or just want to say hi, feel free. Let's connect and see where our conversation takes us!"
        }
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div className="w-96 mx-auto p-4">
            <SimpleCard key={contact.id}>
              <div className="h-40">
                <div className="flex flex-col justify-center items-center">
                  <div className="bg-secondary/20 hover:bg-secondary/50 text-text border border-secondary/30 transition-all  shadow-md hover:shadow-lg rounded-full p-4 text-3xl">
                    {contact.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-accent-2 text-xl font-semibold capitalize">
                    {contact.name}
                  </h1>
                </div>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:underline"
                >
                  {contact.information}
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  {contact.description}
                </p>
              </div>
            </SimpleCard>
          </div>
        ))}
      </section>
    </main>
  );
}
