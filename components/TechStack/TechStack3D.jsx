"use client";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import * as THREE from "three";
import TechNucleus from "./TechNucleus";
import TechOrbit from "./TechOrbit";
import TechParticles from "./TechParticles";
import TechConnection from "./TechConnection";
import { technologies, orbits } from "./techData";

function CameraController({ isMobile, isInView, userInteracting }) {
 const { camera } = useThree();
 const targetRef = useRef(
 isMobile
 ? new THREE.Vector3(0, 3, 18)
 : new THREE.Vector3(0, 5, 100)
 );
 const lerpSpeed = useRef(0.06);

 useEffect(() => {
 if (isMobile) {
 targetRef.current.set(0, 3, 18);
 } else {
 targetRef.current.set(0, 5, 100);
 if (isInView) {
 targetRef.current.set(0, 5, 20);
 }
 }
 }, [isMobile, isInView]);

 useFrame(() => {
 if (userInteracting.current) return;
 camera.position.lerp(targetRef.current, lerpSpeed.current);
 camera.lookAt(0, 0, 0);
 });

 return null;
}

function TechStackScene({ hoveredTech, onHover, onLeave, reducedMotion }) {
 const groupRef = useRef();
 const nucleusRef = useRef(null);

 const hoveredTechPosition = useMemo(() => {
 if (!hoveredTech || !nucleusRef.current) return null;
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
 if (groupRef.current) {
 if (!reducedMotion) {
 const entranceDuration = 2.0;
 const progress = Math.min(time / entranceDuration, 1);
 let scale;
 if (progress < 0.3) {
 scale = THREE.MathUtils.lerp(0, 0.6, progress / 0.3);
 } else if (progress < 0.6) {
 scale = 0.6;
 } else {
 const springProgress = (progress - 0.6) / 0.4;
 const bounce = Math.sin(springProgress * Math.PI * 2) * 0.1;
 scale = THREE.MathUtils.lerp(0.6, 1.0, springProgress) + bounce;
 }
 groupRef.current.scale.setScalar(scale);
 groupRef.current.rotation.y = time * 0.02;
 } else {
 groupRef.current.scale.setScalar(1);
 }
 }
 });

 return (
 <group ref={groupRef}>
 <TechParticles count={150} reducedMotion={reducedMotion} />
 {hoveredTechPosition && nucleusRef.current && (
 <TechConnection
 hoveredTech={hoveredTech}
 techPosition={hoveredTechPosition}
 nucleusPosition={nucleusRef.current.position}
 />
 )}
 <TechNucleus
 ref={nucleusRef}
 scale={1}
 hoveredTech={hoveredTech}
 />
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

export default function TechStack3D({ onMobileInteractChange }) {
 const [hoveredTech, setHoveredTech] = useState(null);
 const [isInView, setIsInView] = useState(false);
 const [mobileInteract, setMobileInteract] = useState(false);
 const userInteracting = useRef(false);
 const reducedMotion = useReducedMotion();
 const isMobile = useMediaQuery("(max-width: 768px)");

 useEffect(() => {
 onMobileInteractChange?.(mobileInteract);
 }, [mobileInteract, onMobileInteractChange]);

 const handleHover = useCallback((tech) => setHoveredTech(tech), []);
 const handleLeave = useCallback(() => setHoveredTech(null), []);

 useEffect(() => {
 const el = document.getElementById("techstack");
 if (!el) return;
 const observer = new IntersectionObserver(
 ([entry]) => setIsInView(entry.isIntersecting),
 { threshold: 0.3 }
 );
 observer.observe(el);
 return () => observer.disconnect();
 }, []);

 const showOrbit = !isMobile || mobileInteract;

 return (
 <div className="tech-stack-3d-container">
 {isMobile && (
 <button
 type="button"
 className={`tech-stack-interact-btn ${mobileInteract ? "active" : ""}`}
 onClick={() => setMobileInteract(v => !v)}
 aria-pressed={mobileInteract}
 aria-label={mobileInteract ? "Exit interactive mode" : "Interact with tech stack"}
 >
 {mobileInteract ? (
 <span className="tech-stack-interact-btn-inner">
 <span className="tech-stack-interact-dot" />
 <span>Stop</span>
 </span>
 ) : (
 <span className="tech-stack-interact-btn-inner">
 <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <circle cx="12" cy="12" r="9" />
 <path d="M12 7v5l3 2" />
 </svg>
 <span>Interact</span>
 </span>
 )}
 </button>
 )}
 <Canvas
 camera={{ position: isMobile ? [0, 3, 18] : [0, 5, 100], fov: 70 }}
 gl={{
 antialias: true,
 alpha: true,
 powerPreference: "high-performance"
 }}
 dpr={[1, 2]}
 style={{
 width: "100%",
 height: "100%",
 background: "transparent"
 }}
 >
 <CameraController
 isMobile={isMobile}
 isInView={isInView}
 userInteracting={userInteracting}
 />
 {showOrbit && (
 <OrbitControls
 enableDamping
 dampingFactor={0.05}
 enableZoom={!isMobile || mobileInteract}
 enablePan={!isMobile || mobileInteract}
 enableRotate={!isMobile || mobileInteract}
 minDistance={8}
 maxDistance={100}
 maxPolarAngle={Math.PI / 2}
 minPolarAngle={Math.PI / 6}
 onStart={() => { userInteracting.current = true; }}
 onEnd={() => {
 setTimeout(() => { userInteracting.current = false; }, 800);
 }}
 />
 )}
 <TechStackScene
 hoveredTech={hoveredTech}
 onHover={handleHover}
 onLeave={handleLeave}
 reducedMotion={reducedMotion}
 />
 </Canvas>

 {hoveredTech && (showOrbit || !isMobile) && (
 <div className="tech-info-overlay">
 <div className="tech-info-card">
 <img
 src={hoveredTech.icon}
 alt={hoveredTech.name}
 className="tech-icon"
 />
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
