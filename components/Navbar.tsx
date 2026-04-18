'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
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
    router.push('/')
    router.refresh()
  }

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 56px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <Link href="/" style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', textDecoration: 'none' }}>
          lekeaana<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--ink-2)' }}>
          <Link href="/#how-it-works" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>How it works</Link>
          <Link href="/browse" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Browse requests</Link>
          {user && (
            <Link href="/dashboard" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
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
    </nav>
  )
}
