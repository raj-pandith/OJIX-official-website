"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TechConnection({ 
  hoveredTech, 
  techPosition, 
  nucleusPosition 
}) {
  const lineRef = useRef();
  const particleRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (!hoveredTech || !lineRef.current || !techPosition || !nucleusPosition) return;
    
    // Update line geometry to connect tech position to nucleus
    const positions = lineRef.current.geometry.attributes.position.array;
    positions[0] = techPosition.x;
    positions[1] = techPosition.y;
    positions[2] = techPosition.z;
    positions[3] = nucleusPosition.x;
    positions[4] = nucleusPosition.y;
    positions[5] = nucleusPosition.z;
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Animate particle traveling along the line
    if (particleRef.current) {
      const t = (time * 2) % 1;
      const particlePos = new THREE.Vector3().lerpVectors(
        techPosition,
        nucleusPosition,
        t
      );
      particleRef.current.position.copy(particlePos);
      
      // Fade particle in/out at ends
      const fade = Math.sin(t * Math.PI);
      particleRef.current.children.forEach(child => {
        if (child.material) {
          child.material.opacity = fade * 0.8;
        }
      });
    }
  });

  if (!hoveredTech || !techPosition || !nucleusPosition) return null;

  const linePositions = new Float32Array([
    techPosition.x, techPosition.y, techPosition.z,
    nucleusPosition.x, nucleusPosition.y, nucleusPosition.z
  ]);

  return (
    <group>
      {/* Connection line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#c9662f"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </line>
      
      {/* Traveling particle with glow */}
      <group ref={particleRef}>
        <mesh>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial
            color="#c9662f"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
