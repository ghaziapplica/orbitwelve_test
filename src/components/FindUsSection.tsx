"use client";

import { motion } from "framer-motion";
import ClientMap from "./ClientMap";

const locations = [
  { name: "United States", top: "38%", left: "22%" },
  { name: "Saudi Arabia", top: "38%", left: "55%" },
  { name: "United Arab Emirates", top: "42%", left: "57%" },
  { name: "Egypt", top: "42%", left: "52%" },
  { name: "India", top: "48%", left: "62%" },
  { name: "South Africa", top: "75%", left: "50%" },
  { name: "Australia", top: "78%", left: "80%" },
];

export default function FindUsSection() {
  return (
    <section
      id="find-us"
      className="relative flex flex-col items-center justify-center w-full bg-white py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          How to Find Us
        </h2>
        <div className="w-20 h-1 bg-[#1098D5] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Map Container */}
      <ClientMap />
      {/* Footer Message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-700 mt-10 text-center text-sm md:text-base max-w-2xl"
      >
        Have a project you're interested in discussing with us?{" "}
        <span className="font-semibold text-[#1098D5]">
          Drop us a line below
        </span>
        , we’d love to talk.
      </motion.p>
    </section>
  );
}
