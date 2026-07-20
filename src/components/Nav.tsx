import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = ['About', 'Projects', 'Connect']

export default function Nav() {
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = LINKS.map(l => l.toLowerCase())
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = ids.indexOf(e.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.3 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const getIndicatorFor = (idx: number) => {
    const btn = itemRefs.current[idx]
    if (!btn || !navRef.current) return null
    const navRect = navRef.current.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    return { left: btnRect.left - navRect.left, width: btnRect.width }
  }

  // Update indicator when active changes
  useEffect(() => {
    const style = getIndicatorFor(activeIndex)
    if (style) setIndicatorStyle(style)
  }, [activeIndex])

  const scrollTo = (id: string, idx: number) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActiveIndex(idx)
  }

  const handleHover = (idx: number) => {
    const style = getIndicatorFor(idx)
    if (style) setIndicatorStyle(style)
  }

  const handleLeave = () => {
    const style = getIndicatorFor(activeIndex)
    if (style) setIndicatorStyle(style)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 480, damping: 36 }}
          // True centering: fixed + left: 50% + translateX(-50%)
          style={{
            position: 'fixed',
            top: 20,
            left: '41%',
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
        >
          <div
            ref={navRef}
            className="relative flex items-center gap-1 px-2 py-2 rounded-full"
            style={{
              background: 'rgba(245,232,208,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(196,144,96,0.25)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Gliding active indicator */}
            {activeIndex >= 0 && (
              <motion.div
                className="absolute top-2 rounded-full"
                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                transition={{ type: 'spring', stiffness: 600, damping: 42 }}
                style={{
                  height: 'calc(100% - 16px)',
                  background: 'rgba(232,128,74,0.14)',
                  border: '1px solid rgba(232,128,74,0.28)',
                }}
              />
            )}

            {LINKS.map((link, i) => (
              <button
                key={link}
                ref={el => { itemRefs.current[i] = el }}
                onClick={() => scrollTo(link.toLowerCase(), i)}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={handleLeave}
                className="relative z-10 px-5 py-2 rounded-full font-display font-semibold text-sm transition-colors duration-150"
                style={{
                  color: activeIndex === i ? '#C05020' : '#4a3520',
                  cursor: 'none',
                  background: 'none',
                  border: 'none',
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
