'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import type { Request } from '@/types'

const COUNTRY_FILTERS = [
  { label: 'ALL',  value: 'All' },
  { label: 'USA',  value: 'United States' },
  { label: 'KOR',  value: 'South Korea' },
  { label: 'JPN',  value: 'Japan' },
  { label: 'FRA',  value: 'France' },
  { label: 'GBR',  value: 'United Kingdom' },
  { label: 'ITA',  value: 'Italy' },
  { label: 'IND',  value: 'India' },
]

const COUNTRY_CODE: Record<string, string> = {
  'United States': 'USA', 'South Korea': 'KOR', 'Japan': 'JPN',
  'France': 'FRA', 'Italy': 'ITA', 'United Kingdom': 'GBR', 'India': 'IND',
}

export default function BrowsePage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    const url = filter === 'All'
      ? '/api/requests?status=open'
      : `/api/requests?status=open&from_country=${encodeURIComponent(filter)}`
    fetch(url).then(r => r.json()).then(data => { setRequests(data); setLoading(false) })
  }, [filter])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />

      {/* Header */}
      <div className="px-page" style={{ paddingTop: 28, paddingBottom: 18, borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="micro" style={{ marginBottom: 8 }}>§ carrier board · open requests</div>
            <h1 className="serif-d" style={{ fontSize: 36, margin: 0, lineHeight: 1.05 }}>
              Pick what you can carry.
            </h1>
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="btn btn-ghost"
            style={{ height: 36, padding: '0 14px', fontSize: 13 }}
            aria-label="Toggle filters"
          >
            {sidebarOpen ? 'Hide filters' : 'Filters'}
          </button>
        </div>

        {/* Mobile inline filters */}
        {sidebarOpen && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
            <div className="micro" style={{ marginBottom: 8 }}>origin country</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {COUNTRY_FILTERS.map(c => (
                <button key={c.value} onClick={() => { setFilter(c.value); setSidebarOpen(false) }} style={{
                  padding: '6px 12px', fontSize: 12, background: filter === c.value ? 'var(--ink)' : 'transparent',
                  color: filter === c.value ? 'var(--paper)' : 'var(--ink-2)',
                  border: '1px solid var(--rule)', cursor: 'pointer',
                }}>
                  <span className="mono" style={{ letterSpacing: '0.08em' }}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="browse-layout">
        {/* Desktop sidebar */}
        <aside style={{ borderRight: '1px solid var(--rule)', padding: '20px 20px 40px' }}>
          <div className="micro" style={{ marginBottom: 10 }}>origin country</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 28 }}>
            {COUNTRY_FILTERS.map(c => (
              <button key={c.value} onClick={() => setFilter(c.value)} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 10px', fontSize: 12, background: filter === c.value ? 'var(--ink)' : 'transparent',
                color: filter === c.value ? 'var(--paper)' : 'var(--ink-2)',
                border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <span className="mono" style={{ letterSpacing: '0.08em' }}>{c.label}</span>
              </button>
            ))}
          </div>

          <div className="micro" style={{ marginBottom: 10 }}>categories</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 28 }}>
            {['TCG','Beauty','Footwear','Pantry','Apparel','Tech','Perfume'].map(t => (
              <span key={t} className="chip" style={{ cursor: 'pointer' }}>{t}</span>
            ))}
          </div>

          <div className="micro" style={{ marginBottom: 10 }}>min. fee</div>
          <div style={{ border: '1px solid var(--rule)', padding: 10, fontSize: 12, fontFamily: 'var(--mono)' }}>
            ₹500 <span style={{ color: 'var(--ink-3)' }}>— ₹1,500+</span>
          </div>
        </aside>

        {/* Grid */}
        <div style={{ padding: '20px 24px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
              {loading ? '…' : `${requests.length} OPEN · ${filter === 'All' ? 'ALL ROUTES' : filter.toUpperCase()}`}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="chip" style={{ cursor: 'pointer' }}>FEE ↓</span>
              <span className="chip" style={{ cursor: 'pointer' }}>DEADLINE ↑</span>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ border: '1px solid var(--rule)', background: 'var(--paper-2)', height: 160 }} />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 16 }}>NO OPEN REQUESTS</div>
              <Link href="/request/new" className="btn btn-ghost">Be the first to post →</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {requests.map(r => {
                const code = COUNTRY_CODE[r.from_country] ?? '---'
                const daysLeft = Math.ceil((new Date(r.deadline).getTime() - Date.now()) / 86400000)
                const urgent = daysLeft < 7
                return (
                  <div key={r.id} style={{ border: '1px solid var(--rule)', background: 'var(--paper)', padding: 18, position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em' }}>{r.id.slice(0,8).toUpperCase()}</span>
                        <span className="chip">{code} → IND</span>
                      </div>
                      {urgent && <span className="mono" style={{ fontSize: 9, color: 'var(--accent)', letterSpacing: '0.12em' }}>● URGENT</span>}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{r.item_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                      Qty {r.quantity} · ${r.price_usd} retail · {r.from_country}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTop: '1px dashed var(--rule-2)', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <div className="micro" style={{ fontSize: 9 }}>NEEDED IN</div>
                        <div className="mono" style={{ fontSize: 14, fontWeight: 500, color: urgent ? 'var(--accent)' : 'var(--ink)' }}>
                          {daysLeft > 0 ? `${daysLeft} DAYS` : 'TODAY'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="micro" style={{ fontSize: 9 }}>YOU EARN</div>
                        <div className="mono" style={{ fontSize: 18, fontWeight: 500, color: 'var(--accent)' }}>₹{r.traveler_fee}</div>
                      </div>
                      <Link href={`/order/accept/${r.id}`} className="btn btn-primary" style={{ height: 34, padding: '0 14px', fontSize: 13 }}>
                        Accept →
                      </Link>
                    </div>
                    {r.profiles && (
                      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 8 }}>POSTED BY {r.profiles.full_name?.toUpperCase()}</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
