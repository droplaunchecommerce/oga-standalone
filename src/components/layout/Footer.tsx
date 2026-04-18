import { Link } from 'react-router-dom'
import { asset } from '@/lib/asset'

export default function Footer() {
  return (
    <footer
      className="mt-auto pt-12 pb-6 px-4"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={asset('assets/logo.png')} alt="OGAccount.de" className="h-7 w-auto"
              onError={e => { e.currentTarget.style.display = 'none' }} />
            <span className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              OGA<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </span>
          </Link>

          {/* Legal Links */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: 'var(--text-faint)' }}>
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link to="/widerruf" className="hover:text-white transition-colors">Widerruf</Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} OGAccount.de — Alle Rechte vorbehalten
          </p>
        </div>

        {/* Disclaimer */}
        <p
          className="mt-6 text-center text-xs leading-relaxed"
          style={{ color: 'var(--text-faint)' }}
        >
          OGAccount.de steht in keiner Verbindung zu Epic Games oder Fortnite.
          Alle genannten Markennamen dienen ausschließlich der Beschreibung des Stils.
        </p>
      </div>
    </footer>
  )
}
