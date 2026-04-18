interface LegalProps {
  page: 'impressum' | 'agb' | 'datenschutz' | 'widerruf'
}

export default function Legal({ page }: LegalProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ color: 'var(--text-muted)' }}>Legal: {page} — coming soon</p>
    </div>
  )
}
