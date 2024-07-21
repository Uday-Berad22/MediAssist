"use client";
import CanvasLoader from "@/components/Loader/ProgressLoader";
import { OrbitControls, Preload } from "@react-three/drei";
import React, { Suspense } from "react";
import EarthScene from "./Earth";
import { Canvas } from "@react-three/fiber";

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <EarthScene />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
