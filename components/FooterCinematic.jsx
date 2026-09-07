"use client";
import { useState, useRef, useEffect } from "react";
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

const ICON_EMAIL = "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6";
const ICON_PHONE = "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z";
const ICON_LOCATION = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5a2.5 2.5 0 0 1-2.5-2.5A2.5 2.5 0 0 1 12 6.5a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 12 11.5z";

const ICON_LINKEDIN = "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z";
const ICON_TWITTER = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
const ICON_GITHUB = "M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.07.63-1.31-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.004 1.71.11 2.52.34 1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z";

const MAP_ADDRESS = encodeURIComponent(SITE.location.address || "Ranga Rao Rd, Shankarapura, Bengaluru, Karnataka 560004, India");

export default function FooterCinematic() {
 const reduced = useReducedMotion();
 const lineRef = useRef(null);
 const [lineVisible, setLineVisible] = useState(false);

 useEffect(() => {
 if (reduced) { setLineVisible(true); return; }
 const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLineVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
 if (lineRef.current) obs.observe(lineRef.current);
 return () => obs.disconnect();
 }, [reduced]);

 return (
 <footer>
 {/* ===== TOP: CONTACT + MAP ===== */}
 <div className="foot-top">
 <div className="foot-contact">
 <h3 className="foot-loc-h">// REACH US</h3>
 <p className="foot-loc-city">Bengaluru, India</p>
 <div className="foot-contact-list">
 <div className="foot-contact-item">
 <span className="foot-contact-label">Email</span>
 <a href={`mailto:${SITE.email}`}>
 <span className="ic-xs" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={ICON_EMAIL} /></svg></span>
 {SITE.email}
 </a>
 </div>
 <div className="foot-contact-item">
 <span className="foot-contact-label">Phone</span>
 <div>
 <a href={`tel:${SITE.phone[0].replace(/ /g, "")}`}>
 <span className="ic-xs" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={ICON_PHONE} /></svg></span>
 {SITE.phone[0]}
 </a>
 <br />
 <a href={`tel:${SITE.phone[1].replace(/ /g, "")}`}>
 <span className="ic-xs" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={ICON_PHONE} /></svg></span>
 {SITE.phone[1]}
 </a>
 </div>
 </div>
 <div className="foot-contact-item">
 <span className="foot-contact-label">Address</span>
 <span>
 <span className="ic-xs" aria-hidden="true" style={{verticalAlign: "middle"}}><svg viewBox="0 0 24 24"><path d={ICON_LOCATION} /></svg></span>
 {SITE.location.address || "Ranga Rao Rd, Shankarapura, Bengaluru, Karnataka 560004"}
 </span>
 </div>
 </div>
 </div>
 <div className="foot-map">
 <iframe
 title="OJIX Location — Bengaluru"
 src={`https://maps.google.com/maps?q=${MAP_ADDRESS}&t=m&z=14&output=embed`}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 allowFullScreen
 />
 </div>
 </div>

 {/* ===== NEWSLETTER / STAY CONNECTED ===== */}
 <div className="foot-newsletter">
 <div className="foot-newsletter-inner">
 <div className="foot-newsletter-text">
 <h3 className="foot-newsletter-h">// STAY CONNECTED</h3>
 <p>Get occasional updates from OJIX.</p>
 </div>
 <form className="foot-newsletter-form" onSubmit={(e) => e.preventDefault()}>
 <input type="email" placeholder="your@email.com" aria-label="Email for newsletter" />
 <button type="submit" data-cursor="Go">Subscribe</button>
 </form>
 </div>
 </div>

 {/* ===== MAIN FOOTER COLUMNS ===== */}
 <div className="foot-main">
 <div className="foot-grid">
 <div className="foot-col foot-col-brand">
 <h3 className="foot-col-h"><span className="bar" />OJIX</h3>
 <p className="foot-tagline">{SITE.tagline}</p>
 <p>Engineering technology solutions for the digital enterprise. Based in {SITE.location.city}, {SITE.location.country}.</p>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h"><span className="bar" />SITEMAP</h3>
 <ul>{COLS[0][1].map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h"><span className="bar" />CONNECT</h3>
 <ul>{RIGHT_COLS[0][1].map(([l, href]) => {
 const ic = l === "LinkedIn" ? ICON_LINKEDIN : l === "Twitter / X" ? ICON_TWITTER : l === "GitHub" ? ICON_GITHUB : ICON_EMAIL;
 return <li key={l}><a href={href} target="_blank" rel="noopener noreferrer"><span className="foot-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={ic} /></svg></span> {l}</a></li>;
 })}</ul>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h"><span className="bar" />REACH US</h3>
 <ul>{RIGHT_COLS[1][1].map(([l, href]) => {
 const ic = l.includes("@") ? ICON_EMAIL : ICON_PHONE;
 return <li key={l}><a href={href}><span className="foot-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={ic} /></svg></span> {l}</a></li>;
 })}</ul>
 </div>
 </div>
 </div>

 {/* ===== BOTTOM LEGAL BAR ===== */}
 <div className="foot-legal">
 <span>© 2026 OJIX // ALL_RIGHTS_RESERVED</span>
 <div className="foot-legal-links">
 <a href="/terms">Terms of Service</a>
 <a href="/privacy">Privacy Policy</a>
 </div>
 </div>

 {/* ===== BIG OJIX LETTERS (background decoration) ===== */}
 <motion.div
 initial={reduced ? false : { opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="foot-big-wrapper"
 aria-hidden
 >
 <div className="foot-big">
 <div className="foot-line" ref={lineRef}>
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: lineVisible ? 1 : 0 }}
 transition={{ duration: reduced ? 0 : 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
 className={"foot-line-inner" + (lineVisible ? " visible" : "")}
 />
 </div>
 {["O", "J", "I", "X"].map((char, i) => (
 <span
 key={i}
 style={{ display: "inline-block", cursor: "default", transition: "color 100ms ease-out, text-shadow 100ms ease-out, transform 100ms ease-out" }}
 onMouseEnter={(e) => {
 e.currentTarget.style.color = "var(--color-accent)";
 e.currentTarget.style.textShadow = "0 0 16px rgba(201,102,47,0.5), 0 0 40px rgba(201,102,47,0.35), 0 0 80px rgba(201,102,47,0.2)";
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
 </footer>
 );
}
