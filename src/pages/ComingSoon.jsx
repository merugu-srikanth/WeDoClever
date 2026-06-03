import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <SEO
        title="Coming Soon"
        description="WeDoClever is launching soon with a fresh blue-themed page. Stay tuned for the update."
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),transparent_25%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-1/2 h-[420px] -mt-48 bg-gradient-to-r from-sky-500/20 via-blue-500/15 to-cyan-400/20 blur-3xl opacity-80 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 uppercase tracking-[0.24em] shadow-lg shadow-blue-500/5">
            Coming Soon
          </span>

          <h1 className="mt-8 text-4xl sm:text-6xl font-syne font-black tracking-tight text-white">
            We’re Building Something Brilliant.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A fresh experience is on the way — modern, faster, and crafted with bold blue energy. Check back soon, or return to the current site while we finish the update.
          </p>

          {/* <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 px-8 py-4 text-sm font-semibold text-slate-950 shadow-[0_20px_80px_rgba(59,130,246,0.22)] transition hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
            <a
              href="mailto:info@wedoclever.in"
              className="inline-flex items-center justify-center rounded-full border border-blue-400/40 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-blue-200 transition hover:bg-slate-800"
            >
              Notify Me
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}
