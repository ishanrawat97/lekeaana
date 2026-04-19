import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── data ── */
const ROUTE_BOARD = [
  { flt: 'AI-102', route: 'LAX → BLR', etd: '24 APR 22:10', carrying: 'Pokémon ETB ×2', gate: 'B14', status: 'live' },
  { flt: 'KE-647', route: 'ICN → BOM', etd: '24 APR 19:40', carrying: 'Laneige ×3, COSRX',  gate: 'C02', status: 'live' },
  { flt: 'JL-761', route: 'NRT → BLR', etd: '25 APR 11:25', carrying: 'Uniqlo JJK tee, figures', gate: 'A19', status: 'hold' },
  { flt: 'AF-226', route: 'CDG → DEL', etd: '25 APR 14:00', carrying: 'Chanel Coco 100ml',  gate: 'E44', status: 'live' },
  { flt: 'BA-139', route: 'LHR → BLR', etd: '26 APR 21:15', carrying: 'Burberry scarf, tea', gate: 'TBD', status: 'hold' },
  { flt: 'AI-174', route: 'SFO → MAA', etd: '26 APR 23:30', carrying: 'Jordan 4 Retro',     gate: 'G8',  status: 'boarded' },
]

const BUYER_STEPS = [
  { n: '01', t: 'Post your manifest', d: 'A Pokémon ETB, K-beauty set, pair of Jordans — declare what you want and the country.' },
  { n: '02', t: 'Pay into escrow',    d: 'Held by Razorpay. Released to the traveler only after you confirm delivery at your door.' },
  { n: '03', t: 'Your item flies home', d: 'A verified traveler buys it with their own money. A bike rider delivers at arrival.' },
]

const TRAVELER_STEPS = [
  { n: '01', t: 'Browse the board',   d: 'See what buyers need from your origin country. Filter by weight, price, deadline.' },
  { n: '02', t: 'Accept & purchase',  d: 'Item is already paid for in escrow. Buy with your card, keep the receipt in-app.' },
  { n: '03', t: 'Earn per item',      d: '₹500–1,500 per item carried. Hand off to our rider at the airport. Paid by UPI the same day.' },
]

const EXAMPLES = [
  { label: 'Pokémon Prismatic Evolutions ETB', from: 'USA', city: 'Los Angeles', savings: 'Save ₹7,500',         inr: '₹4,500',  tag: 'TCG' },
  { label: 'Laneige Lip Sleeping Mask',         from: 'KOR', city: 'Seoul',       savings: '⅓ the price',        inr: '₹820',    tag: 'Beauty' },
  { label: 'Air Jordan 4 Retro "Bred"',         from: 'USA', city: 'New York',    savings: 'At retail',           inr: '₹18,400', tag: 'Footwear' },
  { label: 'MDH Deggi Mirch 500g × 3',          from: 'IND', city: 'Delhi',       savings: '⅒ of NRI stores',    inr: '₹840',    tag: 'Pantry' },
  { label: 'Uniqlo × Jujutsu Kaisen tee',       from: 'JPN', city: 'Tokyo',       savings: 'Unavailable in IN',   inr: '₹1,990',  tag: 'Apparel' },
  { label: 'Chanel Coco Mademoiselle 100ml',    from: 'FRA', city: 'Paris CDG',   savings: 'No CIF markup',       inr: '₹14,200', tag: 'Perfume' },
]

const TRUST_ITEMS = [
  { n: '01', t: 'Escrow, always',   d: 'Every rupee sits with Razorpay. Released only on confirmed delivery. No exceptions.' },
  { n: '02', t: 'Verified travelers', d: 'Aadhaar + passport + face-match on signup. Average carrier has carried 9.2 items.' },
  { n: '03', t: 'Airport-to-door', d: 'Carrier never meets buyer. Items are handed to our bike partners at arrivals.' },
]

/* ─────────────────────────────────────────── */

function Ticker() {
  const rows = [
    'NOW CARRYING · LAX→BLR · 47 items in escrow · ₹12,40,000 moved this week',
    'SEL→BOM · 3 travelers boarding · 18 requests open',
    'CDG→DEL · average match time 4h 12m',
    'NRT→BLR · 9 items picked up today',
  ]
  const content = rows.join('  ·  ') + '  ·  '
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderBottom: '1px solid var(--ink)', overflow: 'hidden', height: 34 }}>
      <div style={{
        display: 'flex', alignItems: 'center', height: '100%',
        whiteSpace: 'nowrap',
        animation: 'ticker 60s linear infinite',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
      }}>
        <span style={{ padding: '0 24px', textTransform: 'uppercase' }}>{(content + ' ').repeat(3)}</span>
      </div>
    </div>
  )
}

function BoardingPassHero() {
  const bars = [2,3,1,4,2,1,3,2,4,1,2,3,1,2,4,3,1,2,3,1,4,2,1,3,2,4,1,3]
  let cx = 0
  return (
    <div style={{ position: 'relative', transform: 'rotate(-1.5deg)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.22))' }}>
      <div className="pass" style={{ display: 'grid', gridTemplateColumns: '1fr 140px', boxShadow: '0 0 0 1px var(--ink)' }}>
        {/* Main stub */}
        <div style={{ padding: '20px 22px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div className="micro" style={{ marginBottom: 2 }}>LEKEAANA · BOARDING PASS</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>NO. LK-88412-2025</div>
            </div>
            <span className="stamp stamp-double" style={{ transform: 'rotate(6deg)' }}>IN ESCROW</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div className="micro" style={{ marginBottom: 4 }}>from</div>
              <div className="mono" style={{ fontSize: 40, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>USA</div>
            </div>
            <svg width="32" height="10" viewBox="0 0 42 12" fill="none" style={{ marginTop: 14 }}>
              <path d="M0 6 L34 6 M28 1 L34 6 L28 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" fill="none"/>
            </svg>
            <div>
              <div className="micro" style={{ marginBottom: 4 }}>to</div>
              <div className="mono" style={{ fontSize: 40, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>IND</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div className="micro" style={{ marginBottom: 4 }}>item manifest</div>
            <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>Pokémon Prismatic Evolutions Elite Trainer Box</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Qty 2 · $99.98 at retail · Insured to ₹18,000</div>
          </div>

          <hr className="perf" style={{ margin: '16px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[['carrier','A. Deshmukh'],['flight','AI-102'],['etd','24 APR'],['eta','25 APR']].map(([label, value]) => (
              <div key={label}>
                <div className="micro" style={{ marginBottom: 3 }}>{label}</div>
                <div className="mono" style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tear-off stub */}
        <div style={{
          borderLeft: '1.5px dashed var(--ink)', padding: '20px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: 'oklch(0.97 0.006 80)',
        }}>
          <div>
            <div className="micro">gate</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1, marginTop: 2 }}>B14</div>
            <div className="micro" style={{ marginTop: 10 }}>seq</div>
            <div className="mono" style={{ fontSize: 15, marginTop: 2 }}>027/128</div>
          </div>
          <div style={{ marginTop: 14 }}>
            <svg viewBox="0 0 120 46" width="100%" height="36" preserveAspectRatio="none">
              {bars.map((w, i) => {
                const x = cx
                cx += w + 1.2
                return <rect key={i} x={x} y="0" width={w} height="36" fill="var(--ink)" />
              })}
            </svg>
            <div className="mono" style={{ fontSize: 8, letterSpacing: '0.1em', textAlign: 'center', marginTop: 3 }}>LK88412IND24APR</div>
          </div>
        </div>
      </div>

      {/* Corner verification stamp */}
      <div style={{ position: 'absolute', top: -18, right: 30, transform: 'rotate(8deg)' }}>
        <div style={{
          width: 70, height: 70, borderRadius: '50%',
          border: '1.5px dashed var(--accent)', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--paper)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 8, letterSpacing: '0.16em' }}>VERIFIED</div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.1 }}>TRAVELER</div>
            <div className="mono" style={{ fontSize: 7, color: 'var(--accent-ink)' }}>KYC · 2025</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="px-page" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <div className="hero-grid">
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            <span className="chip">IATA · P2P IMPORT</span>
            <span className="chip live">● LIVE · 128 IN TRANSIT</span>
          </div>
          <h1 className="serif-d headline-hero">
            The world&rsquo;s shelves,<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>carried home.</em>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 520, marginTop: 28 }}>
            Lekeaana matches Indian buyers with trusted travelers flying in from abroad.
            Post what you want. Pay into escrow. A traveler picks it up — a rider drops it at your door.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/request/new" className="btn btn-primary" style={{ height: 52, padding: '0 22px', fontSize: 15 }}>
              Post a request →
            </Link>
            <Link href="/browse" className="btn btn-ghost" style={{ height: 52, padding: '0 22px', fontSize: 15 }}>
              I&rsquo;m flying to India
            </Link>
          </div>
          <div className="stats-row">
            {[['escrow held','₹4.2 Cr'],['travelers','2,847'],['avg. match','4h 12m'],['completion','99.1%']].map(([label, value]) => (
              <div key={label}>
                <div className="micro" style={{ marginBottom: 4 }}>{label}</div>
                <div className="mono" style={{ fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
        <BoardingPassHero />
      </div>
    </section>
  )
}

function RouteBoard() {
  return (
    <section className="px-page" style={{ paddingTop: 64, paddingBottom: 64, background: 'var(--ink)', color: 'var(--paper)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="micro" style={{ color: 'oklch(0.65 0.008 60)', marginBottom: 8 }}>live carrier board · last sync 09:42</div>
          <h2 className="serif-d headline-board">
            Six travelers. Twenty-one items.{' '}
            <em style={{ color: 'oklch(0.82 0.12 var(--accent-h))' }}>Boarding today.</em>
          </h2>
        </div>
        <Link href="/browse" className="btn btn-ghost" style={{ borderColor: 'var(--paper)', color: 'var(--paper)', flexShrink: 0 }}>
          Browse all →
        </Link>
      </div>
      <div className="table-scroll">
        <div style={{ fontFamily: 'var(--mono)', fontSize: 13, border: '1px solid oklch(0.35 0.008 60)', minWidth: 600 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '90px 160px 180px 1fr 70px 110px',
            padding: '10px 16px', borderBottom: '1px solid oklch(0.35 0.008 60)',
            color: 'oklch(0.65 0.008 60)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 10,
          }}>
            <div>Flight</div><div>Route</div><div>Departs</div><div>Carrying</div><div>Gate</div>
            <div style={{ textAlign: 'right' }}>Status</div>
          </div>
          {ROUTE_BOARD.map((r, i) => (
            <div key={r.flt} style={{
              display: 'grid', gridTemplateColumns: '90px 160px 180px 1fr 70px 110px',
              padding: '14px 16px', alignItems: 'center',
              borderBottom: i < ROUTE_BOARD.length - 1 ? '1px solid oklch(0.28 0.008 60)' : 'none',
              fontSize: 13,
            }}>
              <div style={{ fontWeight: 500 }}>{r.flt}</div>
              <div style={{ letterSpacing: '0.08em' }}>{r.route}</div>
              <div style={{ color: 'oklch(0.75 0.008 60)' }}>{r.etd}</div>
              <div style={{ fontFamily: 'var(--sans)', color: 'oklch(0.88 0.008 60)' }}>{r.carrying}</div>
              <div>{r.gate}</div>
              <div style={{ textAlign: 'right' }}>
                {r.status === 'live'    && <span style={{ color: 'oklch(0.75 0.13 150)' }}>● ON TIME</span>}
                {r.status === 'hold'    && <span style={{ color: 'oklch(0.75 0.14 75)' }}>◐ HOLD</span>}
                {r.status === 'boarded' && <span style={{ color: 'oklch(0.7 0.008 60)' }}>✓ BOARDED</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-page" style={{ paddingTop: 80, paddingBottom: 80, background: 'var(--paper)' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div className="micro" style={{ marginBottom: 10 }}>§ 02 · the mechanics</div>
        <h2 className="serif-d headline-how">
          One flight. Two journeys.
        </h2>
      </div>
      <div className="how-grid">
        <HowColumn title="If you want something" subtitle="BUYER" items={BUYER_STEPS} />
        <div className="perf-v" />
        <HowColumn title="If you&rsquo;re flying in" subtitle="TRAVELER" items={TRAVELER_STEPS} />
      </div>
    </section>
  )
}

function HowColumn({ title, subtitle, items }: { title: string; subtitle: string; items: typeof BUYER_STEPS }) {
  return (
    <div>
      <span className="chip accent" style={{ marginBottom: 16, display: 'inline-flex' }}>{subtitle}</span>
      <h3 className="serif-d" style={{ fontSize: 30, margin: '0 0 28px', fontWeight: 400, fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: title }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map(it => (
          <div key={it.n} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, padding: '18px 0', borderTop: '1px solid var(--rule)' }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--accent)', letterSpacing: '0.08em', paddingTop: 3 }}>{it.n}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>{it.t}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ManifestGrid() {
  return (
    <section className="px-page" style={{ paddingTop: 80, paddingBottom: 80, background: 'oklch(0.97 0.006 85)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="micro" style={{ marginBottom: 10 }}>§ 03 · recent manifests</div>
          <h2 className="serif-d headline-manifest">What&rsquo;s coming off the plane.</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['ALL','TCG','BEAUTY','FOOTWEAR','PANTRY','APPAREL'].map(tag => (
            <span key={tag} className="chip" style={{ cursor: 'pointer' }}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="manifest-grid">
        {EXAMPLES.map((ex, i) => {
          const col = i % 3, row = Math.floor(i / 3)
          return (
            <div key={ex.label} style={{
              padding: 22, background: 'var(--paper)',
              borderRight: col < 2 ? '1px solid var(--rule)' : 'none',
              borderBottom: row < 1 ? '1px solid var(--rule)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 16, minHeight: 280,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="chip">{ex.tag}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{ex.from}</span>
              </div>
              <div className="placeholder" style={{ height: 120 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', position: 'relative' }}>
                  product · {ex.tag.toLowerCase()}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25 }}>{ex.label}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>ORIGIN · {ex.city.toUpperCase()}</div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px dashed var(--rule-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="micro">landed price</div>
                  <div className="mono" style={{ fontSize: 17, fontWeight: 500 }}>{ex.inr}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="micro">vs resale</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)' }}>{ex.savings}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="px-page" style={{ paddingTop: 80, paddingBottom: 80, background: 'var(--paper)' }}>
      <div style={{ maxWidth: 800, marginBottom: 56 }}>
        <div className="micro" style={{ marginBottom: 10 }}>§ 04 · trust declaration</div>
        <h2 className="serif-d headline-trust">
          The money doesn&rsquo;t move<br />
          <em style={{ color: 'var(--accent)' }}>until your item does.</em>
        </h2>
      </div>
      <div className="trust-grid">
        {TRUST_ITEMS.map((it, i) => (
          <div key={it.n} style={{
            padding: '28px 28px 28px 0',
            borderTop: '1px solid var(--ink)',
            paddingLeft: i > 0 ? 28 : 0,
            borderLeft: i > 0 ? '1px solid var(--rule)' : 'none',
          }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 18, letterSpacing: '0.1em' }}>§ {it.n}</div>
            <div style={{ fontSize: 24, fontWeight: 400, marginBottom: 10, letterSpacing: '-0.01em' }}>{it.t}</div>
            <div style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="px-page" style={{ paddingTop: 100, paddingBottom: 100, background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="micro" style={{ color: 'oklch(0.65 0.008 60)', marginBottom: 16 }}>final call · departure gate</div>
        <h2 className="serif-d headline-cta">
          Tell us what you want.{' '}
          <em style={{ color: 'oklch(0.82 0.12 var(--accent-h))' }}>We&rsquo;ll fly it in.</em>
        </h2>
        <p style={{ fontSize: 18, color: 'oklch(0.78 0.008 60)', maxWidth: 520, margin: '28px auto 36px', lineHeight: 1.5 }}>
          Post your first request in under two minutes. Pay nothing until a traveler is matched.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/request/new" className="btn" style={{ height: 52, padding: '0 22px', fontSize: 15, background: 'var(--paper)', color: 'var(--ink)' }}>
            Post a request →
          </Link>
          <Link href="/browse" className="btn btn-ghost" style={{ height: 52, padding: '0 22px', fontSize: 15, borderColor: 'var(--paper)', color: 'var(--paper)' }}>
            See open routes
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const cols = [
    { t: 'PRODUCT',  l: ['Post a request', 'Browse routes', 'For travelers', 'Pricing'] },
    { t: 'COMPANY',  l: ['About', 'Press', 'Careers', 'Partners'] },
    { t: 'TRUST',    l: ['Escrow', 'Safety', 'Customs', 'Disputes'] },
    { t: 'LEGAL',    l: ['Terms', 'Privacy', 'Refunds', 'Prohibited'] },
  ]
  return (
    <footer className="px-page" style={{ paddingTop: 48, paddingBottom: 32, background: 'var(--paper)', borderTop: '1px solid var(--ink)' }}>
      <div className="footer-grid">
        <div>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            lekeaana<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <div style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: 300 }}>
            Peer-to-peer import for India. Regd. under Lekeaana Technologies Pvt. Ltd., Bengaluru.
          </div>
        </div>
        {cols.map(col => (
          <div key={col.t}>
            <div className="micro" style={{ marginBottom: 14 }}>{col.t}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
              {col.l.map(x => <span key={x} style={{ cursor: 'pointer', color: 'var(--ink-2)' }}>{x}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingTop: 24,
        borderTop: '1px solid var(--rule)',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
      }}>
        <span>© 2025 LEKEAANA TECHNOLOGIES</span>
        <span>BENGALURU · MUMBAI · DELHI</span>
        <span>RAZORPAY SECURED · SOC 2</span>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Ticker />
      <Hero />
      <RouteBoard />
      <HowItWorks />
      <ManifestGrid />
      <TrustSection />
      <CTA />
      <Footer />
    </div>
  )
}
