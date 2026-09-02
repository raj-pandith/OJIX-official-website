"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "ojix-cookie-consent";
const STORAGE_KEY = "ojix-cookie-prefs";

const CATEGORIES = [
 { key: "essential", label: "Essential", description: "Required for the site to function. Always active.", required: true },
 { key: "analytics", label: "Analytics", description: "Help us understand how visitors use the site.", required: false },
 { key: "marketing", label: "Marketing", description: "Used to deliver relevant advertising.", required: false },
];

const DEFAULTS = { essential: true, analytics: false, marketing: false };

function getStoredPrefs() {
 try {
 const raw = localStorage.getItem(STORAGE_KEY);
 if (raw) return JSON.parse(raw);
 } catch {}
 return null;
}

function savePrefs(prefs) {
 try {
 localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
 } catch {}
}

export function useCookieConsent() {
 const [prefs, setPrefs] = useState(DEFAULTS);
 const [decided, setDecided] = useState(false);
 const [showBanner, setShowBanner] = useState(false);
 const [showSettings, setShowSettings] = useState(false);

 useEffect(() => {
 const stored = getStoredPrefs();
 if (stored) {
 setPrefs(stored);
 setDecided(true);
 } else {
 setShowBanner(true);
 }
 }, []);

 const updatePref = useCallback((key, val) => {
 setPrefs((p) => ({ ...p, [key]: val }));
 }, []);

 const acceptAll = useCallback(() => {
 const all = { essential: true, analytics: true, marketing: true };
 setPrefs(all);
 savePrefs(all);
 setDecided(true);
 setShowBanner(false);
 setShowSettings(false);
 }, []);

 const rejectOptional = useCallback(() => {
 const onlyEssential = { essential: true, analytics: false, marketing: false };
 setPrefs(onlyEssential);
 savePrefs(onlyEssential);
 setDecided(true);
 setShowBanner(false);
 setShowSettings(false);
 }, []);

 const saveCustom = useCallback(() => {
 savePrefs(prefs);
 setDecided(true);
 setShowBanner(false);
 setShowSettings(false);
 }, [prefs]);

 const openSettings = useCallback(() => {
 setShowSettings(true);
 }, []);

 return { prefs, decided, showBanner, showSettings, updatePref, acceptAll, rejectOptional, saveCustom, openSettings, setShowSettings };
}

const overlayVariants = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { duration: 0.25 } },
 exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
 hidden: { y: 40, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 24, stiffness: 260 } },
 exit: { y: 24, opacity: 0, transition: { duration: 0.18 } },
};

export function CookieBanner({ useConsent }) {
 const { showBanner, acceptAll, rejectOptional } = useConsent;

 if (!showBanner) return null;

 return (
 <AnimatePresence>
 {showBanner && (
 <motion.div
 className="cookie-banner"
 initial={{ y: 80, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 exit={{ y: 80, opacity: 0 }}
 transition={{ type: "spring", damping: 22, stiffness: 180 }}
 role="dialog"
 aria-modal="false"
 aria-label="Cookie consent"
 >
 <div className="cookie-banner__inner">
 <div className="cookie-banner__header">
 <span className="cookie-banner__title">Cookie preferences</span>
 <span className="cookie-banner__sub">We use cookies to run the site and, with your consent, to understand how visitors use it.</span>
 </div>
 <div className="cookie-banner__actions">
 <button className="cookie-btn cookie-btn--ghost" onClick={rejectOptional}>
 Reject optional
 </button>
 <button className="cookie-btn cookie-btn--primary" onClick={acceptAll}>
 Accept all
 </button>
 </div>
 <a className="cookie-banner__link" href="/privacy">Read privacy policy</a>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}

export function CookieSettingsPanel({ useConsent }) {
 const { showSettings, setShowSettings, prefs, updatePref, acceptAll, saveCustom } = useConsent;
 const [dirty, setDirty] = useState(false);
 const initialPrefs = useRef(prefs);

 useEffect(() => {
 if (showSettings) {
 initialPrefs.current = prefs;
 setDirty(false);
 }
 }, [showSettings, prefs]);

 useEffect(() => {
 setDirty(JSON.stringify(prefs) !== JSON.stringify(initialPrefs.current));
 }, [prefs]);

 return (
 <AnimatePresence>
 {showSettings && (
 <>
 <motion.div
 className="cookie-overlay"
 variants={overlayVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 onClick={() => setShowSettings(false)}
 />
 <motion.div
 className="cookie-panel"
 variants={panelVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 role="dialog"
 aria-modal="true"
 aria-label="Cookie settings"
 >
 <div className="cookie-panel__header">
 <h2 className="cookie-panel__title">Cookie preferences</h2>
 <p className="cookie-panel__sub">Manage your cookie settings below.</p>
 <button
 className="cookie-panel__close"
 onClick={() => setShowSettings(false)}
 aria-label="Close"
 >
 <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
 <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
 </svg>
 </button>
 </div>
 <div className="cookie-panel__categories">
 {CATEGORIES.map((cat) => (
 <div key={cat.key} className={"cookie-cat " + (cat.required ? "cookie-cat--required" : "")}>
 <label className="cookie-cat__label">
 <span className="cookie-cat__name">{cat.label}</span>
 <span className="cookie-cat__desc">{cat.description}</span>
 </label>
 <Toggle
 checked={prefs[cat.key]}
 disabled={cat.required}
 onChange={(v) => updatePref(cat.key, v)}
 />
 </div>
 ))}
 </div>
 <div className="cookie-panel__actions">
 <button className="cookie-btn cookie-btn--ghost" onClick={() => { acceptAll(); }}>
 Accept all
 </button>
 <button className="cookie-btn cookie-btn--ghost" onClick={() => { initialPrefs.current = prefs; }}>
 Cancel
 </button>
 <button className="cookie-btn cookie-btn--primary" onClick={saveCustom} disabled={!dirty}>
 Save preferences
 </button>
 </div>
 <a className="cookie-panel__link" href="/privacy">Full privacy policy &rarr;</a>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}

function Toggle({ checked, disabled, onChange }) {
 return (
 <button
 role="switch"
 aria-checked={checked}
 disabled={disabled}
 className={"cookie-toggle " + (checked ? "cookie-toggle--on" : "cookie-toggle--off") + " " + (disabled ? "cookie-toggle--disabled" : "")}
 onClick={() => !disabled && onChange(!checked)}
 type="button"
 >
 <span className="cookie-toggle__thumb" />
 <span className="sr-only">{checked ? "On" : "Off"}</span>
 </button>
 );
}
