"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  CornerUpRight,
  Contact,
  FolderSearch,
  Brain,
  ChartPie,
} from "lucide-react";
import dynamic from "next/dynamic";
import { myProjects } from "./Constants/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CanvasLoader from "./Loader";

const RenderModelProjects = dynamic(
  () => import("@/components/RenderModelProjects"),
  {
    ssr: false,
  }
);

const Model = dynamic(() => import("@/components/modals/Projects"), {
  ssr: false,
});

const projectCount = myProjects.length;

const iconMap = {
  Contact: Contact,
  FolderSearch: FolderSearch,
  Brain: Brain,
  ChartPie: ChartPie,
};

const RevealText = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={className}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-0 left-0 w-full h-full bg-textcolor"
      >
        {/* {children} */}
      </motion.div>
    </div>
  );
};

const PodcastShowcase = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);

  const handleNavigation = useCallback((direction) => {
    setAnimationDirection(direction === "previous" ? "left" : "right");
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  }, [selectedProjectIndex]);

  const currentProject = useMemo(
    () => myProjects[selectedProjectIndex],
    [selectedProjectIndex]
  );

  useEffect(() => {
    controls.start({
      y: isHovered ? -10 : 0,
      scale: isHovered ? 1.02 : 1,
      transition: { duration: 0.3 },
    });
  }, [isHovered, controls]);

  return (
    <div
      className="relative min-h-screen bg-background p-8 md:ml-20 lg:ml-28 lg:pt-[1.25rem] md:pt-[2.25rem]"
      id="projects"
    >
      <div className="max-w-6xl mx-auto ">
        <div className="flex items-center gap-4 ">
          <motion.img
            src="/right arrow.svg"
            alt="Arrow Animation"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <RevealText>
            <h3 className="text-4xl md:text-4xl font-heading font-bold text-anothertextcolor">
              Projects
            </h3>
          </RevealText>
          <div className="h-px bg-lighttextcolor flex-1 max-w-[300px] hidden md:flex" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center pt-14">
          {/* Left Content Section */}
          <motion.div
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
                <img
                  src={currentProject.logo}
                  alt="logo"
                  className="w-10 h-10"
                  // width={10}
                  // height={10}
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
                  iconMap[currentProject.Icon1_project] || Contact, // Fallback to a default icon
                  { className: "w-5 h-5" }
                )}
                title={currentProject.card_title1}
                description={currentProject.card_subtitle1}
              />
              <FeatureCard
                icon={React.createElement(
                  iconMap[currentProject.Icon2_project] || Contact, // Fallback to a default icon
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
                      <img src={tag.path} alt={tag.name} />
                    </div>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-4 border-2 border-textcolor text-textcolor hover:bg-[#00c2b8] hover:text-[#1e2025] transition-colors 
          rounded font-medium font-mono"
                >
                  <motion.div
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2"
                  >
                    <span>Check Live Site</span>
                    <CornerUpRight className="w-4 h-4" />
                  </motion.div>
                </motion.a>
              </div>
            </RevealText>

            <div className="flex justify-between items-center pt-6">
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("previous")}
              >
                <img
                  src="/left-arrow.png"
                  alt="Left Arrow"
                  className="w-10 h-10"
                />
              </button>
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("next")}
              >
                <img
                  src="/right-arrow.png"
                  alt="Right Arrow"
                  className="w-10 h-10"
                />
              </button>
            </div>
          </motion.div>

          {/* Right Model Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            // animate={controls}
            className="relative"
          >
            <div className="relative w-full aspect-square bg-background rounded-xl overflow-hidden">
              {/* Placeholder for 3D Model */}
              <div className="absolute inset-0 bg-background">
                <Suspense fallback={<CanvasLoader />}>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-60">
                    <RenderModelProjects>
                      <Model
                        texture={currentProject.texture}
                        direction={animationDirection}
                      />
                    </RenderModelProjects>
                  </div>
                </Suspense>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = React.memo(({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-gray-800/50 p-4 rounded-lg space-y-2 flex-1 min-w-[200px]"
  >
    <div className="text-textcolor">{icon}</div>
    <RevealText>
      <h3 className="font-medium text-anothertextcolor">{title}</h3>
    </RevealText>
    <RevealText>
      <p className="text-sm text-lighttextcolor">{description}</p>
    </RevealText>
  </motion.div>
));

export default React.memo(PodcastShowcase);
