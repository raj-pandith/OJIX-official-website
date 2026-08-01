"use client";
import { motion, useReducedMotion } from "framer-motion";

const PHASES = [
  {
    num: "01",
    title: "Pre-Engagement",
    subtitle: "From idea to signed scope",
    steps: ["Ideate & Execute", "Discovery", "Proposal", "Approval"],
    color: "#FF5C00",
    height: 280,
  },
  {
    num: "02",
    title: "Rapid Prototyping",
    subtitle: "6-8 weeks to a shippable prototype",
    steps: ["Prototype", "Style & UX", "High-Fidelity & Design Testing", "Design Hand-off"],
    color: "#00D4FF",
    height: 360,
  },
  {
    num: "03",
    title: "Development & Go-Live",
    subtitle: "Production-grade delivery",
    steps: ["Plan", "Development & Testing", "UAT", "Go Live"],
    color: "#7C3AED",
    height: 440,
  },
];

export default function ProcessCinematic() {
  const reduced = useReducedMotion();
  const maxH = Math.max(...PHASES.map((p) => p.height));

  const arrowSpace = 140;
  const VB_W = 600;
  const VB_H = maxH + arrowSpace + 40;

  // Block centers from left to right
  const cx0 = VB_W * 0.15;  // Pre-Engagement (left)
  const cx1 = VB_W * 0.5;   // Rapid Prototyping (middle)
  const cx2 = VB_W * 0.85;  // Go-Live (right)

  // Top of each block (y from top of SVG)
  const baseline = VB_H - 20;
  const top0 = baseline - PHASES[0].height; // top of Pre-Engagement
  const top1 = baseline - PHASES[1].height; // top of Rapid Prototyping
  const top2 = baseline - PHASES[2].height; // top of Go-Live

    // Straight diagonal line: tail at Pre-Engagement block → passes via Rapid Prototyping → head at Go-Live
  const startX = cx0;
  const startY = top0;
  const endX = cx2;
  const endY = top2;

  // Direction vector
  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;

  // Perpendicular for arrowhead
  const px = -uy;
  const py = ux;

  // Extend line beyond endpoints for tail/head area
  const shaftStartX = startX - ux * 20;
  const shaftStartY = startY - uy * 20;
  const shaftEndX = endX + ux * 8;
  const shaftEndY = endY + uy * 8;

  // Arrowhead: tip extends past end, base sits at shaft endpoint
  const tipX = endX + ux * 22;
  const tipY = endY + uy * 22;
  const base1X = endX - px * 10;
  const base1Y = endY - py * 10;
  const base2X = endX + px * 10;
  const base2Y = endY + py * 10;

  // Arrow ribbon path (filled shape)
  const ribbonWidth = 14;
  const rpx = px * ribbonWidth * 0.5;
  const rpy = py * ribbonWidth * 0.5;

  const arrowPath = `M ${shaftStartX} ${shaftStartY} L ${shaftEndX} ${shaftEndY}`;

  const ribbonPath = `
    M ${shaftStartX + rpx} ${shaftStartY + rpy}
    L ${shaftEndX + rpx * 0.3} ${shaftEndY + rpy * 0.3}
    L ${tipX} ${tipY}
    L ${shaftEndX - rpx * 0.3} ${shaftEndY - rpy * 0.3}
    L ${shaftStartX - rpx} ${shaftStartY - rpy}
    Z
  `;

  return (
    <section id="process" className="process-section">
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 07 / EXCELLENCE PATH</span>
        <h2 className="sec">Our tech <em>excellence path.</em></h2>
        <p className="sec-sub">A proven three-phase methodology that takes a concept to a production-ready platform - with clarity at every milestone.</p>

        <div className="process-row">
          {PHASES.map((p, i) => (
            <motion.div
              key={i}
              className="process-block"
              style={{ height: p.height }}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : i * 0.12 }}
            >
              <div className="block-accent" aria-hidden="true" style={{ background: p.color }} />
              <div className="block-inner">
                <div className="process-header">
                  <span className="process-num" aria-hidden="true">[{p.num}]</span>
                  <span className="process-line" aria-hidden="true" style={{ background: p.color }} />
                </div>
                <h3>{p.title}</h3>
                <p className="process-sub">{p.subtitle}</p>
                <ol className="process-steps">
                  {p.steps.map((s, si) => (
                    <li key={si}>
                      <span className="step-dot" aria-hidden="true" style={{ background: p.color }} />
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="block-gradient" aria-hidden="true" style={{ background: `linear-gradient(180deg, ${p.color}15, transparent 70%)` }} />
            </motion.div>
          ))}

          <svg
            className="process-arrow"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="arrow-grad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.75" />
              </linearGradient>
              <filter id="arrow-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="arrow-fill" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.75" />
              </linearGradient>
            </defs>

            {/* Filled arrow ribbon */}
            <path d={ribbonPath} fill="url(#arrow-fill)" filter="url(#arrow-glow)" className="arrow-ribbon" />

            {/* Arrow shaft line */}
            <path d={arrowPath} fill="none" stroke="url(#arrow-grad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#arrow-glow)" className="arrow-path" />

            {/* Arrowhead */}
            <polygon points={`${tipX},${tipY} ${base1X},${base1Y} ${base2X},${base2Y}`} fill="#7C3AED" opacity="0.9" className="arrow-head" />

            {/* Progression circles at each phase */}
            <circle cx={cx0} cy={top0} r="6" fill="#FF5C00" className="arrow-dot dot-1" />
            <circle cx={cx1} cy={top1} r="7" fill="#00D4FF" className="arrow-dot dot-2" />
            <circle cx={cx2} cy={top2} r="8" fill="#7C3AED" className="arrow-dot dot-3" />
            <circle cx={cx0} cy={top0} r="2.5" fill="var(--color-bg)" className="arrow-dot-inner dot-1" />
            <circle cx={cx1} cy={top1} r="3" fill="var(--color-bg)" className="arrow-dot-inner dot-2" />
            <circle cx={cx2} cy={top2} r="3.5" fill="var(--color-bg)" className="arrow-dot-inner dot-3" />
          </svg>
        </div>

        <motion.div
          className="process-footer"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduced ? 0 : 0.8 }}
        >
          <span className="process-meta">// AVERAGE_PROTOTYPE_CYCLE: 6-8_WEEKS</span>
          <span className="process-meta">// GO_LIVE_SLA: PER_SCOPE_AGREEMENT</span>
        </motion.div>
      </div>
    </section>
  );
}