"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role?: string;
  imageUrl?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface TeamPageProps {
  team?: TeamMember[];
}

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Amir",
    role: "Senior Business Growth Manager",
  },
  {
    id: "2",
    name: "Alhnouf",
    role: "Social Media Executive",
  },
  {
    id: "3",
    name: "Christine",
    role: "People & Communications Manager",
  },
  {
    id: "4",
    name: "Fadi",
    role: "Business Growth Director - Saudi Arabia",
  },
];

export default function TeamSection({ team = defaultTeam }: TeamPageProps) {
  if (!team || team.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No team members available
      </div>
    );
  }

  return (
    <section
      id="team"
      className="relative bg-gradient-to-b from-white to-gray-50 px-6 md:px-12 py-24 overflow-hidden"
    >
      {/* Decorative Blurs */}
      <div className="absolute top-16 left-20 w-40 h-40 bg-[#1098D5]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-24 w-56 h-56 bg-[#1098D5]/20 rounded-full blur-3xl opacity-30" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          Creative Minds
        </h1>
        <div className="w-20 h-1 bg-[#1098D5] mx-auto mt-4 rounded-full" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-6 uppercase">
          Our Leadership Team
        </h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
          For years, we’ve been offering full-fledged digital marketing services
          to empower exceptional brands whilst ensuring client satisfaction.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Avatar */}
            <div className="relative flex justify-center -mt-12">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-white">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#1098D5] to-[#1098D5] text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="pt-16 pb-8 px-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              {member.role && (
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
              )}

              {/* Social Icons */}
              {member.social && (
                <div className="flex justify-center mt-4 gap-4">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
                    >
                      <i className="fab fa-twitter text-lg" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#0077b5] transition-colors"
                    >
                      <i className="fab fa-linkedin text-lg" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <i className="fab fa-github text-lg" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
