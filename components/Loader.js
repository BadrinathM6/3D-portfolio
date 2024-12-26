import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

const LoaderContainer = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{
      duration: 0.5,
      ease: "easeOut"
    }}
    className="flex flex-col items-center justify-center"
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ progress }) => (
  <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mt-4">
    <motion.div
      className="h-full bg-textcolor"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
);

const LoadingSpinner = () => (
  <motion.div
    className="w-12 h-12 border-4 border-textcolor rounded-full border-t-transparent"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }}
  />
);

const CanvasLoader = () => {
  const { progress } = useProgress();
  
  return (
    <Html
      as="div"
      center
    >
      <LoaderContainer>
        <LoadingSpinner />
        <ProgressBar progress={progress} />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm font-semibold text-anothertextcolor"
        >
          {progress.toFixed(0)}%
        </motion.p>
      </LoaderContainer>
    </Html>
  );
};

export default CanvasLoader;