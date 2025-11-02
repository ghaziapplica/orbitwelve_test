"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  imageUrl: string;
  category?: string;
}

interface LatestWorkSectionProps {
  projects: Project[];
}

const categories = ["All", "Websites", "Campaigns", "Landing Pages"];

export default function LatestWorkSection({
  projects,
}: LatestWorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No projects available
      </div>
    );
  }

  return (
    <section className="py-0 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header - Hidden since we have it in the page hero */}
        <div className="hidden">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Latest Work
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our recent projects that blend creativity, strategy, and
            technology to drive impactful results.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#1098D5] to-[#1098D5] text-white shadow-xl scale-105"
                  : "bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200/50 hover:bg-white hover:text-[#1098D5] hover:shadow-md"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50"
            >
              {/* Image container */}
              <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden">
                <motion.img
                  src={project.imageUrl}
                  alt={project.name}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-project.jpg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Enhanced glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Text slide-up with better styling */}
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white text-xl font-bold mb-3 tracking-wide drop-shadow-lg">
                    {project.name}
                  </h3>
                  {project.category && (
                    <span className="inline-block bg-gradient-to-r from-[#1098D5]/80 to-[#1098D5]/80 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm font-medium shadow-lg">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Enhanced "View Project" floating badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-gray-800 text-sm font-semibold px-5 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20">
                  View Project →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
