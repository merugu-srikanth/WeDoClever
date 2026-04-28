import { useRef, useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Phone, Mail, Clock, MapPin } from "lucide-react"
import SEO from "../components/SEO"

const WA_NUMBER = "919110572323"

const SERVICES = [
  "Web Development",
  "Mobile Applications",
  "Digital Marketing",
  "UI/UX Design",
  "Cloud Architecture",
  "Other / Not sure yet",
]

export default function Contact() {
  const container = useRef(null)
  const [searchParams] = useSearchParams()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // Pre-fill service from ?service= URL param (set by Footer links)
  useEffect(() => {
    const svc = searchParams.get("service")
    if (svc) setFormState(prev => ({ ...prev, service: svc }))
  }, [searchParams])

  useGSAP(() => {
    gsap.fromTo(".heading",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    gsap.fromTo(".contact-info",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    )
    gsap.fromTo(".contact-form",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    )
  }, { scope: container })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    const { name, email, phone, service, message } = formState

    // Build nicely formatted WhatsApp message
    const text = [
      `*🚀 New Enquiry — WeDoClever Website*`,
      ``,
      `👤 *Name:* ${name}`,
      `📧 *Email:* ${email}`,
      phone ? `📱 *Phone:* ${phone}` : null,
      service ? `🛠 *Service:* ${service}` : null,
      ``,
      `💬 *Message:*`,
      message,
      ``,
      `---`,
      `_Sent from wedocleverit.com_`,
    ]
      .filter(line => line !== null)
      .join("\n")

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

    setTimeout(() => {
      setSending(false)
      setSent(true)
      window.open(url, "_blank", "noopener,noreferrer")
    }, 800)
  }

  const contacts = [
    { icon: <Phone size={22} className="text-blue-400" />, label: "Call Us", value: "+91 8790526214", href: "tel:+918790526214" },
    { icon: <Phone size={22} className="text-blue-400" />, label: "Call Us", value: "+91 9110572323", href: "tel:+919110572323" },
    { icon: <Mail size={22} className="text-cyan-400" />, label: "Email Us", value: "info@wedoclever.in", href: "mailto:info@wedoclever.in" },
    // { icon: <Clock size={22} className="text-purple-400" />, label: "Business Hours", value: "Mon–Fri: 9:00 – 18:00 IST", href: null },
    { icon: <MapPin size={22} className="text-pink-400" />, label: "Address", value: "Vasavi MPM Mall, 7th Floor – 806, Ameerpet, Hyderabad – 500016", href: null },
  ]

  return (
    <div ref={container} className="pt-32 pb-24 bg-[#020617] min-h-screen relative overflow-hidden">
      <SEO
        title="Contact Us"
        description="Get in touch with WeDo Clever for custom web development, mobile app development, and digital marketing services."
      />

      {/* Background glows */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="heading text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-dm font-bold text-blue-400 uppercase tracking-[0.15em]">Get In Touch</span>
          </div>
          <h1 className="font-syne font-black text-5xl md:text-6xl text-slate-100 tracking-tight">
            Ready to Build{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Something Clever?
            </span>
          </h1>
          <p className="mt-4 text-slate-400 font-dm text-lg leading-relaxed">
            Fill the form — we'll open WhatsApp so you get a reply fast.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: contact info */}
          <div className="contact-info space-y-10">
            <div>
              <h3 className="font-syne font-bold text-3xl text-slate-100 mb-4">Let's start a conversation</h3>
              <p className="text-slate-400 font-dm leading-relaxed text-lg">
                Partner with us to navigate your next digital initiative — web, mobile, or marketing. We reply within 24 hours on business days.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contacts.map((item) => {
                const Wrapper = item.href ? "a" : "div"
                return (
                  <Wrapper
                    key={item.label}
                    {...(item.href ? { href: item.href } : {})}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-syne font-bold uppercase tracking-wider text-slate-500 mb-1">{item.label}</div>
                      <div className="text-sm font-dm font-medium text-slate-300 group-hover:text-blue-300 transition-colors leading-snug">{item.value}</div>
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-dm font-semibold text-sm hover:bg-green-500/20 hover:border-green-500/60 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat directly on WhatsApp
            </a>
          </div>

          {/* Right: Form */}
          <div className="contact-form bg-slate-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-blue-500/20 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-syne font-black text-slate-100 text-2xl mb-2">WhatsApp Opened! 🎉</p>
                  <p className="text-slate-400 font-dm text-sm leading-relaxed max-w-xs mx-auto">
                    Your message is ready in WhatsApp. Just hit send and we'll reply within a few hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSent(false); setFormState({ name:"", email:"", phone:"", service:"", message:"" }) }}
                  className="mt-2 text-xs text-slate-500 hover:text-blue-400 font-dm transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-syne font-black text-2xl text-slate-100 mb-1">Write to Us</h3>
                <p className="text-slate-400 text-sm mb-8 font-dm">
                  Fill the form — WhatsApp opens with your message pre-written. One tap to send.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name *</label>
                    <input
                      required
                      className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
                      placeholder="John Smith"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-2">Email *</label>
                      <input
                        required
                        type="email"
                        className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
                        placeholder="john@email.com"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-2">Service Interested In</label>
                    <select
                      className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300 appearance-none"
                      value={formState.service}
                      onChange={e => setFormState({ ...formState, service: e.target.value })}
                    >
                      <option value="" className="bg-slate-900 text-slate-400">Select a service…</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} className="bg-slate-900 text-slate-200">{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-syne font-bold uppercase tracking-widest text-slate-500 mb-2">Message *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-blue-500/20 text-slate-200 placeholder:text-slate-600 font-dm text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project…"
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 mt-1 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 text-white font-syne font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.01] active:scale-100 disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Opening WhatsApp…
                      </>
                    ) : (
                      <>
                        {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg> */}
                        Submit 
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-600 font-dm">
                    Clicking opens WhatsApp with your message pre-filled — just tap Send.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
