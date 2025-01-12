"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { domAnimation, LazyMotion, m, useAnimation } from "framer-motion";
import Image from "next/image";
import {
  CornerUpRight,
  Contact,
  FolderSearch,
  Brain,
  ChartPie,
} from "lucide-react";
import { myProjects } from "./Constants/data";
import CanvasLoader from "./Loader";
import RevealText from "./Constants/RevealText";
import dynamic from "next/dynamic";

const DeviceShowcase = dynamic(() => import("./DeviceShowcase"), {
  ssr: false,
});

const projectCount = myProjects.length;

const iconMap = {
  Contact: Contact,
  FolderSearch: FolderSearch,
  Brain: Brain,
  ChartPie: ChartPie,
};

const PodcastShowcase = () => {
  const controls = useAnimation();
  const [projectState, setProjectState] = useState({
    isHovered: false,
    selectedProjectIndex: 0,
    animationDirection: null,
  });

  const handleNavigation = useCallback((direction) => {
    setProjectState((prev) => ({
      ...prev,
      animationDirection: direction === "previous" ? "left" : "right",
      selectedProjectIndex:
        direction === "previous"
          ? prev.selectedProjectIndex === 0
            ? projectCount - 1
            : prev.selectedProjectIndex - 1
          : prev.selectedProjectIndex === projectCount - 1
          ? 0
          : prev.selectedProjectIndex + 1,
    }));
  }, []);

  const currentProject = useMemo(
    () => myProjects[projectState.selectedProjectIndex],
    [projectState.selectedProjectIndex]
  );

  useEffect(() => {
    controls.start({
      y: projectState.isHovered ? -10 : 0,
      scale: projectState.isHovered ? 1.02 : 1,
      transition: { duration: 0.3 },
    });
  }, [projectState.isHovered, controls]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="relative min-h-screen bg-background p-8 md:ml-20 lg:ml-28 lg:pt-[1.25rem] pt-[3.25rem]"
        id="projects"
      >
        <div className="max-w-6xl mx-auto">
          <RevealText>
            <div className="flex items-center gap-4">
              <Image
                src="/right arrow.svg"
                alt="Arrow Animation"
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8"
              />
                <h3 className="text-4xl md:text-4xl font-heading font-bold text-anothertextcolor">
                  Projects
                </h3>
              <div className="h-px bg-lighttextcolor flex-1 max-w-[300px] hidden md:flex" />
            </div>
          </RevealText>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center pt-14">
            {/* Left Content Section */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-col">
                <div
                  className="bg-anothertextcolor p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
                  style={currentProject.logoStyle}
                >
                  <Image
                    src={currentProject.logo}
                    alt="logo"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>

                <div className="flex flex-col gap-5 my-5">
                  <RevealText>
                    <h1 className="text-2xl font-bold text-anothertextcolor">
                      {currentProject.title}
                    </h1>
                  </RevealText>
                </div>
              </div>

              <RevealText>
                <p className="text-lighttextcolor text-lg leading-relaxed">
                  {currentProject.subdesc}
                </p>
              </RevealText>

              <div className="flex flex-wrap gap-4 text-anothertextcolor">
                <FeatureCard
                  icon={React.createElement(
                    iconMap[currentProject.Icon1_project] || Contact,
                    { className: "w-5 h-5" }
                  )}
                  title={currentProject.card_title1}
                  description={currentProject.card_subtitle1}
                />
                <FeatureCard
                  icon={React.createElement(
                    iconMap[currentProject.Icon2_project] || Contact,
                    { className: "w-5 h-5" }
                  )}
                  title={currentProject.card_title2}
                  description={currentProject.card_subtitle2}
                />
              </div>

              <RevealText>
                <div className="flex items-center gap-4 justify-between flex-wrap">
                  <div className="flex gap-4">
                    {currentProject.tags.map((tag, index) => (
                      <div key={index} className="tech-logo">
                        <Image
                          src={tag.path}
                          alt={tag.name}
                          width={24}
                          height={24}
                        />
                      </div>
                    ))}
                  </div>

                  <m.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={currentProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-4 border-2 border-textcolor text-textcolor hover:bg-[#00c2b8] hover:text-[#1e2025] transition-colors rounded font-medium font-mono"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Check Live Site</span>
                      <CornerUpRight className="w-4 h-4" />
                    </div>
                  </m.a>
                </div>
              </RevealText>

              <div className="flex justify-between items-center pt-6">
                <button
                  className="arrow-btn"
                  onClick={() => handleNavigation("previous")}
                >
                  <Image
                    src="/left-arrow.png"
                    alt="Left Arrow"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </button>
                <button
                  className="arrow-btn"
                  onClick={() => handleNavigation("next")}
                >
                  <Image
                    src="/right-arrow.png"
                    alt="Right Arrow"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </button>
              </div>
            </m.div>

            {/* Right Model Section */}
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onHoverStart={() =>
                setProjectState((prev) => ({ ...prev, isHovered: true }))
              }
              onHoverEnd={() =>
                setProjectState((prev) => ({ ...prev, isHovered: false }))
              }
              className="relative"
            >
              <div className="relative w-full lg:aspect-square bg-background rounded-xl overflow-hidden">
                <Suspense fallback={<CanvasLoader />}>
                  <DeviceShowcase
                    currentProject={currentProject}
                    animationDirection={projectState.animationDirection}
                  />
                </Suspense>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

const FeatureCard = React.memo(({ icon, title, description }) => (
  <m.div
    whileHover={{ y: -2 }}
    className="bg-gray-800/50 p-4 rounded-lg space-y-2 flex-1 min-w-[200px]"
  >
    <div className="text-textcolor">{icon}</div>
    <RevealText>
      <p className="font-medium text-base text-anothertextcolor">{title}</p>
    </RevealText>
    <RevealText>
      <p className="text-sm text-lighttextcolor">{description}</p>
    </RevealText>
  </m.div>
));

FeatureCard.displayName = "FeatureCard";

export default React.memo(PodcastShowcase);
