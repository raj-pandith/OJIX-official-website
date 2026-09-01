"use client";
import { useState, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import TechNucleus from "./TechNucleus";
import TechOrbit from "./TechOrbit";
import TechParticles from "./TechParticles";
import TechConnection from "./TechConnection";
import { technologies, orbits } from "./techData";

function TechStackScene({ onMouseMove, hoveredTech, onHover, onLeave, reducedMotion, onNucleusPosition }) {
  const groupRef = useRef();
  const nucleusRef = useRef(null);
  
  // Track current hovered tech position for connection line
  const hoveredTechPosition = useMemo(() => {
    if (!hoveredTech) return null;
    
    // Find which orbit this tech is on
    for (const orbit of orbits) {
      if (orbit.technologies.includes(hoveredTech.name)) {
        const index = orbit.technologies.indexOf(hoveredTech.name);
        const angle = (Math.PI * 2 / orbit.technologies.length) * index;
        
        const x = orbit.radius * Math.cos(angle);
        const y = orbit.radius * Math.sin(angle) * Math.sin(orbit.tilt);
        const z = orbit.radius * Math.sin(angle) * Math.cos(orbit.tilt);
        
        return new THREE.Vector3(x, y, z);
      }
    }
    return null;
  }, [hoveredTech]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Entrance animation: pop from small to medium to big
    if (groupRef.current) {
      if (!reducedMotion) {
        const entranceDuration = 2.0;
        const progress = Math.min(time / entranceDuration, 1);
        
        // Spring-like popping effect
        let scale;
        if (progress < 0.3) {
          // Small to medium
          scale = THREE.MathUtils.lerp(0, 0.6, progress / 0.3);
        } else if (progress < 0.6) {
          // Medium pause
          scale = 0.6;
        } else {
          // Medium to big with spring bounce
          const springProgress = (progress - 0.6) / 0.4;
          const bounce = Math.sin(springProgress * Math.PI * 2) * 0.1;
          scale = THREE.MathUtils.lerp(0.6, 1.0, springProgress) + bounce;
        }
        
        groupRef.current.scale.setScalar(scale);
        
        // Very subtle rotation when not being controlled by orbit controls
        groupRef.current.rotation.y = time * 0.02;
      } else {
        // For reduced motion, just scale to 1 immediately
        groupRef.current.scale.setScalar(1);
      }
    }
    
    // Report nucleus position to parent for connection lines
    if (nucleusRef.current && onNucleusPosition) {
      onNucleusPosition(nucleusRef.current.position);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background particles */}
      <TechParticles count={150} reducedMotion={reducedMotion} />
      
      {/* Connection line to nucleus */}
      {hoveredTechPosition && nucleusRef.current && (
        <TechConnection
          hoveredTech={hoveredTech}
          techPosition={hoveredTechPosition}
          nucleusPosition={nucleusRef.current.position}
        />
      )}
      
      {/* Nucleus */}
      <TechNucleus 
        ref={nucleusRef}
        scale={1}
        hoveredTech={hoveredTech}
      />
      
      {/* Orbital planes */}
      {orbits.map((orbit) => (
        <TechOrbit
          key={orbit.id}
          orbit={orbit}
          technologies={technologies}
          onHover={onHover}
          onLeave={onLeave}
          hoveredTech={hoveredTech}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

export default function TechStack3D() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [nucleusPosition, setNucleusPosition] = useState(new THREE.Vector3(0, 0, 0));
  const reducedMotion = useReducedMotion();

  const handleHover = useCallback((tech) => {
    setHoveredTech(tech);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredTech(null);
  }, []);

  const handleNucleusPosition = useCallback((position) => {
    setNucleusPosition(position.clone());
  }, []);

  return (
    <div className="tech-stack-3d-container">
      <Canvas
        camera={{ position: [0, 5, 18], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          enableZoom
          enablePan
          minDistance={8}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
        <TechStackScene
          hoveredTech={hoveredTech}
          onHover={handleHover}
          onLeave={handleLeave}
          reducedMotion={reducedMotion}
          onNucleusPosition={handleNucleusPosition}
        />
      </Canvas>
      
      {/* Tech info overlay */}
      {hoveredTech && (
        <div className="tech-info-overlay">
          <div className="tech-info-card">
             <div className="tech-icon" style={{ width: '32px', height: '32px', borderRadius: '50%', background: hoveredTech.color || '#00D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold', flexShrink: 0 }}>{hoveredTech.name.charAt(0)}</div>
            <div>
              <h3 className="tech-name">{hoveredTech.name}</h3>
              <p className="tech-category">{hoveredTech.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
