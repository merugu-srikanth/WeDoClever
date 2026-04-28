import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SEO from "../components/SEO"
import { Play, TrendingUp, ShieldCheck, Clock, CheckCircle2, ChevronRight, BarChart, Server, Layout, Search } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const container = useRef(null)

  useGSAP(() => {
    // Reveal animation for sections
    const rvElements = gsap.utils.toArray('.rv')
    rvElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Staggered reveal for cards
    const cardGroups = gsap.utils.toArray('.card-group')
    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll('.card')
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, { scope: container })

  return (
    <div ref={container} className="bg-white">
      <SEO 
        title="Software Development & IT Consulting" 
        description="WeDo Clever helps enterprises plan, build, and scale software with innovative tech and premium consulting."
      />
      
      {/* ─────────────────────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden flex items-center pt-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white" />
        
        <div className="relative container mx-auto px-6 z-10 text-center lg:text-left pt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 border border-white/20 mb-8 mx-auto lg:mx-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse box-glow" />
            <span className="text-white/90 text-[10px] md:text-xs font-dm font-bold uppercase tracking-[0.2em]">IT Consulting & Software Development</span>
          </div>

          <h1 className="font-syne font-black uppercase text-white leading-[1.05] tracking-tighter">
            <span className="block text-[clamp(40px,5vw,90px)]">NEW ERA</span>
            <span className="block text-[clamp(44px,6vw,100px)] bg-gradient-to-r from-white via-blue-300 to-cyan-300 bg-clip-text text-transparent text-glow">
              OF DESIGN
            </span>
            <span className="block text-[clamp(40px,5vw,90px)] text-blue-400">STARTS NOW</span>
          </h1>

          <p className="mt-8 text-white/80 max-w-xl mx-auto lg:mx-0 text-base md:text-lg font-dm leading-relaxed">
            We help enterprises plan, build, and scale software that fits the way their business actually works — not the other way around.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <button className="px-10 py-4 rounded-full bg-white text-blue-900 font-syne font-bold text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-3 group">
              Start Project
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-dm text-sm font-medium group">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Play size={18} fill="currentColor" />
              </div>
              Watch Overview
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MARQUEE SECTION
      ───────────────────────────────────────────────────────────────────────────── */}
      <div className="py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 overflow-hidden shadow-[0_-10px_30px_rgba(37,99,235,0.2)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
             <div key={j} className="flex">
                {["Application Development", "Software Products", "DevOps", "Cloud Architecture", "Re-Engineering", "IT Consulting", "Digital Transformation"].map((item, idx) => (
                  <span key={idx} className="font-syne font-bold uppercase text-sm text-white flex items-center gap-4 px-8 tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-white/50 box-glow" />
                    {item}
                  </span>
                ))}
             </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          ABOUT SECTION
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 point-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Box */}
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 rv">
                <span className="w-2 h-2 rounded-full bg-blue-500 box-glow" />
                <span className="text-xs font-dm font-bold text-blue-600 uppercase tracking-wider">Who We Are</span>
              </div>
              <h2 className="font-syne font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-gray-900 mt-6 rv">
                IT Services & <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Development Company
                </span>
              </h2>
              <p className="text-gray-600 font-dm leading-relaxed mt-6 rv text-lg">
                At We Do Clever, we deliver end-to-end software consulting and development. We help enterprises plan,
                conceive, build, and scale software with the help of industry experts.
              </p>
              <div className="mt-8 flex items-center gap-4 rv">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={32} />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-gray-900 text-xl">100% Growth</h4>
                  <p className="font-dm text-sm text-gray-500">Measurable impact on client businesses.</p>
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 card-group">
              {[
                { icon: <Search className="text-blue-500" size={24}/>, title: "Financial Savings", desc: "Reduce overhead with optimised outsourcing models." },
                { icon: <Clock className="text-purple-500" size={24}/>, title: "Enhanced Productivity", desc: "Streamline workflows with smart automation." },
                { icon: <ShieldCheck className="text-emerald-500" size={24}/>, title: "Domain Expertise", desc: "Specialists from diverse domains at your service." },
                { icon: <BarChart className="text-orange-500" size={24}/>, title: "Accurate Analysis", desc: "Data-driven decisions grounded in real metrics." }
              ].map((card, idx) => (
                <div key={idx} className="card p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                    {card.icon}
                  </div>
                  <div className="font-syne font-bold text-gray-900 mb-2 text-lg">{card.title}</div>
                  <p className="text-sm text-gray-500 leading-relaxed font-dm">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          WHY US SECTION 
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50/50 relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto rv">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 box-glow" />
              <span className="text-xs font-dm font-bold text-cyan-600 uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="font-syne font-black text-4xl md:text-5xl mt-6 text-gray-900">
              The <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">WeDo Clever</span> Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 card-group">
            {[
              { title: "Multiple Domain Expertise", desc: "Proven expertise delivering custom solutions across diverse industries." },
              { title: "IP Rights Protection", desc: "We protect intellectual property with robust legal and technical protocols." },
              { title: "Seasoned Professionals", desc: "Battle-tested engineers with deep hands-on expertise." },
            ].map((item, idx) => (
              <div key={idx} className="card relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_10px_40px_rgba(37,99,235,0.08)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <CheckCircle2 size={40} strokeWidth={1.5} className="text-blue-500 group-hover:text-cyan-400 transition-colors" />
                  <span className="font-syne font-black text-6xl text-gray-50 opacity-50 group-hover:text-blue-50 transition-colors">0{idx + 1}</span>
                </div>
                <h3 className="font-syne font-bold text-gray-900 text-xl mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-dm relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
