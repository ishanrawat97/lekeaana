import type { Request } from '@/types'
import Link from 'next/link'

interface Props {
  request: Request
  showAccept?: boolean
}

const FLAG: Record<string, string> = {
  'United States': '🇺🇸',
  'South Korea': '🇰🇷',
  'Japan': '🇯🇵',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'United Kingdom': '🇬🇧',
  'India': '🇮🇳',
}

export default function RequestCard({ request, showAccept }: Props) {
  const flag = FLAG[request.from_country] ?? '🌍'
  const daysLeft = Math.ceil((new Date(request.deadline).getTime() - Date.now()) / 86400000)
  const totalINR = Math.round(request.price_usd * 84 + request.traveler_fee)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-gray-900">{request.item_name}</div>
          {request.description && (
            <div className="text-sm text-gray-500 mt-0.5 line-clamp-2">{request.description}</div>
          )}
        </div>
        <span className="text-2xl flex-shrink-0">{flag}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-xs bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full font-medium">
          From {request.from_country}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
          Qty: {request.quantity}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
          ${request.price_usd}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full ${daysLeft < 7 ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'}`}>
          {daysLeft > 0 ? `${daysLeft}d left` : 'Urgent'}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <div>
          <div className="text-xs text-gray-400">Traveler earns</div>
          <div className="font-semibold text-orange-500">₹{request.traveler_fee}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Total value</div>
          <div className="text-sm font-medium text-gray-700">₹{totalINR.toLocaleString('en-IN')}</div>
        </div>
        {showAccept && (
          <Link
            href={`/order/accept/${request.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Accept
          </Link>
        )}
      </div>

      {request.profiles && (
        <div className="mt-3 text-xs text-gray-400">
          Posted by {request.profiles.full_name}
        </div>
      )}
    </div>
  )
}
