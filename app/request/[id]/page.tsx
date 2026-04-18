'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import type { Request } from '@/types'

const COUNTRY_CODE: Record<string, string> = {
  'United States': 'USA', 'South Korea': 'KOR', 'Japan': 'JPN',
  'France': 'FRA', 'Italy': 'ITA', 'United Kingdom': 'GBR', 'India': 'IND',
}

/* Simulated traveler offers — shown when status is open */
const MOCK_OFFERS = [
  { name: 'A. Deshmukh',   carries: 24, rating: 4.98, route: 'LAX → BLR', flight: 'AI-102',  eta: '25 APR', fee: 1100, note: 'Can pick up from Target LA tomorrow.', recommended: true },
  { name: 'P. Srinivasan', carries: 9,  rating: 4.92, route: 'SFO → BLR', flight: 'AI-174',  eta: '28 APR', fee: 1200, note: 'Flying Tue. Happy to buy at release.' },
  { name: 'R. Khanna',     carries: 3,  rating: 5.00, route: 'LAX → BOM', flight: 'DL-482',  eta: '30 APR', fee: 1400, note: 'Connecting BOM → BLR same day.' },
]

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<Request | null>(null)

  useEffect(() => {
    fetch(`/api/requests/${id}`).then(r => r.json()).then(setRequest)
  }, [id])

  if (!request) return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />
      <div style={{ textAlign: 'center', paddingTop: 120 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>LOADING MANIFEST…</div>
      </div>
    </div>
  )

  const code     = COUNTRY_CODE[request.from_country] ?? '---'
  const totalINR = Math.round(request.price_usd * 84 + request.traveler_fee)
  const daysLeft = Math.ceil((new Date(request.deadline).getTime() - Date.now()) / 86400000)
  const isOpen   = request.status === 'open'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: '32px 40px 20px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span className={`chip ${isOpen ? 'hold' : 'live'}`}>
                {isOpen ? '◐ OPEN · AWAITING CARRIER' : `● ${request.status.toUpperCase().replace('_',' ')}`}
              </span>
            </div>
            <h1 className="serif-d" style={{ fontSize: 44, margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
              {request.item_name}
            </h1>
            {request.description && (
              <p style={{ fontSize: 15, color: 'var(--ink-3)', marginTop: 8, maxWidth: 600 }}>{request.description}</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button className="btn btn-ghost" style={{ height: 34, padding: '0 12px', fontSize: 13 }}>Edit</button>
            <button className="btn btn-ghost" style={{ height: 34, padding: '0 12px', fontSize: 13, borderColor: 'var(--accent)', color: 'var(--accent)' }}>Withdraw</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0 }}>
        {/* Left: item detail */}
        <div style={{ padding: '32px 40px', borderRight: '1px solid var(--rule)' }}>
          {/* Pass */}
          <div className="pass" style={{ marginBottom: 24 }}>
            <div style={{ padding: '16px 20px', display: 'flex', gap: 16 }}>
              <div className="placeholder" style={{ height: 80, width: 80, flexShrink: 0 }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', position: 'relative', textTransform: 'uppercase', color: 'var(--ink-3)' }}>product</span>
              </div>
              <div>
                <div className="micro" style={{ marginBottom: 4 }}>manifest · qty {String(request.quantity).padStart(2,'0')}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.4 }}>
                  ${request.price_usd} retail each
                </div>
                {request.item_url && (
                  <a href={request.item_url} target="_blank" rel="noopener noreferrer"
                    className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginTop: 6, display: 'block', letterSpacing: '0.08em', textDecoration: 'none' }}>
                    VIEW PRODUCT →
                  </a>
                )}
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4, letterSpacing: '0.08em' }}>
                  {code} → IND · NEEDED BY {new Date(request.deadline).toLocaleDateString('en-IN', { day:'2-digit', month:'short' }).toUpperCase()}
                </div>
              </div>
            </div>
            <hr className="perf" style={{ margin: '0 20px' }} />
            <div style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {[
                ['origin', request.from_country],
                ['destination', 'India'],
                ['listed offer', `₹${request.traveler_fee}`],
                ['total escrow', `₹${totalINR.toLocaleString('en-IN')}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="micro" style={{ marginBottom: 3 }}>{label}</div>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ border: '1px dashed var(--rule-2)', background: 'oklch(0.97 0.006 85)', padding: 18 }}>
            <div className="micro" style={{ marginBottom: 10 }}>request controls</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" style={{ flex: 1, height: 34, fontSize: 13 }}>Edit</button>
              <button className="btn btn-ghost" style={{ flex: 1, height: 34, fontSize: 13 }}>Boost fee</button>
              <button className="btn btn-ghost" style={{ flex: 1, height: 34, fontSize: 13, borderColor: 'var(--accent)', color: 'var(--accent)' }}>Withdraw</button>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 32, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
            {[
              ['deadline in', `${daysLeft}d`],
              ['listed fee', `₹${request.traveler_fee}`],
              ['total value', `₹${totalINR.toLocaleString('en-IN')}`],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="micro" style={{ marginBottom: 4 }}>{label}</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: traveler offers */}
        <div style={{ padding: '32px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <div className="micro">carrier offers · {isOpen ? MOCK_OFFERS.length : 0}</div>
            {isOpen && <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>SORTED BY FIT</span>}
          </div>

          {isOpen ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_OFFERS.map(o => (
                <div key={o.name} style={{
                  border: o.recommended ? '1.5px solid var(--ink)' : '1px solid var(--rule)',
                  background: 'var(--paper)', padding: 18, position: 'relative',
                }}>
                  {o.recommended && (
                    <div style={{ position: 'absolute', top: -10, right: 12 }}>
                      <span className="stamp stamp-double" style={{ color: 'var(--accent)', transform: 'rotate(6deg)' }}>BEST FIT</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--paper-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13, flexShrink: 0 }}>
                      {o.name.split(' ').map(s => s[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{o.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
                        {o.carries} CARRIES · ★ {o.rating}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="mono" style={{ fontSize: 18, fontWeight: 500, color: 'var(--accent)' }}>₹{o.fee}</div>
                      <div className="micro" style={{ fontSize: 9 }}>ASKING FEE</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '10px 0', borderTop: '1px dashed var(--rule-2)', borderBottom: '1px dashed var(--rule-2)', marginBottom: 12 }}>
                    {[['route', o.route],['flight', o.flight],['arrives', o.eta]].map(([label, value]) => (
                      <div key={label}>
                        <div className="micro" style={{ fontSize: 9 }}>{label.toUpperCase()}</div>
                        <div className="mono" style={{ fontSize: 12, marginTop: 3 }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-2)', fontStyle: 'italic', marginBottom: 12 }}>
                    &ldquo;{o.note}&rdquo;
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost" style={{ height: 34, padding: '0 12px', fontSize: 13 }}>Message</button>
                    <button className={`btn ${o.recommended ? 'btn-primary' : 'btn-ghost'}`} style={{ flex: 1, height: 34, fontSize: 13 }}>
                      Pick {o.name.split(' ')[1]} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 12 }}>
                {request.status === 'matched' ? 'CARRIER MATCHED' : 'REQUEST ' + request.status.toUpperCase().replace('_',' ')}
              </div>
              <Link href={`/order/${id}`} className="btn btn-primary">View order →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
