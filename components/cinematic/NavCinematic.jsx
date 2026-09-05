"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const LINKS = [
 ["01", "Capabilities", "#services"],
 ["02", "Sectors", "#industries"],
// ["03", "Team", "#team"],
 ["03", "Process", "#process"],
 ["04", "Stack", "#techstack"],
 ["05", "Contact", "#contact"],
];

export default function NavCinematic({ ready }) {
 const [scrolled, setScrolled] = useState(false);
 const [open, setOpen] = useState(false);
 const [activeId, setActiveId] = useState("");
 const observerRef = useRef(null);
 const pendingTargetRef = useRef(null);

 // Build a map of section id → link index for quick lookup
 const sectionIds = LINKS.map(([, , hash]) => hash.replace("#", ""));

 // Observe sections to update the active navlink on scroll
 useEffect(() => {
 const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
 if (!sections.length) return;

 const handler = (entries) => {
 // If a click navigation is pending, only accept the entry that matches
 // the pending target so the observer "locks on" and then hands control back.
 const pending = pendingTargetRef.current;

 let best = null;
 if (pending) {
 best = entries.find((e) => e.target.id === pending);
 if (best) {
 pendingTargetRef.current = null; // lock-on complete, resume normal updates
 }
 }

 if (!best) {
 // No pending target — pick whichever section is most visible
 best = entries.reduce((a, b) =>
 (b.intersectionRatio ?? 0) > (a.intersectionRatio ?? 0) ? b : a
 , entries[0]);
 }

 if (best?.isIntersecting || (best?.intersectionRatio ?? 0) > 0) {
 setActiveId(best.target.id);
 }
 };

 observerRef.current = new IntersectionObserver(handler, {
 rootMargin: "-30% 0px -60% 0px",
 threshold: [0, 0.25, 0.5, 1],
 });

 sections.forEach((s) => observerRef.current.observe(s));

 // Set initial active section if one is already in view on load
 const initial = sections.find((s) => {
 const rect = s.getBoundingClientRect();
 return rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
 });
 if (initial) setActiveId(initial.id);

 return () => observerRef.current?.disconnect();
 }, [sectionIds]);

 const handleNavClick = useCallback(
 (e, hash) => {
 const target = document.getElementById(hash.replace("#", ""));
 if (!target) return;

 e.preventDefault();

 // Immediately set this link as active and mark the pending target
 const id = hash.replace("#", "");
 setActiveId(id);
 pendingTargetRef.current = id;

 // Smooth-scroll via Lenis when available, fall back to native
 const lenis = typeof window !== "undefined" ? window.__lenis : null;
 if (lenis?.scrollTo) {
 lenis.scrollTo(target, { offset: 0 });
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
 const isActive = activeId === id;
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
