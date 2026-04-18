'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import type { Request, Order } from '@/types'

const STATUS_LABEL: Record<string, string> = {
  open: '◐ OPEN',
  matched: '● MATCHED',
  purchased: '● PURCHASED',
  in_transit: '● IN FLIGHT',
  delivered: '✓ DELIVERED',
  completed: '✓ COMPLETED',
  cancelled: '✕ CANCELLED',
  accepted: '● ACCEPTED',
}
const STATUS_COLOR: Record<string, string> = {
  open:       'oklch(0.45 0.14 75)',
  matched:    'oklch(0.45 0.13 150)',
  purchased:  'oklch(0.45 0.13 150)',
  in_transit: 'oklch(0.45 0.13 150)',
  delivered:  'oklch(0.45 0.13 150)',
  completed:  'var(--ink-3)',
  cancelled:  'var(--accent)',
  accepted:   'oklch(0.45 0.14 75)',
}

export default function DashboardPage() {
  const [myRequests, setMyRequests] = useState<(Request & { orders?: Order[] })[]>([])
  const [myOrders, setMyOrders]     = useState<Order[]>([])
  const [tab, setTab]               = useState<'requests' | 'carrying' | 'history'>('requests')
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(data => { setMyRequests(data.myRequests ?? []); setMyOrders(data.myOrders ?? []); setLoading(false) })
  }, [])

  const tabs = [
    { key: 'requests' as const, label: `My requests (${myRequests.length})` },
    { key: 'carrying' as const, label: `Carrying (${myOrders.length})` },
    { key: 'history'  as const, label: 'History' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="micro" style={{ marginBottom: 8 }}>good to see you</div>
            <h1 className="serif-d" style={{ fontSize: 44, margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
              <em style={{ color: 'var(--accent)' }}>{myRequests.filter(r => r.status === 'in_transit' || r.status === 'matched').length || 'Your'} item{myRequests.filter(r => r.status === 'in_transit').length !== 1 ? 's' : ''}</em>
              {myRequests.some(r => r.status === 'in_transit') ? ' are moving through your airspace.' : ' are ready for departure.'}
            </h1>
          </div>
          <Link href="/request/new" className="btn btn-primary" style={{ height: 44, padding: '0 18px', fontSize: 14 }}>
            + Post a new request
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 48, marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
          {[
            ['requests open', myRequests.filter(r => r.status === 'open').length.toString()],
            ['items en route', myRequests.filter(r => r.status === 'in_transit').length.toString()],
            ['carrying', myOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length.toString()],
            ['delivered · all time', myRequests.filter(r => r.status === 'delivered').length.toString()],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="micro" style={{ marginBottom: 4 }}>{label}</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 40px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', gap: 24 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '14px 0', fontSize: 13, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: tab === t.key ? '1.5px solid var(--accent)' : '1.5px solid transparent',
              color: tab === t.key ? 'var(--ink)' : 'var(--ink-3)',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: '24px 40px 48px' }}>
        {loading ? (
          <div style={{ border: '1px solid var(--ink)', padding: 32, textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>LOADING MANIFEST…</div>
          </div>
        ) : (tab === 'requests' ? (
          myRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 16 }}>NO REQUESTS FILED</div>
              <Link href="/request/new" className="btn btn-primary">Post your first request →</Link>
            </div>
          ) : (
            <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '110px 1fr 160px 160px 120px 120px 100px',
                padding: '12px 20px', borderBottom: '1px solid var(--ink)',
                background: 'oklch(0.97 0.006 85)',
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
              }}>
                <div>LK-ID</div><div>Item</div><div>Route</div><div>Carrier</div>
                <div>Deadline</div><div>Fee</div><div style={{ textAlign: 'right' }}>Status</div>
              </div>
              {myRequests.map((req, i) => {
                const order = req.orders?.[0]
                const travelerName = (order as unknown as { profiles?: { full_name: string } })?.profiles?.full_name ?? 'Awaiting match'
                return (
                  <div key={req.id} style={{
                    display: 'grid', gridTemplateColumns: '110px 1fr 160px 160px 120px 120px 100px',
                    padding: '16px 20px', alignItems: 'center', fontSize: 13,
                    borderBottom: i < myRequests.length - 1 ? '1px solid var(--rule)' : 'none',
                  }}>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em' }}>{req.id.slice(0,8).toUpperCase()}</div>
                    <div style={{ fontWeight: 500 }}>{req.item_name}</div>
                    <div className="mono" style={{ fontSize: 12, letterSpacing: '0.06em' }}>{req.from_country} → IND</div>
                    <div style={{ color: travelerName === 'Awaiting match' ? 'var(--ink-3)' : 'var(--ink)', fontStyle: travelerName === 'Awaiting match' ? 'italic' : 'normal' }}>{travelerName}</div>
                    <div className="mono" style={{ fontSize: 12 }}>{new Date(req.deadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }).toUpperCase()}</div>
                    <div className="mono" style={{ fontSize: 12 }}>₹{req.traveler_fee}</div>
                    <div style={{ textAlign: 'right' }}>
                      <Link href={order ? `/order/${order.id}` : `/request/${req.id}`} style={{
                        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em',
                        color: STATUS_COLOR[req.status] || 'var(--ink-3)',
                        textDecoration: 'none',
                      }}>
                        {STATUS_LABEL[req.status] || req.status.toUpperCase()}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        ) : tab === 'carrying' ? (
          myOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 16 }}>NO ACTIVE CARRIES</div>
              <Link href="/browse" className="btn btn-primary">Browse open requests →</Link>
            </div>
          ) : (
            <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '110px 1fr 180px 120px 120px 100px',
                padding: '12px 20px', borderBottom: '1px solid var(--ink)',
                background: 'oklch(0.97 0.006 85)',
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
              }}>
                <div>LK-ID</div><div>Item</div><div>Buyer</div><div>Earning</div><div>Deadline</div><div style={{ textAlign: 'right' }}>Status</div>
              </div>
              {myOrders.map((order, i) => (
                <div key={order.id} style={{
                  display: 'grid', gridTemplateColumns: '110px 1fr 180px 120px 120px 100px',
                  padding: '16px 20px', alignItems: 'center', fontSize: 13,
                  borderBottom: i < myOrders.length - 1 ? '1px solid var(--rule)' : 'none',
                }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em' }}>{order.id.slice(0,8).toUpperCase()}</div>
                  <div style={{ fontWeight: 500 }}>{order.requests?.item_name}</div>
                  <div style={{ color: 'var(--ink-2)' }}>{order.requests?.from_country} → IND</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>₹{order.requests?.traveler_fee}</div>
                  <div className="mono" style={{ fontSize: 12 }}>
                    {order.requests?.deadline ? new Date(order.requests.deadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }).toUpperCase() : '—'}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Link href={`/order/${order.id}`} style={{
                      fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em',
                      color: STATUS_COLOR[order.status] || 'var(--ink-3)',
                      textDecoration: 'none',
                    }}>
                      {STATUS_LABEL[order.status] || order.status.toUpperCase()}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>HISTORY COMING SOON</div>
          </div>
        ))}
      </div>
    </div>
  )
}
