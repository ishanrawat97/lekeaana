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
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500 tracking-tight">
          lekeaana
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/browse" className="text-sm text-gray-600 hover:text-gray-900">
                Browse Requests
              </Link>
              <Link href="/request/new" className="text-sm text-gray-600 hover:text-gray-900">
                Post Request
              </Link>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
