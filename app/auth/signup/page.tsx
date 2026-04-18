'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Role } from '@/types'

export default function SignupPage() {
  const [fullName, setFullName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [phone, setPhone]         = useState('')
  const [role, setRole]           = useState<Role>('buyer')
  const [upiId, setUpiId]         = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [agreed, setAgreed]       = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, phone, role, upi_id: upiId || undefined } }
    })
    if (signUpError || !data.user) {
      setError(signUpError?.message ?? 'Signup failed')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  const roles: { key: Role; title: string; desc: string }[] = [
    { key: 'buyer',    title: 'Buyer',    desc: 'Order items from abroad' },
    { key: 'traveler', title: 'Traveler', desc: 'Earn while flying in' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'oklch(0.93 0.008 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Header */}
        <div style={{ padding: '18px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--paper)', border: '1px solid var(--ink)', borderBottom: '1px solid var(--rule)' }}>
          <Link href="/" style={{ fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', textDecoration: 'none' }}>
            lekeaana<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>NEW · TERMINAL 1</span>
        </div>

        <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', borderTop: 'none', padding: '28px 20px 24px' }}>
          <div className="micro" style={{ marginBottom: 6 }}>NEW · TERMINAL 1</div>
          <div className="serif-d" style={{ fontSize: 30, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 6 }}>
            Create your <em style={{ color: 'var(--accent)' }}>Lekeaana</em> account.
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24, lineHeight: 1.5 }}>
            Takes under a minute. No card required to sign up.
          </div>

          {error && (
            <div style={{ border: '1px solid var(--accent)', background: 'var(--accent-wash)', color: 'var(--accent-ink)', padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            {/* Role picker */}
            <div className="micro" style={{ marginBottom: 10 }}>how will you use it?</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 6 }}>
              {roles.map(r => (
                <button key={r.key} type="button" onClick={() => setRole(r.key)} style={{
                  border: role === r.key ? '1.5px solid var(--ink)' : '1px solid var(--rule)',
                  background: 'var(--paper)', padding: '14px 12px', textAlign: 'left',
                  position: 'relative', cursor: 'pointer',
                }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: role === r.key ? 'var(--accent)' : 'var(--ink-3)' }}>
                    {role === r.key ? 'SELECTED' : 'AVAILABLE'}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginTop: 8, fontFamily: 'var(--sans)' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.4, fontFamily: 'var(--sans)' }}>{r.desc}</div>
                  {role === r.key && (
                    <div style={{ position: 'absolute', top: 6, right: 6, width: 16, height: 16, background: 'var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="8" viewBox="0 0 10 10"><path d="M1 5l3 3 5-6" stroke="var(--paper)" strokeWidth="1.8" fill="none"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 18 }}>
              Switch modes anytime ·{' '}
              <button type="button" onClick={() => setRole('both')} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, padding: 0 }}>
                Do both →
              </button>
              {role === 'both' && <span style={{ marginLeft: 6 }} className="chip accent">BOTH SELECTED</span>}
            </div>

            {/* Fields */}
            <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', padding: '0 14px', marginBottom: 18 }}>
              {[
                { label: 'full name', type: 'text', value: fullName, onChange: setFullName, placeholder: 'Aanya Menon', mono: false },
                { label: 'email',    type: 'email', value: email,    onChange: setEmail,    placeholder: 'you@example.com', mono: true },
              ].map(f => (
                <div key={f.label} style={{ borderBottom: '1px solid var(--rule)', padding: '14px 0' }}>
                  <div className="micro" style={{ marginBottom: 4 }}>{f.label}</div>
                  <input
                    type={f.type} value={f.value} onChange={e => f.onChange(e.target.value)} required
                    placeholder={f.placeholder}
                    style={{ fontFamily: f.mono ? 'var(--mono)' : 'var(--sans)', fontSize: 15, fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', width: '100%', color: 'var(--ink)' }}
                  />
                </div>
              ))}
              {/* Phone */}
              <div style={{ borderBottom: '1px solid var(--rule)', padding: '14px 0' }}>
                <div className="micro" style={{ marginBottom: 4 }}>mobile</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 14 }}>+91</span>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', flex: 1, color: 'var(--ink)' }}
                  />
                </div>
              </div>
              {/* UPI — travelers only */}
              {(role === 'traveler' || role === 'both') && (
                <div style={{ borderBottom: '1px solid var(--rule)', padding: '14px 0' }}>
                  <div className="micro" style={{ marginBottom: 4 }}>upi id (for payouts)</div>
                  <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', width: '100%', color: 'var(--ink)' }}
                  />
                </div>
              )}
              {/* Password */}
              <div style={{ padding: '14px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div className="micro" style={{ marginBottom: 4 }}>password</div>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                    placeholder="••••••••••"
                    style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', width: '100%', color: 'var(--ink)' }}
                  />
                </div>
                <button type="button" onClick={() => setShowPw(v => !v)}
                  style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}>
                  {showPw ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 18, fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
              <button type="button" onClick={() => setAgreed(v => !v)} style={{ width: 14, height: 14, background: agreed ? 'var(--ink)' : 'transparent', border: '1px solid var(--ink)', marginTop: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                {agreed && <svg width="9" height="9" viewBox="0 0 10 10"><path d="M1 5l3 3 5-6" stroke="var(--paper)" strokeWidth="1.6" fill="none"/></svg>}
              </button>
              <div>I agree to the <span style={{ color: 'var(--accent)' }}>Carrier Agreement</span> and <span style={{ color: 'var(--accent)' }}>Terms</span>.</div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', height: 44, fontSize: 14 }}>
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          <div style={{ marginTop: 18, textAlign: 'center', fontSize: 12, color: 'var(--ink-3)' }}>
            Already boarding?{' '}
            <Link href="/auth/login" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
