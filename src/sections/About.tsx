import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  'Java', 'HTML', 'Python', 'CSS', 'React', 'TypeScript',
  'JavaScript', 'REST APIs', 'MongoDB',
  'C++', 'AI', 
]

// ── Photo card ────────────────────────────────────────────────────────────────
function ProfileImage() {
  const [hovered, setHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 50, y: 50 })
  const rafRef = useRef<number | null>(null)

  // Trail the mask toward the cursor position each frame instead of
  // snapping to it, so the reveal feels fluid rather than mechanical.
  useEffect(() => {
    const tick = () => {
      setCursor(prev => {
        const dx = targetRef.current.x - prev.x
        const dy = targetRef.current.y - prev.y
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return prev
        return { x: prev.x + dx * 0.15, y: prev.y + dy * 0.15 }
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }

  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 1200], [0, -40])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden"
      style={{
        width: '100%',
        aspectRatio: '4/5',
        borderRadius: 14,
        boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 6px 20px rgba(0,0,0,0.35)',
        cursor: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <img
          src="/photo-real.jpg"
          alt="Ish"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.06)' }}
        />
      </motion.div>

      {/* Pixel art reveal */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/photo-pixel1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          imageRendering: 'pixelated',
          opacity: hovered ? 1 : 0,
          maskImage: hovered
            ? `radial-gradient(circle 140px at ${cursor.x}% ${cursor.y}%, black 0%, transparent 100%)`
            : 'none',
          WebkitMaskImage: hovered
            ? `radial-gradient(circle 140px at ${cursor.x}% ${cursor.y}%, black 0%, transparent 100%)`
            : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      <div className="absolute inset-0 z-20 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
      }} />

      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: 'inset 0 0 50px rgba(232,128,74,0.12)',
          border: '1px solid rgba(232,128,74,0.18)',
          borderRadius: 14,
        }}
      />

      {/* Name overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-5 py-4"
        style={{ background: 'linear-gradient(0deg, rgba(8,9,15,0.9) 0%, transparent 100%)' }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display font-bold text-lg text-white leading-tight">{/* TODO: replace with your name */}Anishq</p>
            <p className="font-mono-code text-[9px] tracking-widest mt-0.5" style={{ color: '#D4A832' }}>EXPLORER</p>
          </div>
          <span className="font-mono-code text-xs" style={{ color: '#E8804A' }}>Lv. 20</span>
        </div>
      </div>
    </div>
  )
}

// ── Skills ─────────────────────────────────────────────────────────────────────
function SkillsGrid({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {SKILLS.map((skill, i) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          className="skill-tag"
          style={{ fontSize: 12, padding: '4px 11px' }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  )
}

// ── Social icons row (inline, compact) ───────────────────────────────────────
const SOCIALS = [
  {
    label: 'LinkedIn', href: 'https://linkedin.com/in/anishq-bhiogade',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
  },
  {
    label: 'Email', href: 'mailto:anishq.bhiogade776@gmail.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
  },
  {
    label: 'GitHub', href: 'https://github.com/AnishqBhiogade',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
  },
  
  {
    label: 'X', href: 'https://x.com/yourname',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l6 7.5L4 20h2l4.8-6.5L15 20h5l-6.3-8L19 4h-2l-4.5 6L9 4z"/></svg>
  },
  {
    label: 'Instagram', href: 'https://instagram.com/yourname',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
  },
]

// ── Premium right card with luxury tilt ─────────────────────────────────────
function RightCard({ inView }: { inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  // 0–1
    const y = (e.clientY - rect.top) / rect.height   // 0–1

    // Luxury tilt: top-right corner comes inward, bottom-left rises
    // Very subtle — max ±2.5deg, small translation
    const rotateY = (x - 0.5) * 3.5     // left=-1.75deg, right=+1.75deg
    const rotateX = -(y - 0.5) * 2.5    // top=+1.25deg, bottom=-1.25deg

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.25,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'linear-gradient(145deg, rgba(24,30,50,0.98) 0%, rgba(16,20,36,0.99) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        cursor: 'none',
      }}
    >
      {/* Card inner — all sections unified */}
      <div className="p-5 lg:p-6 flex flex-col gap-4">

        {/* Bio */}
        <div className="space-y-3">
          <p className="font-body leading-relaxed text-[15px]" style={{ color: 'rgba(232,224,213,0.82)' }}>
            Hi, I'm{' '}
            <span className="font-semibold text-white">Anishq Bhiogade</span>, currently graduating from{' '}
            <span className="font-semibold" style={{ color: '#E8804A' }}> Dr. D.Y.Patil College of Engineering and Innovation</span>
            , where I study{' '}
            <span className="font-semibold text-white">Computer Engineering</span>.
          </p>
          <p className="font-body leading-relaxed text-[15px]" style={{ color: 'rgba(232,224,213,0.65)' }}>
            I love building things and exploring new ideas. I'm a{' '}
            <span className="font-semibold text-white">generalist</span>{' '}
            who enjoys working and contributing to various ideas, turning problems into products,
            and constantly experimenting with new technologies.
          </p>

          {/* BITS badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg"
            style={{ background: 'rgba(232,128,74,0.07)', border: '1px solid rgba(232,128,74,0.15)' }}>
            <span style={{ fontSize: 13 }}>🎓</span>
            <span className="font-mono-code text-[10px] tracking-wide" style={{ color: '#D4A832' }}>
              DYPCOEI 2024–2028
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* Skills */}
        <div className="space-y-3">
          <p className="section-eyebrow text-[10px]">skills</p>
          <SkillsGrid inView={inView} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* Connect row */}
        <div className="space-y-3">
          <p className="section-eyebrow text-[10px]">connect</p>
          <div className="flex items-center gap-2 flex-wrap">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                className="flex items-center justify-center rounded-lg transition-all duration-150"
                style={{
                  width: 36, height: 36,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(200,188,170,0.7)',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(232,128,74,0.12)'
                  el.style.borderColor = 'rgba(232,128,74,0.3)'
                  el.style.color = '#E8804A'
                  gsap.to(el, { y: -2, duration: 0.15, ease: 'power2.out' })
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.05)'
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.color = 'rgba(200,188,170,0.7)'
                  gsap.to(el, { y: 0, duration: 0.2, ease: 'power2.out' })
                }}
              >
                {s.icon}
              </a>
            ))}

            {/* Resume CTA */}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono-code text-[10px] tracking-widest uppercase transition-all duration-150"
              style={{
                background: 'rgba(232,128,74,0.12)',
                border: '1px solid rgba(232,128,74,0.25)',
                color: '#E8804A',
                cursor: 'none',
                letterSpacing: '0.12em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(232,128,74,0.2)'
                e.currentTarget.style.borderColor = 'rgba(232,128,74,0.45)'
                gsap.to(e.currentTarget, { y: -2, duration: 0.15, ease: 'power2.out' })
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(232,128,74,0.12)'
                e.currentTarget.style.borderColor = 'rgba(232,128,74,0.25)'
                gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: 'power2.out' })
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 1h5l3 3v7H2V1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              Resume
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* Interests */}
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {['Loves discussions', 'Loves travelling', 'Loves playing sports'].map(t => (
            <span key={t} className="font-body text-[13px]" style={{ color: 'rgba(160,145,120,0.65)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle inner glow top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(232,128,74,0.2) 40%, rgba(212,168,50,0.15) 60%, transparent)',
        borderRadius: '18px 18px 0 0',
      }} />
    </motion.div>
  )
}

// ── Main About ─────────────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section
      id="about"
      ref={ref}
      className="relative lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
      style={{
        background: 'linear-gradient(180deg, #0d1117 0%, #111520 100%)',
        // Aim for viewport-height efficiency: py scales down on larger screens
        paddingTop: 'clamp(32px, 4vh, 56px)',
        paddingBottom: 'clamp(32px, 4vh, 56px)',
      }}
    >
      {/* Top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(232,128,74,0.18) 30%, rgba(212,168,50,0.18) 70%, transparent)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section heading — more compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 lg:mb-6"
        >
          <p className="section-eyebrow mb-1.5">about</p>
          <h2
            className="font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#f0ece4' }}
          >
            Character Sheet
          </h2>
        </motion.div>

        {/* Content: 47% image / 53% card — tighter proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-[47fr_53fr] gap-8 lg:gap-12 items-start">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start"
            style={{ maxWidth: 360 }}
          >
            <ProfileImage />
          </motion.div>

          {/* Right — Premium unified card */}
          <div className="relative">
            <RightCard inView={inView} />
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(212,168,50,0.12) 50%, transparent)',
      }} />
    </section>
  )
}
