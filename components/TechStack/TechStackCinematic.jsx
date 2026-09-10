"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TechStack3D from "./TechStack3D";

export default function TechStackCinematic() {
 const reduced = useReducedMotion();
 const isMobile = useMediaQuery("(max-width: 768px)");
 const [mobileInteract, setMobileInteract] = useState(false);

 const wrapperClass = isMobile
 ? `tech-stack-3d-wrapper mobile-fullscreen${mobileInteract ? " interacting" : ""}`
 : "tech-stack-3d-wrapper";

 return (
 <section id="techstack" className="techstack-section">
 <div className="shell">
 <span className="sec-num" aria-hidden="true">
 <span className="dot" /> 04 / STACK
 </span>

 <motion.div
 className="section-header"
 initial={reduced ? false : { opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: reduced ? 0 : 0.8 }}
 >
 <h2 className="sec">
 OUR <em className="orange">TECH</em> STACK
 </h2>
 <p className="sec-sub">
 Technologies we use to build scalable, modern and
 high-performance digital solutions.
 </p>
 <motion.div
 className="animated-underline"
 initial={reduced ? false : { width: 0 }}
 whileInView={{ width: "60px" }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.3 }}
 />
 </motion.div>
 </div>

 <motion.div
 className={wrapperClass}
 initial={reduced ? false : { opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.4 }}
 >
 <TechStack3D onMobileInteractChange={setMobileInteract} />
 </motion.div>
 </section>
 );
}
