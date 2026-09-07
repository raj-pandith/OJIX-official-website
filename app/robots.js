const SITE_URL = "https://ojix.in";

export default function robots() {
 return {
 rules: [
 {
 userAgent: "*",
 allow: ["/"],
 disallow: ["/api/", "/_next/"],
 },
 ],
 sitemap: `${SITE_URL}/sitemap.xml`,
 };
}
