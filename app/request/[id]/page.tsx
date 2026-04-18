'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import type { Request } from '@/types'

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<Request | null>(null)

  useEffect(() => {
    fetch(`/api/requests/${id}`).then(r => r.json()).then(setRequest)
  }, [id])

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
      <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
        <div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
            request.status === 'open' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
          }`}>
            {request.status}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">{request.item_name}</h1>
          {request.description && <p className="text-gray-500 mt-2">{request.description}</p>}
          {request.item_url && (
            <a href={request.item_url} target="_blank" rel="noopener noreferrer"
              className="text-sm text-orange-500 hover:underline mt-2 block">
              View product →
            </a>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-2 gap-4 text-sm">
          <div><div className="text-gray-400">From</div><div className="font-medium mt-0.5">{request.from_country}</div></div>
          <div><div className="text-gray-400">To</div><div className="font-medium mt-0.5">{request.to_country}</div></div>
          <div><div className="text-gray-400">Quantity</div><div className="font-medium mt-0.5">{request.quantity}</div></div>
          <div><div className="text-gray-400">Price</div><div className="font-medium mt-0.5">${request.price_usd}</div></div>
          <div><div className="text-gray-400">Traveler fee</div><div className="font-medium mt-0.5 text-orange-500">₹{request.traveler_fee}</div></div>
          <div><div className="text-gray-400">Needed by</div><div className="font-medium mt-0.5">{new Date(request.deadline).toLocaleDateString('en-IN')}</div></div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5 flex justify-between items-center">
          <div className="text-sm text-gray-500">Total you pay</div>
          <div className="text-xl font-bold text-gray-900">₹{totalINR.toLocaleString('en-IN')}</div>
        </div>

        {request.status === 'open' && (
          <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-500 text-center">
            Waiting for a traveler to accept...
          </div>
        )}
      </div>
    </div>
  )
}
