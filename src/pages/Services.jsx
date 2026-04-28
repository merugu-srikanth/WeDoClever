import { useRef } from "react"
import { MonitorSmartphone, CloudCog, Code2, DatabaseZap, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SEO from "../components/SEO"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const container = useRef(null)

  useGSAP(() => {
    // Header reveal
    gsap.fromTo('.heading', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )

    // Services stagger
    const cards = gsap.utils.toArray('.service-card')
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: {
          trigger: '.services-grid',
          start: "top 80%",
        }
      }
    )
  }, { scope: container })

  return (
    <div ref={container} className="pt-32 pb-24 bg-white min-h-screen">
      <SEO title="Our Services" description="Explore our premium software development and consulting services." />
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20 heading">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-6">
             <span className="w-2 h-2 rounded-full bg-blue-500 box-glow" />
             <span className="text-xs font-dm font-bold text-blue-600 uppercase tracking-[0.15em]">What We Do</span>
          </div>
          <h1 className="font-syne font-black text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight">
            Premium <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">Digital Solutions</span>
          </h1>
          <p className="text-lg text-gray-500 font-dm leading-relaxed">
            Full-spectrum software expertise — from early strategy through to post-launch support and scaling.
            We construct digital experiences that perform flawlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 services-grid">
          {[
            {
              icon: <MonitorSmartphone size={32} strokeWidth={1.5} className="text-blue-600" />,
              title: "Application Development",
              desc: "Customised web and mobile solutions engineered to reduce cost, accelerate delivery, and maximise ROI. We focus on scalable architecture and seamless user experience.",
              tags: ["React", "React Native", "Next.js", "Node.js"]
            },
            {
              icon: <CloudCog size={32} strokeWidth={1.5} className="text-cyan-500" />,
              title: "DevOps Implementation",
              desc: "Build robust CI/CD pipelines, containerise workloads, and establish cross-team workflows that accelerate delivery and ensure system reliability.",
              tags: ["Docker", "Kubernetes", "AWS", "CI/CD"]
            },
            {
              icon: <DatabaseZap size={32} strokeWidth={1.5} className="text-purple-500" />,
              title: "Software Product Development",
              desc: "Turn your vision into a scalable SaaS or cloud-native product with end-to-end development expertise from MVP to enterprise release.",
              tags: ["SaaS Architecture", "MVP", "Product Strategy"]
            },
            {
              icon: <Code2 size={32} strokeWidth={1.5} className="text-pink-500" />,
              title: "Development Re-Engineering",
              desc: "Modernise legacy systems, introduce agile practices, and dramatically improve developer velocity by eliminating technical debt.",
              tags: ["Code Refactoring", "Legacy Migration", "Agile"]
            }
          ].map((srv, idx) => (
            <div key={idx} className="service-card group relative bg-white rounded-[2rem] p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden cursor-pointer">
              
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500">
                    {srv.icon}
                  </div>
                  <span className="font-syne font-black text-6xl text-gray-50 opacity-50 group-hover:text-blue-100 transition-colors">0{idx + 1}</span>
                </div>
                
                <h3 className="font-syne font-bold text-2xl text-gray-900 mb-4">{srv.title}</h3>
                <p className="font-dm text-gray-500 leading-relaxed mb-8 flex-grow">{srv.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {srv.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-syne font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-blue-600 font-syne font-bold text-sm uppercase tracking-wider group/link">
                  Learn More 
                  <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rv bg-gradient-to-br from-[#0f172a] to-blue-900 rounded-[2rem] p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h4 className="font-syne font-black text-3xl text-white mb-4">Ready to accelerate your digital transformation?</h4>
            <p className="text-blue-100 font-dm leading-relaxed">Let's discuss how our services can align perfectly with your business goals and scale your success.</p>
          </div>
          
          <button className="relative z-10 shrink-0 px-8 py-4 rounded-full bg-white text-blue-900 font-syne font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300">
            Consult With Us
          </button>
        </div>

      </div>
    </div>
  )
}
