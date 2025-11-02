"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Counter = ({
  value,
  showPlus = true,
}: {
  value: number;
  showPlus?: boolean;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2500; // 2.5 seconds
      const increment = end / (duration / 16);

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, 16);

      return () => clearInterval(interval);
    } else {
      setCount(0);
    }
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
    >
      {count}
      {showPlus && value >= 10 ? "+" : ""}
    </motion.span>
  );
};

export default function AboutSection() {
  const stats = [
    { number: 2020, label: "Founded In", showPlus: false },
    { number: 450, label: "Clients", showPlus: true },
    { number: 300, label: "Projects", showPlus: true },
    { number: 15, label: "Industries", showPlus: true },
    { number: 20, label: "Countries", showPlus: true },
    { number: 10, label: "Employees", showPlus: true },
  ];

  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center w-full bg-gray-50 px-6 md:px-10 py-24"
    >
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 text-center mb-20"
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300"
          >
            <Counter value={item.number} showPlus={item.showPlus} />
            <p className="mt-2 text-xs md:text-sm font-semibold tracking-wider text-gray-700 uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Overview Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase">
          About Us
        </h2>
        <div className="w-16 h-1 bg-[#1098D5] mx-auto mt-3 mb-10 rounded-full" />

        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
          Creating Success Stories is What We Do
        </h3>

        <p className="text-gray-700 leading-relaxed mb-8 text-sm md:text-base">
          Founded in 2020, Orbitwelve began by offering simple digital solutions
          and quickly earned trust through consistent results. Over time, our
          clients’ success became our story, driving us to expand into a
          full-service digital agency. Today, we help businesses grow through
          strategic design, SEO, and content that truly connects. Every project
          starts with your goals and ends with measurable growth that lasts.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
          Our Efforts Don’t Stop Here
        </h3>

        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          We continuously refine our expertise, expand into new markets, and
          embrace emerging technologies to deliver measurable success and help
          brands stay ahead in the ever-evolving digital landscape.
        </p>
      </motion.div>
    </section>
  );
}
