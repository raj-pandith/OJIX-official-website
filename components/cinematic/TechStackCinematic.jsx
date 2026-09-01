"use client";
import { motion, useReducedMotion } from "framer-motion";

const STACK = [
  { name: "Python", icon: "devicon-python-plain", category: "language" },
  { name: "TypeScript", icon: "devicon-typescript-plain", category: "language" },
  { name: "React", icon: "devicon-react-plain", category: "framework" },
  { name: "Next.js", icon: "devicon-nextjs-plain", category: "framework" },
  { name: "Node.js", icon: "devicon-nodejs-plain", category: "runtime" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain", category: "database" },
  { name: "Redis", icon: "devicon-redis-plain", category: "database" },
  { name: "Docker", icon: "devicon-docker-plain", category: "devops" },
  { name: "Kubernetes", icon: "devicon-kubernetes-plain", category: "devops" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", category: "cloud" },
  { name: "TensorFlow", icon: "devicon-tensorflow-plain", category: "ai" },
  { name: "LangGraph", icon: "devicon-python-plain", category: "ai" },
  { name: "Pinecone", icon: "devicon-python-plain", category: "ai" },
  { name: "GraphQL", icon: "devicon-graphql-plain", category: "api" },
  { name: "Terraform", icon: "devicon-terraform-plain", category: "devops" },
  { name: "PyTorch", icon: "devicon-pytorch-plain", category: "ai" },
];

const CATEGORIES = ["language", "framework", "runtime", "database", "devops", "cloud", "ai", "api"];

export default function TechStackCinematic() {
  const reduced = useReducedMotion();
  return (
    <section id="techstack" className="techstack-section">
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 04 / STACK</span>
        <h2 className="sec">The engines <em>behind our work.</em></h2>
        <p className="sec-sub">Production-grade tooling across architecture and intelligence layers — selected for reliability, not hype.</p>

        <div className="stack-marquee" aria-hidden="true">
          <div className="stack-track">
            {[...STACK, ...STACK].map((t, i) => (
              <div key={i} className="stack-chip">
                <i className={`stack-icon ${t.icon}`}></i>
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
                      <i className={`stack-icon ${item.icon}`}></i>
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
