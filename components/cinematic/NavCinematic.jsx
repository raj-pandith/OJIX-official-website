"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const LINKS = [
 ["01", "Capabilities", "#services"],
 ["02", "Sectors", "#industries"],
//  ["03", "Team", "#team"],
 ["03", "Process", "#process"],
 ["04", "Stack", "#techstack"],
 ["05", "Contact", "#contact"],
];

export default function NavCinematic({ ready }) {
 const [scrolled, setScrolled] = useState(false);
 const [open, setOpen] = useState(false);
 const [activeHash, setActiveHash] = useState("");
 const observerRef = useRef(null);
 const isClickNavigating = useRef(false);

 // Observe sections to update the active navlink on scroll
 useEffect(() => {
 const sections = LINKS.map(([, , hash]) => document.querySelector(hash)).filter(Boolean);

 const handler = (entries) => {
 if (isClickNavigating.current) return;

 // Pick the entry that's most in view (highest intersection ratio)
 let best = entries[0];
 for (const entry of entries) {
 if ((entry.intersectionRatio ?? 0) > (best?.intersectionRatio ?? 0)) best = entry;
 }

 if (best?.isIntersecting || (best?.intersectionRatio ?? 0) > 0) {
 setActiveHash(best.target.id);
 }
 };

 observerRef.current = new IntersectionObserver(handler, {
 rootMargin: "-40% 0px -40% 0px",
 threshold: 0,
 });

 sections.forEach((s) => observerRef.current.observe(s));

 // Set initial active section if one is already in view on load
 const initial = sections.find((s) => {
 const rect = s.getBoundingClientRect();
 return rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
 });
 if (initial) setActiveHash(initial.id);

 return () => observerRef.current?.disconnect();
 }, []);

 const handleNavClick = useCallback(
 (e, hash) => {
 const target = document.querySelector(hash);
 if (!target) return;

 e.preventDefault();

 // Immediately set this link as active
 setActiveHash(hash.replace("#", ""));

 // Smooth-scroll via Lenis when available, fall back to native
 const lenis = typeof window !== "undefined" ? window.__lenis : null;
 if (lenis?.scrollTo) {
 isClickNavigating.current = true;
 lenis.scrollTo(target, { offset: 0 });
 setTimeout(() => { isClickNavigating.current = false; }, 1200);
 } else {
 target.scrollIntoView({ behavior: "smooth" });
 }

 // Close mobile menu if open
 setOpen(false);
 },
 []
 );

 const onScroll = () => setScrolled(window.scrollY > 24);

 useEffect(() => {
 onScroll();
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 return (
 <>
 <nav className={scrolled ? "scrolled" : ""} style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)" }}>
 <a href="#top" className="logo">
 <img src="/ojix-primary-transparent-ondark.svg" alt="OJIX" className="nav-logo-img" />
 </a>
 <ul className="nav-links">
 {LINKS.map(([n, l, h]) => {
 const id = h.replace("#", "");
 const isActive = activeHash === id;
 return (
 <li key={h}>
 <a
 href={h}
 className={isActive ? "active-link" : ""}
 onClick={(e) => handleNavClick(e, h)}
 >
 <span className="num">{n}</span>
 {l}
 </a>
 </li>
 );
 })}
 </ul>
 <a href="/login" className="nav-cta" data-cursor="Go">Login</a>
 <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Menu">
 <span /><span /><span />
 </button>
 </nav>
 <div className={`m-menu ${open ? "open" : ""}`}>
 {LINKS.map(([n, l, h]) => (
 <a
 key={l}
 href={h}
 onClick={(e) => {
 handleNavClick(e, h);
 }}
 >
 {l}
 <em>{n}</em>
 </a>
 ))}
 <a href="/login" className="m-menu-cta" data-cursor="Go">Login</a>
 </div>
 </>
 );
}
