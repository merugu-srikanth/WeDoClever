/**
 * WeDoClever AI Chatbot Component
 * 
 * Drop-in floating chatbot with:
 * - Keyword-based intelligent responses (no API needed)
 * - Beautiful dark animated UI
 * - WhatsApp fallback for unknown queries
 * - Quick reply chips, info cards, typing indicator
 * 
 * Dependencies: lucide-react (already in most React projects)
 * Usage: <WeDoCleverChatbot waNumber="919110572323" />
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, ChevronRight } from "lucide-react";
import airobot from "../assets/AiChat/aiRobot.webp";

// ─────────────────────────────────────────────
// KNOWLEDGE BASE — Add/edit topics here
// ─────────────────────────────────────────────
const KNOWLEDGE_BASE = [
  {
    id: "web",
    keys: ["web", "website", "next", "react", "frontend", "backend", "fullstack", "full stack",
      "ecommerce", "e-commerce", "cms", "wordpress", "development", "build site", "landing page", "portal"],
    title: "🌐 Web Development",
    answer: "We build **fast, scalable** websites and web apps using Next.js, React, Node.js, and headless CMS platforms. From landing pages to enterprise portals.",
    cards: [
      { icon: "⚡", label: "Tech Stack", text: "Next.js · React · Node.js · PostgreSQL · Headless CMS" },
      { icon: "⏱️", label: "Timeline", text: "4–6 weeks for standard sites · 8–14 weeks for complex platforms" },
      { icon: "📦", label: "Includes", text: "SEO setup · Mobile responsive · CMS integration · Analytics" },
    ],
    chips: ["What does it cost?", "How long does it take?", "Free Audit"],
    showWA: false,
  },
  {
    id: "app",
    keys: ["app", "mobile", "ios", "android", "flutter", "react native", "play store", "app store",
      "native", "cross platform", "phone", "application"],
    title: "📱 App Development",
    answer: "We develop **cross-platform mobile apps** for iOS & Android using React Native and Flutter. Fast, beautiful, and App Store ready from day one.",
    cards: [
      { icon: "🛠️", label: "Platforms", text: "iOS · Android · React Native · Flutter" },
      { icon: "⏱️", label: "Timeline", text: "6–10 weeks from design to store submission" },
      { icon: "✅", label: "Includes", text: "UI/UX design · Backend API · App Store optimization" },
    ],
    chips: ["App pricing?", "Do you do UI/UX?", "Contact team"],
    showWA: false,
  },
  {
    id: "seo",
    keys: ["seo", "search engine", "google", "rank", "ranking", "organic", "traffic", "keyword",
      "content", "backlink", "technical seo", "core web vitals", "audit", "search"],
    title: "📈 SEO & Growth",
    answer: "Our SEO service covers **technical audits, content strategy, link building**, and Core Web Vitals optimization — tripling organic traffic for clients like LegalEdge.",
    cards: [
      { icon: "🔍", label: "Services", text: "Technical SEO · Content Strategy · Link Building · CWV Audit" },
      { icon: "📊", label: "Results", text: "Average 3× traffic growth within 6 months" },
      { icon: "📅", label: "Reporting", text: "Monthly rank tracking + actionable reports" },
    ],
    chips: ["SEO pricing?", "How long for results?", "Free audit?"],
    showWA: false,
  },
  {
    id: "pricing",
    keys: ["price", "pricing", "cost", "how much", "budget", "plan", "starter", "growth",
      "enterprise", "package", "rate", "charge", "fee", "affordable", "quote"],
    title: "💰 Pricing Plans",
    answer: "We offer **transparent, project-based pricing** across three plans. No hidden fees — ever.",
    cards: [
      { icon: "🌱", label: "Starter — ₹80K", text: "5-page website · On-page SEO · CMS · Analytics" },
      { icon: "🚀", label: "Growth — ₹2.2L", text: "Website + App + 3-month SEO + API integrations" },
      { icon: "🏢", label: "Enterprise — Custom", text: "Dedicated team · SaaS platforms · Retainer models" },
    ],
    chips: ["What's in Growth?", "Get a free quote", "Talk to team"],
    showWA: false,
  },
  {
    id: "contact",
    keys: ["contact", "reach", "call", "email", "phone", "whatsapp", "talk", "speak", "meet",
      "office", "location", "hyderabad", "team", "hello", "hi", "hey"],
    title: "📞 Contact WeDoClever",
    answer: "We're based in **Hyderabad, India** and work with clients worldwide. Reach us any way you prefer — we reply within 24 hours.",
    cards: [
      { icon: "📧", label: "Email", text: "wedocleverone@gmail.com", link: "mailto:wedocleverone@gmail.com" },
      { icon: "📞", label: "Phone", text: "+91 9110572323", link: "tel:+919876543210" },
      { icon: "📍", label: "Location", text: "Hyderabad, Telangana, India" },
    ],
    chips: ["Open WhatsApp", "Free consultation", "Pricing?"],
    showWA: true,
  },
  {
    id: "design",
    keys: ["design", "ui", "ux", "figma", "wireframe", "prototype", "branding", "logo", "graphic", "visual", "mockup"],
    title: "🎨 UI/UX Design",
    answer: "Our design team crafts **user research, wireframes, high-fidelity Figma designs**, and full design systems perfectly aligned with your brand.",
    cards: [
      { icon: "🎯", label: "Deliverables", text: "Wireframes · Figma UI · Design System · Prototypes" },
      { icon: "⏱️", label: "Timeline", text: "2–4 weeks for a complete design system" },
      { icon: "🔄", label: "Process", text: "Research → Wireframe → Prototype → Dev Handoff" },
    ],
    chips: ["Web dev after design?", "App design?", "Pricing?"],
    showWA: false,
  },
  {
    id: "audit",
    keys: ["free", "audit", "consultation", "demo", "trial", "test", "check", "review", "analyse", "analyze"],
    title: "🎁 Free Audit",
    answer: "We offer a **complimentary website & SEO audit** — covers Core Web Vitals, technical SEO, mobile-friendliness, and quick wins. Zero commitment.",
    cards: [
      { icon: "✅", label: "What's Included", text: "Core Web Vitals · Technical SEO · Mobile check · Speed" },
      { icon: "⏱️", label: "Turnaround", text: "Delivered within 48 hours of your request" },
      { icon: "💬", label: "How to Get It", text: "Fill the contact form or message us on WhatsApp" },
    ],
    chips: ["Request audit", "Contact team", "Pricing?"],
    showWA: true,
  },
  {
    id: "timeline",
    keys: ["timeline", "time", "how long", "duration", "deadline", "weeks", "delivery", "fast", "quick", "rush"],
    title: "⏱️ Project Timelines",
    answer: "Timelines vary by scope, but we always agree on a **milestone-based roadmap** before starting — no surprises, ever.",
    cards: [
      { icon: "🌐", label: "Website", text: "4–6 weeks (standard) · 8–14 weeks (platform)" },
      { icon: "📱", label: "Mobile App", text: "6–10 weeks from design to store launch" },
      { icon: "📈", label: "SEO", text: "Visible results in 4–8 weeks · Major gains 3–6 months" },
    ],
    chips: ["Pricing?", "Start a project", "Contact us"],
    showWA: false,
  },
];

const FALLBACK = {
  answer: "I'm not sure about that specific query — but our team will know exactly! You can chat with a human expert right now on WhatsApp, or browse common topics below.",
  showWA: true,
  chips: ["Web Development", "App Development", "Pricing", "Free Audit", "Contact"],
};

const WELCOME = {
  answer: "👋 Hi! I'm **WeDoClever**,  AI assistant. I can help you with our **web development, app development, SEO services, pricing**, and more!\n\nWhat would you like to know?",
  chips: ["Web Development", "App Development", "SEO", "Pricing", "Free Audit"],
};

const QUICK_CHIPS = [
  { label: "🌐 Web Dev", query: "web development" },
  { label: "📱 App Dev", query: "mobile app development" },
  { label: "📈 SEO", query: "SEO services" },
  { label: "💰 Pricing", query: "pricing plans" },
  { label: "📞 Contact", query: "contact" },
];

// ─────────────────────────────────────────────
// KEYWORD MATCHER
// ─────────────────────────────────────────────
function findResponse(text) {
  const lower = text.toLowerCase();
  let best = null, bestScore = 0;
  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const k of entry.keys) {
      if (lower.includes(k)) score += k.split(" ").length;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return bestScore > 0 ? best : null;
}

// ─────────────────────────────────────────────
// PARSE BOLD TEXT  **text** → <strong>
// ─────────────────────────────────────────────
function ParsedText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} style={{ color: "#f2ede8", fontWeight: 600 }}>{part}</strong> : part
      )}
    </span>
  );
}

// ─────────────────────────────────────────────
// INFO CARD
// ─────────────────────────────────────────────
function InfoCard({ title, cards }) {
  return (
    <div style={{
      marginTop: "0.5rem", background: "#0f0f0f", border: "1px solid #2a2a2a",
      borderRadius: "0.75rem", padding: "0.7rem 0.85rem", display: "flex",
      flexDirection: "column", gap: "0.32rem",
    }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#89aacc", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
        {title}
      </div>
      {cards.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", color: "#c0bab4" }}>
          <span style={{ flexShrink: 0 }}>{c.icon}</span>
          <span>
            {c.label}:{" "}
            {c.link
              ? <a href={c.link} style={{ color: "#89aacc", fontWeight: 500, textDecoration: "none" }}>{c.text}</a>
              : <strong style={{ color: "#f2ede8", fontWeight: 500 }}>{c.text}</strong>
            }
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MESSAGE CHIP
// ─────────────────────────────────────────────
function MsgChip({ label, onClick }) {
  return (
    <button onClick={() => onClick(label)} style={{
      fontSize: "0.7rem", padding: "0.22rem 0.65rem", borderRadius: "100px",
      background: "rgba(137,170,204,0.06)", border: "1px solid rgba(137,170,204,0.18)",
      color: "#89aacc", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
    }}
      onMouseEnter={e => e.target.style.background = "rgba(137,170,204,0.15)"}
      onMouseLeave={e => e.target.style.background = "rgba(137,170,204,0.06)"}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────
function WAButton({ waLink }) {
  return (
    <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: "0.45rem",
      background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff",
      fontSize: "0.78rem", fontWeight: 600, padding: "0.45rem 1rem",
      borderRadius: "100px", textDecoration: "none", marginTop: "0.5rem",
      boxShadow: "0 4px 14px rgba(34,197,94,0.3)", transition: "opacity 0.2s",
    }}>
      💬 Chat on WhatsApp
    </a>
  );
}

// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "0.6rem 0.9rem", background: "#1a1a1a", border: "1px solid #222", borderRadius: "1rem 1rem 1rem 0.2rem", width: "56px" }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%", background: "#89aacc",
          animation: `typeDot 1.2s ease-in-out ${delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
// FUNNY ROTATING MESSAGES
// ─────────────────────────────────────────────
const BUBBLE_MSGS = [
  { text: "Hey! 👋 I'm right here!", emoji: "👀" },
  { text: "Ask me anything! 💬", emoji: "🤖" },
  { text: "I don't bite... much 😄", emoji: "😂" },
  { text: "Web dev? App dev? Just ask! ⚡", emoji: "🚀" },
  { text: "Bored? Let's chat! 🎉", emoji: "🎊" },
  { text: "Got a project idea? 💡 Tell me!", emoji: "💡" },
  { text: "Free consultation inside! 🎁", emoji: "🎁" },
  { text: "Still here... waiting... 👀", emoji: "⏳" },
];

// ─────────────────────────────────────────────
export default function FloatingWhatsApp({ waNumber = "919110572323" }) {
  const WA_LINK = `https://wa.me/${waNumber}`;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const msgListRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (msgListRef.current) msgListRef.current.scrollTop = msgListRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Cycle bubble messages
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setBubbleIdx(i => (i + 1) % BUBBLE_MSGS.length);
        setBubbleVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [open]);

  // Welcome message on first open
  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true);
      setTimeout(() => {
        addBotMessage(WELCOME.answer, null, WELCOME.chips, false);
      }, 500);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const addBotMessage = useCallback((text, entry, chips, showWA) => {
    setMessages(prev => [...prev, {
      id: Date.now(), role: "bot", text,
      entry, chips, showWA,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
  }, []);

  const handleSend = useCallback((text) => {
    const msg = (text || input).trim();
    if (!msg || isTyping) return;
    setInput("");

    // User message
    setMessages(prev => [...prev, {
      id: Date.now(), role: "user", text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);

    // Typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const entry = findResponse(msg);
      if (entry) {
        addBotMessage(entry.answer, entry, entry.chips, entry.showWA);
      } else {
        addBotMessage(FALLBACK.answer, null, FALLBACK.chips, FALLBACK.showWA);
      }
    }, 900 + Math.random() * 500);
  }, [input, isTyping, addBotMessage]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Keyframes */}
      <style>{`
        @keyframes ringOut1 { 0% { transform:scale(1); opacity:.9 } 100% { transform:scale(1.75); opacity:0 } }
        @keyframes ringOut2 { 0% { transform:scale(1); opacity:.65 } 100% { transform:scale(2.1); opacity:0 } }
        @keyframes ringOut3 { 0% { transform:scale(1); opacity:.4 } 100% { transform:scale(2.5); opacity:0 } }
        @keyframes btnFloat { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-5px) } }
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
        @keyframes typeDot { 0%,60%,100% { transform: translateY(0); opacity:.35 } 30% { transform: translateY(-5px); opacity:1 } }
        @keyframes msgIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes winIn { from { opacity:0; transform:translateY(20px) scale(.95) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes ringPulse { 0%,100% { opacity:.4; transform:scale(1) } 50% { opacity:.9; transform:scale(1.06) } }
        @keyframes bubbleIn { 0% { opacity:0; transform:translateX(12px) scale(.88) } 100% { opacity:1; transform:translateX(0) scale(1) } }
        @keyframes bubbleOut { 0% { opacity:1; transform:translateX(0) scale(1) } 100% { opacity:0; transform:translateX(12px) scale(.88) } }
        @keyframes wobble { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
      `}</style>

      {/* ── FLOATING BUTTON ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Chat with WeDoClever AI"
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 1000,
          background: "none", border: "none", cursor: "pointer",
          width: 68, height: 68,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "btnFloat 3.5s ease-in-out infinite",
        }}
        className="group"
      >
        {/* ── SPEECH BUBBLE ── */}
        {!open && (
          <div style={{
            position: "absolute",
            right: "calc(100% + 14px)",
            bottom: "50%",
            transform: "translateY(50%)",
            pointerEvents: "none",
            animation: bubbleVisible ? "bubbleIn .38s cubic-bezier(.34,1.56,.64,1) both" : "bubbleOut .3s ease both",
          }}>
            {/* Bubble body */}
            <div style={{
              background: "linear-gradient(135deg, #0f172a, #1a2744)",
              border: "1px solid rgba(59,130,246,0.35)",
              borderRadius: "1rem 1rem 0.25rem 1rem",
              padding: "0.55rem 0.9rem",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.12)",
              position: "relative",
            }}>
              {/* Emoji bounce */}
              <span style={{
                display: "inline-block",
                marginRight: "0.35rem",
                animation: "wobble 1.2s ease-in-out infinite",
                fontSize: "0.9rem",
              }}>
                {BUBBLE_MSGS[bubbleIdx].emoji}
              </span>
              <span style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#e2e8f0",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
              }}>
                {BUBBLE_MSGS[bubbleIdx].text}
              </span>

              {/* Coloured bottom accent line */}
              <div style={{
                position: "absolute", bottom: 0, left: "12px", right: "12px", height: "2px",
                background: "linear-gradient(90deg,#2563eb,#7c3aed,#06b6d4)",
                borderRadius: "0 0 4px 4px",
              }} />
            </div>

            {/* Tail pointing right */}
            <div style={{
              position: "absolute",
              right: -7,
              bottom: 10,
              width: 0, height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "0px solid transparent",
              borderLeft: "8px solid rgba(59,130,246,0.35)",
            }} />
            {/* Tail fill */}
            <div style={{
              position: "absolute",
              right: -6,
              bottom: 11,
              width: 0, height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "0px solid transparent",
              borderLeft: "7px solid #1a2744",
            }} />
          </div>
        )}

        {/* Ring 1 — blue, fastest */}
        <span style={{
          position: "absolute", width: 68, height: 68, borderRadius: "50%",
          border: "2px solid rgba(59,130,246,0.75)",
          animation: "ringOut1 2s ease-out infinite",
          pointerEvents: "none",
        }} />
        {/* Ring 2 — purple, medium */}
        <span style={{
          position: "absolute", width: 68, height: 68, borderRadius: "50%",
          border: "2px solid rgba(139,92,246,0.55)",
          animation: "ringOut2 2s ease-out 0.55s infinite",
          pointerEvents: "none",
        }} />
        {/* Ring 3 — cyan, slowest */}
        <span style={{
          position: "absolute", width: 68, height: 68, borderRadius: "50%",
          border: "2px solid rgba(6,182,212,0.4)",
          animation: "ringOut3 2s ease-out 1.1s infinite",
          pointerEvents: "none",
        }} />

        {/* White solid border ring */}
        <span style={{
          position: "absolute", width: 72, height: 72, borderRadius: "50%",
          border: "2.5px solid rgba(255,255,255,0.85)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.1)",
          pointerEvents: "none",
        }} />

        {/* Core button */}
        <span style={{
          position: "relative", width: 62, height: 62, borderRadius: "50%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(37,99,235,0.5), 0 0 0 1px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
          transition: "transform .25s ease, box-shadow .25s ease",
          overflow: "hidden",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.7), 0 0 0 1px rgba(59,130,246,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.5), 0 0 0 1px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"; }}
        >
          {open ? (
            <X size={22} color="#94a3b8" strokeWidth={2.5} />
          ) : (
            <img
              src={airobot}
              alt="WeDoClever AI"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </span>

        {/* Tooltip */}
        <span style={{
          position: "absolute", right: 78,
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "#e2e8f0", fontSize: ".74rem", fontWeight: 600,
          padding: ".4rem .95rem", borderRadius: ".7rem", whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,.5), 0 0 0 1px rgba(59,130,246,0.25)",
          border: "1px solid rgba(59,130,246,0.2)",
          opacity: 0, transform: "translateX(8px)", pointerEvents: "none",
          transition: "all .25s ease",
        }}
          className="group-hover:opacity-100 group-hover:translate-x-0"
        >
          💬 Chat with AI ✨
        </span>
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div style={{
          position: "fixed", bottom: "0.5rem", right: "5.5rem", zIndex: 999,
          width: 380, maxWidth: "calc(100vw - 2rem)", maxHeight: 600,
          background: "#111", borderRadius: "1.4rem",
          border: "1px solid #1e1e1e",
          boxShadow: "0 24px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(137,170,204,.08)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "winIn .32s cubic-bezier(.34,1.56,.64,1) both",
          fontFamily: "'DM Sans', sans-serif",
        }}>

          {/* HEADER */}
          <div style={{
            background: "linear-gradient(135deg,#0f1a24,#111)",
            borderBottom: "1px solid #1e1e1e", padding: "1rem 1.1rem",
            display: "flex", alignItems: "center", gap: ".75rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 120% at 0% 50%,rgba(137,170,204,.08),transparent)",
            }} />
            {/* Avatar */}
            <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
              <div style={{
                position: "absolute", inset: -2, borderRadius: "50%",
                background: "linear-gradient(135deg,#89aacc,#4e85bf)",
                animation: "ringPulse 2.5s ease-in-out infinite", zIndex: 0,
              }} />
              <div style={{
                position: "relative", zIndex: 1, width: 40, height: 40,
                borderRadius: "50%", background: "#1a2535",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
              }}>
                🤖
              </div>
            </div>
            <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: ".92rem", fontWeight: 600, color: "#f2ede8" }}>WeDoClever — AI Assistant</div>
              <div style={{ display: "flex", alignItems: "center", gap: ".35rem", marginTop: ".1rem" }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
                  boxShadow: "0 0 6px rgba(74,222,128,.7)", animation: "blink 2s ease-in-out infinite",
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: ".68rem", color: "#666" }}>Online · Replies instantly</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,.05)", border: "1px solid #1e1e1e",
                color: "#666", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                transition: "background .2s, color .2s", position: "relative", zIndex: 1,
              }}
            >
              <X size={13} />
            </button>
          </div>

          {/* QUICK CHIPS BAR */}
          <div style={{
            padding: ".65rem .9rem", borderBottom: "1px solid #181818",
            display: "flex", gap: ".4rem", flexWrap: "wrap",
            background: "#0f0f0f",
          }}>
            {QUICK_CHIPS.map(({ label, query }) => (
              <button key={label} onClick={() => handleSend(query)} style={{
                fontSize: ".68rem", padding: ".25rem .7rem", borderRadius: "100px",
                background: "rgba(137,170,204,.07)", border: "1px solid rgba(137,170,204,.15)",
                color: "#89aacc", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                transition: "all .2s",
              }}>
                {label}
              </button>
            ))}
          </div>

          {/* MESSAGE LIST */}
          <div ref={msgListRef} style={{
            flex: 1, overflowY: "auto", padding: "1rem",
            display: "flex", flexDirection: "column", gap: ".6rem",
            scrollBehavior: "smooth",
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                maxWidth: "84%", display: "flex", flexDirection: "column", gap: ".25rem",
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                animation: "msgIn .28s ease",
              }}>
                <div style={{
                  padding: ".6rem .88rem", borderRadius: msg.role === "user" ? "1rem 1rem .2rem 1rem" : "1rem 1rem 1rem .2rem",
                  ...(msg.role === "user"
                    ? { background: "linear-gradient(135deg,#89aacc,#4e85bf)", color: "#fff", fontWeight: 500 }
                    : { background: "#1a1a1a", border: "1px solid #222", color: "#d4cfc9" }
                  ),
                  fontSize: ".84rem", lineHeight: 1.56,
                }}>
                  <ParsedText text={msg.text} />
                  {msg.entry?.cards && <InfoCard title={msg.entry.title} cards={msg.entry.cards} />}
                  {msg.showWA && <WAButton waLink={WA_LINK} />}
                </div>
                {msg.chips?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".32rem" }}>
                    {msg.chips.map(chip => (
                      <MsgChip key={chip} label={chip} onClick={handleSend} />
                    ))}
                  </div>
                )}
                <div style={{ fontSize: ".6rem", color: "#444", textAlign: msg.role === "user" ? "right" : "left" }}>
                  {msg.time}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ alignSelf: "flex-start", animation: "msgIn .28s ease" }}>
                <TypingIndicator />
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div style={{
            padding: ".7rem .85rem", borderTop: "1px solid #1a1a1a",
            display: "flex", gap: ".5rem", alignItems: "flex-end",
            background: "#0f0f0f",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything about our services…"
              rows={1}
              style={{
                flex: 1, background: "#1a1a1a", border: "1px solid #262626",
                borderRadius: ".75rem", padding: ".52rem .82rem",
                fontSize: ".82rem", color: "#f2ede8", fontFamily: "inherit",
                outline: "none", resize: "none", minHeight: 36, maxHeight: 88,
                lineHeight: 1.5, transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(137,170,204,.4)"}
              onBlur={e => e.target.style.borderColor = "#262626"}
              onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 88) + "px"; }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping}
              style={{
                width: 36, height: 36, borderRadius: ".6rem",
                background: input.trim() ? "linear-gradient(135deg,#89aacc,#4e85bf)" : "#1e1e1e",
                border: "none", cursor: input.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background .2s, transform .2s", flexShrink: 0,
              }}
              onMouseDown={e => { if (input.trim()) e.currentTarget.style.transform = "scale(.92)"; }}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Send size={15} color="#fff" />
            </button>
          </div>
          <div style={{ padding: ".35rem 1rem .55rem", fontSize: ".63rem", color: "#2a2a2a", textAlign: "center" }}>
            Powered by WeDoClever AI · Vasavi MPM Mall, 7th Floor - 806 , Ameerpet, Hyderbad - 900016
          </div>
        </div>
      )}
    </>
  );
}