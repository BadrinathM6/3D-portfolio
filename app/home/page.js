import React from "react";
import dynamic from "next/dynamic";
// import CanvasLoader from "@/components/Loader";
import Header from "@/components/Header";
import EntryAnimation from "@/components/EntryAnimation";
// Correct dynamic imports
const MainSection = dynamic(() => import("@/components/MainSection"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
});
const Projects = dynamic(() => 
  import("@/components/ProjectSection").then(mod => ({
    default: props => <mod.default {...props} loading={false} />
  })), {
  ssr: false,
  loading: () => <div className="min-h-screen">Loading...</div>
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
});

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