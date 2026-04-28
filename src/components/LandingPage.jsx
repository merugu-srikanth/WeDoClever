import { FastForwardIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ════════════════════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK — pure CSS + IntersectionObserver (no CDN, instant)
════════════════════════════════════════════════════════════════════════════ */
const useReveal = (ref, selector = ".rv") => {
  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;
    const els = Array.from(parent.querySelectorAll(selector));
    if (!els.length) return;

    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(36px) scale(0.97)";
      el.style.transition = "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)";
      el.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      els.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }, i * 110);
      });
      io.disconnect();
    }, { threshold: 0.08 });

    io.observe(parent);
    return () => io.disconnect();
  }, []);
};

/* ════════════════════════════════════════════════════════════════════════════
   HERO SECTION — KEPT EXACTLY AS IS
════════════════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => { });
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex items-center md:items-start">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900/90" />

      {/* ── Content wrapper — padding-top clears the fixed navbar on every breakpoint ── */}
      <div className="relative w-full max-w-7xl mx-aut
                      px-5 sm:px-8 md:px-10 lg:px-16
                      pt-28 sm:pt-32 md:pt-36 lg:pt-40
                      pb-14 sm:pb-18 md:pb-20
                      z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full
                        px-3 sm:px-4 md:px-5
                        py-1.5 sm:py-2
                        mb-4 sm:mb-6 md:mb-8
                        bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
                        shadow-lg">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse shrink-0" />
          <span className="text-white text-[9px] sm:text-[11px] md:text-xs
                           font-syne font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase leading-none">
            Empowering Digital Growth. Delivering Results.
          </span>
        </div>

        {/* Heading — clamp auto-scales between breakpoints */}
        <h1 className="font-syne font-black uppercase text-white
                       leading-[1.05] tracking-tight sm:tracking-tighter
                       max-w-[92vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <span className="block text-[clamp(38px,9vw,72px)] rv">
            WE BUILD
          </span>
          <span className="block mt-1 sm:mt-0
                           text-[clamp(34px,8.5vw,68px)]
                           bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent rv">
            SCALABLE IDEAS
          </span>
          <span className="block mt-1 sm:mt-0
                           text-[clamp(38px,9vw,72px)] text-glow rv">
            INTO REALITY
          </span>
        </h1>

        {/* Paragraph */}
        <p className="mt-4 sm:mt-5 md:mt-6
                      text-white/80
                      max-w-[90vw] sm:max-w-sm md:max-w-xl lg:max-w-2xl
                      text-[15px] sm:text-base md:text-lg lg:text-xl
                      font-dm leading-relaxed rv font-medium">
          Whether you're struggling with legacy code or dreaming up the next big SaaS,
          we engineer digital products that dominate markets.
          We don't just write code; we solve business problems.
        </p>

        {/* Buttons — stack on mobile, row on sm+ */}
        <div className="mt-6 sm:mt-7 md:mt-8
                        flex flex-col sm:flex-row
                        items-stretch sm:items-center
                        gap-3 sm:gap-4 md:gap-6 rv">

          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 sm:gap-3
                       px-6 sm:px-8 md:px-10
                       py-3.5 sm:py-3
                       rounded-full bg-white text-gray-950
                       font-syne font-black text-xs sm:text-sm
                       uppercase tracking-widest shadow-2xl
                       hover:scale-105 transition-all duration-300
                       w-full sm:w-auto"
          >
            Let's Talk
            <span className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0
                             rounded-full border bg-blue-500 border-white/30
                             flex items-center justify-center glass-panel">
              <FastForwardIcon size={16} className="text-black" />
            </span>
          </Link>

          <Link
            to="/services"
            className="flex items-center justify-center gap-2 sm:gap-3
                       px-6 sm:px-8 md:px-10
                       py-3.5 sm:py-3
                       rounded-full bg-blue-600 text-white
                       font-syne font-black text-xs sm:text-sm
                       uppercase tracking-widest shadow-2xl
                       hover:scale-105 transition-all duration-300
                       w-full sm:w-auto"
          >
            <span className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0
                             rounded-full border border-white/30
                             flex items-center justify-center
                             bg-white text-blue-700 hover:text-blue-500">
              <FastForwardIcon size={16} />
            </span>
            See How We Work
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 2: TRUST STRIP
════════════════════════════════════════════════════════════════════════════ */
const TrustStrip = () => {
  const items = [
    "Fast Delivery",
    "Modern Tech Stack",
    "Scalable Solutions",
    "Dedicated Support",
    "React & Next.js Experts",
    "SEO Optimization",
    "Mobile App Development",
    "Google Ads Management",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="py-5 bg-[#0F172A] border-y border-blue-500/20 overflow-hidden relative marquee-pause">
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 px-8 text-sm font-dm font-semibold text-slate-300 hover:text-blue-300 transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 text-blue-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 3: SERVICES — 3 DARK CARDS
════════════════════════════════════════════════════════════════════════════ */
const ServicesSection = () => {
  const ref = useRef(null);
  useReveal(ref, ".sv");

  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Custom Web Development",
      desc: "Professional website and web application development using React and Next.js. SEO-optimized, fast-loading, fully custom — no templates. Includes admin panels, e-commerce, and SaaS platforms.",
      tags: ["React", "Next.js", "SEO Optimized", "Admin Panels"],
      seoLabel: "custom web development company",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <rect x="7" y="2" width="10" height="20" rx="2" /><circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      ),
      title: "Mobile App Development",
      desc: "Cross-platform Android & iOS mobile app development using Flutter and React Native. From MVP to enterprise-scale apps with seamless API integration and app store deployment.",
      tags: ["Android", "iOS", "Flutter", "React Native", "API Integration"],
      seoLabel: "mobile app development services",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M3 3h18v4H3zM7 7v14M17 7v14M3 12h18" /><path d="M12 17l3-3-3-3" />
        </svg>
      ),
      title: "Digital Marketing",
      desc: "Data-driven digital marketing that grows your online presence. Technical SEO, Google Ads management, Meta Ads campaigns, and social media growth strategies for measurable ROI.",
      tags: ["SEO", "Google Ads", "Meta Ads", "Social Growth"],
      seoLabel: "digital marketing agency",
    },
  ];

  return (
    <section
      ref={ref}
      id="services"
      className="py-28 bg-[#020617] relative overflow-hidden"
      aria-label="Web Development, Mobile App Development, and Digital Marketing Services"
    >
      {/* Radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.1),transparent)]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="sv inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot" />
            <span className="text-xs font-syne font-bold text-blue-400 uppercase tracking-widest">Our Services</span>
          </div>
          <h2 className="sv font-syne font-black text-[clamp(22px,4vw,44px)] text-slate-100 leading-[1.15]">
            Digital Services That{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Drive Real Growth
            </span>
          </h2>
          <p className="sv mt-4 text-slate-400 text-[clamp(13px,1.3vw,17px)] font-dm max-w-2xl mx-auto leading-relaxed">
            From custom web development to mobile app development and digital marketing — complete end-to-end digital solutions built to scale your business.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <article
              key={svc.title}
              className="sv group relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 dark-card-lift overflow-hidden"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                {svc.icon}
              </div>
              <h3 className="font-syne font-black text-xl text-slate-100 mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {svc.title}
              </h3>
              <p className="text-slate-400 font-dm text-sm leading-relaxed mb-6">{svc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-dm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 4: TECH STACK — DUAL INFINITE MARQUEE
════════════════════════════════════════════════════════════════════════════ */
const TechStackSection = () => {
  const ref = useRef(null);
  useReveal(ref, ".tck");

  const row1 = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vite", "Redux", "Node.js", "Express.js", "Firebase", "PostgreSQL", "MongoDB", "GraphQL"];
  const row2 = ["Flutter", "React Native", "Android", "iOS", "Expo", "REST APIs", "Google Ads", "Meta Ads", "SEO Tools", "Google Analytics", "Ahrefs", "Semrush"];

  const r1 = [...row1, ...row1];
  const r2 = [...row2, ...row2];

  return (
    <section ref={ref} className="py-24 bg-[#0F172A] relative overflow-hidden" aria-label="Technology Stack for Web, Mobile and Marketing">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(37,99,235,0.08),transparent)]" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <div className="tck inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot" />
          <span className="text-xs font-syne font-bold text-blue-400 uppercase tracking-widest">Technologies We Use</span>
        </div>
        <h2 className="tck font-syne font-black text-[clamp(22px,4vw,44px)] text-slate-100 leading-[1.15]">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h2>
        <p className="tck mt-4 text-slate-400 text-[clamp(13px,1.3vw,17px)] font-dm max-w-xl mx-auto leading-relaxed">
          Modern, battle-tested technologies across web development, mobile apps, and digital marketing — powering scalable solutions that last.
        </p>
      </div>

      {/* Two-row marquee */}
      <div className="space-y-4 marquee-pause relative z-10">
        {/* Row 1 — left to right */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap py-1">
            {r1.map((tech, idx) => (
              <span
                key={idx}
                className="mx-2 px-5 py-2.5 rounded-full border border-blue-500/20 bg-slate-800/60 text-slate-300 font-dm text-sm font-medium whitespace-nowrap hover:border-blue-400/60 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-reverse whitespace-nowrap py-1">
            {r2.map((tech, idx) => (
              <span
                key={idx}
                className="mx-2 px-5 py-2.5 rounded-full border border-blue-500/20 bg-slate-800/60 text-slate-300 font-dm text-sm font-medium whitespace-nowrap hover:border-blue-400/60 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 5: PROCESS — 5 STEPS
════════════════════════════════════════════════════════════════════════════ */
const ProcessSection = () => {
  const ref = useRef(null);
  useReveal(ref, ".proc");

  const steps = [
    { number: "01", title: "Understand", desc: "We deep-dive into your business goals, target audience, and technical requirements to define the right scope." },
    { number: "02", title: "Plan", desc: "Architecture design, project roadmap, tech stack selection, and milestone planning tailored to your timeline." },
    { number: "03", title: "Build", desc: "Agile development with daily progress updates, clean code practices, and regular review checkpoints." },
    { number: "04", title: "Launch", desc: "Thorough QA testing, SEO optimization, performance tuning, and seamless production deployment." },
    { number: "05", title: "Scale", desc: "Post-launch monitoring, feature enhancements, and infrastructure scaling as your business grows." },
  ];

  return (
    <section ref={ref} id="process" className="py-24 sm:py-28 bg-[#020617] relative overflow-hidden" aria-label="Our Web and App Development Process">

      <style>{`
        @keyframes procFloat1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(8deg)} }
        @keyframes procFloat2 { 0%,100%{transform:translateY(0) rotate(45deg)} 50%{transform:translateY(18px) rotate(65deg)} }
        @keyframes procDrift  { 0%{transform:translate(0,0)} 33%{transform:translate(14px,-10px)} 66%{transform:translate(-10px,14px)} 100%{transform:translate(0,0)} }
        @keyframes procPulse  { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:.55;transform:scale(1.1)} }
        @keyframes procRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes procBlink  { 0%,100%{opacity:.12} 50%{opacity:.55} }
      `}</style>

      {/* ── BIG GLOW BLOBS ── */}
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.13),transparent 70%)", top: "-18%", left: "-12%", animation: "procDrift 14s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%)", bottom: "-12%", right: "-10%", animation: "procDrift 18s ease-in-out 4s infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.08),transparent 70%)", top: "38%", right: "14%", animation: "procPulse 9s ease-in-out 1s infinite", pointerEvents: "none" }} />

      {/* ── FLOATING SQUARES / BOXES ── */}
      <div style={{ position: "absolute", width: 64, height: 64, border: "1px solid rgba(59,130,246,0.22)", borderRadius: "14px", top: "10%", right: "18%", animation: "procFloat1 7s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 44, height: 44, border: "1px solid rgba(139,92,246,0.28)", borderRadius: "10px", bottom: "18%", left: "10%", animation: "procFloat2 10s ease-in-out 1.5s infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 28, height: 28, border: "1px solid rgba(6,182,212,0.3)", borderRadius: "6px", top: "52%", left: "5%", animation: "procFloat1 12s ease-in-out 2s infinite", pointerEvents: "none", transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", width: 88, height: 88, border: "1px solid rgba(37,99,235,0.13)", borderRadius: "18px", bottom: "32%", right: "4%", animation: "procRotate 22s linear infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 36, height: 36, border: "1px solid rgba(59,130,246,0.18)", borderRadius: "8px", top: "72%", right: "30%", animation: "procFloat2 8s ease-in-out 3s infinite", pointerEvents: "none" }} />

      {/* ── FLOATING CIRCLES ── */}
      <div style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "rgba(59,130,246,0.35)", top: "22%", left: "22%", animation: "procPulse 5s ease-in-out infinite", boxShadow: "0 0 14px rgba(59,130,246,0.45)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 12, height: 12, borderRadius: "50%", background: "rgba(139,92,246,0.4)", top: "68%", right: "22%", animation: "procPulse 7s ease-in-out 1s infinite", boxShadow: "0 0 10px rgba(139,92,246,0.4)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 9, height: 9, borderRadius: "50%", background: "rgba(6,182,212,0.45)", bottom: "28%", left: "38%", animation: "procBlink 4s ease-in-out 0.5s infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "rgba(59,130,246,0.6)", top: "43%", right: "42%", animation: "procBlink 3.2s ease-in-out 1.8s infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: "rgba(139,92,246,0.5)", top: "15%", left: "48%", animation: "procBlink 5s ease-in-out 2.5s infinite", pointerEvents: "none" }} />

      {/* ── GRID + CENTER GLOW ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(37,99,235,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="proc inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot" />
            <span className="text-xs font-syne font-bold text-blue-400 uppercase tracking-widest">How We Work</span>
          </div>
          <h2 className="proc font-syne font-black text-[clamp(22px,4vw,44px)] text-slate-100 leading-[1.15]">
            Our Proven{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="proc mt-4 text-slate-400 text-[clamp(13px,1.3vw,17px)] font-dm max-w-xl mx-auto leading-relaxed">
            A clear 5-step process that transforms your idea into a market-ready digital product — on time, every time.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between mb-12 px-8">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            {steps.map((step, idx) => (
              <div key={step.number} className="proc relative z-10 flex flex-col items-center" style={{ transitionDelay: `${idx * 120}ms` }}>
                <div className="w-16 h-16 rounded-full bg-[#0F172A] border-2 border-blue-500/40 flex items-center justify-center font-syne font-black text-blue-400 text-sm hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-default">
                  {step.number}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4 px-4">
            {steps.map((step, idx) => (
              <div key={step.title} className="proc text-center" style={{ transitionDelay: `${idx * 120 + 200}ms` }}>
                <h3 className="font-syne font-black text-lg text-slate-100 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs font-dm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((step, idx) => (
            <div key={step.number} className="proc flex gap-4" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-[#0F172A] border-2 border-blue-500/40 flex items-center justify-center font-syne font-black text-blue-400 text-xs shrink-0">
                  {step.number}
                </div>
                {idx < steps.length - 1 && <div className="flex-1 w-px bg-blue-500/20 my-2 min-h-[36px]" />}
              </div>
              <div className="pt-1.5 pb-7">
                <h3 className="font-syne font-black text-base text-slate-100 mb-1">{step.title}</h3>
                <p className="text-slate-400 text-sm font-dm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 6: WHY CHOOSE US
════════════════════════════════════════════════════════════════════════════ */
const WhyChooseUs = () => {
  const ref = useRef(null);
  useReveal(ref, ".why");

  const reasons = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: "Clean, Maintainable Code",
      desc: "Every line crafted for readability, scalability, and long-term maintainability — no spaghetti code.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "Fast Performance",
      desc: "Optimized builds with sub-2s load times for better user experience and higher Google search rankings.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
      ),
      title: "SEO Friendly Architecture",
      desc: "Built-in technical SEO, semantic HTML, structured data, and Core Web Vitals compliance for top Google rankings.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M6 8h.01M9 8h6" />
        </svg>
      ),
      title: "Scalable Architecture",
      desc: "Cloud-native, microservices-ready design that grows with your business without breaking under load.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Modern UI/UX Design",
      desc: "Pixel-perfect, conversion-focused interfaces with smooth animations that turn visitors into customers.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Dedicated Team Support",
      desc: "Direct access to senior engineers. Daily updates, weekly milestones, and post-launch monitoring included.",
    },
  ];

  return (
    <section
      ref={ref}
      id="why-us"
      className="py-28 bg-[#0F172A] relative overflow-hidden"
      aria-label="Why Choose WeDo Clever for Web Development and Digital Marketing"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(37,99,235,0.08),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="why inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot" />
            <span className="text-xs font-syne font-bold text-blue-400 uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="why font-syne font-black text-[clamp(22px,4vw,44px)] text-slate-100 leading-[1.15]">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Performance
            </span>{" "}
            &amp; Results
          </h2>
          <p className="why mt-4 text-slate-400 text-[clamp(13px,1.3vw,17px)] font-dm max-w-2xl mx-auto leading-relaxed">
            We don't just build websites and apps. We build competitive advantages. Here's why businesses choose WeDo Clever over every other agency.
          </p>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={reason.title}
              className="why group flex items-start gap-4 p-6 rounded-2xl bg-slate-800/40 border border-blue-500/15 hover:border-blue-500/40 hover:bg-slate-800/70 transition-all duration-300"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-syne font-bold text-slate-100 text-base mb-1 group-hover:text-blue-300 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-slate-500 text-sm font-dm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 7: CTA
════════════════════════════════════════════════════════════════════════════ */
const CTASection = () => {
  const ref = useRef(null);
  useReveal(ref, ".cta");

  return (
    <section ref={ref} className="py-28 bg-[#020617] relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(37,99,235,0.15),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="cta inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot" />
          <span className="text-xs font-syne font-bold text-blue-400 uppercase tracking-widest">Let's Collaborate</span>
        </div>

        <h2 className="cta font-syne font-black text-[clamp(22px,4vw,44px)] text-slate-100 leading-[1.15] mb-5">
          Have an idea?
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
            Let's build it together.
          </span>
        </h2>
        <p className="cta text-slate-400 text-[clamp(13px,1.3vw,17px)] font-dm mb-10 max-w-xl mx-auto leading-relaxed">
          Whether you need a website, a mobile app, or a full digital marketing strategy — we're your one-stop digital growth partner.
        </p>

        <div className="cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-syne font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-100 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-5 rounded-full border border-blue-500/30 text-slate-300 font-syne font-bold text-sm uppercase tracking-widest hover:border-blue-400/60 hover:text-blue-300 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 8: CONTACT
════════════════════════════════════════════════════════════════════════════ */
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", requirement: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  useReveal(ref, ".ct");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-28 bg-[#0F172A] relative overflow-hidden"
      aria-label="Contact WeDo Clever — Web Development and Digital Marketing"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(37,99,235,0.08),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Text + Contact Info */}
          <div>
            <div className="ct inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot" />
              <span className="text-xs font-syne font-bold text-blue-400 uppercase tracking-widest">Get In Touch</span>
            </div>

            <h2 className="ct font-syne font-black text-[clamp(22px,4vw,44px)] text-slate-100 leading-[1.15] mb-5">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Remarkable
              </span>
            </h2>
            <p className="ct text-slate-400 text-[clamp(13px,1.3vw,17px)] font-dm leading-relaxed mb-10">
              Ready to launch your web development project, mobile app, or digital marketing campaign? Tell us your requirement and we'll craft a tailored solution for your business.
            </p>

            {/* Info cards */}
            <div className="ct space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.13 3.38 2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-1">Call Us Directly</div>
                  <a href="tel:+19454445648" className="text-lg font-syne font-bold text-slate-200 hover:text-blue-400 transition-colors">
                    +91 9110572323
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-1">Email Us</div>
                  <a href="mailto:info@wedoclever.in" className="text-lg font-syne font-bold text-slate-200 hover:text-blue-400 transition-colors">
                    info@wedoclever.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-1">Location</div>
                  <div className="text-base font-dm text-slate-300">
                    Vasavi MPM Mall, 7th Floor - 806 , Ameerpet, Hyderbad - 900016
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="ct bg-slate-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-blue-500/20 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

            <h3 className="font-syne font-black text-2xl text-slate-100 mb-1">Start Your Project</h3>
            <p className="text-slate-400 font-dm text-sm mb-8">We respond within 24 hours. No commitment required.</p>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="font-syne font-bold text-slate-100 text-xl">Message Sent!</p>
                <p className="text-slate-400 font-dm text-sm text-center">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all duration-300"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Your Requirement
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all duration-300 resize-y"
                    placeholder="Tell us about your project — website, mobile app, marketing campaign, or all three..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 mt-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-syne font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.01] active:scale-100 disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   MAIN LANDING PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <TechStackSection />
      <ProcessSection />
      <WhyChooseUs />
      <CTASection />
      <ContactSection />
    </>
  );
}
