'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const COUNTRIES = ['United States', 'South Korea', 'Japan', 'France', 'Italy', 'United Kingdom', 'India', 'Other']
const COUNTRY_CODE: Record<string, string> = {
  'United States': 'USA', 'South Korea': 'KOR', 'Japan': 'JPN',
  'France': 'FRA', 'Italy': 'ITA', 'United Kingdom': 'GBR', 'India': 'IND', 'Other': '---',
}

const FEE_STEPS = [300, 500, 750, 1000, 1500]

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
  const fromCode = COUNTRY_CODE[form.from_country] ?? '---'

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
    <div style={{ minHeight: '100vh', background: 'oklch(0.93 0.008 80)' }}>
      <Navbar />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <div className="micro" style={{ marginBottom: 10 }}>§ 01 · new manifest</div>
          <h1 className="serif-d" style={{ fontSize: 44, margin: 0, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.0 }}>
            Declare your import.
          </h1>
          <p style={{ marginTop: 14, fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.55 }}>
            Tell us what you need and where it&rsquo;s coming from. A matched traveler will purchase and carry it in.
          </p>
        </div>

        {error && (
          <div style={{ border: '1px solid var(--accent)', background: 'var(--accent-wash)', color: 'var(--accent-ink)', padding: '12px 16px', fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ── Item details ── */}
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', marginBottom: 2 }}>
            <div style={{ padding: '12px 18px 8px', borderBottom: '1px solid var(--rule)', background: 'oklch(0.97 0.006 85)' }}>
              <span className="micro">item details</span>
            </div>

            {/* Item name */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--rule)' }}>
              <div className="micro" style={{ marginBottom: 6 }}>item name *</div>
              <input
                type="text"
                value={form.item_name}
                onChange={e => set('item_name', e.target.value)}
                required
                placeholder="e.g. Prismatic Evolutions ETB, Laneige Lip Mask, Jordan 4 Retro…"
                style={{
                  fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500,
                  border: 'none', outline: 'none', background: 'transparent',
                  width: '100%', color: 'var(--ink)',
                }}
              />
            </div>

            {/* Description */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--rule)' }}>
              <div className="micro" style={{ marginBottom: 6 }}>description</div>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={3}
                placeholder="Specific details — size, color, variant, where to buy it…"
                style={{
                  fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.5,
                  border: 'none', outline: 'none', background: 'transparent',
                  width: '100%', color: 'var(--ink)', resize: 'none',
                }}
              />
            </div>

            {/* Product URL */}
            <div style={{ padding: '14px 18px' }}>
              <div className="micro" style={{ marginBottom: 6 }}>product url <span style={{ color: 'var(--ink-4)' }}>(optional)</span></div>
              <input
                type="url"
                value={form.item_url}
                onChange={e => set('item_url', e.target.value)}
                placeholder="https://amazon.com/…"
                style={{
                  fontFamily: 'var(--mono)', fontSize: 13,
                  border: 'none', outline: 'none', background: 'transparent',
                  width: '100%', color: 'var(--ink-2)',
                }}
              />
            </div>
          </div>

          {/* ── Route & quantity ── */}
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', borderTop: 'none', marginBottom: 2 }}>
            <div style={{ padding: '12px 18px 8px', borderBottom: '1px solid var(--rule)', background: 'oklch(0.97 0.006 85)' }}>
              <span className="micro">route & quantity</span>
            </div>

            {/* Route display */}
            <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div className="micro" style={{ marginBottom: 6 }}>from</div>
                  <div className="mono" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1, color: 'var(--ink)', marginBottom: 8 }}>
                    {fromCode}
                  </div>
                  <select
                    value={form.from_country}
                    onChange={e => set('from_country', e.target.value)}
                    style={{
                      fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                      border: '1px solid var(--rule)', background: 'var(--paper)',
                      color: 'var(--ink-2)', padding: '4px 8px', cursor: 'pointer', width: '100%',
                    }}
                  >
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <svg width="36" height="10" viewBox="0 0 42 12" fill="none" style={{ marginTop: 8, flexShrink: 0 }}>
                  <path d="M0 6 L34 6 M28 1 L34 6 L28 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" fill="none"/>
                </svg>

                <div style={{ flex: 1, minWidth: 80 }}>
                  <div className="micro" style={{ marginBottom: 6 }}>to</div>
                  <div className="mono" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1, color: 'var(--ink)', marginBottom: 8 }}>IND</div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--ink-3)', border: '1px solid var(--rule)', padding: '4px 8px' }}>INDIA · FIXED</div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div style={{ padding: '14px 18px' }}>
              <div className="micro" style={{ marginBottom: 8 }}>quantity *</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => set('quantity', n)}
                    style={{
                      width: 48, height: 48,
                      border: `1.5px solid ${form.quantity === n ? 'var(--ink)' : 'var(--rule)'}`,
                      background: form.quantity === n ? 'var(--ink)' : 'transparent',
                      color: form.quantity === n ? 'var(--paper)' : 'var(--ink-2)',
                      fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >{n}</button>
                ))}
                <div style={{ marginLeft: 4, fontSize: 12, color: 'var(--ink-3)', alignSelf: 'center', lineHeight: 1.4 }}>
                  max 3 per<br />manifest
                </div>
              </div>
            </div>
          </div>

          {/* ── Pricing ── */}
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', borderTop: 'none', marginBottom: 2 }}>
            <div style={{ padding: '12px 18px 8px', borderBottom: '1px solid var(--rule)', background: 'oklch(0.97 0.006 85)' }}>
              <span className="micro">pricing & deadline</span>
            </div>

            {/* Price USD */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--rule)' }}>
              <div className="micro" style={{ marginBottom: 6 }}>retail price in USD *</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="mono" style={{ fontSize: 22, color: 'var(--ink-3)' }}>$</span>
                <input
                  type="number"
                  min={1}
                  step="0.01"
                  value={form.price_usd}
                  onChange={e => set('price_usd', e.target.value)}
                  required
                  placeholder="0.00"
                  style={{
                    fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500,
                    border: 'none', outline: 'none', background: 'transparent',
                    width: '100%', color: 'var(--ink)',
                  }}
                />
                {form.price_usd && (
                  <span className="mono" style={{ fontSize: 13, color: 'var(--ink-3)', flexShrink: 0 }}>
                    ≈ ₹{Math.round(Number(form.price_usd) * 84).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Traveler fee */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 4 }}>
                <div className="micro">traveler fee</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>HIGHER FEE = FASTER MATCH</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {FEE_STEPS.map(fee => (
                  <button
                    key={fee}
                    type="button"
                    onClick={() => set('traveler_fee', fee)}
                    style={{
                      padding: '7px 14px',
                      border: `1.5px solid ${form.traveler_fee === fee ? 'var(--accent)' : 'var(--rule)'}`,
                      background: form.traveler_fee === fee ? 'var(--accent-wash)' : 'transparent',
                      color: form.traveler_fee === fee ? 'var(--accent-ink)' : 'var(--ink-2)',
                      fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >₹{fee}</button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div style={{ padding: '14px 18px' }}>
              <div className="micro" style={{ marginBottom: 6 }}>needed by *</div>
              <input
                type="date"
                value={form.deadline}
                onChange={e => set('deadline', e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                style={{
                  fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500,
                  border: 'none', outline: 'none', background: 'transparent',
                  color: 'var(--ink)', width: '100%',
                }}
              />
            </div>
          </div>

          {/* ── Escrow summary stub ── */}
          {totalINR > 0 && (
            <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', borderTop: 'none', marginBottom: 2 }}>
              <div style={{ padding: '12px 18px 8px', borderBottom: '1px dashed var(--rule-2)', background: 'oklch(0.97 0.006 85)' }}>
                <span className="micro">escrow summary</span>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-3)', marginBottom: 8 }}>
                  <span>Item price</span>
                  <span className="mono">${form.price_usd} · ≈ ₹{Math.round(Number(form.price_usd) * 84).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-3)', marginBottom: 14, paddingBottom: 14, borderBottom: '1px dashed var(--rule-2)' }}>
                  <span>Traveler fee</span>
                  <span className="mono">₹{form.traveler_fee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="micro" style={{ marginBottom: 3 }}>total into escrow</div>
                    <div className="mono" style={{ fontSize: 24, fontWeight: 500, color: 'var(--ink)' }}>
                      ₹{totalINR.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="stamp stamp-double" style={{ color: 'var(--live)', borderColor: 'var(--live)', transform: 'rotate(3deg)', fontSize: 9 }}>RAZORPAY HELD</span>
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                  Held until you confirm delivery at your door. No charge until a traveler is matched.
                </div>
              </div>
            </div>
          )}

          {/* ── Submit ── */}
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', borderTop: 'none', padding: '18px 18px' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', height: 52, fontSize: 15, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Filing manifest…' : 'File manifest →'}
            </button>
            <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: 'var(--ink-3)' }}>
              No charge until a traveler accepts · Cancel anytime before match
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
