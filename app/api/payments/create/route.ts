import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { order_id } = await req.json()

  const { data: order } = await supabase
    .from('orders')
    .select('*, requests(price_usd, traveler_fee, buyer_id, item_name)')
    .eq('id', order_id)
    .single()

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.requests?.buyer_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Amount in paise (INR * 100)
  const amountINR = Math.round(order.requests.price_usd * 84 + order.requests.traveler_fee)
  const amountPaise = amountINR * 100

  const razorpayOrder = await razorpay.orders.create({
    amount: amountPaise,
    currency: 'INR',
    receipt: `lka_${order_id.slice(0, 8)}`,
    notes: {
      order_id,
      item_name: order.requests.item_name,
    },
  })

  // Save razorpay order id
  await supabase.from('orders').update({ razorpay_order_id: razorpayOrder.id }).eq('id', order_id)

  return NextResponse.json({
    razorpay_order_id: razorpayOrder.id,
    amount: amountPaise,
    currency: 'INR',
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  })
}
