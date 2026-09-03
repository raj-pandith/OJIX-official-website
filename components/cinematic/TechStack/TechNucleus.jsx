"use client";
import { useRef, useMemo, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TechNucleus = forwardRef(({ scale = 1, hoveredTech = null }, ref) => {
	const nucleusRef = useRef();
	const particlesRef = useRef();
	const glowRef = useRef();

	// Create nucleus particles
	const nucleusParticles = useMemo(() => {
		const particles = [];
		const particleCount = 80;

		for (let i = 0; i < particleCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const radius = 0.8 + Math.random() * 0.4;

			particles.push({
				position: new THREE.Vector3(
					radius * Math.sin(phi) * Math.cos(theta),
					radius * Math.sin(phi) * Math.sin(theta),
					radius * Math.cos(phi),
				),
				color: Math.random() > 0.6 ? '#c9662f' : (Math.random() > 0.3 ? '#00D4FF' : '#FFFFFF'),
				size: 0.03 + Math.random() * 0.05,
				speed: 0.5 + Math.random() * 1.5,
				offset: Math.random() * Math.PI * 2,
			});
		}

		return particles;
	}, []);

	// Create surface energy particles
	const surfaceParticles = useMemo(() => {
		const particles = [];
		const particleCount = 40;

		for (let i = 0; i < particleCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);

			particles.push({
				theta,
				phi,
				radius: 1.2,
				speed: 0.3 + Math.random() * 0.5,
				offset: Math.random() * Math.PI * 2,
			});
		}

		return particles;
	}, []);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Rotate nucleus
		if (nucleusRef.current) {
			nucleusRef.current.rotation.y = time * 0.1;
			nucleusRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
		}

		// Pulse effect
		const pulse = 1 + Math.sin(time * 2) * 0.05;
		if (glowRef.current) {
			glowRef.current.scale.setScalar(pulse * scale);
		}

		// Animate nucleus particles
		if (particlesRef.current) {
			const positions = particlesRef.current.geometry.attributes.position.array;

			nucleusParticles.forEach((particle, i) => {
				const idx = i * 3;
				const timeOffset = time * particle.speed + particle.offset;

				// Subtle orbital motion
				const x = particle.position.x + Math.sin(timeOffset) * 0.05;
				const y = particle.position.y + Math.cos(timeOffset) * 0.05;
				const z = particle.position.z + Math.sin(timeOffset * 0.7) * 0.05;

				positions[idx] = x * scale;
				positions[idx + 1] = y * scale;
				positions[idx + 2] = z * scale;
			});

			particlesRef.current.geometry.attributes.position.needsUpdate = true;
		}

		// Intensify when tech is hovered
		if (hoveredTech && glowRef.current) {
			glowRef.current.material.opacity = THREE.MathUtils.lerp(
				glowRef.current.material.opacity,
				0.8,
				0.1,
			);
		} else if (glowRef.current) {
			glowRef.current.material.opacity = THREE.MathUtils.lerp(
				glowRef.current.material.opacity,
				0.4,
				0.1,
			);
		}
	});

	return (
		<group ref={nucleusRef}>
			{/* Core sphere — fully transparent, just a geometric placeholder */}
			<mesh scale={scale}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshBasicMaterial
					transparent
					opacity={0}
					depthWrite={false}
				/>
			</mesh>

			{/* Inner glow */}
			<mesh scale={scale * 1.1}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshBasicMaterial
					color="#c9662f"
					transparent
					opacity={0.15}
					blending={THREE.AdditiveBlending}
				/>
			</mesh>

			{/* Outer glow */}
			<mesh ref={glowRef} scale={scale * 1.4}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshBasicMaterial
					color="#c9662f"
					transparent
					opacity={0.4}
					blending={THREE.AdditiveBlending}
				/>
			</mesh>

			{/* Cyan glow accent */}
			<mesh scale={scale * 1.2}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshBasicMaterial
					color="#00D4FF"
					transparent
					opacity={0.1}
					blending={THREE.AdditiveBlending}
				/>
			</mesh>

			{/* Nucleus particles */}
			<points ref={particlesRef} scale={scale}>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={nucleusParticles.length}
						array={new Float32Array(nucleusParticles.length * 3)}
						itemSize={3}
					/>
					<bufferAttribute
						attach="attributes-color"
						count={nucleusParticles.length}
						array={new Float32Array(nucleusParticles.length * 3)}
						itemSize={3}
					/>
					<bufferAttribute
						attach="attributes-size"
						count={nucleusParticles.length}
						array={new Float32Array(nucleusParticles.map(p => p.size))}
						itemSize={1}
					/>
				</bufferGeometry>
				<pointsMaterial
					size={0.05}
					vertexColors
					transparent
					opacity={0.8}
					blending={THREE.AdditiveBlending}
					sizeAttenuation
				/>
			</points>

			{/* Surface energy particles */}
			<points scale={scale}>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={surfaceParticles.length}
						array={new Float32Array(surfaceParticles.length * 3)}
						itemSize={3}
					/>
				</bufferGeometry>
				<pointsMaterial
					size={0.03}
					color="#FFFFFF"
					transparent
					opacity={0.6}
					blending={THREE.AdditiveBlending}
					sizeAttenuation
				/>
			</points>
		</group>
	);
});

TechNucleus.displayName = 'TechNucleus';

export default TechNucleus;
