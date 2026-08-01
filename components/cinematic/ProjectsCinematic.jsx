"use client";
import { motion, useReducedMotion } from "framer-motion";

const PROJECTS = [
  {
    title: "Servana",
    desc: "AI-powered SaaS platform for enterprise workflow automation and team orchestration.",
    year: "2025",
    tags: ["AI", "React", "Node.js", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #FF5C00 0%, #FF8F5C 100%)",
  },
  {
    title: "Stitched Health",
    desc: "HealthTech platform connecting patients with care providers through intelligent matching.",
    year: "2025",
    tags: ["HealthTech", "Python", "AWS", "React"],
    gradient: "linear-gradient(135deg, #00D4FF 0%, #0077B6 100%)",
  },
  {
    title: "Dronetjek",
    desc: "End-to-end drone fleet management system with real-time telemetry and route optimization.",
    year: "2026",
    tags: ["Logistics", "IoT", "Kubernetes", "Go"],
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
  },
  {
    title: "Scoutify",
    desc: "Talent scouting platform using ML to identify and match engineering candidates at scale.",
    year: "2025",
    tags: ["ML", "TypeScript", "GraphQL", "Redis"],
    gradient: "linear-gradient(135deg, #FF5C00 0%, #FFB347 100%)",
  },
  {
    title: "ExecMind",
    desc: "Executive decision-intelligence dashboard synthesizing real-time business signals.",
    year: "2026",
    tags: ["Data Eng", "Python", "TensorFlow", "Docker"],
    gradient: "linear-gradient(135deg, #00D4FF 0%, #48CAE4 100%)",
  },
  {
    title: "E-Commerce Platform",
    desc: "High-throughput marketplace with real-time inventory, payments, and logistics orchestration.",
    year: "2025",
    tags: ["E-Commerce", "Next.js", "PostgreSQL", "AWS"],
    gradient: "linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)",
  },
];

export default function ProjectsCinematic() {
  const reduced = useReducedMotion();
  return (
    <section id="projects" className="projects-section">
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 09 / PROJECTS</span>
        <div className="projects-head">
          <div>
            <h2 className="sec">Recent <em>work.</em></h2>
            <p className="sec-sub">Production platforms we&apos;ve shipped for startups and enterprises — across AI, fintech, health, and logistics.</p>
          </div>
          <a href="#contact" className="view-all-link">
            VIEW_ALL <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={i}
              href="#contact"
              className="project-card"
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : i * 0.08 }}
              aria-label={`Project: ${p.title}`}
            >
              <div className="project-thumb" style={{ background: p.gradient }}>
                <span className="project-year">{p.year}</span>
                <div className="project-logo-area">
                  <span className="project-logo-letter">{p.title[0]}</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t, ti) => (
                    <span key={ti} className="project-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
