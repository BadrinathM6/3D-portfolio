"use client";

import React, { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
const LazyCanvas = dynamic(() =>
  import("@react-three/fiber").then((mod) => mod.Canvas)
);
import CanvasLoader from "./Loader";
const RenderModelProjects = ({ children }) => {
  return (
    <div className="w-full h-full">
      <LazyCanvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 4, 0], // Adjusted camera position
          fov: 60, // Narrower field of view
          near: 0.1,
          far: 1000,
        }}
        performance={{ min: 0.5 }}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
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
            enableZoom
            enablePan
            enableRotate
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={2} // Add minimum zoom distance
            maxDistance={6} // Add maximum zoom distance
          />
        </Suspense>
      </LazyCanvas>
    </div>
  );
};
export default RenderModelProjects;
