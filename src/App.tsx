import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Home from '@/routes/Home'
import DropRoom from '@/routes/DropRoom'
import Product from '@/routes/Product'
import FAQ from '@/routes/FAQ'
import Reviews from '@/routes/Reviews'
import Legal from '@/routes/Legal'

function App() {
  return (
    <BrowserRouter basename="/oga-standalone">
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-void)' }}>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drop-room" element={<DropRoom />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/impressum" element={<Legal page="impressum" />} />
            <Route path="/agb" element={<Legal page="agb" />} />
            <Route path="/datenschutz" element={<Legal page="datenschutz" />} />
            <Route path="/widerruf" element={<Legal page="widerruf" />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
