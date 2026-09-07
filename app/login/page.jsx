import { Roboto } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const roboto = Roboto({
 subsets: ["latin"],
 weight: ["300", "400", "500", "700"],
 variable: "--font-roboto",
 display: "swap",
});

export const metadata = {
 title: "Login | OJIX",
 description: "Sign in to your OJIX account.",
};

export default function LoginPage() {
 return (
 <div lang="en" className={roboto.variable} style={s.page}>
 <header style={s.header}>
 <div style={s.headerInner}>
 <Link href="/" style={s.logoWrap}>
 <span style={s.logoBar} aria-hidden="true" />
 <span style={s.logoText}>OJIX</span>
 </Link>
 <nav style={s.nav}>
 <a href="/" style={s.navLink}>Home</a>
 </nav>
 </div>
 </header>

 <main style={s.main}>
 <Link href="/" style={s.backBtn} aria-label="Back to home">
 <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
 Back
 </Link>
 <p style={s.label}>AUTH</p>
 <h1 style={s.title}>Sign in</h1>
 <p style={s.meta}>Welcome back. Enter your credentials to continue.</p>
 <div style={s.divider} />

 <form style={s.form}>
 <label style={s.field}>
 <span style={s.fieldLabel}>Email</span>
 <input
 type="email"
 placeholder="you@example.com"
 style={s.input}
 required
 autoComplete="email"
 />
 </label>
 <label style={s.field}>
 <span style={s.fieldLabel}>Password</span>
 <input
 type="password"
 placeholder="••••••••"
 style={s.input}
 required
 autoComplete="current-password"
 />
 </label>
 <button type="submit" style={s.button}>Sign in</button>
 <p style={s.altText}>
 Don&apos;t have an account? <a href="#" style={s.altLink}>Request access</a>
 </p>
 </form>
 </main>

 <footer style={s.footer}>
 <div style={s.footerInner}>
 <span>2026 OJIX. All rights reserved.</span>
 <Link href="/" style={s.footerLink}>Back to home</Link>
 </div>
 </footer>
 </div>
 );
}

const s = {
 page: {
 background: "var(--color-bg)",
 minHeight: "100vh",
 color: "var(--color-fg)",
 fontFamily: "var(--font-roboto), 'Roboto', system-ui, sans-serif",
 },
 header: {
 borderBottom: "1px solid var(--color-border)",
 padding: "20px 0",
 position: "sticky",
 top: 0,
 background: "rgba(10, 10, 14, 0.85)",
 backdropFilter: "blur(12px)",
 zIndex: 10,
 },
 headerInner: {
 maxWidth: 1100,
 margin: "0 auto",
 padding: "0 24px",
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 },
 logoWrap: {
 display: "flex",
 alignItems: "center",
 gap: 12,
 textDecoration: "none",
 color: "var(--color-fg)",
 },
 logoBar: {
 display: "block",
 width: 4,
 height: 28,
 background: "var(--color-accent)",
 },
 logoText: {
 font: "500 18px 'Roboto'",
 letterSpacing: "0.05em",
 },
 nav: {
 display: "flex",
 gap: 28,
 fontSize: 13,
 },
 navLink: {
 color: "var(--color-fg-2)",
 textDecoration: "none",
 letterSpacing: "0.03em",
 transition: "color 0.2s",
 },
 backBtn: {
 display: "inline-flex",
 alignItems: "center",
 gap: 6,
 color: "var(--color-fg-3)",
 textDecoration: "none",
 fontSize: 13,
 letterSpacing: "0.03em",
 marginBottom: 32,
 transition: "color 200ms",
 },
 main: {
 maxWidth: 420,
 margin: "0 auto",
 padding: "80px 24px 120px",
 },
 label: {
 font: "500 11px 'JetBrains Mono', monospace",
 letterSpacing: "0.2em",
 textTransform: "uppercase",
 color: "var(--color-accent)",
 marginBottom: 20,
 },
 title: {
 font: "500 52px 'Roboto'",
 letterSpacing: "-0.025em",
 marginBottom: 16,
 lineHeight: 1.05,
 },
 meta: {
 color: "var(--color-fg-3)",
 fontSize: 14,
 marginBottom: 40,
 },
 divider: {
 height: 1,
 background: "var(--color-border)",
 marginBottom: 40,
 },
 form: {
 display: "flex",
 flexDirection: "column",
 gap: 20,
 },
 field: {
 display: "flex",
 flexDirection: "column",
 gap: 8,
 },
 fieldLabel: {
 font: "500 11px 'JetBrains Mono', monospace",
 letterSpacing: "0.15em",
 textTransform: "uppercase",
 color: "var(--color-fg-3)",
 },
 input: {
 background: "var(--color-bg-2)",
 border: "1px solid var(--color-border)",
 borderRadius: 6,
 padding: "12px 14px",
 color: "var(--color-fg)",
 font: "400 14px 'Roboto'",
 outline: "none",
 transition: "border-color 200ms",
 },
 button: {
 background: "var(--color-accent)",
 color: "var(--color-bg)",
 font: "500 14px 'Roboto'",
 letterSpacing: "0.04em",
 border: "none",
 borderRadius: 6,
 padding: "14px 0",
 cursor: "pointer",
 marginTop: 8,
 transition: "background 200ms",
 },
 altText: {
 textAlign: "center",
 fontSize: 13,
 color: "var(--color-fg-3)",
 marginTop: 16,
 },
 altLink: {
 color: "var(--color-accent)",
 textDecoration: "none",
 },
 footer: {
 borderTop: "1px solid var(--color-border)",
 padding: "36px 0",
 },
 footerInner: {
 maxWidth: 1100,
 margin: "0 auto",
 padding: "0 24px",
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 fontSize: 13,
 color: "var(--color-fg-3)",
 },
 footerLink: {
 color: "var(--color-accent)",
 textDecoration: "none",
 fontSize: 13,
 },
};
