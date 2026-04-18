'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import type { Request } from '@/types'

export default function AcceptOrderPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/requests/${id}`).then(r => r.json()).then(setRequest)
  }, [id])

  const handleAccept = async () => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: id }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
      setLoading(false)
      return
    }

    const order = await res.json()
    router.push(`/order/${order.id}`)
  }

  if (!request) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-12 text-center text-gray-400">Loading...</div>
    </div>
  )

  const totalINR = Math.round(request.price_usd * 84 + request.traveler_fee)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Accept this request?</h1>
        <p className="text-gray-500 mb-8">You'll buy this item and bring it to India. The buyer has already paid.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 mb-6">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Item</div>
            <div className="font-semibold text-gray-900 mt-1">{request.item_name}</div>
            {request.description && <div className="text-sm text-gray-500 mt-1">{request.description}</div>}
            {request.item_url && (
              <a href={request.item_url} target="_blank" rel="noopener noreferrer"
                className="text-sm text-orange-500 hover:underline mt-1 block">
                View product →
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
            <div>
              <div className="text-xs text-gray-400">From</div>
              <div className="font-medium">{request.from_country}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Quantity</div>
              <div className="font-medium">{request.quantity}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Item price</div>
              <div className="font-medium">${request.price_usd}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Needed by</div>
              <div className="font-medium">{new Date(request.deadline).toLocaleDateString('en-IN')}</div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 mt-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>You spend (upfront)</span>
              <span>~₹{Math.round(request.price_usd * 84).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-orange-600 mt-2">
              <span>You earn</span>
              <span>₹{request.traveler_fee}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-orange-100">
              <span>Total you receive</span>
              <span>₹{totalINR.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button
            onClick={handleAccept}
            disabled={loading}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Accepting...' : 'Accept request'}
          </button>
        </div>
      </div>
    </div>
  )
}
