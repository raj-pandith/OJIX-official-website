"use client";
import { motion, useReducedMotion } from "framer-motion";
import TechStack3D from "./TechStack3D";

export default function TechStackCinematic() {
  const reduced = useReducedMotion();

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

        <motion.div 
          className="tech-stack-3d-wrapper"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.4 }}
        >
          <TechStack3D />
        </motion.div>
      </div>
    </section>
  );
}
