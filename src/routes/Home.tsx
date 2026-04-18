import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Key, CreditCard, Headphones, Store, Check, Star, Quote, ArrowRight, ChevronDown } from 'lucide-react'
import { products, rarityConfig } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

// ─── Particles ───────────────────────────────────────────────────────────────
function Particles({ count = 35 }: { count?: number }) {
  const pts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: Math.random() * 12 + 6,
    delay: Math.random() * 10,
    color: ['#a020f0','#e000c0','#00e5ff','#ffc700'][i % 4],
    opacity: Math.random() * 0.5 + 0.2,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size,
            background:p.color, boxShadow:`0 0 ${p.size*5}px ${p.color}`, opacity:p.opacity }}
          animate={{ y:[0,-30,0], opacity:[p.opacity, p.opacity*2, p.opacity], scale:[1,1.4,1] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:'easeInOut' }} />
      ))}
    </div>
  )
}

// ─── Skin Showcase Grid (Hero right side) ────────────────────────────────────
const HERO_SKINS = [
  { src: '/assets/skins/renegade.png',      name: 'Renegade Raider', rarity: 'legendary' as const, price: '149,99€' },
  { src: '/assets/skins/triple-og.png',     name: 'Triple OG Pack',  rarity: 'mythic' as const,    price: '199,99€' },
  { src: '/assets/skins/aerial-assault.png',name: 'Aerial Assault',  rarity: 'mythic' as const,    price: '169,99€' },
  { src: '/assets/skins/black-knight.png',  name: 'Black Knight',    rarity: 'legendary' as const, price: '149,99€' },
  { src: '/assets/skins/ghoul-trooper.png', name: 'Ghoul Trooper',   rarity: 'rare' as const,      price: '129,99€' },
  { src: '/assets/skins/travis-scott.png',  name: 'Travis Scott',    rarity: 'epic' as const,      price: '139,99€' },
]

function SkinShowcase() {
  const [active, setActive] = useState(0)

  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Main featured skin */}
      <motion.div className="relative rounded-2xl overflow-hidden aspect-square mb-3"
        style={{ border:`2px solid ${rarityConfig[HERO_SKINS[active].rarity].color}`,
          boxShadow:`0 0 60px ${rarityConfig[HERO_SKINS[active].rarity].glow}, 0 0 120px ${rarityConfig[HERO_SKINS[active].rarity].glow.replace('0.5','0.1')}` }}>
        <AnimatePresence mode="wait">
          <motion.img key={active} src={HERO_SKINS[active].src} alt={HERO_SKINS[active].name}
            className="w-full h-full object-cover"
            initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
            transition={{ duration:0.35 }} />
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(8,5,15,0.9) 0%, transparent 50%)' }} />
        {/* Scan line */}
        <div className="scan-line" />
        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase mb-1 block"
                style={{ color: rarityConfig[HERO_SKINS[active].rarity].color }}>
                {HERO_SKINS[active].rarity.toUpperCase()}
              </span>
              <h3 className="font-display font-bold text-lg" style={{ color:'var(--text-primary)' }}>
                {HERO_SKINS[active].name}
              </h3>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-xl text-gradient">{HERO_SKINS[active].price}</span>
            </div>
          </div>
        </div>
        {/* Corner accent */}
        <div className="absolute top-3 right-3 w-5 h-5" style={{
          borderTop:`2px solid ${rarityConfig[HERO_SKINS[active].rarity].color}`,
          borderRight:`2px solid ${rarityConfig[HERO_SKINS[active].rarity].color}` }} />
        <div className="absolute bottom-16 left-3 w-5 h-5" style={{
          borderBottom:`2px solid ${rarityConfig[HERO_SKINS[active].rarity].color}`,
          borderLeft:`2px solid ${rarityConfig[HERO_SKINS[active].rarity].color}` }} />
      </motion.div>

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-1.5">
        {HERO_SKINS.map((skin, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="relative aspect-square rounded-lg overflow-hidden transition-all duration-200"
            style={{ border:`1.5px solid ${i === active ? rarityConfig[skin.rarity].color : 'rgba(255,255,255,0.1)'}`,
              boxShadow: i === active ? `0 0 12px ${rarityConfig[skin.rarity].glow}` : 'none',
              transform: i === active ? 'scale(1.08)' : 'scale(1)' }}>
            <img src={skin.src} alt={skin.name} className="w-full h-full object-cover" />
            {i !== active && <div className="absolute inset-0" style={{ background:'rgba(8,5,15,0.5)' }} />}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Live Purchase Ticker ────────────────────────────────────────────────────
const TICKS = [
  'Max K. aus Berlin hat gerade Renegade Raider Pack gekauft',
  'Leon S. aus München hat Triple OG Pack gesichert',
  'Sarah M. aus Hamburg hat Aerial Assault Pack erhalten',
  'Tim B. aus Wien hat Black Knight Pack gekauft',
  'Julia H. aus Zürich hat Ghoul Trooper Pack gesichert',
  'Nico F. aus Frankfurt hat Travis Scott Pack erhalten',
]

function PurchaseTicker() {
  return (
    <div className="overflow-hidden py-2 px-3 rounded-lg flex items-center gap-3"
      style={{ background:'rgba(0,230,118,0.06)', border:'1px solid rgba(0,230,118,0.2)' }}>
      <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold"
        style={{ color:'var(--success)' }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'var(--success)' }} />
        LIVE
      </span>
      <div className="overflow-hidden flex-1">
        <motion.div className="flex gap-8 whitespace-nowrap"
          animate={{ x:['0%','-50%'] }}
          transition={{ duration:20, repeat:Infinity, ease:'linear' }}>
          {[...TICKS,...TICKS].map((t, i) => (
            <span key={i} className="text-xs" style={{ color:'var(--text-muted)' }}>{t}</span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  const payments = [
    { src:'/assets/payments/paypal.png',    alt:'PayPal' },
    { src:'/assets/payments/klarna.png',    alt:'Klarna' },
    { src:'/assets/payments/visa.png',      alt:'Visa' },
    { src:'/assets/payments/mastercard.png',alt:'Mastercard' },
    { src:'/assets/payments/sepa.png',      alt:'SEPA' },
    { src:'/assets/payments/applepay.png',  alt:'Apple Pay' },
    { src:'/assets/payments/googlepay.png', alt:'Google Pay' },
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-mesh">
      <Particles />

      {/* Big background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(160,32,240,0.08) 0%, transparent 70%)' }} />

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{ background:'rgba(160,32,240,0.1)', border:'1px solid rgba(160,32,240,0.3)', color:'var(--text-muted)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'var(--success)' }} />
              Vertrauenswürdiger OG-Shop seit 2023 · 1.247+ Kunden
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.6 }}
              className="font-display font-bold leading-[1.05] mb-6"
              style={{ fontSize:'clamp(2.8rem, 6vw, 5.2rem)', color:'var(--text-primary)' }}>
              Seltene Fortnite
              <span className="block text-gradient">OG Accounts.</span>
              <span className="block" style={{ color:'var(--text-muted)', fontSize:'0.55em', fontWeight:500, letterSpacing:'-0.01em' }}>
                Sofort. Sicher. Legendary.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}
              className="text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              style={{ color:'var(--text-muted)' }}>
              Sichere dir legendäre OG Skins — Renegade Raider, Ghoul Trooper, Black Knight & mehr.
              Digitale Lieferung innerhalb von Sekunden nach Zahlung.
            </motion.p>

            {/* Trust points */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-5 mb-8">
              {[
                { Icon:Zap,        text:'Sofortige Lieferung' },
                { Icon:Shield,     text:'SSL-verschlüsselt' },
                { Icon:Headphones, text:'24/7 Support' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm" style={{ color:'var(--text-muted)' }}>
                  <Icon className="w-4 h-4" style={{ color:'var(--accent-primary)' }} />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <a href="#products"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-base overflow-hidden transition-all duration-300"
                style={{ background:'var(--accent-primary)', color:'#fff', boxShadow:'0 0 30px rgba(160,32,240,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 50px rgba(224,0,192,0.7)'; e.currentTarget.style.background='var(--accent-hot)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='0 0 30px rgba(160,32,240,0.5)'; e.currentTarget.style.background='var(--accent-primary)' }}>
                <Zap className="w-5 h-5" />
                Packs entdecken
              </a>
              <Link to="/drop-room"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-base transition-all duration-300"
                style={{ background:'transparent', color:'var(--text-primary)', border:'1.5px solid rgba(160,32,240,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-primary)'; e.currentTarget.style.background='rgba(160,32,240,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(160,32,240,0.4)'; e.currentTarget.style.background='transparent' }}>
                🎰 Drop Room
              </Link>
            </motion.div>

            {/* Live ticker */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} className="mb-8">
              <PurchaseTicker />
            </motion.div>

            {/* Payment logos */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
              <p className="text-xs mb-3 text-center lg:text-left font-mono tracking-widest uppercase"
                style={{ color:'var(--text-faint)' }}>Sichere Zahlungsmethoden</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {payments.map(p => (
                  <div key={p.alt} className="h-8 px-2.5 rounded-lg flex items-center transition-all duration-200"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='rgba(160,32,240,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}>
                    <img src={p.src} alt={p.alt} className="h-4 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Skin showcase */}
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7 }}
            className="w-full lg:w-auto lg:flex-shrink-0 lg:w-[360px]">
            <SkinShowcase />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y:[0,6,0] }} transition={{ duration:2, repeat:Infinity }} style={{ color:'var(--text-faint)' }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { val:'1.247+', label:'Zufriedene Kunden' },
    { val:'4.8★',   label:'Durchschnittsbewertung' },
    { val:'<2 Min', label:'Durchschn. Lieferzeit' },
    { val:'8',      label:'Exklusive OG Packs' },
    { val:'100%',   label:'Sichere Zahlung' },
  ]
  return (
    <div style={{ background:'var(--bg-deep)', borderTop:'1px solid var(--border-subtle)', borderBottom:'1px solid var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-0 sm:divide-x" style={{ borderColor:'var(--border-subtle)' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.06 }}
              className="text-center sm:px-6 first:pl-0 last:pr-0">
              <p className="font-display font-bold text-2xl text-gradient">{s.val}</p>
              <p className="text-xs mt-0.5 font-mono" style={{ color:'var(--text-faint)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Trust Section ────────────────────────────────────────────────────────────
function TrustSection() {
  const items = [
    { Icon:Zap,        title:'Sofortige Lieferung',         desc:'Dein Account wird direkt nach dem Kauf freigeschaltet – Login-Daten in Sekunden per E-Mail.' },
    { Icon:Shield,     title:'SSL-verschlüsselt & sicher',  desc:'Alle Transaktionen sind SSL-verschlüsselt. Zahle sicher mit PayPal, Klarna, Kreditkarte oder SEPA.' },
    { Icon:Store,      title:'Verifizierter Shop seit 2023', desc:'Über 1.200 zufriedene Kunden haben ihren Account bei uns gekauft. Bewertungen über CopeCart.' },
    { Icon:Key,        title:'Full Access – 100% Kontrolle', desc:'Jeder Account kommt mit vollem Zugang. E-Mail änderbar, alle Sicherheitseinstellungen in deiner Hand.' },
    { Icon:CreditCard, title:'Flexibel bezahlen',            desc:'Klarna Ratenzahlung, Kauf auf Rechnung, PayPal, Visa, Mastercard, SEPA, Apple Pay & Google Pay.' },
    { Icon:Headphones, title:'24/7 Support nach dem Kauf',  desc:'Fragen zu deinem Account? Unser Support hilft dir schnell und persönlich per E-Mail weiter.' },
  ]
  return (
    <section className="py-24 px-4" style={{ background:'var(--bg-deep)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-5"
            style={{ background:'rgba(160,32,240,0.1)', border:'1px solid rgba(160,32,240,0.3)', color:'var(--accent-primary)' }}>
            Vertrauen & Sicherheit
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="font-display font-bold mb-4"
            style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'var(--text-primary)' }}>
            Warum{' '}
            <span className="text-gradient">OGAccount.de</span>?
          </motion.h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color:'var(--text-muted)' }}>
            Der sicherste Weg einen Fortnite Account mit seltenen OG Skins zu kaufen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              className="group relative p-6 rounded-2xl transition-all duration-300 card-shimmer"
              style={{ background:'var(--bg-card)', border:'1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(160,32,240,0.35)'; e.currentTarget.style.boxShadow='0 0 40px rgba(160,32,240,0.08)'; e.currentTarget.style.background='var(--bg-card-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.background='var(--bg-card)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{ background:'rgba(160,32,240,0.12)', border:'1px solid rgba(160,32,240,0.25)' }}>
                <Icon className="w-6 h-6" style={{ color:'var(--accent-primary)' }} />
              </div>
              <h3 className="font-display font-semibold text-base mb-2" style={{ color:'var(--text-primary)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-muted)' }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Legal note */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="mt-8 p-5 rounded-xl" style={{ background:'rgba(160,32,240,0.05)', border:'1px solid rgba(160,32,240,0.12)' }}>
          <p className="text-xs leading-relaxed" style={{ color:'var(--text-faint)' }}>
            <span className="font-semibold" style={{ color:'var(--text-muted)' }}>Hinweis zu digitalen Produkten:</span>{' '}
            Alle unsere Produkte sind digitale Güter und werden sofort nach Zahlung geliefert. Gemäß § 356 Abs. 5 BGB erlischt das Widerrufsrecht bei digitalen Inhalten nach Beginn der Ausführung, sofern du dem ausdrücklich zugestimmt hast.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Products Section ─────────────────────────────────────────────────────────
function ProductsSection() {
  const bestsellers = products.filter(p => p.badge === 'Bestseller')
  const others      = products.filter(p => p.badge !== 'Bestseller')

  return (
    <section className="py-24 px-4" id="products">
      <div className="max-w-7xl mx-auto">
        {/* Bestsellers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-5"
              style={{ background:'rgba(255,199,0,0.1)', border:'1px solid rgba(255,199,0,0.3)', color:'var(--accent-gold)' }}>
              ★ Bestseller
            </motion.span>
            <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="font-display font-bold mb-4"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'var(--text-primary)' }}>
              Fortnite Account kaufen –{' '}
              <span className="text-gradient">Unsere Bestseller</span>
            </motion.h2>
            <p className="max-w-xl mx-auto" style={{ color:'var(--text-muted)' }}>
              Die meistgekauften Accounts mit den seltensten OG Skins. Sofort verfügbar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>

        {/* Other products */}
        <div className="mb-14">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="font-display font-bold mb-4"
              style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'var(--text-primary)' }}>
              Weitere{' '}
              <span className="text-gradient">OG Accounts</span>
            </motion.h2>
            <p className="max-w-xl mx-auto" style={{ color:'var(--text-muted)' }}>
              Alle Accounts mit vollem Zugang, sofortiger Lieferung und persönlichem Support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {others.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>

        {/* Guarantee banner */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="relative overflow-hidden p-7 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"
          style={{ background:'linear-gradient(135deg, rgba(160,32,240,0.12), rgba(224,0,192,0.06), rgba(160,32,240,0.12))', border:'1px solid rgba(160,32,240,0.25)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%, rgba(160,32,240,0.1) 0%, transparent 60%)' }} />
          <Shield className="w-14 h-14 flex-shrink-0 relative z-10" style={{ color:'var(--accent-primary)' }} />
          <div className="relative z-10">
            <h3 className="font-display font-bold text-xl mb-1" style={{ color:'var(--text-primary)' }}>100% Zufriedenheitsgarantie</h3>
            <p className="text-sm" style={{ color:'var(--text-muted)' }}>Wir garantieren dir den Erhalt deines Accounts. Bei Problemen sind wir sofort für dich da.</p>
          </div>
          <a href="#faq"
            className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
            style={{ background:'rgba(160,32,240,0.15)', border:'1px solid rgba(160,32,240,0.3)', color:'var(--accent-primary)' }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--accent-primary)'; e.currentTarget.style.color='#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(160,32,240,0.15)'; e.currentTarget.style.color='var(--accent-primary)' }}>
            Mehr erfahren <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Drop Room Teaser ─────────────────────────────────────────────────────────
function DropRoomTeaser() {
  return (
    <section className="py-24 px-4" style={{ background:'var(--bg-deep)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background:'var(--bg-card)', border:'1px solid rgba(160,32,240,0.3)', boxShadow:'0 0 100px rgba(160,32,240,0.12)' }}>
          {/* Animated gradient background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div className="absolute w-[600px] h-[600px] rounded-full"
              style={{ background:'radial-gradient(circle, rgba(160,32,240,0.2) 0%, transparent 70%)', top:'-200px', left:'-100px' }}
              animate={{ scale:[1,1.2,1], opacity:[0.5,0.8,0.5] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }} />
            <motion.div className="absolute w-[400px] h-[400px] rounded-full"
              style={{ background:'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)', bottom:'-100px', right:'-50px' }}
              animate={{ scale:[1,1.15,1], opacity:[0.4,0.7,0.4] }}
              transition={{ duration:5, repeat:Infinity, ease:'easeInOut', delay:1.5 }} />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <span className="inline-block font-mono text-xs tracking-widest uppercase mb-5 px-3 py-1 rounded-full w-fit"
                style={{ background:'rgba(0,229,255,0.1)', border:'1px solid rgba(0,229,255,0.25)', color:'var(--accent-cyan)' }}>
                Exklusives Feature
              </span>
              <h2 className="font-display font-bold mb-4" style={{ fontSize:'clamp(2rem,4vw,3.2rem)', color:'var(--text-primary)' }}>
                Der <span className="text-gradient">Drop Room</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color:'var(--text-muted)' }}>
                Öffne ein Pack kostenlos und erlebe die Roulette-Reveal-Animation — wie CS:GO Case Opening. Glow-Effekte, Particle-Burst, Rarity-System.
              </p>
              <Link to="/drop-room"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-base w-fit transition-all duration-300"
                style={{ background:'var(--accent-primary)', color:'#fff', boxShadow:'0 0 30px rgba(160,32,240,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--accent-hot)'; e.currentTarget.style.boxShadow='0 0 50px rgba(224,0,192,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--accent-primary)'; e.currentTarget.style.boxShadow='0 0 30px rgba(160,32,240,0.5)' }}>
                Pack öffnen 🎰
              </Link>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:flex items-center justify-center p-10 relative">
              <motion.div className="w-64 h-64 rounded-2xl overflow-hidden relative animate-float"
                style={{ border:'2px solid rgba(160,32,240,0.5)', boxShadow:'0 0 60px rgba(160,32,240,0.3)' }}>
                <img src="/assets/skins/triple-og.png" alt="Triple OG" className="w-full h-full object-cover" />
                <div className="scan-line" />
                <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(8,5,15,0.7) 0%, transparent 50%)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color:'var(--accent-primary)' }}>MYTHIC</p>
                  <p className="font-display font-bold text-sm" style={{ color:'var(--text-primary)' }}>Triple OG Pack</p>
                </div>
              </motion.div>
              {/* Orbiting label */}
              <motion.div className="absolute top-12 right-8 px-3 py-1.5 rounded-lg text-xs font-mono font-bold"
                animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
                style={{ background:'rgba(255,199,0,0.15)', border:'1px solid rgba(255,199,0,0.4)', color:'var(--accent-gold)' }}>
                🏆 JACKPOT
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviewData = [
  { id:1, name:'Max K.',   rating:5, text:'Mega schnelle Lieferung! Account war innerhalb von 2 Minuten bei mir. Alles wie beschrieben, top Service!', date:'vor 3 Tagen',  product:'Renegade Pack' },
  { id:2, name:'Leon S.',  rating:5, text:'Hatte erst Bedenken wegen Online-Kauf, aber der Support hat alle Fragen beantwortet. Bin super zufrieden!', date:'vor 1 Woche',  product:'OG Ghoul Pack' },
  { id:3, name:'Sarah M.', rating:5, text:'Endlich hab ich meinen Renegade Raider! Der Account funktioniert einwandfrei. Sehr seriöser Shop.',         date:'vor 2 Wochen', product:'Renegade Pack' },
  { id:4, name:'Tim B.',   rating:4, text:'Guter Service, schnelle Antworten. Preis ist fair für die Seltenheit der Skins. Klare Empfehlung.',         date:'vor 2 Wochen', product:'OG Skull Pack' },
  { id:5, name:'Julia H.', rating:5, text:'Schon mein zweiter Kauf hier. Immer zuverlässig und Klarna Kauf auf Rechnung ist super praktisch!',         date:'vor 3 Wochen', product:'Ikonik Pack' },
  { id:6, name:'Nico F.',  rating:5, text:'Beste Seite für OG Accounts! Lieferung war sofort da, alles hat geklappt. 100% empfehlenswert!',           date:'vor 1 Monat',  product:'Renegade Pack' },
]

function Reviews() {
  return (
    <section className="py-24 px-4" id="reviews">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-5"
            style={{ background:'rgba(160,32,240,0.1)', border:'1px solid rgba(160,32,240,0.3)', color:'var(--accent-primary)' }}>
            Kundenbewertungen
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="font-display font-bold mb-4"
            style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'var(--text-primary)' }}>
            Das sagen unsere Kunden über ihren{' '}
            <span className="text-gradient">Fortnite Account Kauf</span>
          </motion.h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color:'var(--text-muted)' }}>
            Über 1.200 zufriedene Kunden haben ihren Fortnite Account bei OGAccount.de gekauft.
          </p>
          {/* Rating widget */}
          <motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
            className="inline-flex items-center gap-5 px-7 py-4 rounded-2xl"
            style={{ background:'var(--bg-card)', border:'1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-center">
              <div className="font-display font-bold text-4xl text-gradient">4.8</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4" fill={s <= 4 ? 'var(--accent-primary)' : 'none'} style={{ color:'var(--accent-primary)' }} />
                ))}
              </div>
            </div>
            <div className="w-px h-12" style={{ background:'rgba(255,255,255,0.08)' }} />
            <div className="text-left">
              <div className="font-display font-semibold" style={{ color:'var(--text-primary)' }}>1.247+ Bewertungen</div>
              <div className="flex items-center gap-1.5 text-sm mt-0.5" style={{ color:'var(--text-muted)' }}>
                <Check className="w-3.5 h-3.5" style={{ color:'var(--success)' }} />
                Verifizierte Käufer
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviewData.map((r, i) => (
            <motion.div key={r.id}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              className="p-6 rounded-2xl flex flex-col h-full transition-all duration-300"
              style={{ background:'var(--bg-card)', border:'1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(160,32,240,0.3)'; e.currentTarget.style.boxShadow='0 0 30px rgba(160,32,240,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow='none' }}>
              <Quote className="w-7 h-7 mb-4" style={{ color:'rgba(160,32,240,0.4)' }} />
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4" fill={s <= r.rating ? 'var(--accent-primary)' : 'none'} style={{ color:'var(--accent-primary)' }} />
                ))}
              </div>
              <p className="flex-1 leading-relaxed mb-4" style={{ color:'var(--text-primary)' }}>"{r.text}"</p>
              <div className="mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background:'rgba(255,255,255,0.05)', color:'var(--text-muted)' }}>
                  {r.product}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-sm" style={{ color:'var(--text-primary)' }}>{r.name}</span>
                  <Check className="w-3.5 h-3.5" style={{ color:'var(--success)' }} />
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color:'var(--text-faint)' }}>{r.date}</div>
                  <div className="text-xs" style={{ color:'var(--success)' }}>Verifiziert</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  { q:'Wie funktioniert die Lieferung?',                    a:'Nach erfolgreicher Zahlung erhältst du innerhalb weniger Minuten eine E-Mail mit den Zugangsdaten. Die Übergabe erfolgt sicher und diskret.' },
  { q:'Sind die Accounts sicher?',                          a:'Ja, alle Accounts werden sorgfältig geprüft und sind vollständig gesichert. Du erhältst vollen Zugang und kannst alle Sicherheitseinstellungen selbst anpassen.' },
  { q:'Welche Zahlungsmethoden werden akzeptiert?',         a:'PayPal, Kreditkarte (Visa, Mastercard), SEPA-Lastschrift, Kauf auf Rechnung via Klarna, Apple Pay und Google Pay.' },
  { q:'Was ist, wenn es Probleme gibt?',                    a:'Unser 24/7 Support-Team ist immer für dich erreichbar. Bei Problemen helfen wir dir schnell und unkompliziert weiter.' },
  { q:'Kann ich den Account auf allen Plattformen nutzen?', a:'Ja, du kannst bei der Bestellung deine bevorzugte Plattform wählen: PC, PlayStation oder Xbox.' },
]

function FAQ() {
  return (
    <section className="py-24 px-4" style={{ background:'var(--bg-deep)' }} id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="font-display font-bold mb-3"
            style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'var(--text-primary)' }}>
            Häufig gestellte Fragen
          </motion.h2>
          <p style={{ color:'var(--text-muted)' }}>Alles was du wissen musst, bevor du kaufst.</p>
        </div>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <motion.details key={i}
              initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.06 }}
              className="group rounded-xl overflow-hidden"
              style={{ background:'var(--bg-card)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-display font-semibold list-none select-none"
                style={{ color:'var(--text-primary)' }}>
                <span className="group-hover:text-gradient transition-all duration-200">{faq.q}</span>
                <span className="ml-4 text-xl flex-shrink-0 transition-transform duration-300 group-open:rotate-45" style={{ color:'var(--accent-primary)' }}>+</span>
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color:'var(--text-muted)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                <div className="pt-4">{faq.a}</div>
              </div>
            </motion.details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-sm font-medium transition-colors"
            style={{ color:'var(--accent-primary)' }}
            onMouseEnter={e => e.currentTarget.style.color='var(--accent-hot)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--accent-primary)'}>
            Alle Fragen ansehen →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBar />
      <TrustSection />
      <ProductsSection />
      <DropRoomTeaser />
      <Reviews />
      <FAQ />
    </div>
  )
}
