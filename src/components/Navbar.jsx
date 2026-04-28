import { useState, useEffect, useRef } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import gsap from "gsap"
// import logo from "../assets/logo.webp"
import logo from "../assets/image.png"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  // transparent only on home + not scrolled
  const isTransparent = isHome && !scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", handleScroll)

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    // { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <>
      {/* Keyframes for glow shimmer */}
      <style>{`
        @keyframes navShimmer {
          0%   { background-position: -200% center }
          100% { background-position:  200% center }
        }
        @keyframes borderGlow {
          0%,100% { opacity: .4 }
          50%      { opacity: 1 }
        }
        .nav-link-glow:hover {
          text-shadow: 0 0 12px rgba(59,130,246,0.9), 0 0 24px rgba(59,130,246,0.4);
        }
      `}</style>

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isTransparent
            ? "bg-transparent py-2"
            : "bg-[#020617]/90 backdrop-blur-xl"
        }`}
      >
        {/* Glowing bottom border — whenever bg is visible */}
        {!isTransparent && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.8) 30%, rgba(99,179,250,1) 50%, rgba(37,99,235,0.8) 70%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "navShimmer 3s linear infinite",
          }} />
        )}

        {/* Subtle dark-blue inner glow when bg is visible */}
        {!isTransparent && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 100% at 50% -20%, rgba(37,99,235,0.12), transparent)",
          }} />
        )}

        <div className=" mx-auto px-6 py-4 flex items-center justify-between relative z-10">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <div 
            style={{
              // width: 42, height: 42, borderRadius: 12,
              // background: "linear-gradient(135deg, #1d4ed8, #2563eb, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              // boxShadow: "0 0 18px rgba(37,99,235,0.6), 0 0 40px rgba(37,99,235,0.2)",
              transition: "box-shadow .3s ease",
            }}
              // onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 28px rgba(37,99,235,0.9), 0 0 60px rgba(37,99,235,0.35)"}
              // onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 18px rgba(37,99,235,0.6), 0 0 40px rgba(37,99,235,0.2)"}
            >
              {/* <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" />
                <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.55" />
                <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.55" />
                <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" />
              </svg> */}
              <img src={logo} alt="WeDoClever Logo" className="h-15 text-center" />
            </div>
            {/* <span className="font-syne font-bold text-xl text-white">
              WeDo{" "}
              <span style={{
                background: "linear-gradient(90deg, #60a5fa, #38bdf8, #818cf8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))",
              }}>
                Clever
              </span>
            </span> */}
          </Link>

          

          {/* ── CTA Button ── */}
          <div className="hidden md:flex items-center gap-4">
            {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="nav-link-glow"
                style={({ isActive }) => ({
                  fontSize: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#60a5fa" : "rgba(203,213,225,0.85)",
                  position: "relative",
                  transition: "color .25s, text-shadow .25s",
                  textDecoration: "none",
                  textShadow: isActive ? "0 0 12px rgba(96,165,250,0.8)" : "none",
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* Underline */}
                    <span style={{
                      position: "absolute", bottom: -4, left: 0,
                      height: 2, borderRadius: 4,
                      width: isActive ? "100%" : "0%",
                      background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                      boxShadow: isActive ? "0 0 8px rgba(37,99,235,0.8)" : "none",
                      transition: "width .3s ease",
                    }} className="link-underline" />
                  </>
                )}
              </NavLink>
            ))}
          </div>
            <Link
              to="/contact"
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1d4ed8, #2563eb, #0ea5e9)",
                backgroundSize: "200% 200%",
                boxShadow: "0 0 20px rgba(37,99,235,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow .3s ease, transform .2s ease",
                display: "flex", alignItems: "center",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 0 32px rgba(37,99,235,0.8), 0 0 60px rgba(37,99,235,0.3)"
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(37,99,235,0.5), 0 2px 8px rgba(0,0,0,0.3)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              Get Started
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="md:hidden z-50 p-2 rounded-lg transition-colors text-slate-200"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100vh",
            background: "linear-gradient(160deg, #020617 0%, #0a1628 50%, #020617 100%)",
            transition: "transform .45s cubic-bezier(.77,0,.18,1)",
            transform: open ? "translateY(0)" : "translateY(-100%)",
            display: "flex", flexDirection: "column", paddingTop: "5.5rem",
            paddingLeft: "1.5rem", paddingRight: "1.5rem", gap: "0.5rem",
            zIndex: 40,
          }}
        >
          {/* Blue glow blobs */}
          <div style={{
            position: "absolute", top: "20%", left: "10%",
            width: 200, height: 200,
            background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "20%", right: "10%",
            width: 200, height: 200,
            background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)",
            pointerEvents: "none",
          }} />

          {links.map((link, idx) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "2.25rem",
                lineHeight: 1.25,
                letterSpacing: "-0.04em",
                textDecoration: "none",
                padding: "0.5rem 0",
                color: isActive ? "transparent" : "rgba(226,232,240,0.85)",
                background: isActive
                  ? "linear-gradient(90deg,#60a5fa,#38bdf8,#818cf8)"
                  : "none",
                backgroundClip: isActive ? "text" : "initial",
                WebkitBackgroundClip: isActive ? "text" : "initial",
                WebkitTextFillColor: isActive ? "transparent" : "initial",
                filter: isActive ? "drop-shadow(0 0 10px rgba(96,165,250,0.7))" : "none",
                transition: `all .3s ease ${idx * 60}ms`,
                position: "relative", zIndex: 1,
              })}
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #1d4ed8, #2563eb, #0ea5e9)",
              color: "#fff",
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(37,99,235,0.5)",
              position: "relative", zIndex: 1,
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>
    </>
  )
}
