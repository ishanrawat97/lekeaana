import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [{ data: myRequests }, { data: myOrders }, { data: requestOrders }] = await Promise.all([
    supabase
      .from('requests')
      .select('*')
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('orders')
      .select('*, requests(item_name, price_usd, traveler_fee, from_country, deadline, buyer_id)')
      .eq('traveler_id', user.id)
      .order('created_at', { ascending: false }),
    adminClient
      .from('orders')
      .select('id, request_id, status, payment_status, traveler_id')
      .in('request_id', []),
  ])

  // Fetch orders for buyer's requests using admin client
  const requests = myRequests ?? []
  const requestIds = requests.map((r: { id: string }) => r.id)
  const { data: ordersForRequests } = requestIds.length > 0
    ? await adminClient.from('orders').select('id, request_id, status, payment_status, traveler_id').in('request_id', requestIds)
    : { data: [] }

  // Attach orders to requests
  const requestsWithOrders = requests.map((r: { id: string }) => ({
    ...r,
    orders: (ordersForRequests ?? []).filter((o: { request_id: string }) => o.request_id === r.id),
  }))

  return NextResponse.json({ myRequests: requestsWithOrders, myOrders: myOrders ?? [] })
}
