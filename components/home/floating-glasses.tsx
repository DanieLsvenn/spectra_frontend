"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function GlassesModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  const frameColor = "#7C3AED";
  const lensColor = "#06B6D4";

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} scale={1.2} position={[0, 0, 0]}>
        {/* Left Lens Frame */}
        <mesh position={[-0.65, 0, 0]}>
          <torusGeometry args={[0.45, 0.06, 16, 48]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Left Lens */}
        <mesh position={[-0.65, 0, 0]}>
          <circleGeometry args={[0.4, 48]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            thickness={0.1}
            roughness={0}
            chromaticAberration={0.03}
            anisotropy={0.1}
            color={lensColor}
            backside={false}
          />
        </mesh>

        {/* Right Lens Frame */}
        <mesh position={[0.65, 0, 0]}>
          <torusGeometry args={[0.45, 0.06, 16, 48]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Right Lens */}
        <mesh position={[0.65, 0, 0]}>
          <circleGeometry args={[0.4, 48]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            thickness={0.1}
            roughness={0}
            chromaticAberration={0.03}
            anisotropy={0.1}
            color={lensColor}
            backside={false}
          />
        </mesh>

        {/* Bridge */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.2, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Left Temple (arm) */}
        <mesh position={[-1.15, 0, -0.3]} rotation={[0, 0.6, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.04]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Right Temple (arm) */}
        <mesh position={[1.15, 0, -0.3]} rotation={[0, -0.6, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.04]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Decorative sparkle elements */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 1.2 + Math.random() * 0.5;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.5,
                -0.5 + Math.random(),
              ]}
              scale={0.03 + Math.random() * 0.03}
            >
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={
                  [
                    "#EC4899",
                    "#FB923C",
                    "#06B6D4",
                    "#FACC15",
                    "#84CC16",
                    "#A855F7",
                  ][i]
                }
                emissive={
                  [
                    "#EC4899",
                    "#FB923C",
                    "#06B6D4",
                    "#FACC15",
                    "#84CC16",
                    "#A855F7",
                  ][i]
                }
                emissiveIntensity={0.5}
                metalness={1}
                roughness={0}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export function FloatingGlasses() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight
          position={[-5, -2, 3]}
          intensity={0.4}
          color="#EC4899"
        />
        <pointLight position={[0, 3, 2]} intensity={0.6} color="#06B6D4" />
        <GlassesModel />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
