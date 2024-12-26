import React, { Suspense, useState } from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from 'framer-motion';
import CanvasLoader from './Loader';

const RenderModel = ({ children, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full md:w-[400px] mx-auto h-[350px] md:h-[400px] relative rounded-lg"
    >
      <AnimatePresence mode="wait">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }} 
          shadows 
          dpr={[1, 2]}
          onCreated={handleLoaded}
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
              <Environment preset="sunset" />
            </motion.group>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </AnimatePresence>
    </motion.div>
  );
};

export default RenderModel;