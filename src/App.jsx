import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  GraduationCap,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Award,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — edit the values below to keep this portfolio up to date     */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Chaitanya Shinde",
  roles: ["ECS ENGINEER", "FULL-STACK DEVELOPER", "AI ENTHUSIAST"],
  institution: "Shah & Anchor Kutchhi Engineering College",
  institutionShort: "SAKEC, Mumbai",
  branch: "Electronics & Computer Science",
  blurb:
    "I build smart, scalable solutions using AI and modern technologies to solve real-world problems.",
  email: "chaitanya.shinde@sakec.ac.in",
  linkedin: "https://www.linkedin.com/in/chaitanya-shinde-37b142353",
  github: "https://github.com/ChaitanyaShinde9", // TODO: replace with your GitHub profile
};

const ABOUT = {
  paragraphs: [
    "I'm an Electronics and Computer Science engineering student who likes making ideas run — turning a rough problem statement into something people can actually click through and use.",
    "My focus sits at the intersection of AI, full-stack development and system design. I've shipped work across full-stack web apps, Android apps, AI-powered systems and database-driven platforms — usually the fastest way I learn a new stack is by building something real in it.",
  ],
  objective:
    "To work on innovative technologies and contribute to building systems that solve real-world challenges, while continuously growing as a developer.",
};

const STRENGTHS = [
  { code: "P1", label: "Problem-solving mindset" },
  { code: "P2", label: "Strong logical thinking" },
  { code: "P3", label: "Quick learner of new technologies" },
  { code: "P4", label: "Turns ideas into real applications" },
];

const SKILL_GROUPS = [
  {
    code: "R1",
    name: "Languages",
    accent: "gold",
    items: ["Python", "Java", "JavaScript", "C++", "C", "SQL", "PHP", "Verilog"],
  },
  {
    code: "R2",
    name: "Frameworks",
    accent: "cyan",
    items: ["React.js", "Next.js", "Android Studio", "Flutter"],
  },
  {
    code: "R3",
    name: "Tools",
    accent: "green",
    items: ["Git & GitHub", "Jupyter Notebook", "Postman", "LTspice", "MATLAB"],
  },
];

const PROJECTS = [
  {
    code: "MC-01",
    title: "Mentor Connect",
    tagline: "Smart peer-mentoring platform",
    problem: "Students struggle to find affordable, personalised mentorship.",
    solution:
      "A peer-mentoring platform enabling live sessions, scheduling and verified mentors — matching students with peers and professionals who've solved the same problem before.",
    features: [
      "Peer & professional mentors",
      "Video calls & chat",
      "Session feedback & ratings",
    ],
    stack: ["React Native", "Firebase", "ZegoCloud"],
    outcome: [
      "Designed a scalable mentor–mentee workflow",
      "Presented as an IEEE research paper",
    ],
    githubUrl: "", // TODO: add your repo link
    otherLinks: ["Demo", "Paper"],
  },
  {
    code: "VS-02",
    title: "ViksitSeti",
    tagline: "Connecting farmers directly to customers",
    problem:
      "Farmers often rely on middlemen, which reduces their profit and limits direct access to customers.",
    solution:
      "A full-stack web platform that lets farmers sell crops directly to consumers, so pricing stays fair and transparent for both sides.",
    features: [
      "Farmer & buyer authentication",
      "Crop listing and direct purchase",
      "Real-time updates using AJAX",
      "Secure order management",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PHP", "AJAX", "MySQL"],
    outcome: ["Built during a software development internship"],
    githubUrl: "", // TODO: add your repo link
    otherLinks: [],
  },
  {
    code: "GM-03",
    title: "Gym Management System",
    tagline: "Digitising membership & attendance",
    problem:
      "Small gyms often track memberships, attendance and dues on paper registers — slow to search and easy to lose.",
    solution:
      "A gym management application that gives admins one place to register members, log attendance and track plan payments instead of juggling registers.",
    features: [
      "Member registration & plan tracking",
      "Daily attendance log",
      "Payment & due status",
      "Admin summary dashboard",
    ],
    stack: ["Java", "MySQL"],
    outcome: ["Built as an academic mini-project"],
    githubUrl: "", // TODO: add your repo link
    otherLinks: [],
  },
  {
    code: "CP-04",
    title: "Multicore CPU Performance Analyzer",
    tagline: "Benchmarking parallel Python workloads",
    problem:
      "It's hard to see, in practice, how CPU-bound Python code actually scales across cores — or why threading barely helps CPU-bound work because of the GIL — without hand-rolling a benchmark every time.",
    solution:
      "A benchmarking tool that runs CPU-bound workloads across 1..N processes, measures speedup and parallel efficiency, fits an Amdahl's Law curve, and compares multiprocessing against threading — with both a CLI and a live Flask dashboard.",
    features: [
      "4 built-in CPU-bound workloads: primes, matrix multiply, SHA-256, Fibonacci",
      "Speedup, efficiency & Amdahl's Law curve fitting",
      "Live per-core CPU utilization heatmap via psutil",
      "Multiprocessing vs threading comparison to demonstrate the GIL",
      "Flask dashboard with SSE-streamed live results and one-click report download",
    ],
    stack: ["Python", "multiprocessing", "psutil", "matplotlib", "Flask", "Chart.js"],
    outcome: [
      "Generates PNG charts, CSV/JSON data and a Markdown report per run",
      "Dashboard runs fully offline — Chart.js is bundled locally, no CDN",
    ],
    githubUrl: "https://github.com/chaitanyashinde25-dot/COA_mp_cpu_analyzer", 
    otherLinks: [],
  },
  {
    code: "RG-05",
    title: "Smart Resource Grid Optimizer",
    tagline: "Predicting & optimizing building energy/water use",
    problem:
      "Residential building managers often have no real-time visibility into energy and water usage, making it hard to catch spikes or shift demand away from expensive peak-tariff hours.",
    solution:
      "A Django web app with a live usage dashboard, short-term forecasting, and rule-based optimization suggestions — plus a device simulation panel so managers can see the effect of a change before making it.",
    features: [
      "Real-time KPI dashboard with Chart.js visualizations",
      "Short-term forecasting via Simple Moving Average & Linear Regression",
      "Rule-based cost & demand-management recommendations",
      "Interactive device simulation (pumps, lifts, HVAC)",
      "Historical usage & cost-savings reporting",
    ],
    stack: ["Django", "Python", "NumPy", "Pandas", "Bootstrap 5", "Chart.js", "SQLite"],
    outcome: ["Ships with a management command that loads a week of synthetic demo data"],
    githubUrl: "https://github.com/ChaitanyaShinde9/smart_resource_grid_optimizer", 
    otherLinks: [],
  },
  {
    code: "HC-06",
    title: "MediCamp",
    tagline: "Healthcare camp management for NGOs",
    problem:
      "Rural healthcare camps run by NGOs often track patients, doctors and medicine stock on paper — records get lost, stock runs out unnoticed, and queues move slowly.",
    solution:
      "A full-stack MERN app covering the whole camp workflow — registration, doctor assignment, prescriptions with automatic stock deduction, and discharge — with role-based auth, built to run offline on a single laptop over local WiFi.",
    features: [
      "Patient registration with vitals & auto-generated IDs",
      "Doctor assignment & live availability tracking",
      "Medicine inventory with low-stock alerts & auto-deduction on prescription",
      "Full registration → diagnosis → prescription → discharge workflow",
      "JWT auth with Admin / Volunteer / Doctor roles",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    outcome: [
      "Designed to run fully offline on a laptop + local WiFi for camps without internet",
      "Ships with a Postman collection for API testing",
    ],
    githubUrl: "https://github.com/ChaitanyaShinde9/healthcare-camp", 
    otherLinks: [],
  },
];

/* NOTE: sample placeholder entries — swap in your real certificates.
   title / issuer / date / credentialId / link are all plain strings,
   so this is the only place you need to edit. Leave "link" as "" for
   certificates that don't have a public verification URL. */
const CERTIFICATES = [
  {
    code: "CERT-01",
    title: "Android Basics with Java",
    issuer: "Infosys Springboard",
    date: "Mar 2025",
    link: "https://drive.google.com/file/d/1lqiFjln60REEUmGRrxUI2MMOEBCbvyGx/view?usp=sharing",
  },
  {
    code: "CERT-02",
    title: "Automation Testing for Python",
    issuer: "Infosys Springboard",
    date: "Dec 2024",
    link: "https://drive.google.com/file/d/1bm6mVFjzGnb5bkoV7OoTPQEBQJyF8hIN/view?usp=sharing",
  },
  {
    code: "CERT-03",
    title: "Introduction to PHP programming",
    issuer: "Infosys Springboard",
    date: "Mar 2025",
    link: "https://drive.google.com/file/d/14CDIx0m-Lq3Xj8YOYXMcKcgZDYL2vQdJ/view?usp=sharing",
  },
  {
    code: "CERT-04",
    title: "Python for Data Science",
    issuer: "Infosys Springboard",
    date: "Mar 2025",
    link: "https://drive.google.com/file/d/1NAPOdNSYbLRE1xH8VJUXZDjQlka9N9yM/view?usp=sharing",
  },
  {
    code: "CERT-05",
    title: "Python Fundamentals",
    issuer: "Infosys Springboard",
    date: "Feb 2025",
    link: "https://drive.google.com/file/d/1czhSyH7GVKTGNiM-TYnorxd5TfDn6KuZ/view?usp=sharing",
  },
  {
    code: "CERT-06",
    title: "Introduction to Android Development",
    issuer: "Infosys Springboard",
    date: "Feb 2025",
    link: "https://drive.google.com/file/d/1trUzZil0Ce25wYH5msj6IATREmkgtEio/view?usp=sharing",
  },
  {
    code: "CERT-07", 
    title: "Software Engineering",
    issuer: "Infosys Springboard",
    date: "Jul 2026",
    link: "https://drive.google.com/file/d/1loWnAi0moIkQvSGRtQZGMdl7avSqHcKm/view?usp=sharing",
  },
  {
    code: "CERT-08",
    title: "C++ Fundamentals",
    issuer: "Infosys Springboard",
    date: "Oct 2025",
    link: "https://drive.google.com/file/d/1loWnAi0moIkQvSGRtQZGMdl7avSqHcKm/view?usp=sharing",
  },
  {
    code: "CERT-09",
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/5c5ehr2mffx8",
  }
];

const NAV = [
  { id: "about", label: "About", code: "U1" },
  { id: "skills", label: "Skills", code: "U2" },
  { id: "certificates", label: "Certificates", code: "U3" },
  { id: "projects", label: "Projects", code: "U4" },
  { id: "contact", label: "Contact", code: "U5" },
];

/* ------------------------------------------------------------------ */
/*  HOOK — scrollspy via IntersectionObserver                          */
/* ------------------------------------------------------------------ */

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* ------------------------------------------------------------------ */
/*  HOOK — reveal-on-scroll                                            */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  RAIL — the schematic trunk-line + reference-designator pad         */
/* ------------------------------------------------------------------ */

function Rail({ code, active }) {
  return (
    <div className="rail" aria-hidden="true">
      <div className={`pad ${active ? "pad--active" : ""}`}>
        <span className="pad-dot" />
      </div>
      <span className="pad-code">{code}</span>
      <div className="rail-line" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const ids = NAV.map((n) => n.id);
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root {
          --ink: #080c18;
          --panel: #0f1830;
          --panel-2: #131e3b;
          --line: #223056;
          --line-bright: #35497d;
          --gold: #e8a33d;
          --cyan: #4fd3da;
          --green: #6ccb8c;
          --paper: #eaedf6;
          --muted: #8c96b3;
          --font-display: 'Chakra Petch', sans-serif;
          --font-body: 'IBM Plex Sans', sans-serif;
          --font-mono: 'IBM Plex Mono', monospace;
        }

        * { box-sizing: border-box; }

        .page {
          background: var(--ink);
          color: var(--paper);
          font-family: var(--font-body);
          line-height: 1.6;
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.15;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 100%);
        }

        a { color: inherit; text-decoration: none; }
        ul { margin: 0; padding: 0; list-style: none; }
        h1, h2, h3 { font-family: var(--font-display); margin: 0; }
        p { margin: 0; }

        .wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .mono { font-family: var(--font-mono); }
        .accent-gold { color: var(--gold); }
        .accent-cyan { color: var(--cyan); }
        .accent-green { color: var(--green); }

        /* ---------------- NAV ---------------- */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: rgba(8, 12, 24, 0.78);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .nav-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-weight: 600;
          letter-spacing: 0.04em;
          background: none;
          border: none;
          color: var(--paper);
          cursor: pointer;
        }
        .logo-mark {
          position: relative;
          width: 30px; height: 30px;
          border: 1px solid var(--line-bright);
          border-radius: 6px;
          display: grid;
          place-items: center;
          font-size: 11px;
        }
        .logo-mark::before {
          content: "";
          position: absolute;
          top: -2px; left: -2px;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--gold);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 8px 14px;
          border-radius: 6px;
          color: var(--muted);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link:hover { color: var(--paper); background: var(--panel); }
        .nav-link.is-active { color: var(--gold); }
        .nav-link .tag {
          font-size: 10px;
          opacity: 0.7;
        }
        .nav-cta {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid var(--gold);
          color: var(--gold);
          background: rgba(232, 163, 61, 0.08);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .nav-cta:hover { background: rgba(232, 163, 61, 0.18); }
        .nav-toggle {
          display: none;
          background: none;
          border: 1px solid var(--line);
          border-radius: 6px;
          color: var(--paper);
          padding: 7px;
          cursor: pointer;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 2px;
          padding: 8px 24px 16px;
          border-top: 1px solid var(--line);
        }
        .mobile-menu.is-open { display: flex; }
        .mobile-menu .nav-link { justify-content: flex-start; width: 100%; text-align: left; }

        @media (max-width: 760px) {
          .nav-links { display: none; }
          .nav-toggle { display: inline-flex; }
        }

        /* ---------------- HERO ---------------- */
        .hero {
          position: relative;
          padding: 168px 0 64px;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--muted);
          border: 1px solid var(--line);
          padding: 6px 12px;
          border-radius: 999px;
          width: fit-content;
          margin-bottom: 28px;
        }
        .status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: pulse 2s ease-in-out infinite;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }
        .hero-roles {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--cyan);
          margin-bottom: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero-roles span:not(:last-child)::after {
          content: "//";
          color: var(--line-bright);
          margin-left: 10px;
        }
        .hero h1 {
          font-size: clamp(2.6rem, 6vw, 4.6rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.02;
          margin-bottom: 22px;
        }
        .hero-blurb {
          font-size: 1.08rem;
          color: var(--muted);
          max-width: 46ch;
          margin-bottom: 34px;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 56px;
        }
        .btn {
          font-family: var(--font-mono);
          font-size: 13.5px;
          padding: 13px 22px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .btn:active { transform: translateY(1px); }
        .btn-primary {
          background: var(--gold);
          color: var(--ink);
          font-weight: 600;
        }
        .btn-primary:hover { background: #f3b455; }
        .btn-ghost {
          border-color: var(--line-bright);
          color: var(--paper);
          background: rgba(255,255,255,0.02);
        }
        .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); }

        /* title block, like an engineering drawing */
        .title-block {
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--panel);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          font-family: var(--font-mono);
          font-size: 11.5px;
          overflow: hidden;
        }
        .title-block > div {
          padding: 12px 16px;
          border-right: 1px solid var(--line);
          border-top: 1px solid var(--line);
        }
        .title-block > div:nth-child(-n+4) { border-top: none; }
        .title-block > div:nth-child(4n) { border-right: none; }
        .tb-label {
          display: block;
          color: var(--muted);
          letter-spacing: 0.06em;
          margin-bottom: 4px;
          font-size: 10px;
        }
        .tb-value { color: var(--paper); }

        .chip-illustration { width: 100%; height: auto; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-grid > .chip-wrap { order: -1; max-width: 260px; margin: 0 auto 12px; }
          .title-block { grid-template-columns: repeat(2, 1fr); }
          .title-block > div:nth-child(-n+4) { border-top: 1px solid var(--line); }
          .title-block > div:nth-child(-n+2) { border-top: none; }
          .title-block > div:nth-child(2n) { border-right: none; }
        }

        /* ---------------- SECTION SHELL ---------------- */
        .section {
          padding: 96px 0;
          border-top: 1px solid var(--line);
          scroll-margin-top: 90px;
        }
        .section-row {
          display: flex;
          gap: 32px;
        }
        .rail {
          width: 56px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pad {
          width: 22px; height: 22px;
          border: 1px solid var(--line-bright);
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--panel);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .pad-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--line-bright);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .pad--active .pad-dot { background: var(--gold); box-shadow: 0 0 10px var(--gold); }
        .pad--active { border-color: var(--gold); }
        .pad-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          margin-top: 8px;
          letter-spacing: 0.05em;
        }
        .rail-line {
          flex: 1;
          width: 2px;
          margin-top: 14px;
          background-image: repeating-linear-gradient(to bottom, var(--line-bright) 0 5px, transparent 5px 13px);
          background-size: 2px 26px;
          animation: flow 1.6s linear infinite;
        }
        .section-content { flex: 1; min-width: 0; }

        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--gold);
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          display: block;
        }
        .section h2 {
          font-size: clamp(1.7rem, 3.4vw, 2.3rem);
          margin-bottom: 28px;
        }

        @media (max-width: 760px) {
          .rail { display: none; }
          .section { padding: 64px 0; }
        }

        /* ---------------- ABOUT ---------------- */
        .about-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .about-grid p + p { margin-top: 16px; }
        .about-grid p { color: var(--muted); }
        .objective {
          margin-top: 24px;
          padding: 16px 18px;
          border-left: 2px solid var(--cyan);
          background: var(--panel);
          border-radius: 0 8px 8px 0;
          font-size: 0.95rem;
        }
        .objective .tb-label { color: var(--cyan); }
        .strengths { display: flex; flex-direction: column; gap: 10px; }
        .strength-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--panel);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .strength-row:hover { border-color: var(--line-bright); transform: translateX(3px); }
        .strength-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--gold);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 2px 6px;
          flex-shrink: 0;
        }
        .strength-row span:last-child { font-size: 0.92rem; color: var(--paper); }

        @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; } }

        /* ---------------- SKILLS ---------------- */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skill-card {
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--panel);
          padding: 20px;
        }
        .skill-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--line);
        }
        .skill-head h3 { font-size: 1rem; font-family: var(--font-display); }
        .skill-head .mono { font-size: 11px; color: var(--muted); }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag {
          font-family: var(--font-mono);
          font-size: 12.5px;
          padding: 7px 11px;
          border-radius: 6px;
          background: var(--panel-2);
          border: 1px solid var(--line);
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: border-color 0.2s ease, transform 0.15s ease;
        }
        .skill-tag:hover { transform: translateY(-2px); }
        .dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .dot-gold { background: var(--gold); }
        .dot-cyan { background: var(--cyan); }
        .dot-green { background: var(--green); }
        .skill-tag.gold:hover { border-color: var(--gold); }
        .skill-tag.cyan:hover { border-color: var(--cyan); }
        .skill-tag.green:hover { border-color: var(--green); }

        @media (max-width: 760px) { .skills-grid { grid-template-columns: 1fr; } }

        /* ---------------- CERTIFICATES ---------------- */
        .cert-slider { position: relative; }
        .cert-viewport { overflow: hidden; }
        .cert-track {
          display: flex;
          flex-wrap: nowrap;
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .cert-card {
          flex-shrink: 0;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .cert-card-inner {
          position: relative;
          height: 100%;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--panel);
          padding: 22px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cert-card-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 1px;
          background: repeating-linear-gradient(90deg, var(--line) 0 8px, transparent 8px 16px);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .cert-card-inner:hover {
          border-color: var(--line-bright);
          transform: translateY(-3px);
          box-shadow: 0 14px 30px -18px rgba(232, 163, 61, 0.35);
        }
        .cert-card-inner:hover::before { opacity: 1; }
        .cert-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .cert-code { font-size: 11px; color: var(--muted); letter-spacing: 0.05em; }
        .cert-seal {
          width: 24px; height: 24px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--green);
          border: 1px solid var(--line);
        }
        .cert-badge {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          color: var(--gold);
          background: rgba(232, 163, 61, 0.1);
          border: 1px solid var(--line);
          margin: 6px 0 10px;
        }
        .cert-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          margin-bottom: 2px;
        }
        .cert-issuer { color: var(--muted); font-size: 0.88rem; }
        .cert-meta {
          font-size: 11px;
          color: var(--muted);
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed var(--line);
          display: flex;
          gap: 6px;
        }
        .cert-meta-sep { color: var(--line-bright); }
        .cert-link {
          margin-top: 12px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--cyan);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
        }
        .cert-link--muted { color: var(--muted); }
        .cert-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 28px;
        }
        .cert-nav-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid var(--line-bright);
          background: var(--panel);
          color: var(--paper);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .cert-nav-btn:hover { border-color: var(--gold); color: var(--gold); }
        .cert-dots { display: flex; gap: 8px; }
        .cert-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--line);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .cert-dot.is-active { background: var(--gold); transform: scale(1.25); }

        @media (prefers-reduced-motion: reduce) {
          .cert-track { transition: none; }
        }

        /* ---------------- PROJECTS ---------------- */
        .projects-list { display: flex; flex-direction: column; gap: 24px; }
        .project-card {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--panel);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .project-card:hover { border-color: var(--line-bright); box-shadow: 0 0 0 1px var(--line-bright), 0 12px 32px -16px rgba(79, 211, 218, 0.25); }
        .project-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 20px 24px;
          border-bottom: 1px solid var(--line);
          background: var(--panel-2);
        }
        .project-head .mono { font-size: 11.5px; color: var(--gold); letter-spacing: 0.05em; }
        .project-head h3 { font-size: 1.35rem; margin: 4px 0 2px; }
        .project-head .tagline { color: var(--muted); font-size: 0.9rem; }
        .project-body {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .spec-block .tb-label { font-family: var(--font-mono); font-size: 10.5px; color: var(--cyan); letter-spacing: 0.08em; margin-bottom: 8px; display: block; }
        .spec-block p, .spec-block li { font-size: 0.92rem; color: var(--muted); }
        .spec-block ul { display: flex; flex-direction: column; gap: 6px; }
        .spec-block li { position: relative; padding-left: 16px; }
        .spec-block li::before { content: "▸"; position: absolute; left: 0; color: var(--line-bright); }
        .project-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .stack-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .stack-chip {
          font-family: var(--font-mono);
          font-size: 11.5px;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid var(--line);
          color: var(--muted);
        }
        .project-links { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 11.5px; }
        .link-badge { padding: 5px 10px; border-radius: 5px; border: 1px dashed var(--line-bright); color: var(--muted); }
        .github-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border-radius: 6px;
          border: 1px solid var(--line-bright);
          color: var(--paper);
          background: rgba(255,255,255,0.02);
          font-family: var(--font-mono);
          font-size: 12px;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .github-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(232, 163, 61, 0.08); }
        .github-btn--empty {
          color: var(--muted);
          border-style: dashed;
          cursor: help;
        }
        .github-btn--empty:hover { border-color: var(--line-bright); color: var(--muted); background: none; }

        @media (max-width: 700px) {
          .project-body { grid-template-columns: 1fr; }
        }

        /* ---------------- CONTACT ---------------- */
        .contact-panel {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--panel);
          padding: 8px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .contact-pin {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 22px 20px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .contact-pin:hover { background: var(--panel-2); }
        .pin-top { display: flex; align-items: center; justify-content: space-between; }
        .pin-num { font-family: var(--font-mono); font-size: 10.5px; color: var(--muted); }
        .pin-icon {
          width: 34px; height: 34px;
          border: 1px solid var(--line-bright);
          border-radius: 8px;
          display: grid;
          place-items: center;
          color: var(--gold);
        }
        .pin-label { font-family: var(--font-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.06em; }
        .pin-value { font-size: 0.95rem; word-break: break-word; display: inline-flex; align-items: center; gap: 6px; }
        .contact-note { margin-top: 24px; color: var(--muted); font-size: 0.92rem; max-width: 58ch; }

        @media (max-width: 700px) { .contact-panel { grid-template-columns: 1fr; } }

        /* ---------------- FOOTER ---------------- */
        .footer {
          border-top: 1px solid var(--line);
          padding: 28px 0 40px;
        }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--muted);
        }

        /* ---------------- ANIMATIONS ---------------- */
        @keyframes flow { to { background-position-y: 26px; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-anim > * { animation: fadeUp 0.7s ease both; }
        .hero-anim > *:nth-child(1) { animation-delay: 0.05s; }
        .hero-anim > *:nth-child(2) { animation-delay: 0.15s; }
        .hero-anim > *:nth-child(3) { animation-delay: 0.25s; }
        .hero-anim > *:nth-child(4) { animation-delay: 0.35s; }
        .hero-anim > *:nth-child(5) { animation-delay: 0.45s; }

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .rail-line, .status-dot, .hero-anim > *, .reveal {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <nav className="nav">
        <div className="nav-inner">
          <button className="logo" onClick={() => goTo("top")} aria-label="Back to top">
            <span className="logo-mark">CS</span>
            chaitanya.dev
          </button>
          <div className="nav-links">
            {NAV.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${active === item.id ? "is-active" : ""}`}
                onClick={() => goTo(item.id)}
              >
                <span className="tag mono">{item.code}</span>
                {item.label}
              </button>
            ))}
            <button className="nav-cta" onClick={() => goTo("contact")}>
              Say hello
            </button>
          </div>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${active === item.id ? "is-active" : ""}`}
              onClick={() => goTo(item.id)}
            >
              <span className="tag mono">{item.code}</span>
              {item.label}
            </button>
          ))}
          <button className="nav-cta" style={{ marginTop: 8, width: "fit-content" }} onClick={() => goTo("contact")}>
            Say hello
          </button>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-anim">
              <div className="status-pill">
                <span className="status-dot" />
                Open to internships &amp; full-time roles
              </div>
              <div className="hero-roles">
                {PROFILE.roles.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
              <h1>{PROFILE.name}</h1>
              <p className="hero-blurb">{PROFILE.blurb}</p>
              <div className="hero-ctas">
                <button className="btn btn-primary" onClick={() => goTo("projects")}>
                  View Projects <ArrowUpRight size={16} />
                </button>
                <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>
                  <Mail size={16} /> Get in touch
                </a>
              </div>

              <div className="title-block">
                <div>
                  <span className="tb-label">DRAWN BY</span>
                  <span className="tb-value">C. Shinde</span>
                </div>
                <div>
                  <span className="tb-label">BRANCH</span>
                  <span className="tb-value">{PROFILE.branch}</span>
                </div>
                <div>
                  <span className="tb-label">SHEET</span>
                  <span className="tb-value">01 / 01</span>
                </div>
                <div>
                  <span className="tb-label">REV</span>
                  <span className="tb-value">1.0</span>
                </div>
                <div>
                  <span className="tb-label">INSTITUTION</span>
                  <span className="tb-value">{PROFILE.institutionShort}</span>
                </div>
                <div>
                  <span className="tb-label">STATUS</span>
                  <span className="tb-value accent-green">Active</span>
                </div>
                <div>
                  <span className="tb-label">SCALE</span>
                  <span className="tb-value">1 : 1</span>
                </div>
                <div>
                  <span className="tb-label">DOC</span>
                  <span className="tb-value">PORTFOLIO.SCH</span>
                </div>
              </div>
            </div>

            <div className="chip-wrap" aria-hidden="true">
              <ChipIllustration />
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- ABOUT ---------------- */}
      <section className="section" id="about">
        <div className="wrap section-row">
          <Rail code="U1" active={active === "about"} />
          <div className="section-content">
            <Reveal as="span" className="eyebrow">U1 · PROFILE.SCH</Reveal>
            <Reveal><h2>About Me</h2></Reveal>
            <div className="about-grid">
              <Reveal delay={80}>
                <div>
                  {ABOUT.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <div className="objective">
                    <span className="tb-label">CAREER OBJECTIVE</span>
                    <p>{ABOUT.objective}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="strengths">
                  {STRENGTHS.map((s) => (
                    <div className="strength-row" key={s.code}>
                      <span className="strength-code mono">{s.code}</span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section className="section" id="skills">
        <div className="wrap section-row">
          <Rail code="U2" active={active === "skills"} />
          <div className="section-content">
            <Reveal as="span" className="eyebrow">U2 · PARTS-BIN.SCH</Reveal>
            <Reveal><h2>Skills</h2></Reveal>
            <div className="skills-grid">
              {SKILL_GROUPS.map((group, gi) => (
                <Reveal key={group.code} delay={gi * 90}>
                  <div className="skill-card">
                    <div className="skill-head">
                      <h3>{group.name}</h3>
                      <span className="mono">{group.code}</span>
                    </div>
                    <div className="skill-tags">
                      {group.items.map((item) => (
                        <span className={`skill-tag ${group.accent}`} key={item}>
                          <span className={`dot dot-${group.accent}`} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CERTIFICATES ---------------- */}
      <section className="section" id="certificates">
        <div className="wrap section-row">
          <Rail code="U3" active={active === "certificates"} />
          <div className="section-content">
            <Reveal as="span" className="eyebrow">U3 · CERTIFICATION-LOG.SCH</Reveal>
            <Reveal><h2>Certificates</h2></Reveal>
            <Reveal delay={80}>
              <CertificateSlider items={CERTIFICATES} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section className="section" id="projects">
        <div className="wrap section-row">
          <Rail code="U4" active={active === "projects"} />
          <div className="section-content">
            <Reveal as="span" className="eyebrow">U4 · BUILD-LOG.SCH</Reveal>
            <Reveal><h2>Projects</h2></Reveal>
            <div className="projects-list">
              {PROJECTS.map((proj, pi) => (
                <Reveal key={proj.title} delay={pi * 90}>
                  <article className="project-card">
                    <div className="project-head">
                      <div>
                        <span className="mono">{proj.code}</span>
                        <h3>{proj.title}</h3>
                        <span className="tagline">{proj.tagline}</span>
                      </div>
                    </div>
                    <div className="project-body">
                      <div className="spec-block">
                        <span className="tb-label">PROBLEM</span>
                        <p>{proj.problem}</p>
                      </div>
                      <div className="spec-block">
                        <span className="tb-label">SOLUTION</span>
                        <p>{proj.solution}</p>
                      </div>
                      <div className="spec-block">
                        <span className="tb-label">KEY FEATURES</span>
                        <ul>
                          {proj.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="spec-block">
                        <span className="tb-label">OUTCOME</span>
                        <ul>
                          {proj.outcome.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="project-footer">
                      <div className="stack-chips">
                        {proj.stack.map((s) => (
                          <span className="stack-chip mono" key={s}>{s}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {proj.otherLinks.length > 0 &&
                          proj.otherLinks.map((l) => (
                            <span className="link-badge" key={l}>{l}</span>
                          ))}
                        {proj.githubUrl ? (
                          <a
                            className="github-btn"
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Github size={14} /> View on GitHub
                          </a>
                        ) : (
                          <span
                            className="github-btn github-btn--empty"
                            title="Add this project's githubUrl in the PROJECTS data"
                          >
                            <Github size={14} /> Add GitHub link
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section className="section" id="contact">
        <div className="wrap section-row">
          <Rail code="U5" active={active === "contact"} />
          <div className="section-content">
            <Reveal as="span" className="eyebrow">U5 · CONNECTOR.SCH</Reveal>
            <Reveal><h2>Let's Build Something</h2></Reveal>
            <Reveal delay={80}>
              <div className="contact-panel">
                <a className="contact-pin" href={`mailto:${PROFILE.email}`}>
                  <div className="pin-top">
                    <span className="pin-icon"><Mail size={16} /></span>
                    <span className="pin-num mono">PIN 1</span>
                  </div>
                  <span className="pin-label mono">EMAIL</span>
                  <span className="pin-value">{PROFILE.email}</span>
                </a>
                <a className="contact-pin" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  <div className="pin-top">
                    <span className="pin-icon"><Linkedin size={16} /></span>
                    <span className="pin-num mono">PIN 2</span>
                  </div>
                  <span className="pin-label mono">LINKEDIN</span>
                  <span className="pin-value">/chaitanya-shinde <ArrowUpRight size={13} /></span>
                </a>
                <a className="contact-pin" href={PROFILE.github} target="_blank" rel="noreferrer">
                  <div className="pin-top">
                    <span className="pin-icon"><Github size={16} /></span>
                    <span className="pin-num mono">PIN 3</span>
                  </div>
                  <span className="pin-label mono">GITHUB</span>
                  <span className="pin-value">/ChaitanyaShinde9 <ArrowUpRight size={13} /></span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="contact-note">
                <GraduationCap size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                {PROFILE.institution} · {PROFILE.branch} — feel free to reach out for
                collaboration, project discussions, or opportunities. I'm always open to
                learning and building something amazing.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} {PROFILE.name} · REV 1.0</span>
          <span className="mono">
            <MapPin size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            Mumbai, India
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CERTIFICATE SLIDER — schematic "certification tag" carousel        */
/* ------------------------------------------------------------------ */

function useResponsivePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1000) setPerView(3);
      else if (w >= 680) setPerView(2);
      else setPerView(1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return perView;
}

function CertificateSlider({ items }) {
  const perView = useResponsivePerView();
  const slideCount = Math.max(items.length - perView + 1, 1);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setIndex((i) => Math.min(i, slideCount - 1));
  }, [slideCount]);

  useEffect(() => {
    if (reducedMotion || items.length <= perView) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, 5000);
    return () => clearInterval(id);
  }, [slideCount, perView, reducedMotion, items.length]);

  const go = (dir) => {
    setIndex((i) => (i + dir + slideCount) % slideCount);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) go(-1);
    else if (delta < -40) go(1);
    touchStartX.current = null;
  };

  const cardWidthPct = 100 / perView;
  const showControls = items.length > perView;

  return (
    <div
      className="cert-slider"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="cert-viewport">
        <div
          ref={trackRef}
          className="cert-track"
          style={{
            transform: `translateX(-${index * cardWidthPct}%)`,
          }}
        >
          {items.map((cert) => (
            <div
              className="cert-card"
              key={cert.code}
              style={{ flexBasis: `${cardWidthPct}%` }}
            >
              <div className="cert-card-inner">
                <div className="cert-top">
                  <span className="cert-code mono">{cert.code}</span>
                  <span className="cert-seal" title="Verified entry">
                    <ShieldCheck size={16} />
                  </span>
                </div>
                <div className="cert-badge">
                  <Award size={22} />
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-meta mono">
                  <span>{cert.date}</span>
                  <span className="cert-meta-sep">·</span>
                  <span>ID {cert.credentialId}</span>
                </div>
                {cert.link ? (
                  <a
                    className="cert-link"
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View credential <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <span className="cert-link cert-link--muted">
                    Add credential link
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="cert-controls">
          <button
            className="cert-nav-btn"
            onClick={() => go(-1)}
            aria-label="Previous certificate"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="cert-dots">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                className={`cert-dot ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="cert-nav-btn"
            onClick={() => go(1)}
            aria-label="Next certificate"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DECORATIVE IC / CHIP ILLUSTRATION                                  */
/* ------------------------------------------------------------------ */

function ChipIllustration() {
  const pinsTop = [70, 110, 150, 190, 230];
  const pinsSide = [90, 140, 190, 240];
  return (
    <svg
      className="chip-illustration"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* pins */}
      {pinsTop.map((x) => (
        <g key={`t${x}`}>
          <line x1={x} y1="40" x2={x} y2="70" stroke="#35497d" strokeWidth="2" />
          <line x1={x} y1="250" x2={x} y2="280" stroke="#35497d" strokeWidth="2" />
        </g>
      ))}
      {pinsSide.map((y) => (
        <g key={`s${y}`}>
          <line x1="40" y1={y} x2="70" y2={y} stroke="#35497d" strokeWidth="2" />
          <line x1="250" y1={y} x2="280" y2={y} stroke="#35497d" strokeWidth="2" />
        </g>
      ))}
      {/* body */}
      <rect x="70" y="70" width="180" height="180" rx="14" fill="#0f1830" stroke="#223056" strokeWidth="1.5" />
      <rect x="90" y="90" width="140" height="140" rx="8" fill="none" stroke="#223056" strokeWidth="1" strokeDasharray="4 5" />
      {/* pin 1 marker */}
      <circle cx="90" cy="90" r="5" fill="#e8a33d" />
      {/* label */}
      <text x="160" y="150" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#eaedf6">CS-ECS</text>
      <text x="160" y="170" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8c96b3">FULLSTACK.AI</text>
      <text x="160" y="196" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#4fd3da">REV 1.0</text>
      {/* pin dots */}
      {pinsTop.map((x) => (
        <g key={`td${x}`}>
          <circle cx={x} cy="40" r="3" fill="#4fd3da" />
          <circle cx={x} cy="280" r="3" fill="#4fd3da" />
        </g>
      ))}
      {pinsSide.map((y) => (
        <g key={`sd${y}`}>
          <circle cx="40" cy={y} r="3" fill="#4fd3da" />
          <circle cx="280" cy={y} r="3" fill="#4fd3da" />
        </g>
      ))}
    </svg>
  );
}