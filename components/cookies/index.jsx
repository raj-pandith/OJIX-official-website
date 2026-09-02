"use client";
import { useCookieConsent, CookieBanner, CookieSettingsPanel } from "@/components/cookies/CookieConsent";

export default function CookieWrapper() {
 const cc = useCookieConsent();
 return (
 <>
 <CookieBanner useConsent={cc} />
 <CookieSettingsPanel useConsent={cc} />
 </>
 );
}
