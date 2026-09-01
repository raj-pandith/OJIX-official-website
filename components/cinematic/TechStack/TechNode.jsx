"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Technology configs: background color + logo color */
/* ------------------------------------------------------------------ */
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
	Git: { bg: "#F05032", color: "#FFFFFF" },
	GitHub: { bg: "#181717", color: "#FFFFFF" },
	Kafka: { bg: "#231F20", color: "#FFFFFF" },
	"C++": { bg: "#00599C", color: "#FFFFFF" },
	Figma: { bg: "#F24E1E", color: "#FFFFFF" },
	"Node.js": { bg: "#339933", color: "#FFFFFF" },
	Kubernetes: { bg: "#326CE5", color: "#FFFFFF" },
	TensorFlow: { bg: "#FF6F00", color: "#FFFFFF" },
	LangGraph: { bg: "#1A1A2E", color: "#FF9900" },
	Pinecone: { bg: "#0081A7", color: "#FFFFFF" },
	GraphQL: { bg: "#E535AB", color: "#FFFFFF" },
	Terraform: { bg: "#7B42BC", color: "#FFFFFF" },
	PyTorch: { bg: "#EE4C2C", color: "#FFFFFF" },
};

/* ------------------------------------------------------------------ */
/* Brand logo draw functions – pure Canvas 2D primitives */
/* ------------------------------------------------------------------ */
function drawReactLogo(ctx, cx, cy, r, color) {
	const c = r * 0.36;
	ctx.beginPath();
	ctx.arc(cx, cy - c * 1.5, c, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(cx - c * 1.5, cy + c * 0.75, c, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(cx + c * 1.5, cy + c * 0.75, c, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(cx, cy - c * 1.2);
	ctx.lineTo(cx + c * 1.2, cy + c * 0.45);
	ctx.moveTo(cx - c * 1.2, cy + c * 0.45);
	ctx.lineTo(cx, cy - c * 1.2);
	ctx.moveTo(cx + c * 1.2, cy + c * 0.45);
	ctx.lineTo(cx - c * 1.2, cy + c * 0.45);
	ctx.lineWidth = r * 0.12;
	ctx.strokeStyle = color;
	ctx.stroke();
}

function drawNextJsLogo(ctx, cx, cy, r, color) {
	const s = r * 0.8;
	const t = s * 0.14;
	ctx.beginPath();
	ctx.moveTo(cx, cy - s);
	ctx.lineTo(cx + s, cy - s * 0.6);
	ctx.lineTo(cx, cy - s * 0.2);
	ctx.lineTo(cx - s, cy - s * 0.6);
	ctx.closePath();
	ctx.moveTo(cx, cy - s * 0.2);
	ctx.lineTo(cx + s, cy + s * 0.2);
	ctx.lineTo(cx, cy + s);
	ctx.lineTo(cx - s, cy + s * 0.2);
	ctx.closePath();
	ctx.lineWidth = t;
	ctx.strokeStyle = color;
	ctx.stroke();
}

function drawJavaScriptLogo(ctx, cx, cy, r, color) {
	ctx.font = `bold ${r * 1.1}px "Segoe UI", Arial, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = color;
	ctx.fillText("JS", cx, cy);
}

function drawTypeScriptLogo(ctx, cx, cy, r, color) {
	ctx.beginPath();
	ctx.moveTo(cx - r * 0.85, cy - r * 0.85);
	ctx.lineTo(cx - r * 0.25, cy - r * 0.85);
	ctx.lineTo(cx - r * 0.25, cy);
	ctx.lineTo(cx - r * 0.85, cy);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.12;
	ctx.stroke();
	ctx.font = `bold ${r * 0.85}px "Segoe UI", Arial, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = color;
	ctx.fillText("TS", cx + r * 0.25, cy);
}

function drawTailwindLogo(ctx, cx, cy, r, color) {
	const s = r * 0.5;
	const w = r * 0.2;
	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 3 - row; col++) {
			ctx.beginPath();
			ctx.moveTo(cx + (col - 1) * s * 1.4 + row * s * 0.5 - w * 1.2, cy - row * s * 0.8 + s);
			ctx.lineTo(cx + (col - 1) * s * 1.4 + row * s * 0.5 + w * 1.2, cy - row * s * 0.8 + s);
			ctx.lineTo(cx + (col - 1) * s * 1.4 + row * s * 0.5 + w * 1.2, cy - row * s * 0.8 + s + w * 1.5);
			ctx.lineTo(cx + (col - 1) * s * 1.4 + row * s * 0.5 - w * 1.2, cy - row * s * 0.8 + s + w * 1.5);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();
		}
	}
}

function drawJavaLogo(ctx, cx, cy, r, color) {
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.15;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.15, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawSpringBootLogo(ctx, cx, cy, r, color) {
	const s = r * 0.55;
	ctx.beginPath();
	ctx.moveTo(cx - s, cy);
	ctx.bezierCurveTo(cx - s, cy - s * 0.7, cx - s * 0.3, cy - s, cx, cy - s);
	ctx.bezierCurveTo(cx + s * 0.5, cy - s, cx + s, cy - s * 0.5, cx + s, cy);
	ctx.bezierCurveTo(cx + s, cy + s * 0.6, cx + s * 0.3, cy + s, cx, cy + s);
	ctx.bezierCurveTo(cx - s * 0.5, cy + s, cx - s, cy + s * 0.5, cx - s, cy);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawPythonLogo(ctx, cx, cy, r, color) {
	const s = r * 0.28;
	ctx.beginPath();
	ctx.moveTo(cx + s, cy - s * 1.8);
	ctx.lineTo(cx + s * 1.4, cy);
	ctx.lineTo(cx + s, cy + s * 1.8);
	ctx.quadraticCurveTo(cx, cy + s * 2.2, cx - s, cy + s * 1.8);
	ctx.lineTo(cx - s * 1.4, cy);
	ctx.lineTo(cx - s, cy - s * 1.8);
	ctx.quadraticCurveTo(cx, cy - s * 2.2, cx + s, cy - s * 1.8);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.12;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx + s * 0.5, cy - s * 0.7, r * 0.06, 0, Math.PI * 2);
	ctx.arc(cx + s * 0.5, cy + s * 0.7, r * 0.06, 0, Math.PI * 2);
	ctx.arc(cx - s * 0.5, cy - s * 0.7, r * 0.06, 0, Math.PI * 2);
	ctx.arc(cx - s * 0.5, cy + s * 0.7, r * 0.06, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawFastAPILogo(ctx, cx, cy, r, color) {
	const cr = r * 0.75;
	ctx.beginPath();
	ctx.moveTo(cx + cr * 0.6, cy);
	ctx.lineTo(cx + cr, cy - cr * 0.8);
	ctx.quadraticCurveTo(cx + cr * 0.6, cy - cr * 1.4, cx, cy - cr * 1.4);
	ctx.quadraticCurveTo(cx - cr * 0.6, cy - cr * 1.4, cx - cr, cy - cr * 0.5);
	ctx.lineTo(cx - cr, cy + cr * 0.8);
	ctx.quadraticCurveTo(cx - cr * 0.6, cy + cr * 1.4, cx, cy + cr * 1.4);
	ctx.quadraticCurveTo(cx + cr * 0.6, cy + cr * 1.4, cx + cr, cy + cr * 0.8);
	ctx.lineTo(cx + cr * 0.6, cy);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx - cr * 0.5, cy - cr * 0.1);
	ctx.lineTo(cx + cr * 0.8, cy - cr * 0.1);
	ctx.stroke();
}

function drawMySQLLogo(ctx, cx, cy, r, color) {
	const s = r * 0.28;
	ctx.beginPath();
	ctx.moveTo(cx - s, cy);
	ctx.lineTo(cx - s * 0.5, cy);
	ctx.quadraticCurveTo(cx - s * 0.2, cy - s, cx + s * 0.2, cy - s);
	ctx.lineTo(cx + s * 0.6, cy - s);
	ctx.quadraticCurveTo(cx + s, cy - s * 0.4, cx + s, cy);
	ctx.lineTo(cx + s, cy + s);
	ctx.quadraticCurveTo(cx + s, cy + s * 1.4, cx + s * 0.6, cy + s * 1.4);
	ctx.lineTo(cx - s * 0.5, cy + s * 1.4);
	ctx.quadraticCurveTo(cx - s * 0.2, cy + s * 1.8, cx - s * 0.8, cy + s * 1.8);
	ctx.lineTo(cx - s, cy + s * 1.4);
	ctx.quadraticCurveTo(cx - s * 1.2, cy + s * 0.8, cx - s * 1.2, cy + s * 0.4);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy - s * 0.5, r * 0.12, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawPostgreSQLLogo(ctx, cx, cy, r, color) {
	ctx.beginPath();
	ctx.moveTo(cx - r * 0.4, cy - r * 0.8);
	ctx.quadraticCurveTo(cx, cy - r * 1.2, cx + r * 0.4, cy - r * 0.8);
	ctx.quadraticCurveTo(cx + r * 0.6, cy - r * 0.2, cx + r * 0.4, cy + r * 0.2);
	ctx.quadraticCurveTo(cx, cy + r * 0.5, cx - r * 0.2, cy + r * 0.3);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.12;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx - r * 0.3, cy - r * 0.1);
	ctx.quadraticCurveTo(cx + r * 0.1, cy - r * 0.4, cx + r * 0.4, cy - r * 0.05);
	ctx.quadraticCurveTo(cx + r * 0.2, cy + r * 0.2, cx - r * 0.3, cy + r * 0.1);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy + r * 0.6, r * 0.08, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawMongoDBLogo(ctx, cx, cy, r, color) {
	const lw = r * 0.16;
	ctx.beginPath();
	ctx.moveTo(cx - r * 0.5, cy - r * 0.7);
	ctx.lineTo(cx + r * 0.5, cy - r * 0.7);
	ctx.lineTo(cx + r * 0.7, cy - r * 0.3);
	ctx.lineTo(cx, cy + r * 0.7);
	ctx.lineTo(cx - r * 0.7, cy - r * 0.3);
	ctx.closePath();
	ctx.lineWidth = lw;
	ctx.lineJoin = "round";
	ctx.strokeStyle = color;
	ctx.stroke();
}

function drawRedisLogo(ctx, cx, cy, r, color) {
	const s = r * 0.55;
	for (let i = 0; i < 3; i++) {
		ctx.beginPath();
		ctx.moveTo(cx - s + i * 0.12 * r, cy + r * 0.5);
		ctx.quadraticCurveTo(cx - s * 0.7 + i * 0.12 * r, cy - r * 0.2, cx - s * 0.3 + i * 0.12 * r, cy - r * 0.5);
		ctx.quadraticCurveTo(cx - s * 0.1 + i * 0.12 * r, cy - r * 0.2, cx - s * 0.3 + i * 0.12 * r, cy + r * 0.5);
		ctx.strokeStyle = color;
		ctx.lineWidth = r * 0.1;
		ctx.stroke();
	}
}

function drawDockerLogo(ctx, cx, cy, r, color) {
	const w = r * 0.7;
	const h = r * 0.45;
	const bw = r * 0.06;
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			const x = cx - w + col * w * 0.55 + bw;
			const y = cy - h * 0.5 + row * h * 0.5;
			ctx.beginPath();
			ctx.rect(x, y, w * 0.35, h * 0.3);
			ctx.strokeStyle = color;
			ctx.lineWidth = bw;
			ctx.stroke();
		}
	}
	ctx.beginPath();
	ctx.moveTo(cx - w * 0.5, cy - h * 0.55);
	ctx.lineTo(cx - w * 0.5, cy - h * 0.7);
	ctx.lineTo(cx + w * 0.5, cy - h * 0.7);
	ctx.lineTo(cx + w * 0.5, cy - h * 0.55);
	ctx.strokeStyle = color;
	ctx.lineWidth = bw;
	ctx.stroke();
}

function drawGitLogo(ctx, cx, cy, r, color) {
	const s = r * 0.65;
	ctx.beginPath();
	ctx.moveTo(cx - s, cy);
	ctx.lineTo(cx, cy - s);
	ctx.lineTo(cx + s, cy);
	ctx.lineTo(cx + s * 0.5, cy);
	ctx.lineTo(cx, cy - s * 0.5);
	ctx.lineTo(cx, cy + s);
	ctx.lineTo(cx - s * 0.5, cy);
	ctx.closePath();
	ctx.lineWidth = r * 0.12;
	ctx.strokeStyle = color;
	ctx.lineJoin = "round";
	ctx.stroke();
}

function drawGitHubLogo(ctx, cx, cy, r, color) {
	ctx.font = `bold ${r * 1.3}px "Segoe UI", Arial, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = color;
	ctx.fillText("GH", cx, cy);
}

function drawKafkaLogo(ctx, cx, cy, r, color) {
	const s = r * 0.5;
	ctx.beginPath();
	ctx.moveTo(cx - s, cy - s * 0.7);
	ctx.quadraticCurveTo(cx, cy - s * 1.5, cx + s, cy - s * 0.7);
	ctx.quadraticCurveTo(cx, cy + s * 0.3, cx - s, cy - s * 0.7);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx - s * 0.3, cy - s * 0.3);
	ctx.quadraticCurveTo(cx, cy + s * 1.2, cx + s * 0.3, cy - s * 0.3);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy - s * 0.7, r * 0.1, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawCppLogo(ctx, cx, cy, r, color) {
	ctx.font = `bold ${r * 0.9}px "Segoe UI", Arial, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = color;
	ctx.fillText("C++", cx, cy);
}

function drawFigmaLogo(ctx, cx, cy, r, color) {
	ctx.font = `bold ${r * 1.1}px "Segoe UI", Arial, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = color;
	ctx.fillText("F", cx, cy);
}

function drawNodeJsLogo(ctx, cx, cy, r, color) {
	const s = r * 0.45;
	ctx.beginPath();
	ctx.moveTo(cx, cy - s * 1.2);
	ctx.lineTo(cx + s * 0.6, cy - s * 0.3);
	ctx.lineTo(cx + s * 0.3, cy + s * 1);
	ctx.lineTo(cx - s * 0.3, cy + s * 0.5);
	ctx.lineTo(cx - s * 0.6, cy - s * 0.3);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
}

function drawKubernetesLogo(ctx, cx, cy, r, color) {
	const s = r * 0.38;
	ctx.beginPath();
	ctx.moveTo(cx - s, cy);
	ctx.lineTo(cx, cy - s);
	ctx.lineTo(cx + s, cy);
	ctx.lineTo(cx, cy + s);
	ctx.closePath();
	ctx.lineWidth = r * 0.1;
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.08, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawTensorFlowLogo(ctx, cx, cy, r, color) {
	const s = r * 0.45;
	ctx.beginPath();
	ctx.moveTo(cx - s * 1.6, cy - s);
	ctx.lineTo(cx - s * 0.5, cy - s * 0.2);
	ctx.lineTo(cx - s * 0.5, cy - s * 1.3);
	ctx.moveTo(cx - s * 0.5, cy - s * 0.2);
	ctx.lineTo(cx + s * 1.6, cy - s * 1.1);
	ctx.moveTo(cx + s * 1.6, cy - s * 1.1);
	ctx.lineTo(cx + s * 1.1, cy - s * 0.4);
	ctx.moveTo(cx - s * 0.5, cy - s * 0.2);
	ctx.lineTo(cx + s * 1.1, cy + s * 0.4);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.1;
	ctx.stroke();
}

function drawLangGraphLogo(ctx, cx, cy, r, color) {
	const s = r * 0.3;
	ctx.lineWidth = r * 0.08;
	ctx.strokeStyle = color;
	ctx.lineJoin = "round";
	// Node 1 (top-left)
	ctx.beginPath();
	ctx.arc(cx - s * 1.5, cy - s * 1.5, s * 0.6, 0, Math.PI * 2);
	ctx.stroke();
	// Node 2 (top-right)
	ctx.beginPath();
	ctx.arc(cx + s * 1.5, cy - s * 1.5, s * 0.6, 0, Math.PI * 2);
	ctx.stroke();
	// Node 3 (bottom-left)
	ctx.beginPath();
	ctx.arc(cx - s * 1.5, cy + s * 1.5, s * 0.6, 0, Math.PI * 2);
	ctx.stroke();
	// Node 4 (bottom-right)
	ctx.beginPath();
	ctx.arc(cx + s * 1.5, cy + s * 1.5, s * 0.6, 0, Math.PI * 2);
	ctx.stroke();
	// Center dot
	ctx.beginPath();
	ctx.arc(cx, cy, s * 0.25, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawPineconeLogo(ctx, cx, cy, r, color) {
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.08;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawGraphQLLogo(ctx, cx, cy, r, color) {
	const s = r * 0.42;
	ctx.beginPath();
	ctx.arc(cx, cy - s * 1.2, s * 0.6, 0, Math.PI * 2);
	ctx.arc(cx, cy + s * 1.2, s * 0.6, 0, Math.PI * 2);
	ctx.arc(cx + s * 1.2, cy, s * 0.6, 0, Math.PI * 2);
	ctx.arc(cx - s * 1.2, cy, s * 0.6, 0, Math.PI * 2);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.08;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx - s * 1.2, cy);
	ctx.lineTo(cx + s * 1.2, cy);
	ctx.moveTo(cx, cy - s * 1.2);
	ctx.lineTo(cx, cy + s * 1.2);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.06;
	ctx.stroke();
}

function drawTerraformLogo(ctx, cx, cy, r, color) {
	const s = r * 0.28;
	const gap = r * 0.08;
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 2; col++) {
			const x = cx - s * 0.5 + col * s * 1.2;
			const y = cy - s * 1.2 + row * s * 1.1;
			ctx.beginPath();
			ctx.moveTo(x - s * 0.4, y + s * 0.5);
			ctx.lineTo(x - s * 0.4, y - s * 0.3);
			ctx.lineTo(x + s * 0.4, y + s * 0.3);
			ctx.lineTo(x + s * 0.4, y + s);
			ctx.strokeStyle = color;
			ctx.lineWidth = r * 0.08;
			ctx.stroke();
		}
	}
}

function drawPyTorchLogo(ctx, cx, cy, r, color) {
	const s = r * 0.45;
	ctx.beginPath();
	ctx.moveTo(cx - s * 1.2, cy - s * 0.8);
	ctx.lineTo(cx + s * 1.2, cy + s * 0.8);
	ctx.strokeStyle = color;
	ctx.lineWidth = r * 0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx + s * 1.2, cy - s * 0.8);
	ctx.lineTo(cx - s * 1.2, cy + s * 0.8);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx + s * 0.8, cy + s * 0.5, r * 0.15, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

/* ------------------------------------------------------------------ */
/* Map tech name -> draw function */
/* ------------------------------------------------------------------ */
const logoDrawers = {
	React: drawReactLogo,
	"Next.js": drawNextJsLogo,
	JavaScript: drawJavaScriptLogo,
	TypeScript: drawTypeScriptLogo,
	"Tailwind CSS": drawTailwindLogo,
	Java: drawJavaLogo,
	"Spring Boot": drawSpringBootLogo,
	Python: drawPythonLogo,
	FastAPI: drawFastAPILogo,
	MySQL: drawMySQLLogo,
	PostgreSQL: drawPostgreSQLLogo,
	MongoDB: drawMongoDBLogo,
	Redis: drawRedisLogo,
	Docker: drawDockerLogo,
	Git: drawGitLogo,
	GitHub: drawGitHubLogo,
	Kafka: drawKafkaLogo,
	"C++": drawCppLogo,
	Figma: drawFigmaLogo,
	"Node.js": drawNodeJsLogo,
	Kubernetes: drawKubernetesLogo,
	TensorFlow: drawTensorFlowLogo,
	LangGraph: drawLangGraphLogo,
	Pinecone: drawPineconeLogo,
	GraphQL: drawGraphQLLogo,
	Terraform: drawTerraformLogo,
	PyTorch: drawPyTorchLogo,
};

/* Techs whose logos are solid-filled shapes (not just outlines) */
const filledLogos = new Set([
	"React",
	"JavaScript",
	"Next.js",
	"Tailwind CSS",
	"Python",
	"Redis",
	"Docker",
	"Kafka",
	"C++",
	"Figma",
	"Node.js",
	"LangGraph",
	"Pinecone",
	"TensorFlow",
	"GraphQL",
	"Terraform",
	"PyTorch",
	"FastAPI",
	"MySQL",
	"PostgreSQL",
	"Kubernetes",
]);

/* ------------------------------------------------------------------ */
/* useTechLogoTexture hook */
/* ------------------------------------------------------------------ */
function useTechLogoTexture(techName) {
	const logoTexture = useMemo(() => {
		const size = 256;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		const h = size / 2;

		const config = techConfig[techName] || { bg: "#333333", color: "#FFFFFF" };

		// Background circle
		ctx.beginPath();
		ctx.arc(h, h, h - 4, 0, Math.PI * 2);
		ctx.fillStyle = config.bg;
		ctx.fill();

		// Subtle border ring
		ctx.strokeStyle = config.color;
		ctx.lineWidth = 6;
		ctx.globalAlpha = 0.3;
		ctx.stroke();
		ctx.globalAlpha = 1;

		// Draw brand logo
		const drawFn = logoDrawers[techName];
		if (drawFn) {
			const shouldFill = filledLogos.has(techName);
			ctx.save();
			ctx.globalAlpha = shouldFill ? 1 : 0.85;
			drawFn(ctx, h, h, h - 10, config.color);
			ctx.restore();
		} else {
			// Fallback: first letter
			ctx.fillStyle = config.color;
			ctx.font = `bold ${size * 0.35}px "Segoe UI", Arial, sans-serif`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			const letter = techName.charAt(0).toUpperCase();
			ctx.fillText(letter, h, h);
		}

		const tex = new THREE.CanvasTexture(canvas);
		tex.needsUpdate = true;
		tex.colorSpace = THREE.SRGBColorSpace;
		return tex;
	}, [techName]);

	return logoTexture;
}

/* ------------------------------------------------------------------ */
/* TechNode component */
/* ------------------------------------------------------------------ */
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
	const [initialPosition] = useState(position.clone());

	const logoTexture = useTechLogoTexture(technology.name);
	const techColor = technology.color || "#00D4FF";

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

			{/* Tech logo circle */}
			<mesh ref={circleRef}>
				<circleGeometry args={[radius * 0.92, 64]} />
				<meshBasicMaterial
					map={logoTexture}
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
