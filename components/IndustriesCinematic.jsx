"use client";
import { motion, useReducedMotion } from "framer-motion";

const INDUSTRIES = [
 {
 num: "01",
 title: "Education",
 desc: "AI proctoring platforms, LMS, content management, virtual classrooms, and analytics dashboards for educational institutions and training providers.",
 icon: "M12 2L2 7l10 5 10-5-10-5zm0 10l-10 5v3l10-5 10 5v-3l-10-5z",
 },
 {
 num: "02",
 title: "Legal",
 desc: "Case and document management with OCR, intelligent search, access control, and workflow automation for law firms and legal departments.",
 icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M23 3.01l-9 9",
 },
 {
 num: "03",
 title: "Healthcare",
 desc: "Clinical SaaS, patient portals, EMR integrations, intelligent document processing, and regulatory compliance for healthcare organizations.",
 icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
 },
 {
 num: "04",
 title: "Manufacturing",
 desc: "Fleet management, IoT integrations, workflow automation, and custom enterprise platforms for manufacturing and industrial operations.",
 icon: "M3 3v18h18V3H3zm16 16H5V5h14v14z M7 7h2v2H7zm8 0h2v2h-2zM7 11h2v2H7zm8 0h2v2h-2zM7 15h2v2H7zm8 0h2v2h-2z",
 },
 {
 num: "05",
 title: "Government & Public Sector",
 desc: "Secure, compliant platforms for citizen services, document management, workflow automation, and digital transformation initiatives.",
 icon: "M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V3zM9 5H7v13h10V5h-2V3H9v2z",
 },
 {
 num: "06",
 title: "Retail & eCommerce",
 desc: "Configurable e-commerce platforms with secure transactions, inventory management, logistics orchestration, and CRM integrations at scale.",
 icon: "M7 18h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2zM8 6h8M8 12h8M8 16h8M8 8h5",
 },
];

export default function IndustriesCinematic() {
 const reduced = useReducedMotion();
 return (
 <section id="industries">
 <div className="shell">
 <div className="section-head">
 <div style={{ "display": "flex", flexDirection: "column", height: "100%", position: "relative", top: "2rem" }}>
 <span className="sec-num"><span className="dot">●</span> 02 / SECTORS</span>
 <p className="label">Who we ship for</p>
 </div>
 <div>
 <h2 className="sec">Built for <em>high-stakes</em><br />industries where <span className="cyan">shipping broken</span><br />means real-world consequences.</h2>
 <p className="sec-sub">Education, Legal, Healthcare, Manufacturing, Government & Public Sector, Retail & eCommerce — seven sectors where engineering discipline creates measurable impact.</p>
 </div>
 </div>
 <div className="ind-grid">
 {INDUSTRIES.map((it, i) => (
 <motion.a
 href="#contact"
 key={i}
 className="ind"
 aria-label={`Inquire about ${it.title} solutions`}
 initial={reduced ? false : { opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.05 }}
 >
 <div className="ind-head">
 <span className="ind-num" aria-hidden="true">[{it.num}]</span>
 <div className="ic-sm" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={it.icon} /></svg></div>
 </div>
 <h3>{it.title}</h3>
 <p>{it.desc}</p>
 </motion.a>
 ))}
 </div>
 </div>
 </section>
 );
}
