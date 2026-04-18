import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { request_id } = await req.json()

  // Check request is still open
  const { data: request } = await supabase
    .from('requests')
    .select('id, status, buyer_id')
    .eq('id', request_id)
    .single()

  if (!request) return NextResponse.json({ error: 'Request not found' }, { status: 404 })
  if (request.status !== 'open') return NextResponse.json({ error: 'Request already matched' }, { status: 409 })
  if (request.buyer_id === user.id) return NextResponse.json({ error: 'You cannot accept your own request' }, { status: 400 })

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ request_id, traveler_id: user.id })
    .select()
    .single()

  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 })

  // Update request status (admin client needed — travelers can't update requests via RLS)
  await adminClient.from('requests').update({ status: 'matched' }).eq('id', request_id)

  return NextResponse.json(order, { status: 201 })
}
