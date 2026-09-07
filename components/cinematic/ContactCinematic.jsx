"use client";
import { useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/seo";

const ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const EMAIL = SITE.email;

export default function ContactCinematic() {
 const baseId = useId();
 const [state, setState] = useState({ name: "", email: "", company: "", type: "Custom Platform", message: "" });
 const [status, setStatus] = useState("idle");
 const reduced = useReducedMotion();
 const onChange = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));
 const onSubmit = async (e) => {
 e.preventDefault();
 setStatus("sending");
 try {
 const res = await fetch(ENDPOINT, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(state),
 });
 if (res.ok) setStatus("ok");
 else throw new Error();
 } catch {
 const body = encodeURIComponent(`Name: ${state.name}\nEmail: ${state.email}\nCompany: ${state.company}\nType: ${state.type}\n\n${state.message}`);
 window.location.href = `mailto:${EMAIL}?subject=OJIX%20Inquiry&body=${body}`;
 setStatus("ok");
 }
 };

 return (
 <section id="contact" className="contact">
 <div className="shell">
 <div style={{ "display": "flex", flexDirection: "column",alignItems:"start", height: "100%", position: "relative", top: "2rem" }}>
 <span className="sec-num" aria-hidden="true"><span className="dot" /> 05 / CONTACT</span>
 </div>
 <div className="talk-grid" >
 <div className="talk-left">
 <h2>Let&apos;s <em>talk.</em></h2>
 <p className="sub">Tell us about your project , whether it&apos;s AI-driven, tech-based, or non-tech. We&apos;ll map out the best path forward.</p>
 </div>

 <div className="talk-right">
 <div className="sr-only" role="status" aria-live="polite">
 {status === "ok" && "Form submitted. We will be in touch within 48 hours."}
 {status === "sending" && "Sending your message."}
 </div>

 {status === "ok" ? (
 <div className="cform-success" style={{ textAlign: "center" }}>
 <h3 style={{ fontSize: 28, marginBottom: 12, color: "var(--color-fg)" }}>Signal received.</h3>
 <p style={{ color: "var(--color-fg-2)" }}>We&apos;ll be in touch within 48 hours.</p>
 </div>
 ) : (
 <motion.form
 className="cform"
 onSubmit={onSubmit}
 initial={reduced ? false : { opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.15 }}
 noValidate
 >
 <div className="frame-outer">
 <svg className="frame-svg" viewBox="0 0 720 520" preserveAspectRatio="none">
 <polyline className="frame-line frame-line--main" points="20,0 0,0 0,20" />
 <polyline className="frame-line frame-line--main" points="700,0 720,0 720,20" />
 <polyline className="frame-line frame-line--main" points="0,500 0,520 20,520" />
 <polyline className="frame-line frame-line--main" points="720,500 720,520 700,520" />
 <polyline className="frame-line frame-line--accent" points="0,0 0,120" />
 <polyline className="frame-line frame-line--br" points="720,520 620,520" />
 </svg>
 <div className="frame-inner">
 <div className="frow">
 <div className="ff">
 <label htmlFor={`${baseId}-name`}><span aria-hidden="true">//</span> NAME <span aria-hidden="true">*</span></label>
 <input id={`${baseId}-name`} type="text" required value={state.name} onChange={onChange("name")} placeholder="Your name" aria-required="true" />
 </div>
 <div className="ff">
 <label htmlFor={`${baseId}-email`}><span aria-hidden="true">//</span> EMAIL <span aria-hidden="true">*</span></label>
 <input id={`${baseId}-email`} type="email" required value={state.email} onChange={onChange("email")} placeholder="you@company.com" aria-required="true" />
 </div>
 </div>
 <div className="frow">
 <div className="ff">
 <label htmlFor={`${baseId}-company`}><span aria-hidden="true">//</span> COMPANY</label>
 <input id={`${baseId}-company`} type="text" value={state.company} onChange={onChange("company")} placeholder="Company name" />
 </div>
 <div className="ff">
 <label htmlFor={`${baseId}-type`}><span aria-hidden="true">//</span> SERVICE</label>
 <select id={`${baseId}-type`} value={state.type} onChange={onChange("type")}>
 <option>Custom Platform</option>
 <option>AI & Machine Learning</option>
 <option>Cloud & DevOps</option>
 <option>API & Integrations</option>
 <option>Data Engineering</option>
 <option>Technical Consulting</option>
 <option>Not sure yet</option>
 </select>
 </div>
 </div>
 <div className="ff">
 <label htmlFor={`${baseId}-message`}><span aria-hidden="true">//</span> PROJECT <span aria-hidden="true">*</span></label>
 <textarea id={`${baseId}-message`} rows={5} required value={state.message} onChange={onChange("message")} placeholder="What are you building? Stack, timeline, team size?" aria-required="true" />
 </div>
 <div className="f-actions">
 <button type="submit" className="btn btn-primary" disabled={status === "sending"} aria-busy={status === "sending"} data-cursor="Send">
 {status === "sending" ? "SENDING..." : "TRANSMIT"} <span className="arr" aria-hidden="true">→</span>
 </button>
 </div>
 </div>
 </div>
 </motion.form>
 )}
 </div>
 </div>

 <p className="small">
 <span className="ic-xs" aria-hidden="true" style={{verticalAlign: "middle", marginRight: 4}}><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" /></svg></span> OR_EMAIL &gt; <a href={`mailto:${EMAIL}`}>{EMAIL.toUpperCase()}</a> // BENGALURU · INDIA
 </p>
 </div>
 </section>
 );
}
