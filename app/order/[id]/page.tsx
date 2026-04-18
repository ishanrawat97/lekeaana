'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import type { Order } from '@/types'

const STATUS_STEPS = ['accepted', 'purchased', 'in_transit', 'delivered', 'completed']
const STATUS_LABELS: Record<string, string> = {
  accepted: 'Request accepted',
  purchased: 'Item purchased',
  in_transit: 'In transit to India',
  delivered: 'Delivered',
  completed: 'Completed',
}

declare global {
  interface Window { Razorpay: new (options: Record<string, unknown>) => { open: () => void } }
}

export default function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [tracking, setTracking] = useState('')

  const supabase = createClient()

  const fetchOrder = useCallback(async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, requests(*, profiles(full_name)), profiles(full_name)')
      .eq('id', id)
      .single()
    console.log('Order data:', data)
    setOrder(data)
  }, [id])

  useEffect(() => {
    fetchOrder()
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
  }, [fetchOrder])

  const updateStatus = async (status: string) => {
    setLoading(true)
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, tracking_info: tracking || undefined }),
    })
    await fetchOrder()
    setLoading(false)
  }

  const initiatePayment = async () => {
    setLoading(true)
    const res = await fetch('/api/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: id }),
    })
    const data = await res.json()

    const rzp = new window.Razorpay({
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpay_order_id,
      name: 'Lekeaana',
      description: order?.requests?.item_name,
      handler: async (response: Record<string, string>) => {
        console.log('Razorpay response:', response)
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...response, order_id: id }),
        })
        const verifyData = await verifyRes.json()
        console.log('Verify response:', verifyData)
        await fetchOrder()
      },
    })
    rzp.open()
    setLoading(false)
  }

  if (!order) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">Loading...</div>
    </div>
  )

  const isBuyer = userId === order.requests?.buyer_id
  const isTraveler = userId === order.traveler_id
  console.log('userId:', userId, 'buyer_id:', order.requests?.buyer_id, 'isBuyer:', isBuyer, 'payment_status:', order.payment_status)
  const currentStepIndex = STATUS_STEPS.indexOf(order.status)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.requests?.item_name}</h1>
          <p className="text-gray-500 mt-1">Order #{id.slice(0, 8)}</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Order progress</h2>
          <div className="space-y-4">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i <= currentStepIndex ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < currentStepIndex ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${i <= currentStepIndex ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  {STATUS_LABELS[step]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment (buyer) */}
        {isBuyer && order.payment_status === 'pending' && (
          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-2">Payment required</h2>
            <p className="text-sm text-gray-500 mb-4">Pay into escrow to confirm this order. Money is released only after you confirm delivery.</p>
            <div className="text-lg font-bold text-gray-900 mb-4">
              ₹{(Math.round((order.requests?.price_usd ?? 0) * 84) + (order.requests?.traveler_fee ?? 0)).toLocaleString('en-IN')}
            </div>
            <button
              onClick={initiatePayment}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg disabled:opacity-50 transition-colors"
            >
              Pay now
            </button>
          </div>
        )}

        {order.payment_status === 'paid' && order.status !== 'completed' && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-sm text-green-700 font-medium">
            ✓ Payment secured in escrow
          </div>
        )}

        {order.status === 'completed' && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-2">
            <div className="text-sm text-green-700 font-medium">✓ Order completed</div>
            {isBuyer && order.profiles?.upi_id && (
              <div className="text-sm text-gray-600">
                Pay traveler via UPI: <span className="font-semibold text-gray-900">{order.profiles.upi_id}</span>
              </div>
            )}
            {isTraveler && (
              <div className="text-sm text-gray-600">Payment will be sent to your UPI ID shortly.</div>
            )}
          </div>
        )}

        {/* Tracking (traveler) */}
        {isTraveler && order.status === 'purchased' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            <h2 className="font-semibold text-gray-900">Add flight details</h2>
            <input
              type="text"
              value={tracking}
              onChange={e => setTracking(e.target.value)}
              placeholder="e.g. Air India AI-102, arriving 25 Apr"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={() => updateStatus('in_transit')}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
              Confirm item packed
            </button>
          </div>
        )}

        {/* Traveler actions */}
        {isTraveler && order.status === 'accepted' && order.payment_status === 'paid' && (
          <button
            onClick={() => updateStatus('purchased')}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            Mark as purchased
          </button>
        )}

        {/* Buyer confirms delivery */}
        {isBuyer && order.status === 'in_transit' && (
          <button
            onClick={() => updateStatus('completed')}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            Confirm delivery & release payment
          </button>
        )}

        {/* Tracking info */}
        {order.tracking_info && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Flight details</div>
            <div className="text-sm text-gray-700">{order.tracking_info}</div>
          </div>
        )}

        {/* Order details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3 text-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Details</h2>
          <div className="flex justify-between"><span className="text-gray-500">From</span><span>{order.requests?.from_country}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Quantity</span><span>{order.requests?.quantity}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Item price</span><span>${order.requests?.price_usd}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Traveler fee</span><span>₹{order.requests?.traveler_fee}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Deadline</span><span>{order.requests?.deadline ? new Date(order.requests.deadline).toLocaleDateString('en-IN') : '-'}</span></div>
          {isBuyer && <div className="flex justify-between"><span className="text-gray-500">Traveler</span><span>{order.profiles?.full_name}</span></div>}
          {isTraveler && <div className="flex justify-between"><span className="text-gray-500">Buyer</span><span>{order.requests?.profiles?.full_name}</span></div>}
        </div>
      </div>
    </div>
  )
}
