"use client";
import { useRef, useLayoutEffect, useCallback } from "react";
import * as THREE from "three";

const techConfig = {
	React: { bg: "#20232A", color: "#61DAFB" },
	"Next.js": { bg: "#111111", color: "#FFFFFF" },
	JavaScript: { bg: "#F7DF1E", color: "#000000" },
	TypeScript: { bg: "#3178C6", color: "#FFFFFF" },
	"Tailwind CSS": { bg: "#0B1120", color: "#06B6D4" },
	Java: { bg: "#007396", color: "#FFFFFF" },
	"Spring Boot": { bg: "#6DB33F", color: "#FFFFFF" },
	Python: { bg: "#3776AB", color: "#FFD43B" },
	FastAPI: { bg: "#0052CC", color: "#FFFFFF" },
	MySQL: { bg: "#4479A1", color: "#FFFFFF" },
	PostgreSQL: { bg: "#336791", color: "#FFFFFF" },
	MongoDB: { bg: "#47A248", color: "#FFFFFF" },
	Redis: { bg: "#DC382D", color: "#FFFFFF" },
	Docker: { bg: "#2496ED", color: "#FFFFFF" },
	AWS: { bg: "#232F3E", color: "#FF9900" },
	Cloudflare: { bg: "#F38020", color: "#FFFFFF" },
	Git: { bg: "#F05032", color: "#FFFFFF" },
	GitHub: { bg: "#181717", color: "#FFFFFF" },
	Kafka: { bg: "#231F20", color: "#FFFFFF" },
	Angular: { bg: "#DD0031", color: "#FFFFFF" },
	"C++": { bg: "#00599C", color: "#FFFFFF" },
	Figma: { bg: "#F24E1E", color: "#FFFFFF" },
	"Node.js": { bg: "#339933", color: "#FFFFFF" },
	Kubernetes: { bg: "#326CE5", color: "#FFFFFF" },
	TensorFlow: { bg: "#FF6F00", color: "#FFFFFF" },
	LangChain: { bg: "#1A1A2E", color: "#00D4FF" },
	LangGraph: { bg: "#1A1A2E", color: "#FF9900" },
	Pinecone: { bg: "#0081A7", color: "#FFFFFF" },
	GraphQL: { bg: "#E535AB", color: "#FFFFFF" },
	Terraform: { bg: "#7B42BC", color: "#FFFFFF" },
	PyTorch: { bg: "#EE4C2C", color: "#FFFFFF" },
	Go: { bg: "#00ADD8", color: "#FFFFFF" },
	"Hugging Face": { bg: "#FFD21E", color: "#000000" },
	"LlamaIndex": { bg: "#1A1A2E", color: "#00D4FF" },
};

const svgFileMap = {
	React: "react-icon.svg",
	"Next.js": "nextjs-icon.svg",
	JavaScript: "javascript-icon.svg",
	TypeScript: "typescript-icon.svg",
	Java: "java-icon.svg",
	"Spring Boot": "spring-icon.svg",
	Python: "python-icon.svg",
	FastAPI: "fastapi-icon.svg",
	MySQL: "mysql-icon.svg",
	PostgreSQL: "postgresql-icon.svg",
	MongoDB: "mongodb-icon.svg",
	Redis: "redis-icon.svg",
	Docker: "docker-icon.svg",
	AWS: "aws-icon.svg",
	Cloudflare: "cloudflare-icon.svg",
	Git: "git-icon.svg",
	GitHub: "github-icon.svg",
	Kafka: "kafka-icon.svg",
	Angular: "angular-icon.svg",
	Figma: "figma-icon.svg",
	"Node.js": "nodejs-icon.svg",
	Kubernetes: "kubernetes-icon.svg",
	TensorFlow: "tensorflow-icon.svg",
	LangChain: "langchain-icon.svg",
	LangGraph: "langchain-icon.svg",
	Pinecone: "langchain-icon.svg",
	GraphQL: null,
	Go: "go-icon.svg",
	"Hugging Face": "hugging-face-icon.svg",
	"LlamaIndex": "llamaindex-icon.svg",
	PyTorch: "pytorch-icon.svg",
};

// Creates a Three.js texture for a tech logo.
// Immediately returns a texture with a colored background + fallback letter,
// then asynchronously loads the SVG icon and updates the texture.
function TechLogoTexture({ techName, onReady }) {
	useLayoutEffect(() => {
		const config = techConfig[techName] || { bg: "#333333", color: "#FFFFFF" };
		const size = 256;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		const h = size / 2;

		// Draw background circle
		ctx.beginPath();
		ctx.arc(h, h, h - 4, 0, Math.PI * 2);
		ctx.fillStyle = config.bg;
		ctx.fill();

		// Border ring
		ctx.strokeStyle = config.color;
		ctx.lineWidth = 6;
		ctx.globalAlpha = 0.25;
		ctx.stroke();
		ctx.globalAlpha = 1;

		// Fallback letter
		const letter = techName.charAt(0).toUpperCase();
		ctx.fillStyle = config.color;
		const fontScale = size * 0.3;
		ctx.font = `bold ${fontScale}px "Segoe UI", Arial, sans-serif`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(letter, h, h);

		// Create the texture with the fallback
		const tex = new THREE.CanvasTexture(canvas);
		tex.needsUpdate = true;
		tex.colorSpace = THREE.SRGBColorSpace;
		onReady(tex);

		// Load SVG and draw onto canvas
		const svgFile = svgFileMap[techName];
		if (!svgFile) return;

		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			ctx.clearRect(0, 0, size, size);
			ctx.beginPath();
			ctx.arc(h, h, h - 4, 0, Math.PI * 2);
			ctx.fillStyle = config.bg;
			ctx.fill();
			ctx.strokeStyle = config.color;
			ctx.lineWidth = 6;
			ctx.globalAlpha = 0.25;
			ctx.stroke();
			ctx.globalAlpha = 1;

			const svgSize = h * 1.5;
			const aspectRatio = img.width / img.height;
			const drawW = aspectRatio >= 1 ? svgSize : svgSize * aspectRatio;
			const drawH = aspectRatio >= 1 ? svgSize / aspectRatio : svgSize;
			ctx.drawImage(img, h - drawW / 2, h - drawH / 2, drawW, drawH);

			// Signal that the canvas has been redrawn
			tex.needsUpdate = true;
			onReady(tex);
		};
		img.onerror = () => { /* keep fallback letter */ };
		img.src = `/tech-stack-svg-icons/${svgFile}`;
	}, [techName, onReady]);

	return null;
}

export { techConfig, svgFileMap };
export default TechLogoTexture;
