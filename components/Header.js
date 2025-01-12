"use client";

import React, { useState, useEffect } from "react";
import { domAnimation, LazyMotion, m, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      setIsMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // Delay scrolling until menu closes
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        className="fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-md border border-gray-200/20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center p-4">
          {/* Logo Section */}
          <m.div
            className="flex items-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-12 h-12 md:w-16 md:h-16"
            >
              <m.path
                d="M47.907 60 63.8 32 47.907 4H16.093L.201 32l15.893 28h31.813zM17.257 6h29.485L61.5 32 46.743 58H17.257L2.5 32 17.257 6z"
                fill="#00c2b8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <m.text
                x="32"
                y="38"
                textAnchor="middle"
                fill="#00c2b8"
                fontSize="18"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                B
              </m.text>
            </svg>
          </m.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-end items-center space-x-6">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <m.a
                  key={link.name}
                  href={link.href}
                  className="relative text-anothertextcolor text-lg group font-mono"
                  whileHover={{ scale: 1.1, color: "#00c2b8" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                >
                  {link.name}
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-anothertextcolor origin-left transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </m.a>
              ))}
            </nav>

            <a
              href="https://drive.google.com/file/d/1RkY7D5hXqzqipMtWwxga84YCT9GFqkix/view" // Replace this with your actual resume URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume-Link"
            >
              <m.button
                className="bg-background text-textcolor px-4 py-2 rounded border-2 border-textcolor font-mono"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#00c2b8",
                  color: "#1e2025",
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Resume
              </m.button>
            </a>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <m.button
            onClick={toggleMenu}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center relative z-50"
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            aria-label="Hamburger Menu"
          >
            <m.span
              className="w-6 h-0.5 bg-textcolor absolute"
              variants={{
                closed: { rotate: 0, y: -6 },
                open: { rotate: 45, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <m.span
              className="w-6 h-0.5 bg-textcolor absolute"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <m.span
              className="w-6 h-0.5 bg-textcolor absolute"
              variants={{
                closed: { rotate: 0, y: 6 },
                open: { rotate: -45, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
          </m.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              className="md:hidden fixed inset-0 top-[73px] backdrop-blur-sm"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="flex flex-col p-8 space-y-6 h-full">
                {navLinks.map((link) => (
                  <m.a
                    key={link.name}
                    href={link.href}
                    className="text-anothertextcolor text-2xl font-mono hover:text-[#00c2b8] transition-colors"
                    variants={navItemVariants}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.name}
                  </m.a>
                ))}
                <a
                  href="https://drive.google.com/file/d/1RkY7D5hXqzqipMtWwxga84YCT9GFqkix/view" // Replace this with your actual resume URL
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume-Link"
                >
                  <m.button
                    className="bg-background text-textcolor text-xl px-6 py-3 rounded border-2 border-textcolor hover:bg-[#00c2b8] hover:text-[#1e2025] transition-colors mt-2"
                    variants={navItemVariants}
                    whileTap={{ scale: 0.95 }}
                  >
                    Resume
                  </m.button>
                </a>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </m.header>
    </LazyMotion>
  );
};

export default Header;
