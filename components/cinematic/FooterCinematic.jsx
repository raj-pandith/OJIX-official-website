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

const MAP_ADDRESS = encodeURIComponent(SITE.location.address || "Ranga Rao Rd, Shankarapura, Bengaluru, Karnataka 560004, India");

export default function FooterCinematic() {
 const reduced = useReducedMotion();
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
 <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
 </div>
 <div className="foot-contact-item">
 <span className="foot-contact-label">Phone</span>
 <div>
 <a href={`tel:${SITE.phone[0].replace(/ /g, "")}`}>{SITE.phone[0]}</a>
 <a href={`tel:${SITE.phone[1].replace(/ /g, "")}`}>{SITE.phone[1]}</a>
 </div>
 </div>
 <div className="foot-contact-item">
 <span className="foot-contact-label">Address</span>
 <span>{SITE.location.address || "Ranga Rao Rd, Shankarapura, Bengaluru, Karnataka 560004"}</span>
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
 <h3 className="foot-col-h">// SITEMAP</h3>
 <ul>{COLS[0][1].map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h">// CONNECT</h3>
 <ul>{RIGHT_COLS[0][1].map(([l, href]) => <li key={l}><a href={href} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul>
 </div>
 <div className="foot-col">
 <h3 className="foot-col-h">// REACH US</h3>
 <ul>{RIGHT_COLS[1][1].map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul>
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
