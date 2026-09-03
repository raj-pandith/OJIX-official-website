"use client";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/seo";

const COLS = [
 ["SITEMAP", [
 ["Capabilities", "#services"],
 ["Sectors", "#industries"],
 ["Team", "#team"],
 ["Process", "#process"],
 ["Stack", "#techstack"],
 ["Contact", "#contact"],
 ]],
];

const RIGHT_COLS = [
 ["CONNECT", [
 ["LinkedIn", SITE.social.linkedin],
 ["Twitter / X", SITE.social.twitter],
 ["GitHub", SITE.social.github],
 ["Email", `mailto:${SITE.email}`],
 ]],
 ["REACH US", [
 ["info@ojix.in", `mailto:${SITE.email}`],
 [SITE.phone[0], `tel:${SITE.phone[0].replace(/ /g, "")}`],
 [SITE.phone[1], `tel:${SITE.phone[1].replace(/ /g, "")}`],
 ]],
];

export default function FooterCinematic() {
 const reduced = useReducedMotion();
 return (
 <footer>
 <div className="footer-layout">
 <div className="foot-brand">
 <h3><span className="bar" />OJIX</h3>
 <p>{SITE.tagline} Engineering technology solutions for the digital enterprise. Based in {SITE.location.city}, {SITE.location.country}.</p>
 </div>
 <div className="foot-grid">
 <div className="foot-col">
 <h3 className="foot-col-h">// SITEMAP</h3>
 <ul>{COLS[0][1].map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h">// CONNECT</h3>
 <ul>{RIGHT_COLS[0][1].map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h">// REACH US</h3>
 <ul>{RIGHT_COLS[1][1].map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
 </div>
 </div>
 </div>

 <motion.div
 initial={reduced ? false : { opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="foot-big-wrapper"
 aria-hidden
 >
 <div className="foot-big">
 <div className="foot-line">
 <motion.div
 initial={{ scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true }}
 transition={{ duration: reduced ? 0 : 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
 className="foot-line-inner"
 />
 </div>
 {["O", "J", "I", "X"].map((char, i) => (
 <span
 key={i}
 style={{ display: "inline-block", cursor: "default", transition: "color 100ms ease-out, text-shadow 100ms ease-out, transform 100ms ease-out" }}
 onMouseEnter={(e) => {
 e.currentTarget.style.color = "var(--color-accent)";
 e.currentTarget.style.textShadow = "0 0 16px rgba(255,92,0,0.9), 0 0 40px rgba(255,92,0,0.6), 0 0 80px rgba(255,92,0,0.3)";
 e.currentTarget.style.transform = "scale(1.04)";
 e.currentTarget.style.transformOrigin = "center bottom";
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.color = "transparent";
 e.currentTarget.style.textShadow = "none";
 e.currentTarget.style.transform = "scale(1)";
 e.currentTarget.style.transition = "color 500ms ease-out, text-shadow 500ms ease-out, transform 500ms ease-out";
 }}
 >
 {char}
 </span>
 ))}
 </div>
 </motion.div>

 <div className="foot-bottom">
 <span>© 2026 OJIX // ALL_RIGHTS_RESERVED</span>
 <span>// ENGINEERED FOR THE DIGITAL ENTERPRISE //</span>
 </div>
 </footer>
 );
}
