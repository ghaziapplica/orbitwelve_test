"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const services = [
    "Digital Consultancy",
    "Data & Analytics",
    "Social Media Marketing",
    "Web & App Development",
    "Search Marketing",
    "Paid Media",
    "Content Creation",
    "Branding",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We’ll get in touch soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center items-center w-full bg-gray-50 px-6 md:px-12 py-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          Get In Touch
        </h2>

        <div className="w-20 h-1 bg-[#1098D5] mx-auto mt-4 rounded-full" />
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have a project you’re interested in discussing with us? Fill out the
          form below — we’d love to talk!
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-6"
      >
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Phone + Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
              placeholder="+1 (234) 567-890"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Which service are you interested in?
            </label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
            >
              <option value="">Select a service...</option>
              {services.map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
            placeholder="Tell us more about your project..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-[#1098D5] hover:bg-[#0d7fb3] text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300"
          >
            Send Message
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
}
