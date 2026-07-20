import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

// ── Ghost Crab Eye Zone — naturalistic, no glow ───────────────────────────────
interface EyeZoneProps {
  xPercent: number
  bottomPx: number
  spread: number
  delay?: number
}

function CrabEyeZone({ xPercent, bottomPx, spread, delay = 0 }: EyeZoneProps) {
  const [risen, setRisen] = useState(false)
  const [trackX, setTrackX] = useState(0.5)
  const [trackY, setTrackY] = useState(0.5)
  const [blink, setBlink] = useState(false)
  const zoneRef = useRef<HTMLDivElement>(null)
  const retractTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blinkTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const riseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRisen = useRef(false)

  const startBlink = () => {
    blinkTimer.current = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 120)
    }, 3600 + Math.random() * 600)
  }

  const stopBlink = () => {
    if (blinkTimer.current) clearInterval(blinkTimer.current)
    setBlink(false)
  }

  const onMouseMove = useCallback((e: MouseEvent) => {
    const zoneEl = zoneRef.current
    if (!zoneEl) return
    const rect = zoneEl.getBoundingClientRect()
    const zoneX = rect.left + rect.width / 2
    const zoneY = rect.top + rect.height / 2
    const dx = e.clientX - zoneX
    const dy = e.clientY - zoneY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < spread + 18) {
      if (retractTimer.current) clearTimeout(retractTimer.current)
      if (!isRisen.current) {
        riseTimer.current = setTimeout(() => {
          isRisen.current = true
          setRisen(true)
          startBlink()
        }, delay)
      }
      // Track with subtle limit
      const tx = Math.max(0, Math.min(1, 0.5 + (e.clientX - zoneX) / (spread * 1.5)))
      const ty = Math.max(0, Math.min(1, 0.5 + (e.clientY - zoneY) / (spread * 1.5)))
      setTrackX(tx)
      setTrackY(ty)
    } else {
      if (riseTimer.current) clearTimeout(riseTimer.current)
      if (isRisen.current) {
        retractTimer.current = setTimeout(() => {
          isRisen.current = false
          setRisen(false)
          stopBlink()
        }, 60) // super fast retract
      }
    }
  }, [spread, delay])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      stopBlink()
      if (retractTimer.current) clearTimeout(retractTimer.current)
      if (riseTimer.current) clearTimeout(riseTimer.current)
    }
  }, [onMouseMove])

  // Ghost crab stalked eye: sandy/translucent body, dark tip
  const pupilDx = (trackX - 0.5) * 2.5
  const pupilDy = (trackY - 0.5) * 1.5

  return (
    <div
      ref={zoneRef}
      className="absolute pointer-events-none select-none"
      style={{
        left: `${xPercent}%`,
        bottom: `${bottomPx}px`,
        transform: 'translateX(-50%)',
        zIndex: 8,
        width: 40,
      }}
    >
      <div className="flex gap-[7px] justify-center">
        {[0, 1].map(i => (
          <motion.div
            key={i}
            animate={{
              y: risen ? 0 : 10,
              opacity: risen ? 1 : 0,
              scaleY: blink ? 0.08 : 1,
            }}
            transition={{
              y: { type: 'spring', stiffness: 420, damping: 28, delay: i * 0.03 },
              opacity: { duration: risen ? 0.08 : 0.06 },
              scaleY: { duration: 0.06 },
            }}
            style={{
              width: 5,
              height: 13,
              position: 'relative',
              transformOrigin: 'bottom center',
            }}
          >
            {/* Stalk — semi-translucent sandy */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: 3, height: 9,
              background: 'linear-gradient(180deg, rgba(195,165,120,0.9) 0%, rgba(165,130,90,0.95) 100%)',
              borderRadius: '2px 2px 1px 1px',
            }} />
            {/* Dark eye tip */}
            <div style={{
              position: 'absolute',
              top: 0, left: '50%',
              transform: `translateX(calc(-50% + ${pupilDx}px)) translateY(${pupilDy}px)`,
              width: 5, height: 5,
              borderRadius: '50%',
              background: '#0e0906',
              boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
              transition: 'transform 0.08s ease-out',
            }} />
          </motion.div>
        ))}
      </div>
      {/* Tiny sand mound at base */}
      <div style={{
        width: 16, height: 4,
        margin: '1px auto 0',
        borderRadius: '50%',
        background: 'rgba(140,110,70,0.5)',
        filter: 'blur(1px)',
        opacity: risen ? 0.7 : 0,
        transition: 'opacity 0.12s',
      }} />
    </div>
  )
}

// ── Stars ─────────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 150 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 55,
  r: Math.random() > 0.9 ? 2 : 1,
  dur: 2.5 + Math.random() * 3.5,
  delay: Math.random() * 5,
  peak: 0.35 + Math.random() * 0.35,
}))

// ── Campfire ──────────────────────────────────────────────────────────────────
function Campfire() {
  return (
    <div className="absolute bottom-[82px] left-1/2 -translate-x-1/2 z-10" style={{ width: 56, height: 60 }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 130, height: 44,
        background: 'radial-gradient(ellipse, rgba(232,128,74,0.28) 0%, transparent 70%)',
        filter: 'blur(10px)',
      }} />
      <svg viewBox="0 0 56 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 2 }}>
        <ellipse cx="28" cy="52" rx="20" ry="6" fill="#3a2208" />
        <rect x="10" y="48" width="36" height="6" rx="3" fill="#4a2e10" />
        <motion.path
          d="M28 10 C20 20 14 32 18 44 C22 50 34 50 38 44 C42 32 36 20 28 10Z"
          fill="url(#flameGrad)"
          animate={{ scaleX: [1, 1.07, 0.95, 1.04, 1], scaleY: [1, 0.97, 1.04, 0.98, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '28px 44px' }}
        />
        <motion.path
          d="M28 22 C23 30 21 38 24 44 C26 47 30 47 32 44 C35 38 33 30 28 22Z"
          fill="url(#flameInner)"
          animate={{ scaleX: [1, 1.11, 0.91, 1.07, 1], scaleY: [1, 0.95, 1.05, 0.96, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }}
          style={{ transformOrigin: '28px 44px' }}
        />
        <defs>
          <linearGradient id="flameGrad" x1="28" y1="10" x2="28" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8804A" />
            <stop offset="60%" stopColor="#D4A832" />
            <stop offset="100%" stopColor="#E85020" />
          </linearGradient>
          <linearGradient id="flameInner" x1="28" y1="22" x2="28" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff8e0" />
            <stop offset="100%" stopColor="#E8804A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// ── 15–18 eye zones spread across beach sections ──────────────────────────────
const EYE_ZONES: EyeZoneProps[] = [
  { xPercent: 4,  bottomPx: 78, spread: 50 },
  { xPercent: 10, bottomPx: 72, spread: 55, delay: 40 },
  { xPercent: 17, bottomPx: 84, spread: 50, delay: 20 },
  { xPercent: 22, bottomPx: 66, spread: 52 },
  { xPercent: 29, bottomPx: 76, spread: 50, delay: 30 },
  { xPercent: 35, bottomPx: 70, spread: 48, delay: 15 },
  { xPercent: 40, bottomPx: 80, spread: 45 },
  { xPercent: 46, bottomPx: 65, spread: 42, delay: 50 }, // near campfire, subtle
  { xPercent: 55, bottomPx: 68, spread: 44, delay: 35 },
  { xPercent: 61, bottomPx: 78, spread: 50 },
  { xPercent: 67, bottomPx: 72, spread: 52, delay: 20 },
  { xPercent: 73, bottomPx: 84, spread: 50, delay: 45 },
  { xPercent: 79, bottomPx: 70, spread: 55 },
  { xPercent: 85, bottomPx: 78, spread: 57, delay: 25 },
  { xPercent: 91, bottomPx: 82, spread: 50 },
  { xPercent: 96, bottomPx: 74, spread: 48, delay: 30 },
]

// ── Sand grain speckles — fixed positions, well below the dune line ───────────
const SAND_GRAIN: { x: number; y: number; rx: number; ry: number; fill: string }[] = [
  { x: 115, y: 82, rx: 3, ry: 2, fill: 'rgba(95,72,35,0.45)' },
  { x: 230, y: 62, rx: 2, ry: 1, fill: 'rgba(82,62,28,0.35)' },
  { x: 331, y: 91, rx: 4, ry: 2, fill: 'rgba(105,80,38,0.4)' },
  { x: 446, y: 72, rx: 2, ry: 1, fill: 'rgba(90,68,30,0.3)' },
  { x: 547, y: 86, rx: 3, ry: 2, fill: 'rgba(100,76,36,0.38)' },
  { x: 648, y: 67, rx: 2, ry: 1, fill: 'rgba(85,65,28,0.32)' },
  { x: 749, y: 93, rx: 4, ry: 2, fill: 'rgba(110,84,40,0.42)' },
  { x: 864, y: 60, rx: 2, ry: 1, fill: 'rgba(88,68,30,0.3)' },
  { x: 965, y: 82, rx: 3, ry: 2, fill: 'rgba(98,74,35,0.38)' },
  { x: 1066, y: 70, rx: 2, ry: 1, fill: 'rgba(84,64,28,0.32)' },
  { x: 1166, y: 89, rx: 4, ry: 2, fill: 'rgba(108,82,38,0.4)' },
  { x: 1267, y: 64, rx: 2, ry: 1, fill: 'rgba(86,66,29,0.3)' },
  { x: 1339, y: 84, rx: 3, ry: 2, fill: 'rgba(102,78,36,0.36)' },
]

// Dune silhouette top edge — gentle, natural, same bezier + preserveAspectRatio="none"
// technique as the hill layers above it. 1440-wide viewBox, ~120 tall.
const SAND_DUNE_D =
  'M0,20 C200,8 340,26 520,16 C700,6 860,22 1040,12 C1160,6 1300,18 1440,14 L1440,120 L0,120 Z'

// ── Shoreline wave SVG ─────────────────────────────────────────────────────────
function ShorelineWaves() {
  return (
    <div className="absolute z-3 w-full" style={{ bottom: 84, pointerEvents: 'none' }}>
      {/* Wave 1 — furthest, faintest */}
      <motion.svg
        viewBox="0 0 1440 28" className="absolute w-full" preserveAspectRatio="none"
        style={{ bottom: 28 }}
        animate={{ x: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0,14 C80,6 160,22 240,14 C320,6 400,22 480,14 C560,6 640,22 720,14 C800,6 880,22 960,14 C1040,6 1120,22 1200,14 C1280,6 1360,22 1440,14 L1440,28 L0,28Z"
          fill="rgba(58,110,145,0.18)"
        />
      </motion.svg>
      {/* Wave 2 — nearer, slightly stronger */}
      <motion.svg
        viewBox="0 0 1440 22" className="absolute w-full" preserveAspectRatio="none"
        style={{ bottom: 14 }}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <path
          d="M0,11 C90,4 180,18 270,11 C360,4 450,18 540,11 C630,4 720,18 810,11 C900,4 990,18 1080,11 C1170,4 1260,18 1350,11 C1400,7 1430,14 1440,11 L1440,22 L0,22Z"
          fill="rgba(48,95,128,0.22)"
        />
      </motion.svg>
      {/* Foam line */}
      <motion.svg
        viewBox="0 0 1440 10" className="absolute w-full" preserveAspectRatio="none"
        style={{ bottom: 6 }}
        animate={{ opacity: [0.4, 0.8, 0.4], x: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <path
          d="M0,5 C120,1 240,9 360,5 C480,1 600,9 720,5 C840,1 960,9 1080,5 C1200,1 1320,9 1440,5"
          stroke="rgba(200,220,235,0.35)" strokeWidth="1.5" fill="none"
        />
      </motion.svg>
    </div>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const parallaxRef = useRef<{ clouds: HTMLDivElement | null; hills: HTMLDivElement | null }>({ clouds: null, hills: null })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      if (parallaxRef.current.clouds) {
        gsap.to(parallaxRef.current.clouds, { x: cx * 18, y: cy * 6, duration: 0.9, ease: 'power1.out' })
      }
      if (parallaxRef.current.hills) {
        gsap.to(parallaxRef.current.hills, { x: cx * 8, duration: 0.6, ease: 'power1.out' })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06091a 0%, #0b1326 22%, #111e3a 42%, #182844 60%, #1e3448 76%, #264050 88%, #2a4048 94%, #2e3e3c 100%)' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 z-0">
        {STARS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
            animate={{ opacity: [0.08, s.peak, 0.08] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          top: 'calc(8% - 40px)', right: 'calc(10% - 40px)',
          width: 144, height: 144,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248,240,220,0.22) 0%, transparent 70%)',
          filter: 'blur(6px)',
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute z-0" style={{
        top: '8%', right: '10%',
        width: 64, height: 64,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #f8f0dc, #e8d8b0)',
        boxShadow: '0 0 60px rgba(248,240,220,0.3), 0 0 120px rgba(248,240,220,0.12), 0 0 200px rgba(248,240,220,0.06)',
      }} />

      {/* Atmospheric clouds (parallax) */}
      <div ref={el => { parallaxRef.current.clouds = el }} className="absolute z-0 w-full" style={{ top: '18%' }}>
        {[
          { left: '5%', w: 220, op: 0.055, blur: 30 },
          { left: '38%', w: 300, op: 0.038, blur: 40 },
          { left: '70%', w: 180, op: 0.045, blur: 25 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', left: c.left,
            width: c.w, height: c.w * 0.35,
            borderRadius: '50%',
            background: 'rgba(180,200,220,1)',
            opacity: c.op, filter: `blur(${c.blur}px)`,
          }} />
        ))}
      </div>

      {/* Ocean glow */}
      <div className="absolute" style={{
        bottom: '28%', left: '50%', transform: 'translateX(-50%)',
        width: '85%', height: 100,
        background: 'radial-gradient(ellipse, rgba(48,100,140,0.28) 0%, transparent 70%)',
        filter: 'blur(24px)', zIndex: 1,
      }} />

      {/* Hill layers (parallax) */}
      <div ref={el => { parallaxRef.current.hills = el }} className="absolute bottom-0 left-0 right-0" style={{ zIndex: 2, willChange: 'transform' }}>
        {/* Far dark hill */}
        <svg viewBox="0 0 1440 300" className="absolute bottom-16 w-full" preserveAspectRatio="none">
          <path d="M0,200 C200,120 400,240 600,160 C800,80 1000,200 1200,140 C1350,100 1400,160 1440,150 L1440,300 L0,300Z"
            fill="rgba(18,30,22,0.92)" />
        </svg>
        {/* Mid hill */}
        <svg viewBox="0 0 1440 260" className="absolute bottom-12 w-full" preserveAspectRatio="none">
          <path d="M0,160 C120,100 280,200 480,140 C680,80 880,180 1060,120 C1220,70 1360,150 1440,130 L1440,260 L0,260Z"
            fill="rgba(15,25,18,0.97)" />
        </svg>

        {/* Sand base — one SVG, dune-shaped, all texture layers share the same clip */}
        <svg
          viewBox="0 0 1440 120" className="absolute bottom-0 w-full" style={{ height: 120 }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sandBaseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(38,28,14,1)" />
              <stop offset="35%" stopColor="rgba(54,40,18,1)" />
              <stop offset="70%" stopColor="rgba(68,50,22,1)" />
              <stop offset="100%" stopColor="rgba(76,56,24,1)" />
            </linearGradient>
            <linearGradient id="sandHighlightGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(96,72,32,0)" />
              <stop offset="15%" stopColor="rgba(96,72,32,0.12)" />
              <stop offset="30%" stopColor="rgba(96,72,32,0)" />
              <stop offset="50%" stopColor="rgba(88,66,28,0.08)" />
              <stop offset="65%" stopColor="rgba(88,66,28,0)" />
              <stop offset="80%" stopColor="rgba(100,76,34,0.1)" />
              <stop offset="100%" stopColor="rgba(100,76,34,0)" />
            </linearGradient>
            <linearGradient id="sandWetGradient" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(28,20,8,0)" />
              <stop offset="45%" stopColor="rgba(28,20,8,0.7)" />
              <stop offset="100%" stopColor="rgba(28,20,8,0)" />
            </linearGradient>
            <clipPath id="duneClip">
              <path d={SAND_DUNE_D} />
            </clipPath>
          </defs>

          {/* Deep sand — dune-shaped base fill */}
          <path d={SAND_DUNE_D} fill="url(#sandBaseGradient)" />

          {/* Everything below shares the dune clip so it moves as one silhouette */}
          <g clipPath="url(#duneClip)">
            {/* Sand grain texture */}
            <g opacity={0.8}>
              {SAND_GRAIN.map((g, i) => (
                <ellipse key={i} cx={g.x} cy={g.y} rx={g.rx} ry={g.ry} fill={g.fill} />
              ))}
            </g>
            {/* Sand surface highlights */}
            <rect x={0} y={0} width={1440} height={120} fill="url(#sandHighlightGradient)" />
            {/* Wet sand near waterline — darker band hugging the dune edge */}
            <rect x={0} y={0} width={1440} height={48} fill="url(#sandWetGradient)" />
          </g>
        </svg>
      </div>

      {/* Shoreline waves */}
      <ShorelineWaves />

      {/* Campfire */}
      <Campfire />

      {/* Campfire ground glow */}
      <div style={{
        position: 'absolute', bottom: 62, left: '50%', transform: 'translateX(-50%)',
        width: 210, height: 65,
        background: 'radial-gradient(ellipse, rgba(232,128,74,0.28) 0%, transparent 70%)',
        filter: 'blur(14px)', zIndex: 9, pointerEvents: 'none',
      }} />

      {/* Ghost crab eyes */}
      {EYE_ZONES.map((zone, i) => (
        <CrabEyeZone key={i} {...zone} />
      ))}

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="font-mono-code text-[11px] mb-8"
          style={{ color: 'rgba(140,165,185,0.7)', textTransform: 'uppercase' }}
        >
          a new quest begins
        </motion.p>

        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-center leading-none"
            style={{
              fontSize: 'clamp(56px, 10vw, 120px)',
              color: '#F0954F',
              textShadow: '0 0 15px rgba(232,128,74,0.2)',
            }}
          >
            Hey
          </motion.h1>
        </div>
        <div className="overflow-hidden relative">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-center leading-none relative"
            style={{
              fontSize: 'clamp(48px, 9vw, 110px)',
              color: '#fbf8f2',
              textShadow: '0 0 12px rgba(255,255,255,0.08)',
            }}
          >
            {/* TODO: replace with your name if "Ish" isn't how you want it displayed */}
            I'm Anishq
            
          </motion.h1>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.65 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-14 flex flex-col items-center gap-3 group"
          style={{ cursor: 'none', background: 'none', border: 'none' }}
        >
          <span
             className="font-mono-code text-[14px] tracking-widest uppercase group-hover:text-[#E8804A] transition-colors duration-200"
            style={{ color: 'rgba(180,160,130,0.6)' }}
          >
            venture forth
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M5 11l5 5 5-5" stroke="rgba(232,128,74,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Grain + vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(4,6,14,0.35) 100%)' }}
      />

      {/* Floating ambient particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2, height: 2,
            background: '#D4A832',
            left: `${12 + i * 14}%`,
            bottom: `${22 + (i % 3) * 8}%`,
            opacity: 0.35,
          }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 2.8 + i * 0.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
        />
      ))}
    </section>
  )
}
