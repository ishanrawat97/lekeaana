import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from_country')
  const status = searchParams.get('status') ?? 'open'

  let query = supabase
    .from('requests')
    .select('*, profiles(full_name, avatar_url)')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (from) query = query.eq('from_country', from)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { item_name, description, item_url, quantity, price_usd, from_country, to_country, traveler_fee, deadline } = body

  const { data, error } = await supabase
    .from('requests')
    .insert({
      buyer_id: user.id,
      item_name,
      description,
      item_url,
      quantity: quantity ?? 1,
      price_usd,
      from_country: from_country ?? 'United States',
      to_country: to_country ?? 'India',
      traveler_fee: traveler_fee ?? 500,
      deadline,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
