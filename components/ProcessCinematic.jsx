"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PHASES = [
  {
    num: "01",
    title: "Pre-Engagement",
    subtitle: "From idea to signed scope",
    steps: ["Ideate & Execute", "Discovery", "Proposal", "Approval"],
    color: "#c9662f",
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
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section id="process" className="process-section" ref={sectionRef}>
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 03 / PROCESS</span>
        <h2 className="sec">Our tech <em>excellence path.</em></h2>
        <p className="sec-sub">A proven three-phase methodology that takes a concept to a production-ready platform - with clarity at every milestone.</p>

        <div className={`process-row${inView ? " in-view" : ""}`}>
          {PHASES.map((p, i) => (
            <motion.div
              key={i}
              className="process-block-wrapper"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ 
                duration: 1.3, 
                delay: reduced ? 0 : 0.3 + i * 0.25,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{ height: p.height, transformOrigin: 'bottom' }}
            >
              <div className="process-block" style={{ height: p.height }}>
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
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="process-footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 1.5 }}
        >
          <span className="process-meta">// AVERAGE_PROTOTYPE_CYCLE: 6-8_WEEKS</span>
          <span className="process-meta">// GO_LIVE_SLA: PER_SCOPE_AGREEMENT</span>
        </motion.div>
      </div>

      <ArrowSVG inView={inView} reduced={reduced} />
    </section>
  );
}

function ArrowSVG({ inView, reduced }) {
  const maxH = Math.max(...PHASES.map((p) => p.height));
  const arrowSpace = 140;
  const VB_W = 600;
  const VB_H = maxH + arrowSpace + 40;

  const cx0 = VB_W * 0.15;
  const cx1 = VB_W * 0.5;
  const cx2 = VB_W * 0.85;

  const baseline = VB_H - 20;
  const top0 = baseline - PHASES[0].height;
  const top1 = baseline - PHASES[1].height;
  const top2 = baseline - PHASES[2].height;

  const startX = cx0;
  const startY = top0;
  const endX = cx2;
  const endY = top2;

  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;

  const px = -uy;
  const py = ux;

  const shaftStartX = startX - ux * 20;
  const shaftStartY = startY - uy * 20;
  const shaftEndX = endX + ux * 8;
  const shaftEndY = endY + uy * 8;

  const tipX = endX + ux * 22;
  const tipY = endY + uy * 22;
  const base1X = endX - px * 10;
  const base1Y = endY - py * 10;
  const base2X = endX + px * 10;
  const base2Y = endY + py * 10;

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
    <svg
      className={`process-arrow${inView ? " in-view" : ""}`}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arrow-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9662f" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.75" />
        </linearGradient>
        <filter id="arrow-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="arrow-fill" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9662f" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      <path d={ribbonPath} fill="url(#arrow-fill)" filter="url(#arrow-glow)" className="arrow-ribbon" />
      <path d={arrowPath} fill="none" stroke="url(#arrow-grad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#arrow-glow)" className="arrow-path" />
      <polygon points={`${tipX},${tipY} ${base1X},${base1Y} ${base2X},${base2Y}`} fill="#7C3AED" opacity="0.9" className="arrow-head" />

      <circle cx={cx0} cy={top0} r="6" fill="#c9662f" className="arrow-dot dot-1" />
      <circle cx={cx1} cy={top1} r="7" fill="#00D4FF" className="arrow-dot dot-2" />
      <circle cx={cx2} cy={top2} r="8" fill="#7C3AED" className="arrow-dot dot-3" />
      <circle cx={cx0} cy={top0} r="2.5" fill="var(--color-bg)" className="arrow-dot-inner dot-1" />
      <circle cx={cx1} cy={top1} r="3" fill="var(--color-bg)" className="arrow-dot-inner dot-2" />
      <circle cx={cx2} cy={top2} r="3.5" fill="var(--color-bg)" className="arrow-dot-inner dot-3" />
    </svg>
  );
}
