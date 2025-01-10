"use client";

import React, { useRef, Suspense, useEffect } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
const LazyCanvas = dynamic(() =>
  import("@react-three/fiber").then((mod) => mod.Canvas)
);
import CanvasLoader from "./Loader";

const RenderModelProjects = ({ children }) => {
  const orbitControlsRef = useRef(); // Ref for OrbitControls
  const cameraPosition = [0, 4, 0]; // Initial camera position

  // Function to reset controls
  const resetControls = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset(); // Reset OrbitControls to default position
    }
  };

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(0, 0, 0); // Ensure target is centered
    }
  }, []);

  return (
    <div className="w-full h-full">
      <LazyCanvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: cameraPosition,
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          powerPreference: "high-performance",
          antialias: true, // Disable if not crucial
          alpha: true,
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          {children}
          <OrbitControls
            ref={orbitControlsRef} // Reference to OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={2}
            maxDistance={6}
            onEnd={resetControls} // Reset on interaction end
          />
        </Suspense>
      </LazyCanvas>
    </div>
  );
};

export default RenderModelProjects;
