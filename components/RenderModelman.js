"useclient";

import React, { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
// import { Canvas } from "@react-three/fiber";
const LazyCanvas = dynamic(() =>
  import("@react-three/fiber").then((mod) => mod.Canvas)
);
import { motion, AnimatePresence } from "framer-motion";
import CanvasLoader from "./Loader";

const RenderModelMan = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[600px] md:h-[500px] md:mb-0 lg:h-[600px] lg:mb-0 relative rounded-lg overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <LazyCanvas
          camera={{
            position: [0, 0, window.innerWidth < 768 ? 7 : 5],
            fov: window.innerWidth < 768 ? 85 : 75,
          }}
          shadows
          dpr={[1, 2]}
        >
          <Suspense fallback={<CanvasLoader />}>
            <motion.group
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              {children}
              <Environment preset="dawn" />
            </motion.group>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </LazyCanvas>
      </AnimatePresence>
    </motion.div>
  );
};

export default RenderModelMan;
