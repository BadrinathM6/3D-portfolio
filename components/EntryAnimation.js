"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

const RevealText = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, slideControls, mainControls]);

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
      />
    </div>
  );
};

// Preload critical images
const frameworkIcons = [
  {
    src: "/django.webp",
    alt: "Django",
    sizes: { sm: 35, md: 42, lg: 50 },
    priority: true,
    fetchPriority: "high",
    preload: true
  },
  {
    src: "/react (1).webp",
    alt: "React",
    sizes: { sm: 35, md: 42, lg: 50  },
    priority: true,
    fetchPriority: "high"
  },
  {
    src: "/next js.webp",
    alt: "Next.js",
    sizes: { sm: 35, md: 42, lg: 50  },
    priority: true,
  },
  {
    src: "/tailwind-css.webp",
    alt: "Tailwind CSS",
    sizes: { sm: 40, md: 42, lg: 50  },
    priority: false
  },
  {
    src: "/javascript.webp",
    alt: "JavaScript",
    sizes: { sm: 35, md: 42, lg: 50 },
    priority: false
  },
  {
    src: "/visual-studio-code.webp",
    alt: "VS Code",
    sizes: { sm: 35, md: 42, lg: 50 },
    priority: false
  }
];

const EntryAnimation = () => {
  const [hoverOffsets, setHoverOffsets] = useState([]);
  const [screenSize, setScreenSize] = useState("lg");
  
  // Optimize resize listener with debouncing
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      if (typeof window === "undefined") return;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setScreenSize(width < 640 ? "sm" : width < 1024 ? "md" : "lg");
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const generateSemiCirclePositions = () => {
      const radius = 40;
      const startAngle = -180;
      const endAngle = 0;

      return frameworkIcons.map((_, index) => {
        const angle = startAngle + (endAngle - startAngle) * (index / (frameworkIcons.length - 1));
        const angleInRadians = (angle * Math.PI) / 180;
        return {
          x: 50 + radius * Math.cos(angleInRadians),
          y: 50 + radius * Math.sin(angleInRadians),
          hoverOffset: 0,
          hoverDirection: 1,
        };
      });
    };

    setHoverOffsets(generateSemiCirclePositions());
  }, []);

  // Optimize animation with requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    let lastUpdate = 0;
    const FRAME_RATE = 1000 / 20; // 20 FPS instead of 50ms interval

    const updateOffsets = (timestamp) => {
      if (timestamp - lastUpdate >= FRAME_RATE) {
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
        lastUpdate = timestamp;
      }
      animationFrameId = requestAnimationFrame(updateOffsets);
    };

    animationFrameId = requestAnimationFrame(updateOffsets);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative h-1/2 bg-background p-8 pb-0 pt-28 md:pt-28 overflow-hidden" id="entry">
      <div className="w-full mx-auto flex flex-col sm:mt-1 mt-4 c-space gap-3">
        <RevealText>
          <p className="sm:text-3xl text-xl font-medium text-textcolor text-center font-serif">
            Hi, I am Badrinath <span className="waving-hand">👋</span>
          </p>
        </RevealText>
        <RevealText>
          <p className="xl:text-6xl md:text-5xl sm:text-4xl text-3xl font-sans font-black !leading-normal text-anothertextcolor text-center">
            Building Solutions & Systems
          </p>
        </RevealText>
      </div>

      <div className="mx-auto w-full h-[400px] md:h-[500px] lg:h-[600px] Render-container relative">
      <div className="relative mx-auto w-[300px] h-[300px] md:w-[500px] md:h-[500px] md:top-14 top-14">
        <Image
          src="/man2.png" // Replace with your image path
          alt="Portfolio Entry Image"
          layout="responsive"
          width={400}
          height={400}
          priority={true} // Optimized for LCP
          placeholder="blur" // Better performance
          blurDataURL="/static/placeholder.webp" // Low-quality placeholder
          className="rounded-lg shadow-lg"
        />
      </div>

        {hoverOffsets.map((icon, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: `translate(-50%, -50%) translateY(${icon.hoverOffset * 20}px)`,
            }}
          >
            <Image
              src={frameworkIcons[index].src}
              alt={frameworkIcons[index].alt}
              width={frameworkIcons[index].sizes[screenSize]}
              height={frameworkIcons[index].sizes[screenSize]}
              priority={frameworkIcons[index].priority}
              fetchPriority={frameworkIcons[index].fetchPriority}
              className="transition-transform duration-300 hover:scale-125 drop-shadow-lg"
              loading={frameworkIcons[index].priority ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(EntryAnimation);