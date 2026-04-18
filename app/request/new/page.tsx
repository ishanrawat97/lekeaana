'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const COUNTRIES = ['United States', 'South Korea', 'Japan', 'France', 'Italy', 'United Kingdom', 'India', 'Other']

export default function NewRequestPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    item_name: '',
    description: '',
    item_url: '',
    quantity: 1,
    price_usd: '',
    from_country: 'United States',
    to_country: 'India',
    traveler_fee: 500,
    deadline: '',
  })

  const set = (key: string, value: string | number) => setForm(f => ({ ...f, [key]: value }))

  const totalINR = form.price_usd ? Math.round(Number(form.price_usd) * 84 + form.traveler_fee) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price_usd: Number(form.price_usd) }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post a request</h1>
        <p className="text-gray-500 mb-8">Tell us what you want and where from. A traveler will pick it up.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What do you want? *</label>
            <input
              type="text"
              value={form.item_name}
              onChange={e => set('item_name', e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Prismatic Evolutions ETB, Laneige Lip Mask, Jordan 4 Retro..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              placeholder="Specific details — size, color, variant, where to buy it..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product URL (optional)</label>
            <input
              type="url"
              value={form.item_url}
              onChange={e => set('item_url', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="https://amazon.com/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From *</label>
              <select
                value={form.from_country}
                onChange={e => set('from_country', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                min={1}
                max={3}
                value={form.quantity}
                onChange={e => set('quantity', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <p className="text-xs text-gray-400 mt-1">Max 3 per request</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price in USD *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min={1}
                  step="0.01"
                  value={form.price_usd}
                  onChange={e => set('price_usd', e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="49.99"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Traveler fee (₹)</label>
              <input
                type="number"
                min={300}
                step={100}
                value={form.traveler_fee}
                onChange={e => set('traveler_fee', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <p className="text-xs text-gray-400 mt-1">Higher fee = faster match</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Needed by *</label>
            <input
              type="date"
              value={form.deadline}
              onChange={e => set('deadline', e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {totalINR > 0 && (
            <div className="bg-orange-50 rounded-xl p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Item price (~₹{Math.round(Number(form.price_usd) * 84).toLocaleString('en-IN')})</span>
                <span>${form.price_usd}</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-1">
                <span>Traveler fee</span>
                <span>₹{form.traveler_fee}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 mt-2 pt-2 border-t border-orange-100">
                <span>Total you pay</span>
                <span>₹{totalINR.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Posting...' : 'Post request'}
          </button>
        </form>
      </div>
    </div>
  )
}
