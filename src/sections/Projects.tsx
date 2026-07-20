import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'

interface Project {
  name: string
  description: string
  tags: string[]
  link?: string
  demo?: string
  thumbnail?: string
  accent: string
}

const PROJECTS: Project[] = [
  {
    name: 'Stopwatch Web Application',
    description: 'An interactive and user-friendly stopwatch built using HTML, CSS, and JavaScript. This app allows you to start, pause, reset, and record lap times with precision.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/AnishqBhiogade/PRODIGY_WD_02.git',
    thumbnail: '/stopwatch.png',
    accent: '#E8804A',
  },
  {
    name: 'WeatherForecast – Real-Time Weather App',
    description: 'Weatherforecast is a lightweight, responsive web application that allows users to get real-time weather information based on their current location or by entering a city manually.',
    tags: ['HTML', 'CSS', 'Javascript',],
    link: 'https://github.com/AnishqBhiogade/PRODIGY_WD_05.git',
    thumbnail: '/emojis-about-the-weather-png.png',
    accent: '#D4A832',
  },
  {
    name: 'Tic-Tac-Toe Web App',
    description: 'A simple and interactive Tic-Tac-Toe game built with HTML, CSS, and JavaScript. The application allows two players to play against each other or challenge an AI opponent. It features intuitive UI, responsive design, and real-time game logic to detect wins, losses, or draws.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/AnishqBhiogade/PRODIGY_WD_03.git',
    thumbnail: '/tictactoe.png',
    accent: '#4AA8C8',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, rotate: 0 }}
      className="relative group"
    >
      <div
        className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, rgba(22,28,46,0.95) 0%, rgba(14,18,32,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.boxShadow = `0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(${project.accent === '#E8804A' ? '232,128,74' : project.accent === '#D4A832' ? '212,168,50' : '74,168,200'},0.2)`
          el.style.borderColor = `rgba(${project.accent === '#E8804A' ? '232,128,74' : project.accent === '#D4A832' ? '212,168,50' : '74,168,200'},0.25)`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
          el.style.borderColor = 'rgba(255,255,255,0.07)'
        }}
      >
        {/* Ambient top glow matching accent */}
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)` }} />

        {/* Large background accent — subtle */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accent}12 0%, transparent 70%)` }} />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              {/* Thumbnail or icon */}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-lg" style={{ background: project.accent, opacity: 0.6 }} />
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-white leading-tight">{project.name}</h3>
                <div className="flex gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="rounded-sm"
                      style={{ width: 8, height: 4, background: i < 4 ? project.accent : 'rgba(255,255,255,0.1)', opacity: i < 4 ? 0.8 : 1 }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 flex-shrink-0">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-body text-xs font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(232,224,213,0.8)',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `rgba(${project.accent === '#E8804A' ? '232,128,74' : '212,168,50'},0.12)`
                    e.currentTarget.style.borderColor = `${project.accent}50`
                    e.currentTarget.style.color = project.accent
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(232,224,213,0.8)'
                  }}
                >
                  <ExternalLink size={12} /> Link
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-body text-xs font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(232,224,213,0.8)',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(232,224,213,0.8)'
                  }}
                >
                  <Play size={12} /> Demo
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-base leading-relaxed mb-6"
            style={{ color: 'rgba(200,188,170,0.75)' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag}
                className="font-mono-code text-[10px] px-3 py-1.5 rounded-md tracking-wide"
                style={{
                  background: `${project.accent}12`,
                  border: `1px solid ${project.accent}28`,
                  color: project.accent,
                  opacity: 0.85,
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="relative py-28 lg:py-36"
      style={{
        background: 'linear-gradient(180deg, #0a0d16 0%, #0d1020 40%, #0a0c18 100%)',
      }}>

      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '15%', left: '-10%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,128,74,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-8%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,50,0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="section-eyebrow mb-3">quest log</p>
          <h2 className="font-display font-extrabold leading-none mb-4"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)', color: '#f0ece4' }}>
            Projects
          </h2>
          <p className="font-body text-lg" style={{ color: 'rgba(180,165,140,0.65)' }}>
            legendary encounters conquered, each worth remembering.
          </p>
        </motion.div>

        {/* Card stack */}
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>

      {/* Top/bottom separators */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(232,128,74,0.15) 50%, transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(212,168,50,0.12) 50%, transparent)',
      }} />
    </section>
  )
}
