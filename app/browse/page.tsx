'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import RequestCard from '@/components/RequestCard'
import type { Request } from '@/types'

const COUNTRIES = ['All', 'United States', 'South Korea', 'Japan', 'France', 'Italy', 'United Kingdom', 'India']

export default function BrowsePage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const url = filter === 'All'
      ? '/api/requests?status=open'
      : `/api/requests?status=open&from_country=${encodeURIComponent(filter)}`

    fetch(url)
      .then(r => r.json())
      .then(data => { setRequests(data); setLoading(false) })
  }, [filter])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Open requests</h1>
          <p className="text-gray-500 mt-1">Pick what you can carry. Earn ₹500–1500 per item.</p>
        </div>

        {/* Country filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {COUNTRIES.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                filter === c
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">✈️</div>
            <div>No open requests for this route yet.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map(r => (
              <RequestCard key={r.id} request={r} showAccept />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
