import React, { useState } from "react";
import CTAV2 from "../components/molecules/cta/CTAV2";
import SimpleCard from "../components/atoms/Card/SimpleCard";
import { AiOutlineMail, AiFillLinkedin, AiOutlinePhone } from "react-icons/ai";
import { FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const contacts = [
    {
      id: "email",
      name: "Direct Email",
      information: "ananta.nov2@gmail.com",
      description: "Drop a line for job opportunities, contracts, or consultations.",
      icon: <AiOutlineMail size={22} className="text-secondary" />,
      link: "mailto:ananta.nov2@gmail.com",
      actionText: "Send Email",
      canCopy: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn Network",
      information: "anantanoviandanu",
      description: "Let's connect professionally, exchange ideas, and expand networks.",
      icon: <AiFillLinkedin size={22} className="text-tenary" />,
      link: "https://linkedin.com/in/anantanoviandanu",
      actionText: "View Profile",
      canCopy: false,
    },
    {
      id: "whatsapp",
      name: "WhatsApp / Direct",
      information: "+62 812-1772-0834",
      description: "Quick chat for urgent inquiries, discussions, or fast response.",
      icon: <AiOutlinePhone size={22} className="text-emerald-400" />,
      link: "https://wa.me/6281217720834",
      actionText: "Open WhatsApp",
      canCopy: true,
    },
  ];

  return (
    <main className="py-2 flex flex-col gap-8 animate-fadeIn">
      <CTAV2
        hide={false}
        title="Let's Build Something Exceptional"
        desc="Whether you're looking for a seasoned frontend engineer, have a challenging project, or simply want to say hello — my inbox is always open."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {contacts.map((contact) => (
          <SimpleCard key={contact.id} className="flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between pb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  {contact.icon}
                </div>
                {contact.canCopy && (
                  <button
                    type="button"
                    onClick={() => handleCopy(contact.information, contact.id)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-text/60 hover:text-white transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Copy value"
                  >
                    {copiedKey === contact.id ? (
                      <>
                        <FiCheck className="text-emerald-400" size={13} />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-accent-2/90 font-medium">
                {contact.name}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 break-all">
                {contact.information}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-text/70 leading-relaxed">
                {contact.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-secondary hover:text-white transition-colors"
              >
                <span>{contact.actionText}</span>
                <FiArrowUpRight size={14} />
              </a>
            </div>
          </SimpleCard>
        ))}
      </section>
    </main>
  );
}
