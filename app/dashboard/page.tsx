'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import type { Request, Order } from '@/types'

const STATUS_COLOR: Record<string, string> = {
  open: 'bg-blue-50 text-blue-600',
  matched: 'bg-yellow-50 text-yellow-600',
  purchased: 'bg-purple-50 text-purple-600',
  in_transit: 'bg-orange-50 text-orange-600',
  delivered: 'bg-green-50 text-green-600',
  completed: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-500',
  accepted: 'bg-yellow-50 text-yellow-600',
}

export default function DashboardPage() {
  const [myRequests, setMyRequests] = useState<(Request & { orders?: Order[] })[]>([])
  const [myOrders, setMyOrders] = useState<Order[]>([])
  const [tab, setTab] = useState<'buyer' | 'traveler'>('buyer')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(data => {
        setMyRequests(data.myRequests ?? [])
        setMyOrders(data.myOrders ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Link
            href="/request/new"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Post request
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
          <button
            onClick={() => setTab('buyer')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'buyer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            My requests ({myRequests.length})
          </button>
          <button
            onClick={() => setTab('traveler')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'traveler' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Carrying ({myOrders.length})
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-24" />
            ))}
          </div>
        ) : tab === 'buyer' ? (
          myRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🛍️</div>
              <div className="text-gray-500 mb-4">No requests yet.</div>
              <Link href="/request/new" className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                Post your first request
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myRequests.map(req => {
                const order = req.orders?.[0]
                return (
                  <div key={req.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{req.item_name}</div>
                      <div className="text-sm text-gray-400 mt-0.5">From {req.from_country} · ${req.price_usd} · Due {new Date(req.deadline).toLocaleDateString('en-IN')}</div>
                      {order && <div className="text-sm text-gray-500 mt-1">Traveler: {(order as unknown as { profiles?: { full_name: string } }).profiles?.full_name}</div>}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${STATUS_COLOR[req.status]}`}>
                        {req.status.replace('_', ' ')}
                      </span>
                        <Link href={order ? `/order/${order.id}` : `/request/${req.id}`} className="text-sm text-orange-500 hover:underline">
                        View →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        ) : (
          myOrders.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">✈️</div>
              <div className="text-gray-500 mb-4">You haven't accepted any requests yet.</div>
              <Link href="/browse" className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                Browse requests
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{order.requests?.item_name}</div>
                    <div className="text-sm text-gray-400 mt-0.5">
                      From {order.requests?.from_country} · Earn ₹{order.requests?.traveler_fee}
                    </div>
                    {order.payment_status === 'pending' && (
                      <div className="text-xs text-yellow-600 mt-1">⏳ Waiting for buyer payment</div>
                    )}
                    {order.payment_status === 'paid' && order.status === 'accepted' && (
                      <div className="text-xs text-green-600 mt-1">✓ Payment secured — go buy the item!</div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${STATUS_COLOR[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <Link href={`/order/${order.id}`} className="text-sm text-orange-500 hover:underline">
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
