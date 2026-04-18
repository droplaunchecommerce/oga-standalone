import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Star } from 'lucide-react'
import { type Product, formatPrice, rarityConfig } from '@/lib/products'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [hovered, setHovered] = useState(false)
  const rarity = rarityConfig[product.rarity]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="h-full"
    >
      <div
        className="group h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${hovered ? rarity.color + '55' : rarity.color + '20'}`,
          boxShadow: hovered
            ? `0 0 40px ${rarity.glow}, 0 20px 48px rgba(0,0,0,0.5)`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <Link to={`/product/${product.slug}`} className="relative block overflow-hidden flex-shrink-0"
          style={{ aspectRatio: '3/4' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.55s ease',
            }}
            loading="lazy"
          />

          {/* Gradient bottom overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(8,5,15,0.97) 0%, rgba(8,5,15,0.4) 45%, transparent 75%)',
          }} />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono tracking-wider"
                style={{
                  background: product.badge === 'Bestseller' ? 'rgba(255,199,0,0.15)' : 'rgba(224,0,192,0.15)',
                  border: `1px solid ${product.badge === 'Bestseller' ? 'rgba(255,199,0,0.45)' : 'rgba(224,0,192,0.45)'}`,
                  color: product.badge === 'Bestseller' ? 'var(--accent-gold)' : 'var(--accent-hot)',
                }}>
                {product.badge === 'Bestseller' ? '★ Bestseller' : product.badge}
              </span>
            </div>
          )}

          {/* Rarity chip + hover CTA at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-end justify-between">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold tracking-widest uppercase"
                style={{
                  color: rarity.color,
                  background: `${rarity.color}18`,
                  border: `1px solid ${rarity.color}33`,
                }}>
                {rarity.label}
              </span>
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  background: hovered ? rarity.color : 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: `1px solid ${hovered ? rarity.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: hovered ? `0 0 16px ${rarity.glow}` : 'none',
                  opacity: hovered ? 1 : 0,
                  transition: 'all 0.2s ease',
                }}>
                <Zap className="w-3 h-3" />
                Kaufen
              </span>
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-display font-bold text-sm sm:text-base mb-2 leading-snug"
              style={{
                color: hovered ? rarity.color : 'var(--text-primary)',
                transition: 'color 0.2s',
              }}>
              {product.name}
            </h3>
          </Link>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className="w-3 h-3"
                fill={s <= Math.round(product.rating) ? rarity.color : 'none'}
                style={{ color: rarity.color }} />
            ))}
            <span className="text-xs font-mono ml-1" style={{ color: 'var(--text-faint)' }}>
              {product.rating.toFixed(1)}
              {' '}({product.reviewCount >= 1000
                ? `${(product.reviewCount / 1000).toFixed(1)}k`
                : product.reviewCount})
            </span>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto pt-3 flex items-center justify-between gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              {product.compareAtPrice && (
                <p className="text-xs line-through mb-0.5" style={{ color: 'var(--text-faint)' }}>
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
              <p className="font-display font-bold text-lg sm:text-xl"
                style={{
                  background: `linear-gradient(135deg, ${rarity.color}, var(--accent-hot))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                {formatPrice(product.price)}
              </p>
            </div>

            <a
              href={product.copeCartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-3.5 py-2 rounded-xl text-sm font-bold"
              style={{
                background: hovered ? rarity.color : 'transparent',
                border: `1.5px solid ${rarity.color}`,
                color: hovered ? '#fff' : rarity.color,
                boxShadow: hovered ? `0 0 20px ${rarity.glow}` : 'none',
                transition: 'all 0.2s ease',
              }}
              onClick={e => e.stopPropagation()}
            >
              Kaufen
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
