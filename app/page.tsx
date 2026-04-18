import Link from 'next/link'
import Navbar from '@/components/Navbar'

const HOW_IT_WORKS_BUYER = [
  { step: '1', title: 'Post your request', desc: 'Tell us what you want — a Pokémon ETB, K-beauty product, sneaker drop — and where from.' },
  { step: '2', title: 'Pay into escrow', desc: 'Your payment is held safely. Released only after you confirm delivery.' },
  { step: '3', title: 'Traveler delivers', desc: 'A traveler picks up your item and a bike rider drops it at your door.' },
]

const HOW_IT_WORKS_TRAVELER = [
  { step: '1', title: 'Browse requests', desc: 'See what people need from the country you\'re traveling from.' },
  { step: '2', title: 'Accept and buy', desc: 'Buy the item with your own money. It\'s already paid for in escrow.' },
  { step: '3', title: 'Drop and earn', desc: 'Hand it to a bike rider at the airport. Earn ₹500–1000 per item.' },
]

const EXAMPLES = [
  { emoji: '🃏', label: 'Pokémon ETBs', from: 'USA', price: '₹4,500 vs ₹12,000 on resale' },
  { emoji: '🧴', label: 'K-beauty (Laneige, COSRX)', from: 'Korea', price: '1/3rd of Indian price' },
  { emoji: '👟', label: 'Limited sneaker drops', from: 'USA', price: 'At retail, not resale' },
  { emoji: '🌶️', label: 'MDH Masala for NRIs', from: 'India', price: '1/10th of US Indian stores' },
  { emoji: '🎌', label: 'Anime merch & Uniqlo', from: 'Japan', price: 'Simply unavailable in India' },
  { emoji: '👜', label: 'French perfumes', from: 'France', price: 'EU price, no duty markup' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            🇮🇳 India's peer-to-peer import marketplace
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Get anything from anywhere.{' '}
            <span className="text-orange-500">Without the crazy markup.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Connect with travelers flying to India. They pick up what you need — Pokémon cards,
            K-beauty, sneakers, masalas — and a bike rider delivers it to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Post a request
            </Link>
            <Link
              href="/browse"
              className="bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              I'm a traveler →
            </Link>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            What people are getting
          </h2>
          <p className="text-center text-gray-500 mb-12">Real products, real savings.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EXAMPLES.map((ex) => (
              <div key={ex.label} className="border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">{ex.emoji}</div>
                <div className="font-semibold text-gray-900">{ex.label}</div>
                <div className="text-sm text-orange-500 font-medium mt-1">From {ex.from}</div>
                <div className="text-sm text-gray-400 mt-1">{ex.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How it works</h2>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Buyer */}
            <div>
              <div className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-6">For Buyers</div>
              <div className="space-y-8">
                {HOW_IT_WORKS_BUYER.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Traveler */}
            <div>
              <div className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-6">For Travelers</div>
              <div className="space-y-8">
                {HOW_IT_WORKS_TRAVELER.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built on trust</h2>
          <p className="text-gray-500 mb-12">Your money is safe. Your item is tracked.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-orange-50">
              <div className="text-2xl mb-3">🔒</div>
              <div className="font-semibold text-gray-900 mb-2">Escrow payments</div>
              <div className="text-sm text-gray-500">Money released only after you confirm delivery. Powered by Razorpay.</div>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50">
              <div className="text-2xl mb-3">⭐</div>
              <div className="font-semibold text-gray-900 mb-2">Verified travelers</div>
              <div className="text-sm text-gray-500">Travelers are rated after every delivery. Bad actors get removed.</div>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50">
              <div className="text-2xl mb-3">🛵</div>
              <div className="font-semibold text-gray-900 mb-2">Last mile delivery</div>
              <div className="text-sm text-gray-500">Bike riders pick up from the airport. Delivered to your door.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-orange-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to lekeaana?</h2>
          <p className="text-orange-100 mb-8">Post your first request in under 2 minutes.</p>
          <Link
            href="/auth/signup"
            className="bg-white text-orange-500 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-orange-50 transition-colors inline-block"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 text-center text-sm text-gray-400">
        © 2025 Lekeaana. Made with ❤️ in India.
      </footer>
    </div>
  )
}
