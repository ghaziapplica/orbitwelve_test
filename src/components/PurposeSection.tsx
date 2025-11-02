"use client";

import { motion } from "framer-motion";

export default function PurposeSection() {
  return (
    <section
      id="purpose"
      className="relative flex flex-col justify-center items-center w-full bg-gradient-to-b from-white to-gray-50 px-6 md:px-12 py-24 text-center"
    >
      {/* Purpose Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
          Our Purpose
        </h2>
        <div className="w-16 h-1 bg-[#1098D5] mx-auto mt-3 rounded-full" />
        <p className="mt-6 text-gray-700 leading-relaxed text-base md:text-lg">
          Empowering our partners to drive consistent and sustainable growth in
          the digital field.
        </p>
      </motion.div>

      {/* Vision + Mission */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-8"
        >
          <div className="bg-[#1098D5]/10 text-[#1098D5] font-bold px-4 py-1 rounded-full text-xs uppercase mb-4">
            Vision
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 uppercase mb-3">
            Shaping the Future of Digital Excellence
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-md">
            As a data-driven company evolving in an ever-changing field, we
            aspire to be frontrunners in the digital landscape and set high
            standards to meet the needs of local and global partners. Guided by
            our core values, we commit to building long-term relationships that
            foster a culture of growth and innovation.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-8"
        >
          <div className="bg-[#1098D5]/10 text-[#1098D5] font-bold px-4 py-1 rounded-full text-xs uppercase mb-4">
            Mission
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 uppercase mb-3">
            Empowering Growth Through Digital Innovation
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-md">
            We empower our partners — employees and clients alike — to achieve
            sustainable growth by delivering integrated digital solutions and
            innovative services. As we expand into new markets, we continue to
            invest in people, strengthen expertise, and transform data into
            meaningful insights that drive success.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
