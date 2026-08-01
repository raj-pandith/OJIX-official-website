"use client";
import { motion, useReducedMotion } from "framer-motion";

const PHASES = [
  {
    num: "01",
    title: "Pre-Engagement",
    subtitle: "From idea to signed scope",
    steps: ["Ideate & Execute", "Discovery", "Proposal", "Approval"],
    color: "#FF5C00",
  },
  {
    num: "02",
    title: "Rapid Prototyping",
    subtitle: "6–8 weeks to a shippable prototype",
    steps: ["Prototype", "Style & UX", "High-Fidelity & Design Testing", "Design Hand-off"],
    color: "#00D4FF",
  },
  {
    num: "03",
    title: "Development & Go-Live",
    subtitle: "Production-grade delivery",
    steps: ["Plan", "Development & Testing", "UAT", "Go Live"],
    color: "#7C3AED",
  },
];

function PhaseColumn({ phase, index }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="process-col"
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : index * 0.15 }}
    >
      <div className="process-header">
        <span className="process-num" aria-hidden="true">[{phase.num}]</span>
        <span className="process-line" aria-hidden="true" />
      </div>
      <h3>{phase.title}</h3>
      <p className="process-sub">{phase.subtitle}</p>
      <ol className="process-steps">
        {phase.steps.map((s, si) => (
          <li key={si}>
            <span className="step-dot" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ol>
      <div className="process-gradient" aria-hidden="true" style={{ background: `linear-gradient(180deg, ${phase.color}22, transparent)` }} />
    </motion.div>
  );
}

export default function ProcessCinematic() {
  const reduced = useReducedMotion();
  return (
    <section id="process" className="process-section">
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 07 / EXCELLENCE PATH</span>
        <h2 className="sec">Our tech <em>excellence path.</em></h2>
        <p className="sec-sub">A proven three-phase methodology that takes a concept to a production-ready platform — with clarity at every milestone.</p>

        <div className="process-grid">
          {PHASES.map((p, i) => (
            <PhaseColumn key={i} phase={p} index={i} />
          ))}
        </div>

        <motion.div
          className="process-footer"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduced ? 0 : 0.8 }}
        >
          <span className="process-meta">// AVERAGE_PROTOTYPE_CYCLE: 6–8_WEEKS</span>
          <span className="process-meta">// GO_LIVE_SLA: PER_SCOPE_AGREEMENT</span>
        </motion.div>
      </div>
    </section>
  );
}
