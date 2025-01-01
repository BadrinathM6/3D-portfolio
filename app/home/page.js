"use client";

import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

// Correct dynamic imports
const MainSection = dynamic(() => import("@/components/MainSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const EntryAnimation = dynamic(() => import("@/components/EntryAnimation"));
const Projects = dynamic(() => import("@/components/ProjectSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));

const Portfolio = () => {
  return (
    <main>
      <div className="bg-background text-gray-200 relative overflow-hidden">
        <Header />
        <EntryAnimation />
        <MainSection />
        <AboutSection />
        <Projects />
        <ContactSection />
      </div>
    </main>
  );
};

export default Portfolio;
