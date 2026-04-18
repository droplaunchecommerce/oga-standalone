import { useParams } from 'react-router-dom'

export default function Product() {
  const { slug } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ color: 'var(--text-muted)' }}>Product: {slug} — coming soon</p>
    </div>
  )
}
