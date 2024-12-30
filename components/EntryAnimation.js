"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

const RenderModelMan = dynamic(() => import("./RenderModelMan"), {
  ssr: false,
});

const Man = dynamic(() => import("./modals/man"), {
  ssr: false,
});

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

const frameworkIcons = [
  {
    src: "/next js.png",
    alt: "Next.js",
    sizes: { sm: 45, md: 60, lg: 75 },
    priority: "false",
  },
  {
    src: "/django.webp",
    alt: "Django",
    sizes: { sm: 45, md: 60, lg: 75 },
    priority: "true",
  },
  {
    src: "/react (1).png",
    alt: "React",
    sizes: { sm: 35, md: 45, lg: 57 },
    priority: "false",
  },
  {
    src: "/tailwind-css.png",
    alt: "Tailwind CSS",
    sizes: { sm: 40, md: 50, lg: 60 },
    priority: "false",
  },
  {
    src: "/javascript.png",
    alt: "JavaScript",
    sizes: { sm: 35, md: 42, lg: 50 },
    priority: "false",
  },
  {
    src: "/visual-studio-code.png",
    alt: "VS Code",
    sizes: { sm: 35, md: 42, lg: 50 },
    priority: "false",
  },
];

const EntryAnimation = () => {
  const [hoverOffsets, setHoverOffsets] = useState([]);
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setScreenSize(width < 640 ? "sm" : width < 1024 ? "md" : "lg");
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Generate positions in a semi-circle
  useEffect(() => {
    const generateSemiCirclePositions = () => {
      const radius = 40; // Radius of the semi-circle (in viewport units)
      const startAngle = -180; // Start from bottom left
      const endAngle = 0; // End at bottom right

      return frameworkIcons.map((_, index) => {
        // Calculate angle for current icon
        const angle =
          startAngle +
          (endAngle - startAngle) * (index / (frameworkIcons.length - 1));
        const angleInRadians = (angle * Math.PI) / 180;

        // Calculate position using parametric equations
        const x = 50 + radius * Math.cos(angleInRadians); // 50 is center
        const y = 50 + radius * Math.sin(angleInRadians); // 50 is center

        return {
          x,
          y,
          hoverOffset: 0,
          hoverDirection: 1,
        };
      });
    };

    setHoverOffsets(generateSemiCirclePositions());
  }, []);

  // Floating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHoverOffsets((prev) =>
        prev.map((icon) => {
          const nextHoverOffset = icon.hoverOffset + 0.1 * icon.hoverDirection;
          return {
            ...icon,
            hoverOffset: nextHoverOffset,
            hoverDirection:
              nextHoverOffset > 0.5 || nextHoverOffset < -0.5
                ? -icon.hoverDirection
                : icon.hoverDirection,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-1/2 bg-background p-8 pb-0 pt-28 md:pt-28 overflow-hidden"
      id="entry"
    >
      <div
        className="w-full mx-auto flex flex-col sm:mt-1 mt-4 c-space gap-3"
      >
        <RevealText>
          <p className="sm:text-3xl text-xl font-medium text-textcolor text-center font-serif">
            Hi, I am Badrinath <span className="waving-hand">👋</span>
          </p>
        </RevealText>
        <RevealText>
          <p className=" xl:text-6xl md:text-5xl sm:text-4xl text-3xl font-sans font-black !leading-normal text-anothertextcolor text-center">
            Building Solutions & Systems
          </p>
        </RevealText>
      </div>

      <div className="mx-auto w-full h-[400px] md:h-[500px] lg:h-[600px] Render-container relative">
        
        <div className="h-full absolute top-[30%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RenderModelMan>
            <Man />
          </RenderModelMan>
        </div>

        {/* Semi-circle Icons Layout */}
        {hoverOffsets.map((icon, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: `translate(-50%, -50%) translateY(${
                icon.hoverOffset * 20
              }px)`,
            }}
          >
            <Image
              src={frameworkIcons[index].src}
              alt={frameworkIcons[index].alt}
              width={frameworkIcons[index].sizes[screenSize]}
              height={frameworkIcons[index].sizes[screenSize]}
              priority={frameworkIcons[index].priority}
              className="transition-transform duration-300 hover:scale-125 drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(EntryAnimation);
