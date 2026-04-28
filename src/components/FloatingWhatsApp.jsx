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
import airobot1 from "../assets/AiChat/aiRobot.webp";
import airobot from "../assets/AiChat/Hz83gNlD0i.gif";

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
      { icon: "📧", label: "Email", text: "info@wedoclever.in", link: "mailto:info@wedoclever.in" },
      { icon: "📞", label: "Phone", text: "+91 9110572323", link: "tel:+919876543210" },
      { icon: "📍", label: "Location", text: "Hyderabad, Telangana, India" },
    ],
    chips: ["Open WhatsApp", "Free consultation", ],
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
  chips: ["Web Development", "App Development", "SEO",  "Free Audit"],
};

const QUICK_CHIPS = [
  { label: "🌐 Web Dev", query: "web development" },
  { label: "📱 App Dev", query: "mobile app development" },
  { label: "📈 SEO", query: "SEO services" },
  // { label: "💰 Pricing", query: "pricing plans" },
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
        i % 2 === 1 ? <strong key={i} style={{ color: "#93c5fd", fontWeight: 600 }}>{part}</strong> : part
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
      marginTop: "0.5rem", background: "linear-gradient(135deg,#040f1e,#071828)", border: "1px solid rgba(37,99,235,0.25)",
      borderRadius: "0.75rem", padding: "0.7rem 0.85rem", display: "flex",
      flexDirection: "column", gap: "0.32rem",
      boxShadow: "inset 0 1px 0 rgba(59,130,246,0.08)",
    }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#60a5fa", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
        {title}
      </div>
      {cards.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", color: "#94a3b8" }}>
          <span style={{ flexShrink: 0 }}>{c.icon}</span>
          <span>
            {c.label}:{" "}
            {c.link
              ? <a href={c.link} style={{ color: "#60a5fa", fontWeight: 500, textDecoration: "none" }}>{c.text}</a>
              : <strong style={{ color: "#e2e8f0", fontWeight: 500 }}>{c.text}</strong>
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
      background: "rgba(37,99,235,0.1)", border: "1px solid rgba(59,130,246,0.28)",
      color: "#60a5fa", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
    }}
      onMouseEnter={e => { e.target.style.background = "rgba(37,99,235,0.22)"; e.target.style.borderColor = "rgba(59,130,246,0.5)"; }}
      onMouseLeave={e => { e.target.style.background = "rgba(37,99,235,0.1)"; e.target.style.borderColor = "rgba(59,130,246,0.28)"; }}
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
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "0.6rem 0.9rem", background: "linear-gradient(135deg,#071828,#0a1e35)", border: "1px solid rgba(37,99,235,0.25)", borderRadius: "1rem 1rem 1rem 0.2rem", width: "56px" }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%", background: "#3b82f6",
          boxShadow: "0 0 6px rgba(59,130,246,0.6)",
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

  // ── Persist messages in sessionStorage (cleared on browser refresh) ──
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("wdc_msgs") || "[]"); }
    catch { return []; }
  });
  const [initialized, setInitialized] = useState(() =>
    !!sessionStorage.getItem("wdc_init")
  );

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const msgListRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const btnRef = useRef(null);

  // Save messages to sessionStorage on every change
  useEffect(() => {
    sessionStorage.setItem("wdc_msgs", JSON.stringify(messages));
  }, [messages]);

  // Persist initialized flag
  useEffect(() => {
    if (initialized) sessionStorage.setItem("wdc_init", "1");
  }, [initialized]);

  // Mobile resize listener
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Click / tap outside to close
  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (
        chatRef.current && !chatRef.current.contains(e.target) &&
        btnRef.current  && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    document.addEventListener("touchstart", fn);
    return () => {
      document.removeEventListener("mousedown", fn);
      document.removeEventListener("touchstart", fn);
    };
  }, [open]);

  // Scroll to bottom on new message OR when chat reopens
  useEffect(() => {
    if (!msgListRef.current) return;
    msgListRef.current.scrollTop = msgListRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && msgListRef.current) {
      // slight delay so the window finishes its open animation first
      setTimeout(() => {
        if (msgListRef.current)
          msgListRef.current.scrollTop = msgListRef.current.scrollHeight;
      }, 350);
    }
  }, [open]);

  // Show "scroll to top" button when user scrolls away from bottom
  useEffect(() => {
    const el = msgListRef.current;
    if (!el) return;
    const onScroll = () => {
      // show button once user has scrolled up more than 120px from bottom
      const fromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollTop(fromBottom > 120);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, messages]); // re-attach after open/messages change

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
        @keyframes headerShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatBlob { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.05)} }
      `}</style>

      {/* ── FLOATING BUTTON ── */}
      <button
        ref={btnRef}
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
        {/* ── SPEECH BUBBLE — desktop: left of button | mobile: above button ── */}
        {!open && (
          <div style={{
            position: "absolute",
            pointerEvents: "none",
            animation: bubbleVisible ? "bubbleIn .38s cubic-bezier(.34,1.56,.64,1) both" : "bubbleOut .3s ease both",
            ...(isMobile ? {
              bottom: "calc(100% + 12px)",
              right: 0,
            } : {
              right: "calc(100% + 14px)",
              bottom: "50%",
              transform: "translateY(50%)",
            }),
          }}>
            {/* Bubble body */}
            <div style={{
              background: "linear-gradient(135deg, #0f172a, #1a2744)",
              border: "1px solid rgba(59,130,246,0.35)",
              borderRadius: isMobile ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 0.25rem 1rem",
              padding: "0.55rem 0.9rem",
              whiteSpace: "nowrap",
              maxWidth: isMobile ? "calc(100vw - 5.5rem)" : "none",
              overflow: "hidden",
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

            {/* Tail — points right on desktop, points down on mobile */}
            {isMobile ? (
              <>
                <div style={{
                  position: "absolute", right: 14, bottom: -7,
                  width: 0, height: 0,
                  borderTop: "8px solid rgba(59,130,246,0.35)",
                  borderLeft: "7px solid transparent",
                  borderRight: "0px solid transparent",
                }} />
                <div style={{
                  position: "absolute", right: 15, bottom: -6,
                  width: 0, height: 0,
                  borderTop: "7px solid #1a2744",
                  borderLeft: "6px solid transparent",
                  borderRight: "0px solid transparent",
                }} />
              </>
            ) : (
              <>
                <div style={{
                  position: "absolute", right: -7, bottom: 10,
                  width: 0, height: 0,
                  borderTop: "7px solid transparent",
                  borderBottom: "0px solid transparent",
                  borderLeft: "8px solid rgba(59,130,246,0.35)",
                }} />
                <div style={{
                  position: "absolute", right: -6, bottom: 11,
                  width: 0, height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "0px solid transparent",
                  borderLeft: "7px solid #1a2744",
                }} />
              </>
            )}
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
          position: "relative", borderRadius: "50%",
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
            <span className="relative">
            <img
              src={airobot1}
              alt="WeDoClever AI"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
                        <X className="absolute top-1 right-1" size={22} color="blue" strokeWidth={2.5} />

            </span>
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

      {/* ── MOBILE BACKDROP ── */}
      {open && isMobile && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div
          ref={chatRef}
          style={isMobile ? {
            // ── MOBILE: full-width bottom sheet ──
            position: "fixed", bottom: 50, left: 0, right: 0, zIndex: 999,
            width: "100%", height: "48vh", maxHeight: "88vh",
            background: "linear-gradient(180deg,#020c1b 0%,#030e1f 100%)",
            borderRadius: "1.4rem 1.4rem 0 0",
            border: "1px solid rgba(37,99,235,0.3)",
            borderBottom: "none",
            boxShadow: "0 -12px 60px rgba(0,0,0,.8), 0 0 60px rgba(37,99,235,0.12)",
            display: "flex", flexDirection: "column", overflow: "hidden",
            animation: "winIn .32s cubic-bezier(.34,1.56,.64,1) both",
            fontFamily: "'DM Sans', sans-serif",
          } : {
            // ── DESKTOP: anchored above button ──
            position: "fixed", bottom: "5.5rem", right: "1.5rem", zIndex: 999,
            width: 380, maxWidth: "calc(100vw - 3rem)", maxHeight: 600,
            background: "linear-gradient(180deg,#020c1b 0%,#030e1f 100%)",
            borderRadius: "1.4rem",
            border: "1px solid rgba(37,99,235,0.3)",
            boxShadow: "0 24px 80px rgba(0,0,0,.8), 0 0 60px rgba(37,99,235,0.15), 0 0 0 1px rgba(59,130,246,0.08)",
            display: "flex", flexDirection: "column", overflow: "hidden",
            animation: "winIn .32s cubic-bezier(.34,1.56,.64,1) both",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >

          {/* HEADER */}
          <div style={{
            background: "linear-gradient(135deg,#051228 0%,#071e3d 50%,#051228 100%)",
            backgroundSize: "200% auto",
            animation: "headerShimmer 6s linear infinite",
            borderBottom: "1px solid rgba(37,99,235,0.3)", padding: "1rem 1.1rem",
            display: "flex", alignItems: "center", gap: ".75rem",
            position: "relative", overflow: "hidden",
            boxShadow: "0 1px 0 rgba(59,130,246,0.15)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 120% at 0% 50%,rgba(37,99,235,0.18),transparent)",
            }} />
            {/* top shimmer line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg,transparent,rgba(59,130,246,0.6),rgba(139,92,246,0.4),transparent)",
            }} />
            {/* Avatar */}
            <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
              <div style={{
                position: "absolute", inset: -2, borderRadius: "50%",
                background: "linear-gradient(135deg,#3b82f6,#7c3aed,#06b6d4)",
                animation: "ringPulse 2.5s ease-in-out infinite", zIndex: 0,
              }} />
              <div style={{
                position: "relative", zIndex: 1, width: 40, height: 40,
                borderRadius: "50%", background: "linear-gradient(135deg,#071828,#0a1e35)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
                border: "1px solid rgba(59,130,246,0.2)",
              }}>
                🤖
              </div>
            </div>
            <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
              <div style={{
                fontSize: ".92rem", fontWeight: 700, color: "#fff",
                background: "linear-gradient(90deg,#e2e8f0,#93c5fd)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>WeDoClever — AI Assistant</div>
              <div style={{ display: "flex", alignItems: "center", gap: ".35rem", marginTop: ".1rem" }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74,222,128,.9)", animation: "blink 2s ease-in-out infinite",
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: ".68rem", color: "#64748b" }}>Online · Replies instantly</span>
              </div>
            </div>
           

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(37,99,235,0.1)", border: "1px solid rgba(59,130,246,0.25)",
                color: "#64748b", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                transition: "background .2s, color .2s, border-color .2s", position: "relative", zIndex: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.1)"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"; }}
            >
              <X size={13} />
            </button>
          </div>

          {/* QUICK CHIPS BAR */}

          
          <div style={{
            padding: ".65rem .9rem", borderBottom: "1px solid rgba(37,99,235,0.2)",
            display: "flex", gap: ".4rem", flexWrap: "wrap",
            background: "rgba(3,14,31,0.8)",
          }}>
            {QUICK_CHIPS.map(({ label, query }) => (
              <button key={label} onClick={() => handleSend(query)} style={{
                fontSize: ".68rem", padding: ".25rem .7rem", borderRadius: "100px",
                background: "rgba(37,99,235,0.1)", border: "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.22)"; e.currentTarget.style.boxShadow = "0 0 10px rgba(59,130,246,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* MESSAGE LIST wrapper — relative so the scroll-top btn can be absolute */}
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* ── Scroll-to-top button ── */}
            {showScrollTop && (
              <button
                onClick={() => {
                  if (msgListRef.current) msgListRef.current.scrollTo({ top: 0, behavior: "smooth" });
                }}
                title="Scroll to top"
                style={{
                  position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
                  zIndex: 10, display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.28rem 0.75rem", borderRadius: "100px",
                  background: "rgba(37,99,235,0.15)", border: "1px solid rgba(59,130,246,0.35)",
                  color: "#60a5fa", fontSize: ".68rem", fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
                  transition: "all .2s",
                  animation: "msgIn .2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(37,99,235,0.28)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(37,99,235,0.15)"}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
                scroll to top
              </button>
            )}

          <div ref={msgListRef} style={{
            flex: 1, overflowY: "auto", padding: "1rem",
            display: "flex", flexDirection: "column", gap: ".6rem",
            scrollBehavior: "smooth",
            background: "radial-gradient(ellipse 60% 50% at 10% 20%,rgba(37,99,235,0.07),transparent), radial-gradient(ellipse 50% 60% at 90% 80%,rgba(139,92,246,0.06),transparent)",
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
                    ? { background: "linear-gradient(135deg,#1d4ed8,#2563eb,#1e40af)", color: "#fff", fontWeight: 500, boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }
                    : { background: "linear-gradient(135deg,#071828,#0a1e35)", border: "1px solid rgba(37,99,235,0.2)", color: "#cbd5e1", boxShadow: "inset 0 1px 0 rgba(59,130,246,0.06)" }
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
                <div style={{ fontSize: ".6rem", color: "#334155", textAlign: msg.role === "user" ? "right" : "left" }}>
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
          </div>{/* end message list wrapper */}

          {/* INPUT AREA */}
          <div style={{
            padding: ".7rem .85rem", borderTop: "1px solid rgba(37,99,235,0.2)",
            display: "flex", gap: ".5rem", alignItems: "flex-end",
            background: "rgba(2,12,27,0.95)",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything about our services…"
              rows={1}
              style={{
                flex: 1, background: "rgba(5,18,40,0.8)", border: "1px solid rgba(37,99,235,0.2)",
                borderRadius: ".75rem", padding: ".52rem .82rem",
                fontSize: ".82rem", color: "#e2e8f0", fontFamily: "inherit",
                outline: "none", resize: "none", minHeight: 36, maxHeight: 88,
                lineHeight: 1.5, transition: "border-color .2s, box-shadow .2s",
              }}
              onFocus={e => { e.target.style.borderColor = "rgba(59,130,246,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(37,99,235,0.2)"; e.target.style.boxShadow = "none"; }}
              onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 88) + "px"; }}
            />

            <button
              onClick={() => handleSend()}
              disabled={isTyping}
              style={{
                width: 36, height: 36, borderRadius: ".6rem",
                background: input.trim() ? "linear-gradient(135deg,#1d4ed8,#3b82f6)" : "rgba(5,18,40,0.8)",
                border: input.trim() ? "none" : "1px solid rgba(37,99,235,0.2)",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background .2s, transform .2s, box-shadow .2s", flexShrink: 0,
                boxShadow: input.trim() ? "0 4px 14px rgba(37,99,235,0.4)" : "none",
              }}
              onMouseDown={e => { if (input.trim()) e.currentTarget.style.transform = "scale(.92)"; }}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Send size={15} color={input.trim() ? "#fff" : "#334155"} />
            </button>

              {/* Refresh / clear chat */}
            <button
              title="Clear chat"
              onClick={() => {
                setMessages([]);
                setInitialized(false);
                sessionStorage.removeItem("wdc_msgs");
                sessionStorage.removeItem("wdc_init");
                setTimeout(() => {
                  addBotMessage(WELCOME.answer, null, WELCOME.chips, false);
                  setInitialized(true);
                }, 300);
              }}
               style={{
                width: 36, height: 36, borderRadius: ".6rem",
                background: "rgba(5,18,40,0.8)", border: "1px solid rgba(37,99,235,0.2)",
                color: "#334155", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background .2s, transform .2s, color .2s, border-color .2s", flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,.12)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(5,18,40,0.8)"; e.currentTarget.style.color = "#334155"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)"; }}
            >
              {/* Refresh icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          </div>
          <div style={{ padding: ".35rem 1rem .55rem", fontSize: ".63rem", color: "#334155", textAlign: "center" }}>
            Powered by WeDoClever AI · Vasavi MPM Mall, 7th Floor - 806 , Ameerpet, Hyderbad - 900016
          </div>
        </div>
      )}
    </>
  );
}