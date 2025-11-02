"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-white">
      {/* TOP SECTION */}
      <div className="bg-white text-center py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Logo */}
          <img
            src="/footerlogo.png"
            alt="Footer Logo"
            width={200}
            height={200}
          />

          {/* Tagline */}
          <p className="text-black text-sm font-medium max-w-md leading-relaxed tracking-wide uppercase">
            We help brands speak human in a{" "}
            <span className="text-[#1098D5] font-semibold">Digital World</span>
          </p>

          <h2 className="text-[#051c27] text-sm font-medium max-w-md leading-relaxed tracking-wide ">
            team@orbitwelve.com <span className="hidden md:inline"> | </span>
            +923299711113
          </h2>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-[#1098D5] hover:text-black transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-[#1098D5] hover:text-black transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-[#1098D5] hover:text-black transition-colors"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-[#1098D5] hover:text-black transition-colors"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bg-[#f5f5f5] text-gray-600 text-sm py-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
          <a href="/privacy" className="hover:text-[#1098D5] transition-colors">
            Privacy Policy
          </a>
          <span className="hidden md:inline">|</span>
          <p className="text-center">
            All rights reserved © {new Date().getFullYear()} Orbit Twelve
          </p>
        </div>
      </div>
    </footer>
  );
}
