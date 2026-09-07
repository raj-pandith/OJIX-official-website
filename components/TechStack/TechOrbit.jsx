"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TechNode from "./TechNode";

export default function TechOrbit({
 orbit,
 technologies,
 onHover,
 onLeave,
 hoveredTech,
 reducedMotion
}) {
 const orbitRef = useRef();
 const trailRef = useRef();

 // Calculate positions for technologies on this orbit
 const techPositions = useMemo(() => {
 const positions = [];
 const { technologies: techNames, radius, tilt } = orbit;

 techNames.forEach((techName, index) => {
 // Equal angular spacing around the orbit
 const angle = (Math.PI * 2 / techNames.length) * index;

 // Calculate position on tilted orbit
 const x = radius * Math.cos(angle);
 const y = radius * Math.sin(angle) * Math.sin(tilt);
 const z = radius * Math.sin(angle) * Math.cos(tilt);

 positions.push(new THREE.Vector3(x, y, z));
 });

 return positions;
 }, [orbit]);

 // Get technology objects
 const orbitTechs = useMemo(() => {
 return orbit.technologies.map(name =>
 technologies.find(t => t.name === name)
 ).filter(Boolean);
 }, [orbit.technologies, technologies]);

 useFrame((state) => {
 const time = state.clock.getElapsedTime();

 if (orbitRef.current && !reducedMotion) {
 // Rotate orbit
 const rotationSpeed = (1 / orbit.speed) * orbit.direction;
 orbitRef.current.rotation.y = time * rotationSpeed;
 }

 // Animate trail particles
 if (trailRef.current && !reducedMotion) {
 const positions = trailRef.current.geometry.attributes.position.array;
 const particleCount = positions.length / 3;

 for (let i = 0; i < particleCount; i++) {
 const idx = i * 3;
 const angle = (i / particleCount) * Math.PI * 2 + time * 0.5;

 positions[idx] = orbit.radius * Math.cos(angle);
 positions[idx + 1] = orbit.radius * Math.sin(angle) * Math.sin(orbit.tilt);
 positions[idx + 2] = orbit.radius * Math.sin(angle) * Math.cos(orbit.tilt);
 }

 trailRef.current.geometry.attributes.position.needsUpdate = true;
 }
 });

 return (
 <group ref={orbitRef}>
 {/* Orbital path line */}
 <mesh rotation={[orbit.tilt, 0, 0]}>
 <ringGeometry args={[orbit.radius - 0.02, orbit.radius + 0.02, 64]} />
 <meshBasicMaterial
 color={orbit.id % 2 === 0 ? "#00D4FF" : "#c9662f"}
 transparent
 opacity={0.15}
 side={THREE.DoubleSide}
 blending={THREE.AdditiveBlending}
 />
 </mesh>

 {/* Glowing trail particles */}
 <points ref={trailRef}>
 <bufferGeometry>
 <bufferAttribute
 attach="attributes-position"
 count={32}
 array={new Float32Array(32 * 3)}
 itemSize={3}
 />
 </bufferGeometry>
 <pointsMaterial
 size={0.03}
 color={orbit.id % 2 === 0 ? "#00D4FF" : "#c9662f"}
 transparent
 opacity={0.4}
 blending={THREE.AdditiveBlending}
 sizeAttenuation
 />
 </points>

 {/* Technology nodes */}
 {orbitTechs.map((tech, index) => (
 <TechNode
 key={tech.name}
 technology={tech}
 position={techPositions[index]}
 onHover={onHover}
 onLeave={onLeave}
 isHovered={hoveredTech?.name === tech.name}
 index={index}
 totalNodes={orbitTechs.length}
 />
 ))}
 </group>
 );
}
