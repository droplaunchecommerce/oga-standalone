import productsData from '@/data/products.json'

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  compareAtPrice: number | null
  copeCartLink: string
  badge: string | null
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  chips: string[]
  rating: number
  reviewCount: number
  image: string
  imageFallback: string
  description: string
  bullets: string[]
  deliveryContents: string[]
}

export const products: Product[] = productsData as Product[]

export const rarityConfig = {
  common:    { color: '#b0b0b0', glow: 'rgba(176,176,176,0.4)', label: 'Common' },
  rare:      { color: '#4287f5', glow: 'rgba(66,135,245,0.5)',  label: 'Rare' },
  epic:      { color: '#b026ff', glow: 'rgba(176,38,255,0.5)',  label: 'Epic' },
  legendary: { color: '#ffd700', glow: 'rgba(255,215,0,0.5)',   label: 'Legendary' },
  mythic:    { color: '#ff00d4', glow: 'rgba(255,0,212,0.5)',   label: 'Mythic' },
}

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getBestsellers(): Product[] {
  return products.filter(p => p.badge === 'Bestseller')
}

export function formatPrice(price: number): string {
  return price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}
