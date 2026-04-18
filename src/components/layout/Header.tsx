import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { asset } from '@/lib/asset'

const navLinks = [
  { href: '/#products', label: 'Packs' },
  { href: '/drop-room', label: 'Drop Room' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10, 6, 18, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={asset('assets/logo.png')}
            alt="OGAccount.de"
            className="h-8 w-auto"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <span
            className="font-display text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            OGA<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/#products"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: 'var(--accent-primary)',
              color: '#fff',
              boxShadow: '0 0 16px rgba(176, 38, 255, 0.4)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent-hot)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(255, 0, 212, 0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--accent-primary)'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(176, 38, 255, 0.4)'
            }}
          >
            Jetzt kaufen
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
          style={{ color: 'var(--text-primary)' }}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className="block h-0.5 transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              className="block h-0.5 transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10, 6, 18, 0.98)', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <nav className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium py-2"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#products"
                className="mt-2 text-center px-4 py-3 rounded-lg text-sm font-semibold"
                style={{ background: 'var(--accent-primary)', color: '#fff' }}
                onClick={() => setMenuOpen(false)}
              >
                Jetzt kaufen
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
