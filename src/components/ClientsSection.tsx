"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
}

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No clients available
      </div>
    );
  }

  return (
    <section
      id="clients"
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden"
    >
      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#1098D5]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#1098D5]/20 rounded-full blur-3xl opacity-30" />

      {/* Header */}
      <div className="relative text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight uppercase"
        >
          Our Clients
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-20 h-1 bg-[#1098D5] mx-auto mt-4 rounded-full origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
        >
          Trusted by global brands and forward-thinking companies across
          industries.
        </motion.p>
      </div>

      {/* Client Logos Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: (idx % 5) * 0.1 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="w-full max-w-[160px] h-32 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex items-center justify-center p-4 transition-all duration-300 transform hover:-translate-y-1">
                <Image
                  src={client.logoUrl || "/placeholder-logo.png"}
                  alt={client.name}
                  width={120}
                  height={80}
                  className="object-contain max-h-16 md:max-h-20 grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ filter: "grayscale(100%)" }}
                  unoptimized
                />
              </div>
              <p className="mt-4 text-sm md:text-base font-medium text-gray-700">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Testimonials Button */}
    </section>
  );
}
