"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function TechNode({ 
  technology, 
  position, 
  onHover, 
  onLeave,
  isHovered,
  index,
  totalNodes
}) {
  const nodeRef = useRef();
  const glowRef = useRef();
  const cardRef = useRef();
  const [initialPosition] = useState(position.clone());
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (nodeRef.current) {
      // Floating animation
      const floatY = Math.sin(time * 0.5 + index) * 0.1;
      const floatX = Math.cos(time * 0.3 + index * 0.5) * 0.05;
      
      if (!isHovered) {
        nodeRef.current.position.y = initialPosition.y + floatY;
        nodeRef.current.position.x = initialPosition.x + floatX;
      }
      
      // Scale on hover
      const targetScale = isHovered ? 1.3 : 1;
      nodeRef.current.scale.setScalar(
        THREE.MathUtils.lerp(nodeRef.current.scale.x, targetScale, 0.1)
      );
      
      // Move toward camera on hover
      if (isHovered) {
        nodeRef.current.position.z = THREE.MathUtils.lerp(
          nodeRef.current.position.z,
          initialPosition.z + 0.5,
          0.1
        );
      } else {
        nodeRef.current.position.z = THREE.MathUtils.lerp(
          nodeRef.current.position.z,
          initialPosition.z,
          0.1
        );
      }
      
      // Always face the camera (billboard effect)
      if (cardRef.current) {
        cardRef.current.lookAt(state.camera.position);
      }
    }
    
    // Glow intensity
    if (glowRef.current) {
      const targetOpacity = isHovered ? 0.8 : 0.3;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        targetOpacity,
        0.1
      );
      
      const targetScale = isHovered ? 1.5 : 1;
      glowRef.current.scale.setScalar(
        THREE.MathUtils.lerp(glowRef.current.scale.x, targetScale, 0.1)
      );
    }
  });

  const techColor = technology.color || "#00D4FF";
  const accentColor = "#FF5C00";

  return (
    <group 
      ref={nodeRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(technology);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onLeave();
      }}
    >
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color={techColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Card group that always faces camera */}
      <group ref={cardRef}>
        {/* Background card for text */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[1.2, 0.8]} />
          <meshBasicMaterial
            color="#0A0A0E"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Border around card */}
        <mesh position={[0, 0, 0.11]}>
          <ringGeometry args={[0.5, 0.52, 32]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={isHovered ? 0.8 : 0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Technology icon */}
        <Text
          position={[0, 0.15, 0.2]}
          fontSize={0.25}
          color={techColor}
          anchorX="center"
          anchorY="middle"
          transparent
          opacity={0.9}
        >
          {technology.icon}
        </Text>
        
        {/* Technology name */}
        <Text
          position={[0, -0.15, 0.2]}
          fontSize={0.1}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          transparent
          opacity={0.8}
        >
          {technology.name}
        </Text>
      </group>
    </group>
  );
}
