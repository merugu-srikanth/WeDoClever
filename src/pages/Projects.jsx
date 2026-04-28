import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SEO from "../components/SEO"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projectsData = [
  { id: 1, title: "Fintech Dashboard UI", category: "Web", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "HealthCare App Mobile", category: "Mobile", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Enterprise ERP System", category: "SaaS", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "E-Commerce Rebuild", category: "Web", img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Logistics Tracker API", category: "SaaS", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Crypto Wallet Wallet", category: "Mobile", img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800" }
]

export default function Projects() {
  const container = useRef(null)
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Web", "Mobile", "SaaS"]

  const filteredProjects = filter === "All" ? projectsData : projectsData.filter(p => p.category === filter)

  useGSAP(() => {
    gsap.fromTo('.heading', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
  }, { scope: container })

  // Trigger re-animation when filter changes
  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card')
    gsap.fromTo(cards,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)", clearProps: 'all' }
    )
  }, { scope: container, dependencies: [filter] })

  return (
    <div ref={container} className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <SEO title="Our Projects" description="View our portfolio of digital products, mobile applications, and enterprise SaaS systems." />
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="heading flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
               <span className="w-2 h-2 rounded-full bg-cyan-500 box-glow" />
               <span className="text-xs font-dm font-bold text-cyan-600 uppercase tracking-[0.15em]">Portfolio</span>
            </div>
            <h1 className="font-syne font-black text-5xl md:text-6xl text-gray-900 tracking-tight">
              Our <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Best Work</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-syne font-bold text-sm transition-all duration-300 ${
                  filter === cat 
                  ? "bg-blue-600 text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)]" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card group relative rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] transition-all duration-500 border border-gray-100 cursor-pointer">
              
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 relative bg-white">
                <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-300 z-20">
                  <ExternalLink size={20} />
                </div>
                
                <span className="text-xs font-syne font-bold text-blue-600 uppercase tracking-widest block mb-2">{project.category}</span>
                <h3 className="font-syne font-bold text-2xl text-gray-900">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
