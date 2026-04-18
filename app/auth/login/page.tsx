'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/dashboard'); router.refresh() }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'oklch(0.93 0.008 80)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Header */}
        <div style={{ padding: '18px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--rule)', background: 'var(--paper)', borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)', borderRight: '1px solid var(--ink)' }}>
          <Link href="/" style={{ fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', textDecoration: 'none' }}>
            lekeaana<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>GATE · RETURNING</span>
        </div>

        <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', borderTop: 'none', padding: '28px 20px 24px' }}>
          <div className="micro" style={{ marginBottom: 6 }}>GATE · RETURNING</div>
          <div className="serif-d" style={{ fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 8 }}>
            <em style={{ color: 'var(--accent)' }}>Welcome back.</em><br />Sign in to continue.
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24, lineHeight: 1.5 }}>Last seen recently · Bengaluru</div>

          {error && (
            <div style={{ border: '1px solid var(--accent)', background: 'var(--accent-wash)', color: 'var(--accent-ink)', padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', padding: '0 14px', marginBottom: 18 }}>
              {/* Email */}
              <div style={{ borderBottom: '1px solid var(--rule)', padding: '14px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div className="micro" style={{ marginBottom: 4 }}>email</div>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="you@example.com"
                    style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', width: '100%', color: 'var(--ink)' }}
                  />
                </div>
              </div>
              {/* Password */}
              <div style={{ padding: '14px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div className="micro" style={{ marginBottom: 4 }}>password</div>
                  <input
                    type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="••••••••"
                    style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', width: '100%', color: 'var(--ink)' }}
                  />
                </div>
                <button type="button" onClick={() => setShowPw(v => !v)}
                  style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}>
                  {showPw ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', height: 44, fontSize: 14 }}>
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
            <span className="micro">OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { t: 'Continue with Google', s: 'OAuth via Supabase' },
              { t: 'Continue with Apple',  s: 'Hide my email' },
            ].map(p => (
              <div key={p.t} style={{ border: '1px solid var(--rule)', background: 'var(--paper)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.t}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 1 }}>{p.s}</div>
                </div>
                <span style={{ color: 'var(--ink-3)' }}>→</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22, textAlign: 'center', fontSize: 12, color: 'var(--ink-3)' }}>
            New here?{' '}
            <Link href="/auth/signup" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
