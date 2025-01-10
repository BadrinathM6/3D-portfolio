"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import RevealText from "./Constants/RevealText";

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

// Constants
const FRAME_RATE = 1000 / 20;
const HOVER_STEP = 0.1;
const HOVER_LIMIT = 0.5;
const ANIMATION_RADIUS = 40;

// Screen size calculation
const getScreenSize = (width) => width < 640 ? "sm" : width < 1024 ? "md" : "lg";

const EntryAnimation = () => {
  const [hoverOffsets, setHoverOffsets] = useState([]);
  const [screenSize, setScreenSize] = useState("lg");

  const generateSemiCirclePositions = useCallback(() => {
    const startAngle = -180;
    const endAngle = 0;

    return frameworkIcons.map((_, index) => {
      const angle = startAngle + (endAngle - startAngle) * (index / (frameworkIcons.length - 1));
      const angleInRadians = (angle * Math.PI) / 180;
      return {
        x: 50 + ANIMATION_RADIUS * Math.cos(angleInRadians),
        y: 50 + ANIMATION_RADIUS * Math.sin(angleInRadians),
        hoverOffset: 0,
        hoverDirection: 1,
      };
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setScreenSize(getScreenSize(window.innerWidth));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    setHoverOffsets(generateSemiCirclePositions());
  }, [generateSemiCirclePositions]);

  useEffect(() => {
    let animationFrameId;
    let lastUpdate = 0;

    const updateOffsets = (timestamp) => {
      if (timestamp - lastUpdate >= FRAME_RATE) {
        setHoverOffsets((prev) =>
          prev.map((icon) => {
            const nextHoverOffset = icon.hoverOffset + HOVER_STEP * icon.hoverDirection;
            return {
              ...icon,
              hoverOffset: nextHoverOffset,
              hoverDirection:
                Math.abs(nextHoverOffset) > HOVER_LIMIT ? -icon.hoverDirection : icon.hoverDirection,
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

      <div className="mx-auto w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
        <div className="relative mx-auto w-[300px] h-[300px] md:w-[500px] md:h-[500px] md:top-14 top-14">
          <Image
            src="/man2.webp"
            alt="Portfolio Entry Image"
            width={400}
            height={400}
            priority={true}
            fetchPriority="high"
            quality={75}
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 500px, 400px"
            className="rounded-lg"
          />
        </div>

        {hoverOffsets.map((icon, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-in-out transform"
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
              loading={frameworkIcons[index].priority ? "eager" : "lazy"}
              className="transition-transform duration-300 hover:scale-125 drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(EntryAnimation);