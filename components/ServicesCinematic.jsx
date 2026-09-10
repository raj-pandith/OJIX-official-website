"use client";
import { motion, useReducedMotion } from "framer-motion";

const SERVICES = [
 {
 num: "01",
 title: "AI & Intelligent Solutions",
 desc: "AI-powered applications, GenAI and LLM integration, intelligent document processing, OCR, computer vision, intelligent search, and AI-enabled decision support.",
 icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z",
 },
 {
 num: "02",
 title: "Software, Web & Mobile",
 desc: "Enterprise web applications and role-based portals, plus native and cross-platform Android and iOS apps. API-driven platforms, microservices, and legacy modernization.",
 icon: "M16 18 22 12 16 6 M8 6 2 12 8 18",
 },
 {
 num: "03",
 title: "Enterprise Applications",
 desc: "CRM for customer lifecycle and relationship intelligence. ERP for operations and resource planning. Case and Document Management with OCR, search, and access control.",
 icon: "M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8M4 16V8a2 2 0 0 0-2-2H1a2 2 0 0 0-2 2v8M12 4v4M12 16v4",
 },
 {
 num: "04",
 title: "Cloud, DevOps & Automation",
 desc: "Cloud architecture and migration, cloud-native development, CI/CD pipelines, release and infrastructure automation, monitoring, and workflow automation.",
 icon: "M4 4h16v16H4z M8 8h3v3H8z M13 8h3v3M13 13h3v3",
 },
 {
 num: "05",
 title: "Digital Product Engineering",
 desc: "Full product lifecycle from discovery through technical architecture, UI/UX, MVP development, full-scale product engineering, and continuous enhancement.",
 icon: "M3 3v18h18V3H3zM9 9h2v2H9zM13 9h2v2M9 13h2v2M13 13h2v2",
 },
 {
 num: "06",
 title: "Technology Consulting",
 desc: "Architecture audits, technology roadmaps, code reviews, team mentorship, and security by design practices woven into every layer of delivery.",
 icon: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
 },
];

export default function ServicesCinematic() {
 const reduced = useReducedMotion();
 return (
 <section id="services">
 <div className="shell">
 <div className="section-head">
 <div style={{display:"flex",flexDirection:"column",height:"100%",position:"relative"}}>
 <span className="sec-num"><span className="dot">●</span> 01 / CAPABILITIES</span>
 <p className="label">What we ship</p>
 </div>
 <div>
 <h2 className="sec">Engineering <em>technology solutions</em><br />for the <span className="cyan">digital enterprise.</span></h2>
 <p className="sec-sub">We partner with businesses to build, modernize, and scale their technology landscape — combining AI, software engineering, web and mobile development, cloud, automation, system integration, and technology consulting.</p>
 </div>
 </div>
 <div className="svc-grid">
 {SERVICES.map((s, i) => (
 <motion.a
 key={i}
 href="#contact"
 data-cursor="Open"
 className="svc"
 aria-label={`Inquire about ${s.title}`}
 initial={reduced ? false : { opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-60px" }}
 transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="svc-head">
 <span className="num">[{s.num}]</span>
 <div className="ic"><svg viewBox="0 0 24 24" aria-hidden><path d={s.icon} /></svg></div>
 </div>
 <h3>{s.title}</h3>
 <p>{s.desc}</p>
 <div className="go">VIEW_CASES →</div>
 </motion.a>
 ))}
 </div>
 </div>
 </section>
 );
}
