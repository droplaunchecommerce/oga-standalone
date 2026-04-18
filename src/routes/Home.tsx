import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Key, Headphones, Check, Star, ArrowRight, ChevronDown, Package } from 'lucide-react'
import { products } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

// ─── Live Ticker ──────────────────────────────────────────────────────────────
const TICKS = [
  { name: 'Max K., Berlin',     product: 'Renegade Raider Pack' },
  { name: 'Leon S., München',   product: 'Triple OG Pack' },
  { name: 'Sarah M., Hamburg',  product: 'Aerial Assault Pack' },
  { name: 'Tim B., Wien',       product: 'Black Knight Pack' },
  { name: 'Julia H., Zürich',   product: 'Travis Scott Pack' },
  { name: 'Nico F., Frankfurt', product: 'OG Skull Pack' },
]

function LiveTicker() {
  return (
    <div className="flex items-center gap-3 overflow-hidden py-2">
      <span className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold"
        style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.25)', color: 'var(--success)' }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
        LIVE
      </span>
      <div className="flex-1 overflow-hidden">
        <motion.div className="flex gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          {[...TICKS, ...TICKS].map((t, i) => (
            <span key={i} className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{t.name}</span>
              {' '}hat{' '}
              <span style={{ color: 'var(--accent-primary)' }}>{t.product}</span>
              {' '}gekauft
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const PAYMENTS = [
  { src: '/assets/payments/paypal.png',    alt: 'PayPal' },
  { src: '/assets/payments/klarna.png',    alt: 'Klarna' },
  { src: '/assets/payments/visa.png',      alt: 'Visa' },
  { src: '/assets/payments/mastercard.png',alt: 'Mastercard' },
  { src: '/assets/payments/sepa.png',      alt: 'SEPA' },
  { src: '/assets/payments/applepay.png',  alt: 'Apple Pay' },
  { src: '/assets/payments/googlepay.png', alt: 'Google Pay' },
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      {/* Background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-1/4 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(160,32,240,0.18) 0%, transparent 60%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,199,0,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* ── Left: copy ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-7"
              style={{ background: 'rgba(0,230,118,0.07)', border: '1px solid rgba(0,230,118,0.2)', color: 'var(--success)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
              Vertrauenswürdiger Shop seit 2023 · 1.247+ Kunden
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: 'var(--text-primary)' }}>
              Seltene
              <br />
              <span className="text-gradient">OG Accounts.</span>
              <br />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.5em', fontWeight: 500 }}>
                Sofort. Sicher. Legendary.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--text-muted)' }}>
              Renegade Raider, Ghoul Trooper, Black Knight & mehr.
              Digitale Lieferung in unter 2 Minuten — direkt nach Zahlung.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8">
              <a href="#products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-base transition-all duration-200"
                style={{ background: 'var(--accent-primary)', color: '#fff', boxShadow: '0 0 28px rgba(160,32,240,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hot)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(224,0,192,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(160,32,240,0.5)' }}>
                <Zap className="w-5 h-5" />
                Packs entdecken
              </a>
              <Link to="/drop-room"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-base transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.12)', color: 'var(--text-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(160,32,240,0.5)'; e.currentTarget.style.background = 'rgba(160,32,240,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}>
                🎰 Drop Room
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
              <LiveTicker />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--text-faint)' }}>
                Sichere Zahlung
              </p>
              <div className="flex flex-wrap gap-2">
                {PAYMENTS.map(p => (
                  <div key={p.alt}
                    className="h-9 px-3 rounded-lg flex items-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <img src={p.src} alt={p.alt} className="h-4 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: hero skin ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
            className="relative flex items-center justify-center lg:justify-end">

            {/* Glow orb */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,199,0,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            </div>

            <div className="relative z-10 w-full max-w-xs sm:max-w-sm">
              {/* Main card */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,199,0,0.35)',
                  boxShadow: '0 0 60px rgba(255,199,0,0.12), 0 0 120px rgba(255,199,0,0.06), 0 40px 80px rgba(0,0,0,0.6)',
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <img
                  src="/assets/skins/renegade.png"
                  alt="Renegade Raider Pack"
                  className="w-full object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,5,15,0.95) 0%, rgba(8,5,15,0.3) 45%, transparent 70%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold tracking-widest uppercase mb-2"
                    style={{ color: '#ffd700', background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)' }}>
                    ★ Legendary
                  </span>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Renegade Raider Pack</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Der OG Klassiker</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs line-through mb-0.5" style={{ color: 'var(--text-faint)' }}>199,99 €</p>
                      <p className="font-display font-bold text-2xl text-gradient-gold">149,99 €</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating: Sofort-Lieferung */}
              <motion.div
                className="absolute -top-4 -right-4 sm:-right-6 px-3 py-2 rounded-xl text-xs font-mono font-bold"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.3)', color: 'var(--accent-cyan)', backdropFilter: 'blur(12px)' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
                ⚡ Sofort-Lieferung
              </motion.div>

              {/* Floating: Kunden */}
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-left-6 px-3 py-2 rounded-xl text-xs font-mono"
                style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.3)', color: 'var(--success)', backdropFilter: 'blur(12px)' }}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                <span className="font-bold">1.247+</span> zufriedene Kunden
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ color: 'var(--text-faint)' }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Products ─────────────────────────────────────────────────────────────────
function ProductsSection() {
  return (
    <section id="products" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-5"
            style={{ background: 'rgba(160,32,240,0.08)', border: '1px solid rgba(160,32,240,0.25)', color: 'var(--accent-primary)' }}>
            Exklusive OG Packs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--text-primary)' }}>
            Fortnite Account kaufen —{' '}
            <span className="text-gradient">Alle OG Packs</span>
          </motion.h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Alle Accounts mit vollem Zugang, sofortiger Lieferung und persönlichem Support.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Bottom guarantee strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-5 px-6 rounded-2xl"
          style={{ background: 'rgba(160,32,240,0.04)', border: '1px solid rgba(160,32,240,0.12)' }}>
          {[
            { Icon: Zap,     text: 'Sofort-Lieferung',      color: 'var(--success)' },
            { Icon: Shield,  text: 'Sichere Transaktion',    color: 'var(--accent-primary)' },
            { Icon: Package, text: 'Voller Account-Zugang',  color: 'var(--accent-cyan)' },
          ].map(({ Icon, text, color }) => (
            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { val: '1.247+', label: 'Kunden' },
    { val: '4.8★',   label: 'Ø Bewertung' },
    { val: '<2 Min', label: 'Lieferzeit' },
    { val: '8',      label: 'OG Packs' },
    { val: '100%',   label: 'Sicher' },
  ]
  return (
    <div style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="max-w-5xl mx-auto px-5 py-5">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-0 sm:grid sm:grid-cols-5">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="text-center sm:px-4 sm:border-r last:border-r-0"
              style={{ borderColor: 'var(--border-subtle)' }}>
              <p className="font-display font-bold text-2xl text-gradient">{s.val}</p>
              <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--text-faint)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
function WhyUs() {
  const features = [
    { Icon: Zap,        color: 'var(--success)',         title: 'Sofort-Lieferung',        desc: 'Zugangsdaten per E-Mail in unter 2 Minuten — automatisch, sicher, 24/7.' },
    { Icon: Shield,     color: 'var(--accent-primary)',  title: 'SSL-sicher & vertrauenswürdig', desc: 'Alle Transaktionen SSL-verschlüsselt. Über 1.200 Kunden vertrauen uns seit 2023.' },
    { Icon: Key,        color: 'var(--accent-cyan)',     title: 'Full Access garantiert',   desc: 'Volles Konto, E-Mail änderbar. PC, PlayStation oder Xbox — du wählst.' },
    { Icon: Headphones, color: 'var(--accent-hot)',      title: '24/7 Support',             desc: 'Problem nach dem Kauf? Wir sind per E-Mail erreichbar und helfen sofort.' },
  ]
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--bg-deep)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>
            Warum <span className="text-gradient">OGAccount.de</span>?
          </motion.h2>
          <p className="max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
            Seit 2023 der vertrauenswürdigste Shop für seltene Fortnite Accounts im DACH-Raum.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ Icon, color, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(160,32,240,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}12` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="font-display font-semibold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Max K.',   city: 'Berlin',    rating: 5, product: 'Renegade Raider Pack', time: 'vor 3 Tagen',  text: 'Mega schnell! Account war in unter 2 Minuten bei mir. Alles genau wie beschrieben. Klare Empfehlung!' },
  { name: 'Leon S.',  city: 'München',   rating: 5, product: 'OG Ghoul Pack',        time: 'vor 1 Woche',  text: 'Erst skeptisch, aber Support hat alle Fragen beantwortet. Super zufrieden! Sehr seriös.' },
  { name: 'Sarah M.', city: 'Hamburg',   rating: 5, product: 'Triple OG Pack',       time: 'vor 2 Wochen', text: 'Endlich hab ich meinen Renegade! Account läuft einwandfrei. Sehr seriöser Shop, gerne wieder.' },
  { name: 'Tim B.',   city: 'Wien',      rating: 4, product: 'OG Skull Pack',        time: 'vor 3 Wochen', text: 'Schnelle Lieferung, fairer Preis. Klarna war super praktisch. Alles problemlos geklappt.' },
  { name: 'Julia H.', city: 'Zürich',    rating: 5, product: 'Ikonik Pack',          time: 'vor 1 Monat',  text: 'Schon der zweite Kauf hier. Immer zuverlässig — Kauf auf Rechnung via Klarna ist top.' },
  { name: 'Nico F.',  city: 'Frankfurt', rating: 5, product: 'Aerial Pack',          time: 'vor 1 Monat',  text: 'Beste Seite für OG Accounts! Lieferung sofort da, alles funktioniert. 100% empfehlenswert!' },
]

function Reviews() {
  return (
    <section id="reviews" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display font-bold mb-5"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>
            Das sagen unsere <span className="text-gradient">Kunden</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="font-display font-bold text-4xl text-gradient">4.8</span>
            <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div>
              <div className="flex gap-0.5 mb-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4" fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)' }} />
                ))}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>1.247+ Bewertungen · Verifizierte Käufer</p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="p-5 rounded-2xl flex flex-col transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(160,32,240,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5"
                    fill={s <= r.rating ? 'var(--accent-primary)' : 'none'}
                    style={{ color: 'var(--accent-primary)' }} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>"{r.text}"</p>
              <div className="flex items-center justify-between pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</span>
                    <span className="text-xs" style={{ color: 'var(--text-faint)' }}>· {r.city}</span>
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--success)' }} />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(160,32,240,0.08)', color: 'var(--accent-primary)' }}>
                    {r.product}
                  </span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{r.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Drop Room Teaser ─────────────────────────────────────────────────────────
function DropRoomTeaser() {
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--bg-deep)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(160,32,240,0.12) 0%, rgba(0,229,255,0.05) 50%, rgba(160,32,240,0.08) 100%)',
            border: '1px solid rgba(160,32,240,0.28)',
          }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(160,32,240,0.2) 0%, transparent 70%)', filter: 'blur(30px)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-10 md:p-14 text-center md:text-left">
            <div className="text-6xl md:text-8xl select-none flex-shrink-0">🎰</div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-4"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.22)', color: 'var(--accent-cyan)' }}>
                Exklusives Feature
              </span>
              <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>
                Der <span className="text-gradient">Drop Room</span>
              </h2>
              <p className="text-base mb-7 max-w-md" style={{ color: 'var(--text-muted)' }}>
                Erlebe die Casino-Roulette-Reveal-Animation — wie CS:GO Case Opening. Glow-Effekte, Particle-Burst, Rarity-Reveal. Kostenlos ausprobieren.
              </p>
              <Link to="/drop-room"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-base transition-all duration-200"
                style={{ background: 'var(--accent-primary)', color: '#fff', boxShadow: '0 0 28px rgba(160,32,240,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hot)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(224,0,192,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(160,32,240,0.5)' }}>
                Pack öffnen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Wie funktioniert die Lieferung?',                    a: 'Nach erfolgreicher Zahlung erhältst du in unter 2 Minuten eine E-Mail mit den Zugangsdaten. Automatisch, sicher, 24/7.' },
  { q: 'Sind die Accounts sicher?',                          a: 'Ja. Alle Accounts werden persönlich geprüft. Du erhältst vollen Zugang und kannst Passwort und E-Mail selbst ändern.' },
  { q: 'Welche Zahlungsmethoden gibt es?',                   a: 'PayPal, Klarna (Ratenkauf & Rechnung), Visa, Mastercard, SEPA-Lastschrift, Apple Pay, Google Pay.' },
  { q: 'Für welche Plattformen sind die Accounts?',          a: 'PC, PlayStation und Xbox. Du wählst bei der Bestellung deine bevorzugte Plattform.' },
  { q: 'Was passiert wenn es Probleme gibt?',                a: 'Unser 24/7 Support hilft dir per E-Mail sofort. Wir garantieren, dass du deinen Account bekommst.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display font-bold mb-2"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', color: 'var(--text-primary)' }}>
            Häufige Fragen
          </motion.h2>
          <p style={{ color: 'var(--text-muted)' }}>Alles was du vor dem Kauf wissen musst.</p>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: `1px solid ${open === i ? 'rgba(160,32,240,0.35)' : 'rgba(255,255,255,0.05)'}`, transition: 'border-color 0.2s' }}>
              <button className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-display font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-base"
                  style={{
                    background: open === i ? 'var(--accent-primary)' : 'rgba(160,32,240,0.1)',
                    color: open === i ? '#fff' : 'var(--accent-primary)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'all 0.2s ease',
                  }}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-6 pb-5 pt-4 text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <StatsBar />
      <WhyUs />
      <Reviews />
      <DropRoomTeaser />
      <FAQ />
    </>
  )
}
