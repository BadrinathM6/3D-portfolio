"use client";
import React from "react";
import dynamic from "next/dynamic";
import { domAnimation, LazyMotion, m } from "framer-motion";
const Mail = dynamic(() => import("lucide-react").then((mod) => mod.Mail));
const Linkedin = dynamic(() =>
  import("lucide-react").then((mod) => mod.Linkedin)
);
const Github = dynamic(() => import("lucide-react").then((mod) => mod.Github));
import Image from "next/image";
import RevealText from "./Constants/RevealText";

const MainSection = () => {
  const sidebarVariants = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="relative h-full bg-background p-8 pt-2 lg:pt-[2.25rem] md:pt-[0.25rem]"
        id="home"
      >
        {/* Fixed Sidebar */}
        <m.div
          className="fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-6 md:left-8 lg:left-12 hidden md:flex"
          variants={sidebarVariants}
          initial="initial"
          animate="animate"
        >
          <m.a
            href="mailto:dummy12@gmail.com"
            className="text-anothertextcolor hover:text-textcolor transition-colors font-inter"
            variants={sidebarVariants}
            whileHover={{ scale: 1.4, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Mail size={24} />
          </m.a>
          <m.a
            href="https://linkedin.com"
            className="text-anothertextcolor hover:text-textcolor transition-colors font-inter"
            variants={sidebarVariants}
            whileHover={{ scale: 1.4, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Linkedin size={24} />
          </m.a>
          <m.a
            href="https://github.com"
            className="text-anothertextcolor hover:text-textcolor transition-colors font-inter"
            variants={sidebarVariants}
            whileHover={{ scale: 1.4, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Github size={24} />
          </m.a>
        </m.div>

        {/* Main Content with Flex Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="w-full lg:w-[58%] max-w-3xl md:ml-28 mt-10 lg:ml-28">
            <m.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <div className="space-y-4">
                <RevealText
                  className="text-lg text-textcolor font-mono"
                  delay={0}
                >
                  Hi, my name is
                </RevealText>

                <RevealText
                  className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-anothertextcolor"
                  delay={0.2}
                >
                  Badrinath M.
                </RevealText>

                <RevealText
                  className="text-4xl sm:text-5xl md:text-6xl font-serif text-lighttextcolor"
                  delay={0.4}
                >
                  Full-stack Developer.
                </RevealText>
              </div>

              {/* SVG for mobile view - positioned after the title */}
              <m.div
                className="block lg:hidden w-full max-w-xs mx-auto -mt-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Image
                  src="/bg5.png"
                  alt="Developer Activity"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='/Developer Activity-bro.svg'/%3E%3C/svg%3E"
                />
              </m.div>

              <RevealText
                className="text-lg text-lighttextcolor leading-relaxed font-sans max-w-2xl"
                delay={0.6}
              >
                I specialize in crafting seamless web solutions that elegantly
                solve complex challenges. Leveraging cutting-edge technologies
                and clean architecture, I build scalable applications that
                deliver exceptional user experiences and drive technological
                innovation.
              </RevealText>

              <RevealText delay={0.8}>
                <m.a
                  href="/csv"
                  className="inline-block px-6 py-2 border-2 border-textcolor text-textcolor hover:bg-[#00c2b8] hover:text-[#1e2025] transition-colors 
                          rounded font-medium font-mono"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  CSV
                </m.a>
              </RevealText>

              {/* Mobile-only social links */}
              <m.div
                className="md:hidden pt-8 flex items-center gap-8 justify-center w-full"
                variants={textVariants}
              >
                <div className="h-px bg-textcolor flex-1 max-w-[80px]" />
                <div className="flex gap-8">
                  <m.a
                    href="mailto:dummy12@gmail.com"
                    className="text-anothertextcolor hover:text-textcolor transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Mail-Link"
                  >
                    <Mail size={24} />
                  </m.a>
                  <m.a
                    href="https://linkedin.com"
                    className="text-anothertextcolor hover:text-textcolor transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="LinkedIn-Link"
                  >
                    <Linkedin size={24} />
                  </m.a>
                  <m.a
                    href="https://github.com"
                    className="text-anothertextcolor hover:text-textcolor transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="GitHub-Link"
                  >
                    <Github size={24} />
                  </m.a>
                </div>
                <div className="h-px bg-textcolor flex-1 max-w-[80px]" />
              </m.div>
            </m.div>
          </div>

          {/* SVG Container for desktop view */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block w-[42%] mt-12 lg:mt-0 px-4"
          >
            <Image
              src="/bg5.png"
              alt="Developer Activity"
              width={600}
              height={600}
              className="w-full max-w-lg mx-auto h-auto"
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='/Developer Activity-bro.svg'/%3E%3C/svg%3E"
            />
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default React.memo(MainSection);
