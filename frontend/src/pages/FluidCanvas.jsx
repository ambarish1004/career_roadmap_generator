import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ParticleBurst from "./MouseTrail";


const FluidCanvas = () => {
  return (
    <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            background: "#000"
        }}
        >
        <ambientLight intensity={2} />
        <ParticleBurst />
    </Canvas>
  );
};

export default FluidCanvas;
