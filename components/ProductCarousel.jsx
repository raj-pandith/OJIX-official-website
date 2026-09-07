"use client";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { PRODUCTS } from "./productData";

export default function ProductCarousel({ open, onClose }) {
 const [idx, setIdx] = useState(0);
 const [dir, setDir] = useState(1);
 const reduced = useReducedMotion();
 const count = PRODUCTS.length;
 const onCloseRef = useRef(onClose);
 onCloseRef.current = onClose;

 const go = useCallback((d) => {
 setDir(d);
 setIdx((i) => (i + d + count) % count);
 }, [count]);

 useEffect(() => {
 if (!open) return;
 setIdx(0);
 setDir(1);
 const onKey = (e) => {
 if (e.key === "Escape") onCloseRef.current();
 if (e.key === "ArrowRight") go(1);
 if (e.key === "ArrowLeft") go(-1);
 };
 document.addEventListener("keydown", onKey);
 document.body.style.overflow = "hidden";
 return () => {
 document.removeEventListener("keydown", onKey);
 document.body.style.overflow = "";
 };
 }, [open, go]);

 const p = PRODUCTS[idx];

 const variants = {
 enter: (d) => ({ x: d > 0 ? 320 : -320, opacity: 0 }),
 center: { x: 0, opacity: 1 },
 exit: (d) => ({ x: d > 0 ? -320 : 320, opacity: 0 }),
 };

 return (
 <AnimatePresence>
 {open && (
 <motion.div className="pc-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
 <motion.div className="pc-panel" role="dialog" aria-modal="true" aria-label="Our Products" initial={{ opacity: 0, scale: 0.94, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 40 }} transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}>
 <button className="pc-close" onClick={onClose} aria-label="Close">&times;</button>

 <div className="pc-slide-wrap">
 <AnimatePresence initial={false} custom={dir} mode="wait">
 <motion.div key={idx} className="pc-slide" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}>
 <div className="pc-image" style={{ background: p.gradient }}>
 <span className="pc-year">{p.year}</span>
 <span className="pc-initial">{p.title[0]}</span>
 </div>
 <div className="pc-content">
 <span className="pc-label">PRODUCT</span>
 <h2 className="pc-title">{p.title}</h2>
 <p className="pc-subtitle">{p.subtitle}</p>
 <p className="pc-desc">{p.desc}</p>
 <div className="pc-tags">
 {p.tags.map((t, i) => (
 <span key={i} className="pc-tag">{t}</span>
 ))}
 </div>
 <a href={p.link} className="pc-more-btn">
 MORE_INFO <span className="arr">&rarr;</span>
 </a>
 </div>
 </motion.div>
 </AnimatePresence>
 </div>

 <div className="pc-nav">
 <button className="pc-arrow pc-prev" onClick={() => go(-1)} aria-label="Previous product">&larr;</button>
 <div className="pc-dots">
 {PRODUCTS.map((_, i) => (
 <button key={i} className={`pc-dot ${i === idx ? "active" : ""}`} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }} aria-label={`Go to product ${i + 1}`} />
 ))}
 </div>
 <button className="pc-arrow pc-next" onClick={() => go(1)} aria-label="Next product">&rarr;</button>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}
