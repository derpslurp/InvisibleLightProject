import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const navLinks = [
  { label: 'Phenomenon', href: '#overview' },
  { label: 'Applications', href: '#applications' },
  { label: 'History', href: '#history' },
  { label: 'Physics', href: '#physics' },
  { label: 'Examples', href: '#examples' },
  { label: 'Citations', href: '#citations' },
]

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const progress = useScrollProgress()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 2.5),
    })
    lenisRef.current = lenis

    let frameId = 0
    const onFrame = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(onFrame)
    }

    frameId = requestAnimationFrame(onFrame)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target as HTMLElement, {
          offset: -24,
          duration: 0.75,
          easing: (t) => 1 - Math.pow(1 - t, 2.5),
        })
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-container">
          <motion.div
            className="brand"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="brand-mark spectrum-gradient" />
            <p>
              Invisible Light
              <span>Illuminating the unseen spectrum</span>
            </p>
          </motion.div>
          <nav className="site-nav">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleNavClick(link.href)}
                whileHover={{ y: -2, color: 'var(--color-visible)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </div>
        <div className="progress-indicator">
          <motion.div
            className="progress-bar spectrum-gradient"
            animate={{ width: `${Math.max(progress * 100, 2)}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
            aria-hidden="true"
          />
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-container">
          <p>
            Crafted for science exploration •{' '}
            <span className="spectrum-gradient footer-accent">Invisible Light Project</span>
          </p>
          <p className="footer-note">
            All visuals and content on this page are self-made for educational purposes. Experiments referenced are
            credited in the citations.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Layout

