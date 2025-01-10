"use client";

import React, { useMemo } from "react";
import { domAnimation, LazyMotion, m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import RevealText from "./Constants/RevealText";

const AboutSection = () => {
  const { scrollYProgress } = useScroll();

  // Parallax effects for image
  const imageY = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);

  const skills = useMemo(
    () => [
      "JavaScript (ES6+)",
      "Next.js",
      "Tailwind CSS",
      "React",
      "Django",
      "Bootstrap 5",
    ],
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="relative min-h-screen bg-background p-8 md:ml-20 lg:ml-28 lg:pt-[4.25rem] md:pt-[2.25rem]"
        id="about"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <RevealText
            className="text-4xl md:text-5xl font-heading font-bold text-anothertextcolor mb-16"
            delay={0.2}
          >
            <div className="flex items-center gap-4">
              <m.img
                src="/right arrow.svg"
                alt="Arrow Animation"
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <h3 className="text-4xl md:text-4xl font-heading font-bold text-anothertextcolor">
                About Me
              </h3>
              <div className="h-px bg-lighttextcolor flex-1 max-w-[300px] hidden md:flex" />
            </div>
          </RevealText>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-10">
            {/* Text Content */}
            <m.div className="w-full lg:w-[74%] max-w-3xl space-y-8">
              <RevealText
                className="text-lighttextcolor font-sans text-lg leading-relaxed"
                delay={0.4}
              >
                I&#39;m a{" "}
                <span className="text-textcolor">passionate developer</span> who
                believes in pushing boundaries until perfection is achieved .
                When I&#39;m deeply invested in a project,{" "}
                <span className="text-textcolor">
                  sleep becomes secondary to achieving the perfect solution
                </span>{" "}
                – it&#39;s not just about completing tasks, it&#39;s about{" "}
                <span className="text-textcolor">crafting excellence</span>.
              </RevealText>

              <RevealText
                className="text-lighttextcolor font-sans text-lg leading-relaxed"
                delay={0.4}
              >
                During my{" "}
                <span className="text-textcolor">
                  internship at Teccity Labs Pvt Ltd
                </span>
                , I consistently demonstrated my ability to{" "}
                <span className="text-textcolor">
                  bring innovative approaches to complex problems
                </span>
                . What sets me apart is my{" "}
                <span className="text-textcolor">
                  commitment to thinking differently
                </span>
                . I don&#39;t just implement solutions; I reimagine them, making
                them more efficient and effective.
              </RevealText>

              <RevealText
                className="text-lighttextcolor font-sans text-lg leading-relaxed"
                delay={0.6}
              >
                I{" "}
                <span className="text-textcolor">
                  thrive in dynamic environments
                </span>
                , making me particularly well-suited for startups where
                adaptability and innovation are crucial. My approach combines{" "}
                <span className="text-textcolor">
                  meticulous attention to detail
                </span>{" "}
                with a broader strategic vision, allowing me to{" "}
                <span className="text-textcolor">
                  deliver solutions that exceed expectations
                </span>
                .
              </RevealText>

              {/* Skills */}
              <div
                className="pt-4"
              >
                <RevealText
                  className="text-xl font-heading text-anothertextcolor mb-4"
                  delay={0.7}
                >
                  Technologies I work with
                </RevealText>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <m.span
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#00c2b8",
                        color: "#1e2025",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        },
                      }}
                      // viewport={{ once: true }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="px-4 py-2 bg-textcolor text-background rounded-full text-sm font-medium cursor-pointer"
                    >
                      {skill}
                    </m.span>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Image Container */}
            <m.div
              className="relative w-full lg:w-[48%] flex justify-center md:mt-20 mt-10 ml-9 md:ml-0"
              style={{ y: imageY, willChange: "transform" }}
            >
              <m.div
                className="relative w-3/5"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <m.div
                  className="absolute -top-10 -left-10 w-full h-full bg-background rounded-2xl border-textcolor border-2"
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  style={{ willChange: "transform" }}
                />
                <m.div
                  className="relative aspect-square rounded-2xl overflow-hidden bg-yellow-400"
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  style={{ willChange: "transform" }}
                >
                  <Image
                    width={100}
                    height={100}
                    src="/me.jpg"
                    alt="Developer profile"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </m.div>
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default React.memo(AboutSection);
