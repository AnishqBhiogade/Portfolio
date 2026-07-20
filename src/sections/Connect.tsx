import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface SocialCard {
  label: string
  sublabel: string
  cta: string
  href: string
  icon: React.ReactNode
  glowColor: string
  ctaColor: string
}

// ── SVG icons ──────────────────────────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="#0A66C2"/>
    <path d="M7 10.5h2.8V21H7V10.5ZM8.4 9.4A1.4 1.4 0 1 1 8.4 6.6a1.4 1.4 0 0 1 0 2.8ZM12.2 10.5h2.7v1.4h.04c.38-.72 1.3-1.47 2.68-1.47 2.87 0 3.4 1.89 3.4 4.34V21h-2.8v-5.65c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V21h-2.8V10.5Z" fill="white"/>
  </svg>
)

const GithubIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#e8e0d5' }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(232,128,74,0.15)" stroke="rgba(232,128,74,0.3)" strokeWidth="1"/>
    <path d="M5 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z" stroke="#E8804A" strokeWidth="1.5"/>
    <path d="M5 9l9 7 9-7" stroke="#E8804A" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(255,255,255,0.08)"/>
    <path d="M7 7l5.5 7.5L7 21h2l4.2-5.7L17 21h4l-5.8-7.8L21 7h-2l-3.9 5.3L11 7H7Z" fill="#e8e0d5"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <defs>
      <linearGradient id="igGrad" x1="0" y1="28" x2="28" y2="0">
        <stop offset="0%" stopColor="#f9ce34"/>
        <stop offset="33%" stopColor="#ee2a7b"/>
        <stop offset="66%" stopColor="#9b11ad"/>
        <stop offset="100%" stopColor="#5851db"/>
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="7" fill="url(#igGrad)"/>
    <rect x="7" y="7" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5"/>
    <circle cx="14" cy="14" r="4" stroke="white" strokeWidth="1.5"/>
    <circle cx="19" cy="9" r="1" fill="white"/>
  </svg>
)

const ResumeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(212,168,50,0.15)" stroke="rgba(212,168,50,0.3)" strokeWidth="1"/>
    <path d="M9 5h6l4 4v14H9V5Z" stroke="#D4A832" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M15 5v4h4" stroke="#D4A832" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 13h4M12 16h4M12 19h2" stroke="#D4A832" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const CARDS: SocialCard[] = [
  {
    label: 'Resume',
    sublabel: 'Full adventure log.',
    cta: 'LOOT →',
    href: '#',
    icon: <ResumeIcon />,
    glowColor: 'rgba(212,168,50,0.25)',
    ctaColor: '#D4A832',
  },
  {
    label: 'LinkedIn',
    sublabel: 'Join the party.',
    cta: 'CONNECT →',
    href: 'https://linkedin.com/in/anishq-bhiogade',
    icon: <LinkedInIcon />,
    glowColor: 'rgba(10,102,194,0.3)',
    ctaColor: '#0A66C2',
  },
  {
    label: 'Email',
    sublabel: 'Send a raven.',
    cta: 'MESSAGE →',
    href: 'mailto:anishq.bhiogade776@gmail.com',
    icon: <EmailIcon />,
    glowColor: 'rgba(232,128,74,0.25)',
    ctaColor: '#E8804A',
  },
  {
    label: 'GitHub',
    sublabel: 'Read the scrolls.',
    cta: 'EXPLORE →',
    href: 'https://github.com/AnishqBhiogade',
    icon: <GithubIcon />,
    glowColor: 'rgba(255,255,255,0.12)',
    ctaColor: '#e8e0d5',
  },
  {
    label: 'Instagram',
    sublabel: 'Eavesdropping ',
    cta: 'FOLLOW →',
    href: 'https://instagram.com/anishq___',
    icon: <InstagramIcon />,
    glowColor: 'rgba(238,42,123,0.2)',
    ctaColor: '#ee2a7b',
  },
]

function Card({ card, index }: { card: SocialCard; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <motion.a
      ref={ref}
      href={card.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-4 p-6 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.97)',
        border: '1px solid',
        borderColor: hovered ? card.ctaColor + '60' : 'rgba(220,210,195,0.6)',
        boxShadow: hovered
          ? `0 20px 60px ${card.glowColor}, 0 4px 20px rgba(0,0,0,0.1)`
          : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        width: 168,
        minHeight: 200,
        cursor: 'none',
        textDecoration: 'none',
      }}
    >
      {/* Platform glow behind icon */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          top: 20, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 60,
          background: card.glowColor,
          filter: 'blur(16px)',
        }}
      />

      <div className="relative z-10">{card.icon}</div>

      <div className="text-center relative z-10">
        <p className="font-display font-bold text-base" style={{ color: '#1a1008' }}>
          {card.label}
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: '#8a7060' }}>
          {card.sublabel}
        </p>
      </div>

      <span
        className="font-mono-code text-[10px] tracking-widest relative z-10 transition-colors duration-300"
        style={{ color: hovered ? card.ctaColor : '#a08060' }}
      >
        {card.cta}
      </span>
    </motion.a>
  )
}

export default function Connect() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="connect"
      ref={ref}
      className="relative py-16 lg:py-20"
      style={{
        background: 'linear-gradient(180deg, #e8dcc0 0%, #f0e6cc 40%, #f5eed8 100%)',
      }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(180,140,80,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(140,100,60,0.06) 0%, transparent 50%)',
        }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <p className="font-mono-code text-[11px] tracking-widest uppercase mb-3" style={{ color: '#b07840' }}>
            treasure found
          </p>
          <h2 className="font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)', color: '#2a1808' }}>
            Let's Connect
          </h2>
          <p className="font-body text-lg mt-3" style={{ color: '#7a6040' }}>
            take what you need, 
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {CARDS.map((card, i) => (
            <Card key={card.label} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
