"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/seo";

const LINKS = [
 ["01", "Capabilities", "#services"],
 ["02", "Sectors", "#industries"],
 ["03", "Team", "#team"],
 ["04", "Process", "#process"],
 ["05", "Stack", "#techstack"],
 ["06", "Contact", "#contact"],
];

export default function NavCinematic({ ready }) {
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
 <nav className={scrolled ? "scrolled" : ""} style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)" }}>
 <a href="#top" className="logo">
 <img src="/ondark-for-navbar.svg" alt="OJIX" className="nav-logo-img" />
 </a>
 <ul className="nav-links">
 {LINKS.map(([n, l, h]) => (
 <li key={l}><a href={h}><span className="num">{n}</span>{l}</a></li>
 ))}
 </ul>
 <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Menu">
 <span /><span /><span />
 </button>
 </nav>
 <div className={`m-menu ${open ? "open" : ""}`}>
 {LINKS.map(([n, l, h]) => <a key={l} href={h} onClick={() => setOpen(false)}>{l}<em>{n}</em></a>)}
 <a href="/login" className="m-menu-cta" data-cursor="Go">Login</a>
 </div>
 </>
 );
}
