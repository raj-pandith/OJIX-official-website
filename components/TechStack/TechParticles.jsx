"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TechParticles({ count = 200, reducedMotion = false }) {
  const particlesRef = useRef();
  
  // Create background particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a sphere around the scene
      const radius = 10 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random colors: blue, cyan, orange, white
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Blue
        colors[i3] = 0;
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 1;
      } else if (colorChoice < 0.5) {
        // Orange
        colors[i3] = 1;
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 0;
      } else if (colorChoice < 0.7) {
        // White
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else {
        // Dark blue
        colors[i3] = 0.2;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 0.8;
      }
      
      sizes[i] = 0.02 + Math.random() * 0.04;
    }
    
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current && !reducedMotion) {
      const time = state.clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      // Subtle particle movement
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const speed = 0.1 + Math.random() * 0.2;
        
        positions[i3] += Math.sin(time * speed + i) * 0.005;
        positions[i3 + 1] += Math.cos(time * speed + i) * 0.005;
        positions[i3 + 2] += Math.sin(time * speed * 0.5 + i) * 0.005;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Slow rotation of entire particle system
      particlesRef.current.rotation.y = time * 0.02;
      particlesRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
