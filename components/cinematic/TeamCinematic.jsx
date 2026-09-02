"use client";
import { motion, useReducedMotion } from "framer-motion";

const TEAM = [
  { num: "01", name: "Nitin Shimpi", role: "Group CEO & Co-founder", initials: "NS", hue: "#c9662f" },
  { num: "02", name: "Manjusha Madabushi", role: "CTO & Co-founder", initials: "MM", hue: "#00D4FF" },
  { num: "03", name: "Daljit Mirchandani", role: "Advisor", initials: "DM", hue: "#7C3AED" },
  { num: "04", name: "Sanjoy Singh", role: "CEO — Tech Enterprise Business", initials: "SS", hue: "#c9662f" },
  { num: "05", name: "Aniket Shaligram", role: "CEO — Startup Business", initials: "AS", hue: "#00D4FF" },
  { num: "06", name: "Pankaj Mendki", role: "Head of Emerging Technology", initials: "PM", hue: "#7C3AED" },
];

export default function TeamCinematic() {
  const reduced = useReducedMotion();
  return (
    <section id="team">
      <div className="shell">
        <span className="sec-num" aria-hidden="true"><span className="dot" /> 03 / TEAM</span>
        <h2 className="sec">The <em>engineers</em> behind the work.</h2>
        <p className="sec-sub">Senior operators, not career managers. Every leader on this page ships code, reviews PRs, or runs infra — we don&apos;t build a layer between the client and the work.</p>

        <div className="team-grid">
          {TEAM.map((m, i) => (
            <motion.div
              key={i}
              className="team-card"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : i * 0.07 }}
            >
              <div className="team-avatar" style={{ "--avatar-hue": m.hue }}>
                <span>{m.initials}</span>
              </div>
              <div className="team-info">
                <span className="team-num" aria-hidden="true">[{m.num}]</span>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
              <div className="team-line" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
