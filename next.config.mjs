import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);

export default {
 reactStrictMode: true,
 webpack: (config) => {
 config.ignoreWarnings = [
 ...(config.ignoreWarnings || []),
 (warning) => {
 return (
 typeof warning === "object" &&
 warning.message &&
 warning.message.includes("unstable_act")
 );
 },
 ];

 return config;
 },
};
