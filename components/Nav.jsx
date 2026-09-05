"use client";
import { useEffect, useState } from "react";

const LINKS = [
 ["Services", "#services"],
 ["Industries", "#industries"],
 ["Why OJIX", "#why"],
 ["Contact", "#contact"],
];

export default function Nav({ ready }) {
 const [scrolled, setScrolled] = useState(false);
 const [open, setOpen] = useState(false);
 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 24);
 onScroll();
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);
 return (
 <>
 <nav className={scrolled ? "scrolled" : ""} style={{ opacity: ready ? 1 : 0, transition: "opacity 400ms ease" }}>
 <a href="#top" className="logo">
 {/* <span className="bar" />OJIX */}
 <img src="/logo-ojix.svg" alt="OJIX" />
 </a>
 <ul className="nav-links">
 {LINKS.map(([l, h]) => (
 <li key={l}><a href={h}>{l}</a></li>
 ))}
 </ul>
 <a href="/login" className="nav-cta" data-cursor="Go">Login</a>
 <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Menu">
 <span /><span /><span />
 </button>
 </nav>
 <div className={`m-menu ${open ? "open" : ""}`}>
 <button className="m-close" onClick={() => setOpen(false)} aria-label="Close menu">&times;</button>
 {LINKS.map(([l, h]) => (
 <a key={l} href={h} onClick={() => setOpen(false)}>{l}<em>{h.replace("#", "")}</em></a>
 ))}
 <a href="/login" className="m-menu-cta" onClick={() => setOpen(false)}>Login</a>
 </div>
 </>
 );
}
