"use client";
import { motion, useReducedMotion } from "framer-motion";

const STACK = [
  { name: "Python", icon: "🐍", category: "language" },
  { name: "TypeScript", icon: "TS", category: "language" },
  { name: "React", icon: "⚛", category: "framework" },
  { name: "Next.js", icon: "N", category: "framework" },
  { name: "Node.js", icon: "◇", category: "runtime" },
  { name: "PostgreSQL", icon: "🐘", category: "database" },
  { name: "Redis", icon: "◆", category: "database" },
  { name: "Docker", icon: "🐳", category: "devops" },
  { name: "Kubernetes", icon: "⎈", category: "devops" },
  { name: "AWS", icon: "☁", category: "cloud" },
  { name: "TensorFlow", icon: "⬡", category: "ai" },
  { name: "LangGraph", icon: "⧉", category: "ai" },
  { name: "Pinecone", icon: "△", category: "ai" },
  { name: "GraphQL", icon: "◉", category: "api" },
  { name: "Terraform", icon: "⬢", category: "devops" },
  { name: "PyTorch", icon: "🔥", category: "ai" },
];

const CATEGORIES = ["language", "framework", "runtime", "database", "devops", "cloud", "ai", "api"];

export default function TechStackCinematic() {
  const reduced = useReducedMotion();
  return (
    <section id="techstack" className="techstack-section">
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 08 / TECH STACK</span>
        <h2 className="sec">The engines <em>behind our work.</em></h2>
        <p className="sec-sub">Production-grade tooling across architecture and intelligence layers — selected for reliability, not hype.</p>

        <div className="stack-marquee" aria-hidden="true">
          <div className="stack-track">
            {[...STACK, ...STACK].map((t, i) => (
              <div key={i} className="stack-chip">
                <span className="stack-icon">{t.icon}</span>
                <span className="stack-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stack-categories">
          {CATEGORIES.map((cat, ci) => {
            const items = STACK.filter(s => s.category === cat);
            if (!items.length) return null;
            return (
              <motion.div
                key={cat}
                className="stack-cat-group"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : ci * 0.06 }}
              >
                <h4 className="stack-cat-label">{cat.toUpperCase()}</h4>
                <div className="stack-cat-items">
                  {items.map((item, ii) => (
                    <div key={ii} className="stack-cat-chip">
                      <span className="stack-icon">{item.icon}</span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
