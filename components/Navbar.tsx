'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, paddingBottom: 18 }}
           className="px-page" >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Link href="/" style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', textDecoration: 'none' }}>
            lekeaana<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
          <div className="nav-links">
            <Link href="/#how-it-works" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>How it works</Link>
            <Link href="/browse" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Browse requests</Link>
            {user && (
              <Link href="/dashboard" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
            )}
          </div>
        </div>

        {/* Desktop right */}
        <div className="nav-right">
          <span className="mono nav-estd" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            ESTD. 2025 · BENGALURU
          </span>
          {user ? (
            <>
              <Link href="/request/new" className="btn btn-ghost" style={{ height: 34, padding: '0 12px', fontSize: 13 }}>
                Post Request
              </Link>
              <button onClick={signOut} className="btn btn-primary" style={{ height: 34, padding: '0 12px', fontSize: 13 }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn btn-ghost" style={{ height: 34, padding: '0 12px', fontSize: 13 }}>
                Sign in
              </Link>
              <Link href="/auth/signup" className="btn btn-primary" style={{ height: 34, padding: '0 12px', fontSize: 13 }}>
                Post a request
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`nav-mobile-panel${open ? ' open' : ''}`} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
        <Link href="/#how-it-works" onClick={() => setOpen(false)}>How it works</Link>
        <Link href="/browse" onClick={() => setOpen(false)}>Browse requests</Link>
        {user && <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
        {user ? (
          <>
            <Link href="/request/new" onClick={() => setOpen(false)}>Post Request</Link>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/auth/signup" onClick={() => setOpen(false)} style={{ color: 'var(--accent)', fontWeight: 500 }}>Post a request</Link>
          </>
        )}
      </div>
    </header>
  )
}
