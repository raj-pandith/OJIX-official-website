"use client";
import { motion, useReducedMotion } from "framer-motion";

const COLS = [
 ["Sitemap", [["Services", "#services"], ["Industries", "#industries"], ["Why OJIX", "#why"], ["Contact", "#contact"]]],
 ["Connect", [["LinkedIn", "#"], ["Twitter / X", "#"], ["WhatsApp", "#"], ["hello@ojix.com", "mailto:hello@ojix.com"]]],
 ["Legal", [["Privacy Policy", "/privacy"], ["Terms", "/terms"]]],
];

const SocialLink = ({ href, icon, label }) => (
 <a
 href={href}
 aria-label={label}
 style={{
 display: "inline-flex",
 alignItems: "center",
 justifyContent: "center",
 width: 40,
 height: 40,
 borderRadius: "50%",
 border: "1px solid var(--color-border)",
 color: "var(--color-secondary)",
 transition: "all 200ms ease",
 cursor: "pointer",
 textDecoration: "none",
 }}
 onMouseEnter={(e) => {
 e.currentTarget.style.color = "var(--color-accent)";
 e.currentTarget.style.borderColor = "var(--color-accent)";
 e.currentTarget.style.background = "rgba(3,105,161,0.06)";
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.color = "var(--color-secondary)";
 e.currentTarget.style.borderColor = "var(--color-border)";
 e.currentTarget.style.background = "transparent";
 }}
 >
 {icon}
 </a>
);

export default function Footer() {
 const reduced = useReducedMotion();
 return (
 <footer>
 <div className="foot-grid">
 <div className="foot-brand">
 <h3>OJIX</h3>
 <p>Engineering intelligence for the physical world. Software, AI, mechanics, automation — one team.</p>
 <div className="foot-social">
 <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>} label="Facebook" />
 <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>} label="Instagram" />
 <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48 9.75,15.02"/></svg>} label="YouTube" />
 <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>} label="Twitter / X" />
 <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>} label="LinkedIn" />
 <SocialLink href="#" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>} label="WhatsApp" />
 </div>
 </div>
 <div className="foot-cols">
 {COLS.map(([h, links]) => (
 <div key={h} className="foot-col">
 <h3 className="foot-col-h">{h}</h3>
 <ul>
 {links.map(([l, href]) => (
 <li key={l}><a href={href}>{l}</a></li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>

 <motion.div
 initial={reduced ? false : { opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="foot-big"
 aria-hidden
 >
 {["O", "J", "I", "X"].map((char, i) => (
 <span
 key={i}
 style={{
 display: "inline-block",
 cursor: reduced ? "default" : "pointer",
 transition: "color 100ms ease-out, text-shadow 100ms ease-out, transform 100ms ease-out",
 }}
 onMouseEnter={reduced ? undefined : (e) => {
 e.currentTarget.style.color = "#FF5C00";
 e.currentTarget.style.textShadow = "0 0 10px rgba(255,92,0,0.8), 0 0 30px rgba(255,92,0,0.5), 0 0 60px rgba(255,92,0,0.25)";
 e.currentTarget.style.transform = "scale(1.04)";
 e.currentTarget.style.transformOrigin = "center bottom";
 }}
 onMouseLeave={reduced ? undefined : (e) => {
 e.currentTarget.style.color = "transparent";
 e.currentTarget.style.textShadow = "none";
 e.currentTarget.style.transform = "scale(1)";
 e.currentTarget.style.transition = "color 400ms ease-out, text-shadow 400ms ease-out, transform 400ms ease-out";
 }}
 >
 {char}
 </span>
 ))}
 </motion.div>

 <div className="foot-bottom">
 <span>© 2026 OJIX. ALL RIGHTS RESERVED.</span>
 <span>WHERE CODE MEETS STEEL</span>
 </div>
 </footer>
 );
}
