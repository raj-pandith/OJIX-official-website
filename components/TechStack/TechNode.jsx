"use client";
import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import TechLogoTexture, { techConfig } from "./TechLogoTexture";

export default function TechNode({
	technology,
	position,
	onHover,
	onLeave,
	isHovered,
	index,
}) {
	const nodeRef = useRef();
	const circleRef = useRef();
	const glowRef = useRef();
	const bgRef = useRef();
	const borderRef = useRef();
	const materialRef = useRef(null);
	const logoTextureRef = useRef(null);
	const [initialPosition] = useState(position.clone());
	const [texture, setTexture] = useState(null);

	const techColor = technology.color || "#00D4FF";

	// Create a lightweight initial texture (colored circle + fallback letter)
	// directly in this component, so the material has a `map` from first paint.
	useLayoutEffect(() => {
		const config = techConfig[technology.name] || {
			bg: "#333333",
			color: "#FFFFFF",
		};
		const size = 256;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		const h = size / 2;

		ctx.beginPath();
		ctx.arc(h, h, h - 4, 0, Math.PI * 2);
		ctx.fillStyle = config.bg;
		ctx.fill();

		ctx.strokeStyle = config.color;
		ctx.lineWidth = 6;
		ctx.globalAlpha = 0.25;
		ctx.stroke();
		ctx.globalAlpha = 1;

		const letter = technology.name.charAt(0).toUpperCase();
		ctx.fillStyle = config.color;
		ctx.font = `bold ${size * 0.3}px "Segoe UI", Arial, sans-serif`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(letter, h, h);

		const tex = new THREE.CanvasTexture(canvas);
		tex.needsUpdate = true;
		tex.colorSpace = THREE.SRGBColorSpace;
		setTexture(tex);

		// Also apply directly if material is already attached
		if (materialRef.current) {
			materialRef.current.map = tex;
			materialRef.current.needsUpdate = true;
		}
	}, [technology.name]);

	const handleTextureReady = useCallback((tex) => {
		logoTextureRef.current = tex;
		// Apply directly to material (avoids extra re-render)
		if (materialRef.current) {
			materialRef.current.map = tex;
			materialRef.current.needsUpdate = true;
		}
	}, []);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		if (nodeRef.current) {
			const floatY = Math.sin(time * 0.5 + index) * 0.12;
			const floatX = Math.cos(time * 0.3 + index * 0.5) * 0.06;

			if (!isHovered) {
				nodeRef.current.position.y = initialPosition.y + floatY;
				nodeRef.current.position.x = initialPosition.x + floatX;
			}

			const targetScale = isHovered ? 1.2 : 1;
			nodeRef.current.scale.setScalar(
				THREE.MathUtils.lerp(nodeRef.current.scale.x, targetScale, 0.1),
			);

			if (isHovered) {
				nodeRef.current.position.z = THREE.MathUtils.lerp(
					nodeRef.current.position.z,
					initialPosition.z + 0.5,
					0.1,
				);
			} else {
				nodeRef.current.position.z = THREE.MathUtils.lerp(
					nodeRef.current.position.z,
					initialPosition.z,
					0.1,
				);
			}

			if (circleRef.current) circleRef.current.lookAt(state.camera.position);
			if (bgRef.current) bgRef.current.lookAt(state.camera.position);
		}

		if (glowRef.current) {
			const targetOpacity = isHovered ? 0.4 : 0.18;
			glowRef.current.material.opacity = THREE.MathUtils.lerp(
				glowRef.current.material.opacity,
				targetOpacity,
				0.08,
			);
			const pulse = 1 + Math.sin(time * 1.5 + index) * 0.06;
			const targetScale = (isHovered ? 1.6 : 1.2) * pulse;
			glowRef.current.scale.setScalar(
				THREE.MathUtils.lerp(glowRef.current.scale.x, targetScale, 0.08),
			);
		}

		if (borderRef.current) {
			const targetOpacity = isHovered ? 0.9 : 0.45;
			borderRef.current.material.opacity = THREE.MathUtils.lerp(
				borderRef.current.material.opacity,
				targetOpacity,
				0.08,
			);
		}
	});

	const radius = 0.7;

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
			{/* Async SVG texture loader — renders the SVG onto a canvas and
			 delivers the Three.js texture via onReady */}
			<TechLogoTexture
				techName={technology.name}
				onReady={handleTextureReady}
			/>

			{/* Outer glow */}
			<mesh ref={glowRef}>
				<circleGeometry args={[radius * 1.5, 64]} />
				<meshBasicMaterial
					color={techColor}
					transparent
					opacity={0.18}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Dark background circle */}
			<mesh ref={bgRef}>
				<circleGeometry args={[radius * 1.08, 64]} />
				<meshBasicMaterial
					color="#0A0A14"
					transparent
					opacity={0.9}
					side={THREE.DoubleSide}
					depthWrite={false}
				/>
			</mesh>

			{/* Color border ring */}
			<mesh ref={borderRef}>
				<ringGeometry args={[radius * 0.95, radius * 1.04, 64]} />
				<meshBasicMaterial
					color={techColor}
					transparent
					opacity={0.45}
					side={THREE.DoubleSide}
					depthWrite={false}
				/>
			</mesh>

			{/* Tech logo circle — `map` starts as the initial fallback texture,
			 then gets swapped by handleTextureReady when the SVG loads */}
			<mesh ref={circleRef}>
				<circleGeometry args={[radius * 0.92, 64]} />
				<meshBasicMaterial
					ref={materialRef}
					map={texture}
					transparent
					depthWrite={false}
					toneMapped={false}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Technology name below */}
			<Text
				position={[0, -1.15, 0]}
				fontSize={0.11}
				color="#FFFFFF"
				anchorX="center"
				anchorY="middle"
				transparent
				opacity={0.65}
			>
				{technology.name}
			</Text>
		</group>
	);
}
