import { Inter_Tight, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE, PAGES } from "@/lib/seo";

const interTight = Inter_Tight({
 subsets: ["latin"],
 weight: ["400", "500", "600"],
 variable: "--font-inter-tight",
 display: "swap",
});

const inter = Inter({
 subsets: ["latin"],
 weight: ["400", "500"],
 variable: "--font-inter",
 display: "swap",
});

const jetbrains = JetBrains_Mono({
 subsets: ["latin"],
 weight: ["400", "500"],
 variable: "--font-jetbrains",
 display: "swap",
});

const SITE_URL = SITE.url;
const PAGE_PATH = "/";

export const metadata = {
 title: PAGES.home.title,
 description: PAGES.home.description,
 keywords: [
 "software product studio",
 "enterprise software development",
 "AI and machine learning solutions",
 "cloud infrastructure services",
 "DevOps and automation",
 "digital product engineering",
 "enterprise application development",
 "custom software development",
 "OCR and document intelligence",
 "CRM and ERP development",
 "Bengaluru",
 "India",
 "OJIX",
 ],
 authors: [{ name: "OJIX" }],
 creator: "OJIX",
 publisher: "OJIX",
 metadataBase: new URL(SITE_URL),
 alternates: {
 canonical: `${SITE_URL}${PAGE_PATH}`,
 },
 openGraph: {
 type: "website",
 locale: "en_IN",
 url: `${SITE_URL}${PAGE_PATH}`,
 siteName: SITE.name,
 title: PAGES.home.title,
 description: PAGES.home.description,
 images: [
 {
 url: "/og-cinematic.svg",
 width: 1200,
 height: 630,
 alt: `${SITE.name} — ${SITE.tagline}`,
 type: "image/svg+xml",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: SITE.name,
 description: PAGES.home.description,
 images: ["/og-cinematic.svg"],
 creator: "@ojix",
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 "max-image-preview": "large",
 "max-snippet": -1,
 },
 },
 category: "technology",
};

export const viewport = {
 themeColor: "#0A0A0E",
 colorScheme: "dark",
 width: "device-width",
 initialScale: 1,
};

const jsonLdWebSite = {
 "@context": "https://schema.org",
 "@type": "WebSite",
 name: SITE.name,
 url: SITE_URL,
 description: PAGES.home.description,
 potentialAction: {
 "@type": "SearchAction",
 target: `${SITE_URL}/#search={search_term_string}`,
 "query-input": "required name=search_term_string",
 },
};

const jsonLdOrg = {
 "@context": "https://schema.org",
 "@type": "Organization",
 name: SITE.name,
 url: SITE_URL,
 description: "Engineering technology solutions for the digital enterprise.",
 address: {
 "@type": "PostalAddress",
 addressLocality: SITE.location.city,
 addressRegion: SITE.location.state,
 addressCountry: "IN",
 streetAddress: SITE.location.address,
 },
 contactPoint: [
 {
 "@type": "ContactPoint",
 contactType: "sales",
 email: SITE.email,
 telephone: SITE.phone[0],
 availableLanguage: ["English"],
 },
 ],
 sameAs: [
 SITE.social.linkedin,
 SITE.social.twitter,
 SITE.social.github,
 ],
};

const jsonLdBreadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 {
 "@type": "ListItem",
 position: 1,
 name: "Home",
 item: `${SITE_URL}/`,
 },
 ],
};

export default function RootLayout({ children }) {
 return (
 <html lang="en" className="dark">
 <body>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
 <div
 className={`${interTight.variable} ${inter.variable} ${jetbrains.variable}`}
 style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
 >
 <a href="#main" className="skip">Skip to content</a>
 <noscript>
 <div style={{ padding: 24, background: "#0A0A0E", color: "#F5F5F4", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
 The OJIX site requires JavaScript. Please enable JavaScript in your browser settings to view this page.
 </div>
 </noscript>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
 />
 {children}
 </div>
 </body>
 </html>
 );
}
