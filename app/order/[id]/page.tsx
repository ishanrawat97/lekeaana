'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import type { Order } from '@/types'

declare global {
  interface Window { Razorpay: new (options: Record<string, unknown>) => { open: () => void } }
}

const JOURNEY = [
  { key: 'accepted',   label: 'Request accepted by carrier' },
  { key: 'purchased',  label: 'Item purchased' },
  { key: 'in_transit', label: 'Packed · in transit to India' },
  { key: 'delivered',  label: 'Landed · rider on the way' },
  { key: 'completed',  label: 'Delivered to your door' },
]

const COUNTRY_CODE: Record<string, string> = {
  'United States': 'LAX', 'South Korea': 'ICN', 'Japan': 'NRT',
  'France': 'CDG', 'Italy': 'MXP', 'United Kingdom': 'LHR', 'India': 'DEL',
}

export default function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder]   = useState<Order | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [tracking, setTracking] = useState('')
  const supabase = createClient()

  const fetchOrder = useCallback(async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, requests(*, profiles(full_name)), profiles(full_name, upi_id)')
      .eq('id', id)
      .single()
    setOrder(data)
  }, [id])

  useEffect(() => {
    fetchOrder()
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
  }, [fetchOrder])

  const updateStatus = async (status: string) => {
    setLoading(true)
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, tracking_info: tracking || undefined }),
    })
    await fetchOrder()
    setLoading(false)
  }

  const initiatePayment = async () => {
    setLoading(true)
    const res  = await fetch('/api/payments/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id: id }) })
    const data = await res.json()
    const rzp  = new window.Razorpay({
      key: data.key, amount: data.amount, currency: data.currency,
      order_id: data.razorpay_order_id, name: 'Lekeaana',
      description: order?.requests?.item_name,
      handler: async (response: Record<string, string>) => {
        await fetch('/api/payments/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...response, order_id: id }) })
        await fetchOrder()
      },
    })
    rzp.open()
    setLoading(false)
  }

  if (!order) return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />
      <div style={{ textAlign: 'center', paddingTop: 120 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>LOADING MANIFEST…</div>
      </div>
    </div>
  )

  const isBuyer    = userId === order.requests?.buyer_id
  const isTraveler = userId === order.traveler_id
  const currentIdx = JOURNEY.findIndex(s => s.key === order.status)
  const originCode = COUNTRY_CODE[order.requests?.from_country ?? ''] ?? 'XXX'

  const bars = [2,3,1,4,2,1,3,2,4,1,2,3,1,2,4,3,1,2,3,1,4,2,1,3,2,1,3,4,2,1,3,2,4,1,2,3]
  let bx = 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <Navbar />

      {/* Header */}
      <div style={{ padding: '32px 40px 20px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="micro" style={{ marginBottom: 8 }}>§ order {id.slice(0,8).toUpperCase()} · {order.status.replace('_',' ')}</div>
            <h1 className="serif-d" style={{ fontSize: 36, margin: 0, lineHeight: 1.1 }}>
              {order.requests?.item_name} is{' '}
              <em style={{ color: order.status === 'completed' ? 'oklch(0.45 0.13 150)' : 'var(--accent)' }}>
                {order.status === 'completed' ? 'delivered.' : order.status === 'in_transit' ? 'somewhere over the ocean.' : order.status === 'accepted' ? 'waiting to be purchased.' : 'on its way.'}
              </em>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {isTraveler && order.status === 'in_transit' && (
              <button onClick={() => updateStatus('delivered')} disabled={loading} className="btn btn-primary" style={{ height: 34, padding: '0 14px', fontSize: 13 }}>
                Mark arrived →
              </button>
            )}
            {isBuyer && order.status === 'delivered' && (
              <button onClick={() => updateStatus('completed')} disabled={loading} className="btn btn-accent" style={{ height: 34, padding: '0 14px', fontSize: 13 }}>
                Confirm delivery &amp; release payment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 640 }}>
        {/* Left: boarding pass */}
        <div style={{ padding: 40, borderRight: '1px solid var(--rule)', background: 'oklch(0.97 0.006 85)' }}>
          <div style={{ maxWidth: 500, margin: '0 auto', transform: 'rotate(-0.8deg)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.18))' }}>
            <div className="pass" style={{ border: '1.5px solid var(--ink)' }}>
              <div style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <div className="micro" style={{ marginBottom: 2 }}>LEKEAANA · BOARDING PASS</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>NO. {id.slice(0,8).toUpperCase()}</div>
                  </div>
                  <span className="stamp stamp-double" style={{
                    color: order.status === 'completed' ? 'oklch(0.45 0.13 150)' : order.status === 'in_transit' ? 'var(--live)' : 'var(--accent)',
                    transform: 'rotate(4deg)',
                  }}>
                    {order.status === 'completed' ? 'DELIVERED' : order.status === 'in_transit' ? 'IN FLIGHT' : 'IN ESCROW'}
                  </span>
                </div>

                {/* Route */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                  <div>
                    <div className="micro" style={{ marginBottom: 4 }}>{order.requests?.from_country?.toLowerCase()}</div>
                    <div className="mono" style={{ fontSize: 52, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>{originCode}</div>
                  </div>
                  <svg width="42" height="12" viewBox="0 0 42 12" fill="none" style={{ marginTop: 18 }}>
                    <path d="M0 6 L34 6 M28 1 L34 6 L28 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" fill="none"/>
                  </svg>
                  <div>
                    <div className="micro" style={{ marginBottom: 4 }}>bengaluru</div>
                    <div className="mono" style={{ fontSize: 52, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>BLR</div>
                  </div>
                </div>

                <hr className="perf" style={{ margin: '0 0 20px' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                  {[
                    ['item', order.requests?.item_name?.split(' ').slice(0,2).join(' ') ?? '—'],
                    ['carrier', order.profiles?.full_name ?? 'TBD'],
                    ['qty', (order.requests?.quantity ?? 1).toString()],
                    ['deadline', order.requests?.deadline ? new Date(order.requests.deadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }).toUpperCase() : '—'],
                    ['item value', `$${order.requests?.price_usd ?? 0}`],
                    ['carrier fee', `₹${order.requests?.traveler_fee ?? 0}`],
                    ['tracking', order.tracking_info?.split(' ').slice(0,2).join(' ') || '—'],
                    ['status', order.status.replace('_',' ').toUpperCase()],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="micro" style={{ marginBottom: 3 }}>{label}</div>
                      <div className="mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barcode stub */}
              <div style={{ borderTop: '1.5px dashed var(--ink)', padding: 20, background: 'oklch(0.97 0.006 85)', display: 'flex', alignItems: 'center', gap: 20 }}>
                <svg viewBox="0 0 200 50" width="70%" height="50" preserveAspectRatio="none">
                  {bars.map((w, i) => {
                    const x = bx; bx += w + 1.2
                    return <rect key={i} x={x} y="0" width={w} height="50" fill="var(--ink)" />
                  })}
                </svg>
                <div style={{ textAlign: 'right' }}>
                  <div className="micro">verification</div>
                  <div className="mono" style={{ fontSize: 13, marginTop: 2 }}>{id.slice(0,10).toUpperCase()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: journey log + actions */}
        <div style={{ padding: 32 }}>
          <div className="micro" style={{ marginBottom: 14 }}>journey log</div>
          {JOURNEY.map((step, i) => {
            const done = i < currentIdx
            const now  = i === currentIdx
            return (
              <div key={step.key} style={{
                display: 'grid', gridTemplateColumns: '28px 1fr',
                gap: 14, padding: '14px 0',
                borderBottom: i < JOURNEY.length - 1 ? '1px solid var(--rule)' : 'none',
                alignItems: 'center',
                opacity: done || now ? 1 : 0.4,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  border: '1.5px solid var(--ink)',
                  background: done ? 'var(--ink)' : now ? 'var(--accent)' : 'var(--paper)',
                  color: done || now ? 'var(--paper)' : 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: 11,
                }}>
                  {done ? '✓' : i + 1}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: now ? 600 : 500 }}>{step.label}</div>
                  </div>
                  {now && <span className="chip accent">NOW</span>}
                </div>
              </div>
            )
          })}

          {/* Receipt */}
          <div style={{ marginTop: 28, border: '1px solid var(--rule)', padding: 18, background: 'oklch(0.97 0.006 85)' }}>
            <div className="micro" style={{ marginBottom: 10 }}>escrow receipt</div>
            {[
              [`Item × ${order.requests?.quantity ?? 1} @ $${order.requests?.price_usd ?? 0}`, `₹${Math.round((order.requests?.price_usd ?? 0) * 84 * (order.requests?.quantity ?? 1)).toLocaleString('en-IN')}`],
              ['Carrier fee', `₹${order.requests?.traveler_fee ?? 0}`],
              ['Rider + service (6%)', `₹${Math.round(((order.requests?.price_usd ?? 0) * 84 + (order.requests?.traveler_fee ?? 0)) * 0.06)}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', color: 'var(--ink-2)' }}>
                <span>{l}</span><span className="mono">{v}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px dashed var(--rule-2)', marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 15 }}>
              <span>Total in escrow</span>
              <span className="mono">₹{Math.round((order.requests?.price_usd ?? 0) * 84 * (order.requests?.quantity ?? 1) + (order.requests?.traveler_fee ?? 0)).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action panels */}
          {isBuyer && order.payment_status === 'pending' && (
            <div style={{ marginTop: 20, border: '1px solid var(--ink)', padding: 20, background: 'var(--accent-wash)' }}>
              <div className="micro" style={{ marginBottom: 8 }}>payment required</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 16, lineHeight: 1.5 }}>
                Pay into escrow to confirm this order. Released only after delivery.
              </div>
              <button onClick={initiatePayment} disabled={loading} className="btn btn-accent" style={{ width: '100%', height: 44 }}>
                {loading ? 'Opening Razorpay…' : 'Pay now →'}
              </button>
            </div>
          )}

          {order.payment_status === 'paid' && order.status !== 'completed' && (
            <div style={{ marginTop: 20, border: '1px solid var(--live)', padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="mono" style={{ fontSize: 11, color: 'oklch(0.35 0.13 150)', letterSpacing: '0.1em' }}>✓ PAYMENT SECURED IN ESCROW</span>
            </div>
          )}

          {isTraveler && order.status === 'accepted' && order.payment_status === 'paid' && (
            <div style={{ marginTop: 20 }}>
              <button onClick={() => updateStatus('purchased')} disabled={loading} className="btn btn-primary" style={{ width: '100%', height: 44 }}>
                Mark as purchased →
              </button>
            </div>
          )}

          {isTraveler && order.status === 'purchased' && (
            <div style={{ marginTop: 20, border: '1px solid var(--ink)', padding: 20 }}>
              <div className="micro" style={{ marginBottom: 10 }}>add flight details</div>
              <input type="text" value={tracking} onChange={e => setTracking(e.target.value)}
                placeholder="e.g. Air India AI-102, arriving 25 Apr"
                style={{ fontFamily: 'var(--mono)', fontSize: 13, border: '1px solid var(--rule)', padding: '10px 12px', width: '100%', background: 'var(--paper)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
              />
              <button onClick={() => updateStatus('in_transit')} disabled={loading} className="btn btn-primary" style={{ width: '100%', height: 44 }}>
                Confirm item packed →
              </button>
            </div>
          )}

          {order.status === 'completed' && (
            <div style={{ marginTop: 20, border: '1px solid oklch(0.62 0.13 150)', padding: 20 }}>
              <span className="mono" style={{ fontSize: 11, color: 'oklch(0.35 0.13 150)', letterSpacing: '0.1em' }}>✓ ORDER COMPLETE</span>
              {isBuyer && order.profiles && (
                <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-2)' }}>
                  Carrier: <strong>{order.profiles.full_name}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
