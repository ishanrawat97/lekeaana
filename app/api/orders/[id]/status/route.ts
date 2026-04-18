import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { status, tracking_info } = await req.json()

  const { data: order } = await supabase
    .from('orders')
    .select('*, requests(buyer_id)')
    .eq('id', id)
    .single()

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const isTraveler = order.traveler_id === user.id
  const isBuyer = order.requests?.buyer_id === user.id

  if (!isTraveler && !isBuyer) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const updates: Record<string, string> = { status }
  if (tracking_info) updates.tracking_info = tracking_info

  const { data, error } = await adminClient
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Sync request status
  const requestStatus: Record<string, string> = {
    purchased: 'purchased',
    in_transit: 'in_transit',
    delivered: 'delivered',
    completed: 'delivered',
  }
  if (requestStatus[status]) {
    await adminClient.from('requests').update({ status: requestStatus[status] }).eq('id', order.request_id)
  }

  return NextResponse.json(data)
}
