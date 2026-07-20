import { motion } from 'framer-motion'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/anishq-bhiogade',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:anishq.bhiogade776@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/AnishqBhiogade',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/yourname',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/anishq___',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
]

// Campfire icon for footer center
function FooterFlame() {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="flex justify-center mb-8"
    >
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
        <ellipse cx="18" cy="40" rx="14" ry="4" fill="rgba(232,128,74,0.25)"/>
        <rect x="8" y="36" width="20" height="4" rx="2" fill="#3a2010"/>
        <motion.path
          d="M18 6 C12 14 9 24 12 34 C14 38 22 38 24 34 C27 24 24 14 18 6Z"
          fill="url(#fFootGrad)"
          animate={{ scaleX: [1, 1.06, 0.96, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '18px 34px' }}
        />
        <motion.path
          d="M18 14 C15 20 14 28 16 34 C17 36 19 36 20 34 C22 28 21 20 18 14Z"
          fill="url(#fFootInner)"
          animate={{ scaleX: [1, 1.1, 0.92, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          style={{ transformOrigin: '18px 34px' }}
        />
        <defs>
          <linearGradient id="fFootGrad" x1="18" y1="6" x2="18" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8804A"/>
            <stop offset="70%" stopColor="#D4A832"/>
            <stop offset="100%" stopColor="#E85020"/>
          </linearGradient>
          <linearGradient id="fFootInner" x1="18" y1="14" x2="18" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff8e0"/>
            <stop offset="100%" stopColor="#E8804A" stopOpacity="0.7"/>
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 text-center"
      style={{ background: 'linear-gradient(180deg, #06080f 0%, #08090f 100%)' }}
    >
      {/* Top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(232,128,74,0.2) 30%, rgba(212,168,50,0.2) 70%, transparent)',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 200,
        background: 'radial-gradient(ellipse, rgba(232,128,74,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <FooterFlame />

      {/* Social links */}
      <div className="flex justify-center gap-5 mb-10">
        {SOCIAL_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            title={link.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3, color: '#E8804A' }}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(180,165,140,0.7)',
              cursor: 'auto',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(232,128,74,0.1)'
              e.currentTarget.style.borderColor = 'rgba(232,128,74,0.3)'
              e.currentTarget.style.color = '#E8804A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(180,165,140,0.7)'
            }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Tagline */}
      <p className="font-body text-sm mb-2" style={{ color: 'rgba(140,125,105,0.6)' }}>
        the journey continues.
      </p>
      <p className="font-mono-code text-[10px]" style={{ color: 'rgba(100,90,75,0.5)' }}>
        © {new Date().getFullYear()} Anishq Bhiogade. All rights reserved.
      </p>
    </footer>
  )
}
