import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Globe, Smartphone, ShoppingCart, Code2,
  Users, BarChart3, Search, ArrowRight
} from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SEO from "../components/SEO"

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    id: "01",
    Icon: Globe,
    title: "Web  Development",
    caption: "Your digital storefront, perfected.",
    desc: "Modern, responsive websites that captivate audiences from first click to conversion — pixel-perfect design, blazing performance, and purposeful UX that drives real results.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    gradient: "from-blue-600 to-cyan-500",
    glow: "rgba(37,99,235,0.4)",
    accent: "text-cyan-400",
    border: "border-blue-500/20"
  },
  {
    id: "02",
    Icon: Smartphone,
    title: "Mobile App Development",
    caption: "Your business, always in their pocket.",
    desc: "High-performance iOS and Android apps with native-like fluidity — built for scale, optimised for engagement, designed to delight on every tap.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    gradient: "from-violet-600 to-purple-500",
    glow: "rgba(124,58,237,0.4)",
    accent: "text-violet-400",
    border: "border-violet-500/20"
  },
  {
    id: "03",
    Icon: ShoppingCart,
    title: "E-Commerce Solutions",
    caption: "Sell more. Manage less. Scale fearlessly.",
    desc: "Conversion-optimised stores with frictionless checkout, smart inventory management, and payment integrations that turn casual browsers into loyal buyers.",
    tags: ["Shopify", "WooCommerce", "Stripe", "Custom Builds"],
    gradient: "from-emerald-600 to-teal-500",
    glow: "rgba(5,150,105,0.4)",
    accent: "text-emerald-400",
    border: "border-emerald-500/20"
  },
  {
    id: "04",
    Icon: Code2,
    title: "Custom Software Development",
    caption: "Engineered exactly for you — no compromises.",
    desc: "Bespoke applications that eliminate bottlenecks, automate workflows, and unlock operational efficiency tailored precisely to your unique processes.",
    tags: ["Node.js", "Python", "PostgreSQL", "Microservices"],
    gradient: "from-rose-600 to-pink-500",
    glow: "rgba(225,29,72,0.4)",
    accent: "text-rose-400",
    border: "border-rose-500/20"
  },
  {
    id: "05",
    Icon: Users,
    title: "CRM Solutions",
    caption: "Every customer, remembered and valued.",
    desc: "Intelligent CRM systems that centralise client data, automate follow-ups, and give your sales team a decisive edge from first touch to close.",
    tags: ["Salesforce", "HubSpot", "Custom CRM", "Automation"],
    gradient: "from-orange-600 to-amber-500",
    glow: "rgba(234,88,12,0.4)",
    accent: "text-orange-400",
    border: "border-orange-500/20"
  },
  {
    id: "06",
    Icon: BarChart3,
    title: "ERP Solutions",
    caption: "One platform. Every department. Total clarity.",
    desc: "Enterprise resource planning that unifies finance, HR, supply chain, and operations into one intelligent system — eliminating silos and driving faster decisions.",
    tags: ["SAP", "Custom ERP", "Integration", "Analytics"],
    gradient: "from-cyan-600 to-sky-500",
    glow: "rgba(8,145,178,0.4)",
    accent: "text-sky-400",
    border: "border-cyan-500/20"
  },
  {
    id: "07",
    Icon: Search,
    title: "SEO Services",
    caption: "Be found. Be chosen. Stay ahead.",
    desc: "Data-driven SEO strategies that elevate your rankings, attract high-intent organic traffic, and build durable digital authority your competitors cannot match.",
    tags: ["Technical SEO", "Content Strategy", "Analytics", "Link Building"],
    gradient: "from-yellow-500 to-amber-400",
    glow: "rgba(202,138,4,0.4)",
    accent: "text-yellow-400",
    border: "border-yellow-500/20"
  }
]

export default function Services() {
  const container = useRef(null)

  /* ── 3-D card tilt on mouse move ── */
  useEffect(() => {
    const cards = container.current?.querySelectorAll(".svc-card") ?? []
    const cleanup = []

    cards.forEach((card) => {
      card.style.transformStyle = "preserve-3d"

      const onMove = (e) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.45, ease: "power2.out" })
      }
      const onLeave = () =>
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" })

      card.addEventListener("mousemove",  onMove)
      card.addEventListener("mouseleave", onLeave)
      cleanup.push({ card, onMove, onLeave })
    })

    return () => cleanup.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener("mousemove",  onMove)
      card.removeEventListener("mouseleave", onLeave)
    })
  }, [])

  useGSAP(() => {
    /* ── Pre-set initial states to prevent flash ── */
    gsap.set(".svc-card",  { y: 70, opacity: 0, scale: 0.93 })
    gsap.set(".tag-chip",  { y: 14, opacity: 0 })
    gsap.set(".disc-btn",  { scale: 0.8, opacity: 0 })
    gsap.set(".cta-block", { y: 60, opacity: 0 })

    /* ── Floating background orbs (continuous) ── */
    gsap.to(".orb-a", { x:  60, y: -50, duration:  9, ease: "sine.inOut", repeat: -1, yoyo: true })
    gsap.to(".orb-b", { x: -70, y:  60, duration: 11, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 })
    gsap.to(".orb-c", { x:  45, y:  70, duration: 13, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 4 })
    gsap.to(".orb-d", { x: -40, y: -55, duration: 10, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1 })

    /* ── Header stagger ── */
    const hdr = gsap.timeline()
    hdr.fromTo(".svc-badge", { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
       .fromTo(".svc-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }, "-=0.5")
       .fromTo(".svc-sub",   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6")

    /* ── Service cards — independent tweens (smoother than chained timelines) ── */
    gsap.utils.toArray(".svc-card").forEach((card, i) => {
      const col  = i % 2
      const tags = card.querySelectorAll(".tag-chip")
      const btn  = card.querySelector(".disc-btn")
      const st   = { trigger: card, start: "top 88%", once: true, fastScrollEnd: true }

      gsap.to(card, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.75, delay: col * 0.1, ease: "power3.out",
        scrollTrigger: st,
        clearProps: "scale"
      })

      gsap.to(tags, {
        y: 0, opacity: 1,
        duration: 0.32, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 84%", once: true, fastScrollEnd: true }
      })

      gsap.to(btn, {
        scale: 1, opacity: 1,
        duration: 0.38, ease: "back.out(1.6)",
        scrollTrigger: { trigger: card, start: "top 82%", once: true, fastScrollEnd: true }
      })
    })

    /* ── CTA block ── */
    gsap.to(".cta-block", {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".cta-block", start: "top 85%", once: true, fastScrollEnd: true }
    })

    /* ensure triggers recalculate after layout is fully painted */
    ScrollTrigger.refresh()
  }, { scope: container })

  return (
    <div
      ref={container}
      className="relative pt-32 pb-28 min-h-screen bg-[#030712] overflow-hidden"
    >
      <SEO
        title="Our Services"
        description="Explore our full suite of digital solutions — web, mobile, ERP, CRM, SEO and more."
      />

      {/* ── Floating gradient orbs ── */}
      <div className="orb-a absolute -top-32 -left-56 w-[700px] h-[700px] rounded-full bg-blue-600/20   blur-[150px] pointer-events-none" />
      <div className="orb-b absolute top-1/2  -right-64 w-[620px] h-[620px] rounded-full bg-violet-600/15 blur-[130px] pointer-events-none" />
      <div className="orb-c absolute bottom-40 left-1/4  w-[520px] h-[520px] rounded-full bg-cyan-500/10   blur-[110px] pointer-events-none" />
      <div className="orb-d absolute top-1/3  right-1/4  w-[420px] h-[420px] rounded-full bg-rose-500/10   blur-[100px] pointer-events-none" />

      {/* dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="svc-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-dm font-bold text-blue-400 uppercase tracking-[0.18em]">What We Do</span>
          </div>
          <h1 className="svc-title font-syne font-black text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="svc-sub text-lg text-gray-400 font-dm leading-relaxed">
            Explore the full suite of digital solutions we deliver — built for performance,
            scale, and lasting business impact.
          </p>
        </div>

        {/* ── 2-column card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className={`svc-card group relative rounded-[1.5rem] overflow-hidden border ${srv.border} bg-[#0d1117]/80 backdrop-blur-md cursor-pointer transition-shadow duration-500`}
              style={{ willChange: "transform, opacity" }}
            >
              {/* glow ring on hover */}
              <div
                className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 55px ${srv.glow}` }}
              />

              {/* ── Top gradient panel ── */}
              <div className={`card-top relative h-44 bg-gradient-to-br ${srv.gradient} overflow-hidden`}>
                <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-black/15" />
                <div className="absolute top-4 left-5 w-14 h-14 rounded-full bg-white/5" />
                <span className="absolute bottom-3 right-5 font-syne font-black text-[5.5rem] leading-none text-white/[0.08] select-none">
                  {srv.id}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 shadow-xl">
                    <srv.Icon size={30} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="p-7">
                <p className={`font-dm text-[0.67rem] font-bold uppercase tracking-[0.22em] ${srv.accent} mb-2`}>
                  {srv.caption}
                </p>
                <h3 className="font-syne font-bold text-[1.18rem] text-white mb-3 leading-snug">
                  {srv.title}
                </h3>
                <p className="font-dm text-gray-400 text-sm leading-relaxed mb-5">
                  {srv.desc}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {srv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-chip px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-syne font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* discover button */}
                <Link
                  to="/contact"
                  className={`disc-btn group/btn flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r ${srv.gradient} text-white font-syne font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300`}
                >
                  Discover
                  <ArrowRight
                    size={13}
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>

              {/* shimmer overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[1.5rem]" />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="cta-block relative mt-20 rounded-[2rem] p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-blue-950 rounded-[2rem]" />
          <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h4 className="font-syne font-black text-3xl text-white mb-4">
                Ready to accelerate your digital transformation?
              </h4>
              <p className="text-blue-200 font-dm leading-relaxed">
                Let's discuss how our services can align perfectly with your business goals and scale your success.
              </p>
            </div>
            <button className="shrink-0 px-8 py-4 rounded-full bg-white text-blue-900 font-syne font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300">
             Lets Build
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
