import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Check } from 'lucide-react'
import { type Product, formatPrice } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="h-full"
    >
      <div
        className="group h-full rounded-xl border overflow-hidden flex flex-col transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, var(--bg-card), var(--bg-deep))',
          borderColor: hovered ? 'rgba(176,38,255,0.5)' : 'rgba(255,255,255,0.08)',
          boxShadow: hovered
            ? '0 0 60px hsl(270 100% 60% / 0.3), 0 20px 40px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 50%)' }} />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'var(--accent-primary)', color: '#fff' }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: 'var(--accent-primary)', color: '#fff' }}
            >
              <Zap className="w-3 h-3" />
              Jetzt sichern
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <h3
            className="font-display font-bold text-lg leading-snug transition-colors duration-200"
            style={{ color: hovered ? 'var(--accent-primary)' : 'var(--text-primary)' }}
          >
            {product.name}
          </h3>

          <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {product.subtitle}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {product.chips.map(chip => (
              <span
                key={chip}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                style={{ background: 'rgba(176,38,255,0.1)', border: '1px solid rgba(176,38,255,0.2)', color: 'var(--text-muted)' }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: 'var(--accent-primary)' }} />
                {chip}
              </span>
            ))}
          </div>

          {/* Price + Delivery */}
          <div className="mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-end justify-between gap-2 mb-3">
              <div>
                {product.compareAtPrice && (
                  <p className="text-xs line-through mb-0.5" style={{ color: 'var(--text-faint)' }}>
                    {formatPrice(product.compareAtPrice)}
                  </p>
                )}
                <p
                  className="font-display font-bold text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hot))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {formatPrice(product.price)}
                </p>
              </div>
              {/* Stars */}
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"
                      style={{ color: s <= Math.round(product.rating) ? 'var(--accent-primary)' : 'rgba(176,38,255,0.2)' }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  {product.rating.toFixed(1)} ({product.reviewCount >= 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})
                </span>
              </div>
            </div>

            {/* Instant delivery badge */}
            <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: 'var(--success)' }}>
              <Zap className="w-3 h-3" />
              Digitale Lieferung sofort nach Zahlung
            </div>

            {/* CTA */}
            <a
              href={product.copeCartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                background: hovered ? 'var(--accent-primary)' : 'rgba(176,38,255,0.15)',
                border: '1px solid var(--accent-primary)',
                color: hovered ? '#fff' : 'var(--accent-primary)',
                boxShadow: hovered ? '0 0 20px rgba(176,38,255,0.4)' : 'none',
              }}
              onClick={e => e.stopPropagation()}
            >
              Jetzt sicher kaufen
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
