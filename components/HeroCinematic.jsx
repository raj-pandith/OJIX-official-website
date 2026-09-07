"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import ProductCarousel from "./ProductCarousel";

const lineAnim = (ready, d, reduced) => ({
 initial: reduced ? false : { y: "110%" },
 animate: ready ? { y: 0 } : {},
 transition: { duration: reduced ? 0 : 1, delay: reduced ? 0 : d, ease: [0.16, 1, 0.3, 1] },
});

export default function HeroCinematic({ ready }) {
 const reduced = useReducedMotion();
 const [showProducts, setShowProducts] = useState(false);
 return (
 <><header id="top" className="hero">
 <div className="hero-meta">
 <div className="left">
 <span><span className="dot" aria-hidden="true" />SYS_OJIX // LIVE</span>
 <span>BENGALURU · INDIA</span>
 </div>
 <div className="right">
 <span>LAT 12.97° N</span>
 <span>LON 77.59° E</span>
 </div>
 </div>
 <div className="hero-inner">
 <h1 id="hero-title">
 <span className="ln"><motion.span {...lineAnim(ready, 0.2, reduced)} style={{ display: "inline-block" }}>Software</motion.span>{" "}<motion.span {...lineAnim(ready, 0.3, reduced)} style={{ display: "inline-block" }}><em>that ships.</em></motion.span></span>
 <span className="ln"><motion.span {...lineAnim(ready, 0.4, reduced)} style={{ display: "inline-block" }}>Code</motion.span>{" "}<motion.span {...lineAnim(ready, 0.5, reduced)} style={{ display: "inline-block" }}><span className="cyan">that scales.</span></motion.span></span>
 <span className="ln"><motion.span {...lineAnim(ready, 0.6, reduced)} style={{ display: "inline-block" }} className="ghost">AI</motion.span>{" "}<motion.span {...lineAnim(ready, 0.7, reduced)} style={{ display: "inline-block" }} className="ghost">that</motion.span>{" "}<motion.span {...lineAnim(ready, 0.8, reduced)} style={{ display: "inline-block" }} className="ghost">works.</motion.span></span>
 </h1>
 <motion.div
 initial={reduced ? false : { opacity: 0, y: 12 }}
 animate={ready ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.95 }}
 className="hero-foot"
 >
 <p className="hero-sub">
 OJIX is a <b>software product studio</b> engineering technology solutions for the digital enterprise. We combine AI, software engineering, cloud, and automation — one team, no handoffs, production-grade from day one.
 </p>
 <div className="hero-ctas">
 <motion.a whileHover={reduced ? undefined : { y: -1 }} className="btn btn-primary" href="#services" data-cursor="View">VIEW_SERVICES <span className="arr" aria-hidden="true">→</span></motion.a>
 <motion.a whileHover={reduced ? undefined : { y: -1 }} className="btn btn-secondary" href="#" onClick={(e) => { e.preventDefault(); setShowProducts(true); }} data-cursor="View">VIEW_PRODUCTS</motion.a>
 </div>
 </motion.div>
 </div>
 </header>
 <ProductCarousel open={showProducts} onClose={() => setShowProducts(false)} />
 </>
 );
}
