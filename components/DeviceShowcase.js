import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const RenderModelProjects = dynamic(
  () => import("@/components/RenderModelProjects"),
  { ssr: false }
);

const Model = dynamic(() => import("@/components/modals/Projects"), {
  ssr: false
});

const DeviceShowcase = ({ currentProject, animationDirection }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      y: direction === "left" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction === "left" ? -300 : 300,
      opacity: 0,
    }),
  };

  const DesktopView = useCallback(
    () => (
      <div className="w-full h-full relative">
        <RenderModelProjects>
          <Model texture={currentProject.texture} direction={animationDirection} />
        </RenderModelProjects>
      </div>
    ),
    [currentProject.texture, animationDirection]
  );

  const MobileView = useCallback(
    () => (
      <div className="relative w-full max-w-3xl mx-auto p-4">
        {/* Main Frame */}
        <div className="relative bg-[#1e2025] rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          {/* Top Bar */}
          <div className="bg-gray-200 py-2 px-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-600 "></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 "></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="h-1 w-16 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Screen Area with 16:9 aspect ratio */}
          <div className="relative pt-[56.25%]">
            <AnimatePresence initial={false} custom={animationDirection}>
              <m.div
                key={currentProject.texture}
                custom={animationDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
                onAnimationStart={() => setIsTransitioning(true)}
                onAnimationComplete={() => setIsTransitioning(false)}
              >
                <div className="absolute inset-0 bg-[#1e2025]">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ 
                      opacity: isTransitioning ? 0.7 : 1,
                    }}
                  >
                    <source src={currentProject.texture} type="video/webm" />
                  </video>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Bottom Bar */}
          <div className="bg-gray-200 py-2 px-4 border-t border-gray-700">
            <div className="flex items-center justify-center">
              <div className="h-1 w-16 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Stand */}
        <div className="relative mx-auto" style={{ width: '40%' }}>
          <div className="h-4 bg-gray-200 rounded-b-lg border-x border-b border-gray-700"></div>
          <div className="h-1 w-full bg-gray-200 mt-1 rounded-full opacity-50"></div>
        </div>

        {/* Subtle Reflection */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-transparent"></div>
        </div>
      </div>
    ),
    [currentProject.texture, animationDirection]
  );

  return (
    <div className="w-full h-full">
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};

export default DeviceShowcase;