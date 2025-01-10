// RevealText.js
import {
  domAnimation,
  LazyMotion,
  m,
  useAnimation,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef } from "react";

const RevealText = React.memo(({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} className="relative overflow-hidden">
        <m.div
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
        </m.div>

        <m.div
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
    </LazyMotion>
  );
});

RevealText.displayName = "RevealText";

export default RevealText;
