"use client";
import { createContext, useContext, useRef } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
 const lenisRef = useRef(null);
 return (
 <LenisContext.Provider value={lenisRef}>
 {children}
 </LenisContext.Provider>
 );
}

export function useLenis() {
 return useContext(LenisContext);
}

export default LenisContext;
