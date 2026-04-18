export type Role = 'buyer' | 'traveler' | 'both'

export type RequestStatus = 'open' | 'matched' | 'purchased' | 'in_transit' | 'delivered' | 'cancelled'

export type OrderStatus = 'accepted' | 'purchased' | 'in_transit' | 'delivered' | 'completed' | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'released' | 'refunded'

export interface Profile {
  id: string
  full_name: string
  phone: string | null
  role: Role
  upi_id: string | null
  avatar_url: string | null
  created_at: string
}

export interface Request {
  id: string
  buyer_id: string
  item_name: string
  description: string | null
  item_url: string | null
  quantity: number
  price_usd: number
  from_country: string
  to_country: string
  traveler_fee: number
  deadline: string
  status: RequestStatus
  created_at: string
  profiles?: Profile
}

export interface Order {
  id: string
  request_id: string
  traveler_id: string
  status: OrderStatus
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  payment_status: PaymentStatus
  tracking_info: string | null
  delivery_photo_url: string | null
  created_at: string
  updated_at: string
  requests?: Request
  profiles?: Profile
}
