import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
 subsets: ["latin"],
 weight: ["300", "400", "500", "700"],
 variable: "--font-roboto",
 display: "swap",
});

export const metadata = {
 title: "Terms of Service | OJIX",
 description: "Terms and conditions for using the OJIX website and engaging OJIX for software services.",
};

export default function TermsPage() {
 return (
 <div lang="en" className={roboto.variable} style={s.page}>
 <header style={s.header}>
 <div style={s.headerInner}>
 <a href="/" style={s.logoWrap}>
 <span style={s.logoBar} aria-hidden="true" />
 <span style={s.logoText}>OJIX</span>
 </a>
 <nav style={s.nav}>
 <a href="/" style={s.navLink}>Home</a>
 <a href="/privacy" style={s.navLink}>Privacy</a>
 </nav>
 </div>
 </header>

 <main style={s.main}>
 <p style={s.label}>LEGAL</p>
 <h1 style={s.title}>Terms of Service</h1>
 <p style={s.meta}>Last updated: 15 June 2026</p>
 <div style={s.divider} />

 <Section title="1. About these terms">
 These terms govern your use of the OJIX website (ojix.com). They do not govern any software development or consulting engagement — those are covered by a separate written agreement between OJIX and the client.
 </Section>

 <Section title="2. About the website">
 The OJIX website is informational. It describes our services, our work, and our team. It also lets you send us a message via the contact form. We try to keep the information on this site accurate, but we make no warranty as to its completeness or fitness for any particular purpose.
 </Section>

 <Section title="3. Acceptable use">
 You agree not to:
 <ul>
 <li>Use the site for any unlawful purpose.</li>
 <li>Attempt to gain unauthorized access to any part of the site, its servers, or its infrastructure.</li>
 <li>Probe, scan, or test the vulnerability of the site.</li>
 <li>Use the contact form to send unsolicited commercial messages, malware, or anything abusive.</li>
 <li>Scrape, mirror, or reproduce the site content at scale without our written permission.</li>
 </ul>
 </Section>

 <Section title="4. Intellectual property">
 The OJIX name, logo, the OJIX wordmark, and all content on this site (text, designs, code, photography) are owned by OJIX or our licensors. You may view the site for personal or business evaluation purposes. You may not copy, distribute, or create derivative works without our written permission.
 </Section>

 <Section title="5. Third-party content">
 The site may link to third-party websites (LinkedIn, GitHub, etc.). We are not responsible for the content, privacy practices, or availability of those sites.
 </Section>

 <Section title="6. No warranty">
 The site is provided "as is" and "as available." To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
 </Section>

 <Section title="7. Limitation of liability">
 To the maximum extent permitted by law, OJIX will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this site, even if we have been advised of the possibility of such damages.
 </Section>

 <Section title="8. Indemnification">
 You agree to indemnify and hold OJIX harmless from any claim, demand, or damage arising from your breach of these terms or your misuse of the site.
 </Section>

 <Section title="9. Governing law">
 These terms are governed by the laws of India. Any disputes will be resolved in the courts of Bengaluru, Karnataka.
 </Section>

 <Section title="10. Changes to these terms">
 We may update these terms occasionally. The "Last updated" date at the top will reflect the current version.
 </Section>

 <Section title="11. Contact">
 Questions about these terms? Email <a href="mailto:hello@ojix.com" style={{ color: "var(--color-accent)" }}>hello@ojix.com</a>.
 </Section>

 <p style={s.disclaimer}>
 This is a placeholder document. OJIX is not a lawyer. Before publishing publicly, have this reviewed by a qualified legal professional in your jurisdiction.
 </p>
 </main>

 <footer style={s.footer}>
 <div style={s.footerInner}>
 <span>2026 OJIX. All rights reserved.</span>
 <span>Bengaluru, India</span>
 </div>
 </footer>
 </div>
 );
}

function Section({ title, children }) {
 return (
 <section style={{ marginBottom: 40 }}>
 <h2 style={s.heading}>{title}</h2>
 <div style={s.body}>{children}</div>
 </section>
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
 main: {
 maxWidth: 760,
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
 fontSize: 13,
 marginBottom: 48,
 fontFamily: "'JetBrains Mono', monospace",
 },
 divider: {
 height: 1,
 background: "var(--color-border)",
 marginBottom: 64,
 },
 body: {
 color: "var(--color-fg-2)",
 lineHeight: 1.75,
 fontSize: 15,
 },
 heading: {
 font: "500 18px 'Roboto'",
 marginBottom: 14,
 color: "var(--color-fg)",
 letterSpacing: "-0.01em",
 },
 disclaimer: {
 marginTop: 80,
 fontSize: 13,
 color: "var(--color-fg-3)",
 padding: "20px 24px",
 borderLeft: "2px solid var(--color-accent)",
 background: "rgba(201, 102, 47, 0.06)",
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
 flexWrap: "wrap",
 gap: 12,
 fontSize: 13,
 color: "var(--color-fg-3)",
 },
};
