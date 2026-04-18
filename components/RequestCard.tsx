import type { Request } from '@/types'
import Link from 'next/link'

interface Props {
  request: Request
  showAccept?: boolean
}

const COUNTRY_CODE: Record<string, string> = {
  'United States': 'USA',
  'South Korea':   'KOR',
  'Japan':         'JPN',
  'France':        'FRA',
  'Italy':         'ITA',
  'United Kingdom':'GBR',
  'India':         'IND',
}

export default function RequestCard({ request, showAccept }: Props) {
  const code = COUNTRY_CODE[request.from_country] ?? '---'
  const daysLeft = Math.ceil((new Date(request.deadline).getTime() - Date.now()) / 86400000)
  const totalINR = Math.round(request.price_usd * 84 + request.traveler_fee)
  const urgent = daysLeft < 7

  return (
    <div className="pass" style={{ padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="micro" style={{ marginBottom: 4 }}>MANIFEST · {request.id?.slice(0,8).toUpperCase()}</div>
          <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>{request.item_name}</div>
          {request.description && (
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {request.description}
            </div>
          )}
        </div>
        <div className="mono" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '0.02em', color: 'var(--ink)', marginLeft: 16, flexShrink: 0 }}>
          {code}
        </div>
      </div>

      <hr className="perf" style={{ margin: '0 20px' }} />

      {/* Data row */}
      <div style={{ padding: '12px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <div>
          <div className="micro" style={{ marginBottom: 3 }}>origin</div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{request.from_country}</div>
        </div>
        <div>
          <div className="micro" style={{ marginBottom: 3 }}>qty</div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{request.quantity}</div>
        </div>
        <div>
          <div className="micro" style={{ marginBottom: 3 }}>deadline</div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 500, color: urgent ? 'var(--accent)' : 'var(--ink)' }}>
            {daysLeft > 0 ? `${daysLeft}d` : 'URGENT'}
          </div>
        </div>
        <div>
          <div className="micro" style={{ marginBottom: 3 }}>value</div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>₹{totalINR.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <hr className="perf" style={{ margin: '0 20px' }} />

      {/* Footer row */}
      <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="micro" style={{ marginBottom: 3 }}>traveler earns</div>
          <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>₹{request.traveler_fee}</div>
        </div>
        {request.profiles && (
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
            {request.profiles.full_name}
          </div>
        )}
        {showAccept && (
          <Link href={`/order/accept/${request.id}`} className="btn btn-primary" style={{ height: 34, padding: '0 14px', fontSize: 13 }}>
            Accept
          </Link>
        )}
      </div>
    </div>
  )
}
