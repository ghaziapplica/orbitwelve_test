"use client";

import { motion } from "framer-motion";

export default function ViewAllButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#1098D5] to-[#1098D5] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 group"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.span
        className="ml-2 inline-flex items-center justify-center"
        animate={{
          x: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </motion.span>
    </motion.a>
  );
}
