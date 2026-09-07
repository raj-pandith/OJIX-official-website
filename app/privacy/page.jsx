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
 title: "Privacy Policy | OJIX",
 description: "How OJIX collects, uses, and protects your information.",
};

const SECTIONS = [
 {
 title: "1. Who we are",
 body: `OJIX ("we", "us", "our") is a software product studio registered in Bengaluru, India. We operate ojix.com. You can contact us at hello@ojix.com.`,
 },
 {
 title: "2. What information we collect",
 body: `We collect information in two ways:
 <ul>
 <li><strong>Information you give us:</strong> When you fill in our contact form, we collect your name, email, company name, the type of service you're interested in, and the message you send. Nothing more.</li>
 <li><strong>Information collected automatically:</strong> When you visit our site, our hosting provider (Vercel) and any analytics we run may collect your IP address, browser type, operating system, referring page, and pages visited.</li>
 </ul>`,
 },
 {
 title: "3. How we use your information",
 body: `We use the information we collect to:
 <ul>
 <li>Reply to your inquiry — the only thing we do with the data you send in the contact form.</li>
 <li>Operate, secure, and improve the website.</li>
 <li>Comply with legal obligations.</li>
 </ul>
 We do not sell your data. We do not share it with third parties for marketing.`,
 },
 {
 title: "4. Where your data goes",
 body: `Form submissions are delivered to a private email inbox at hello@ojix.com. We do not currently use a third-party form-handling service, but if we do in future, this policy will be updated. Hosting and infrastructure are provided by Vercel Inc. — <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.`,
 },
 {
 title: "5. How long we keep your data",
 body: `Form submissions are kept in our email inbox for as long as we are in active conversation with you, and archived for up to 24 months for record-keeping. You can ask us to delete your submission at any time — see section 8.`,
 },
 {
 title: "6. Cookies and tracking",
 body: `We use cookies to operate the site and, with your consent, to understand how visitors use it.
 <ul>
 <li><strong>Essential cookies:</strong> Always active. Required for the site to function. Cannot be switched off.</li>
 <li><strong>Analytics cookies:</strong> Optional. Help us understand which pages are visited and how people move around the site. We use Google Analytics (privacy-respecting mode where possible).</li>
 <li><strong>Marketing cookies:</strong> Optional. Used to deliver relevant advertising and measure campaign effectiveness. Not currently active on our site, but the infrastructure is in place.</li>
 </ul>
 You can change your cookie preferences at any time by clicking "Manage cookies" in the footer of this site.`,
 },
 {
 title: "7. Your rights",
 body: `You can ask us at any time to:
 <ul>
 <li>Tell you what personal data we hold about you.</li>
 <li>Correct inaccurate data.</li>
 <li>Delete your data.</li>
 </ul>
 Email hello@ojix.com. We will respond within 30 days.`,
 },
 {
 title: "8. Security",
 body: `The site uses HTTPS. Form submissions are transmitted over TLS. We use industry-standard access controls on the email inbox that receives inquiries.`,
 },
 {
 title: "9. Changes to this policy",
 body: `We may update this policy occasionally. The "Last updated" date at the top will reflect the current version. Material changes will be flagged by updating the date and content.`,
 },
 {
 title: "10. Contact",
 body: `Questions? Email <a href="mailto:hello@ojix.com">hello@ojix.com</a>. Postal address available on request.`,
 },
];

function Section({ title, body }) {
 return (
 <section style={{ marginBottom: 44 }}>
 <h2 style={s.heading}>{title}</h2>
 <div style={s.body} dangerouslySetInnerHTML={{ __html: body }} />
 <style>{s.sectionCss}</style>
 </section>
 );
}

export default function PrivacyPage() {
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
 <a href="/terms" style={s.navLink}>Terms</a>
 </nav>
 </div>
 </header>

 <main style={s.main}>
 <p style={s.label}>LEGAL</p>
 <h1 style={s.title}>Privacy Policy</h1>
 <p style={s.meta}>Last updated: 2 September 2026</p>
 <div style={s.divider} />

 {SECTIONS.map((s) => (
 <Section key={s.title} title={s.title} body={s.body} />
 ))}

 <p style={s.disclaimer}>
 This is a placeholder document. OJIX is not a law firm. Before publishing
 publicly, have this reviewed by a qualified legal professional in your
 jurisdiction.
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

const s = {
 global: `
 a { color: var(--color-accent); text-decoration: none; }
 a:hover { text-decoration: underline; }
 ul { padding-left: 22px; }
 ul li { margin-bottom: 8px; line-height: 1.65; }
 `,
 sectionCss: `
 ul { padding-left: 22px; }
 ul li { margin-bottom: 8px; line-height: 1.65; }
 `,
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
