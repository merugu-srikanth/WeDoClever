import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"

const Facebook = ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
const Twitter = ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
const Linkedin = ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
const Instagram = ({size=18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0f172a] text-gray-300 py-16 relative overflow-hidden border-t border-blue-900/50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl point-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" />
                  <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.5" />
                  <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.5" />
                  <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" />
                </svg>
              </div>
              <span className="font-syne font-bold text-xl text-white">
                WeDo <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Clever</span>
              </span>
            </Link>
            <p className="text-sm font-dm leading-relaxed text-gray-400">
              Delivering end-to-end software consulting and development. We help enterprises scale with efficiency and modern tech.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><Linkedin size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 font-dm text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Services</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Projects</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Services</h4>
            <ul className="space-y-4 font-dm text-sm">
              {[
                "Web Development",
                "Mobile Applications",
                "Digital Marketing",
                "UI/UX Design",
                "Cloud Architecture",
              ].map((svc) => (
                <li key={svc} className="flex items-center justify-between group">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{svc}</span>
                  <Link
                    to={`/contact?service=${encodeURIComponent(svc)}`}
                    className="text-blue-500 hover:text-blue-300 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  >
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 font-dm text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-400 shrink-0" size={18} />
                <span>Vasavi MPM Mall, 7th Floor - 806 , <br/> Ameerpet, Hyderbad - 900016 </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-400 shrink-0" size={18} />
                <a href="tel:+19454445648" className="hover:text-blue-400">+91 9110572323</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-400 shrink-0" size={18} />
                <a href="mailto:wedocleverone@gmail.com" className="hover:text-blue-400">wedocleverone@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-4 font-dm text-xs text-gray-500">
          <p>© {currentYear} WeDo Clever IT Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
