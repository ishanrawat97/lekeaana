/* Landing — premium boarding-pass marketing site */
/* global React, Logo, Btn, Chip, Field, Route, Placeholder, Stamp, Perf, EXAMPLES, CATALOG */

function LandingNav() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 56px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <Logo size={22} />
        <div style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--ink-2)' }}>
          <span style={{ cursor: 'pointer' }}>How it works</span>
          <span style={{ cursor: 'pointer' }}>Browse requests</span>
          <span style={{ cursor: 'pointer' }}>For travelers</span>
          <span style={{ cursor: 'pointer' }}>Trust &amp; safety</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          ESTD. 2025 · BENGALURU
        </span>
        <Btn variant="ghost" size="sm">Sign in</Btn>
        <Btn variant="primary" size="sm">Post a request</Btn>
      </div>
    </nav>
  );
}

// Marquee ticker — flight-board style
function Ticker() {
  const rows = [
    'NOW CARRYING · LAX→BLR · 47 items in escrow · ₹12,40,000 moved this week',
    'SEL→BOM · 3 travelers boarding · 18 requests open',
    'CDG→DEL · average match time 4h 12m',
    'NRT→BLR · 9 items picked up today',
  ];
  const content = rows.join('  ·  ') + '  ·  ';
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--paper)',
      borderBottom: '1px solid var(--ink)',
      overflow: 'hidden', position: 'relative', height: 34,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', height: '100%',
        whiteSpace: 'nowrap',
        animation: 'ticker 60s linear infinite',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        <span style={{ padding: '0 24px' }}>{content.repeat(3)}</span>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

// Hero — boarding pass as the center of gravity
function Hero() {
  return (
    <section style={{ padding: '80px 56px 100px', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 560px', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            <Chip>IATA · P2P IMPORT</Chip>
            <Chip variant="live">● LIVE · 128 IN TRANSIT</Chip>
          </div>
          <h1 className="serif-d" style={{
            fontSize: 96, lineHeight: 0.95, margin: 0,
            fontWeight: 400, letterSpacing: '-0.025em',
          }}>
            The world&rsquo;s shelves,<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>carried home.</em>
          </h1>
          <p style={{
            fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)',
            maxWidth: 520, marginTop: 32,
          }}>
            Lekeaana matches Indian buyers with trusted travelers flying in from
            abroad. Post what you want. Pay into escrow. A traveler picks it up
            &mdash; a rider drops it at your door.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <Btn variant="primary" size="lg">Post a request →</Btn>
            <Btn variant="ghost" size="lg">I&rsquo;m flying to India</Btn>
          </div>
          <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
            <Field label="escrow held" value="₹4.2 Cr" size="lg" />
            <Field label="travelers" value="2,847" size="lg" />
            <Field label="avg. match" value="4h 12m" size="lg" />
            <Field label="completion" value="99.1%" size="lg" />
          </div>
        </div>
        <BoardingPassHero />
      </div>
    </section>
  );
}

function BoardingPassHero() {
  return (
    <div style={{ position: 'relative', transform: 'rotate(-1.5deg)' }}>
      <div className="pass" style={{
        display: 'grid', gridTemplateColumns: '1fr 160px',
        background: 'var(--paper)',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.22), 0 0 0 1px var(--ink)',
      }}>
        {/* Main stub */}
        <div style={{ padding: '24px 28px 20px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div className="micro" style={{ marginBottom: 2 }}>LEKEAANA · BOARDING PASS</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>NO. LK-88412-2025</div>
            </div>
            <Stamp rotate={6}>IN ESCROW</Stamp>
          </div>

          <Route from="USA" to="IND" size="xl" fromLabel="from — los angeles" toLabel="to — bengaluru" />

          <div style={{ marginTop: 28 }}>
            <div className="micro" style={{ marginBottom: 6 }}>item manifest</div>
            <div style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.3 }}>
              Pokémon Prismatic Evolutions Elite Trainer Box
            </div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 3 }}>
              Qty 2 · $99.98 at retail · Insured to ₹18,000
            </div>
          </div>

          <hr className="perf" style={{ margin: '22px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <Field label="carrier" value="A. Deshmukh" size="sm" />
            <Field label="flight" value="AI-102" size="sm" />
            <Field label="etd" value="24 APR" size="sm" />
            <Field label="eta" value="25 APR" size="sm" />
          </div>
        </div>

        {/* Tear-off stub */}
        <div style={{
          borderLeft: '1.5px dashed var(--ink)',
          padding: '24px 18px', position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: 'oklch(0.97 0.006 80)',
        }}>
          <div>
            <div className="micro">gate</div>
            <div className="mono" style={{ fontSize: 34, fontWeight: 500, lineHeight: 1, marginTop: 2 }}>B14</div>
            <div className="micro" style={{ marginTop: 14 }}>seq</div>
            <div className="mono" style={{ fontSize: 18, marginTop: 2 }}>027/128</div>
          </div>
          {/* Barcode */}
          <div style={{ marginTop: 18 }}>
            <svg viewBox="0 0 120 46" width="100%" height="46" preserveAspectRatio="none">
              {[2,3,1,4,2,1,3,2,4,1,2,3,1,2,4,3,1,2,3,1,4,2,1,3,2,4,1,3].map((w, i, arr) => {
                const x = arr.slice(0,i).reduce((s,v)=>s+v+1.2, 0);
                return <rect key={i} x={x} y="0" width={w} height="46" fill="var(--ink)" />;
              })}
            </svg>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textAlign: 'center', marginTop: 4 }}>LK88412IND24APR</div>
          </div>
        </div>
      </div>

      {/* Corner stamp */}
      <div style={{ position: 'absolute', top: -18, right: 40, transform: 'rotate(8deg)' }}>
        <div style={{
          width: 82, height: 82, borderRadius: '50%',
          border: '1.5px dashed var(--accent)', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--paper)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          position: 'relative',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '0.16em' }}>VERIFIED</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.1 }}>TRAVELER</div>
            <div className="mono" style={{ fontSize: 8, color: 'var(--accent-ink)' }}>KYC · 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Route board — what's being carried
function RouteBoard() {
  const rows = [
    { flt: 'AI-102', route: 'LAX → BLR', etd: '24 APR 22:10', etc: 'Pokémon ETB ×2', gate: 'B14', status: 'live' },
    { flt: 'KE-647', route: 'ICN → BOM', etd: '24 APR 19:40', etc: 'Laneige ×3, COSRX', gate: 'C02', status: 'live' },
    { flt: 'JL-761', route: 'NRT → BLR', etd: '25 APR 11:25', etc: 'Uniqlo JJK tee, figures', gate: 'A19', status: 'hold' },
    { flt: 'AF-226', route: 'CDG → DEL', etd: '25 APR 14:00', etc: 'Chanel Coco 100ml', gate: 'E44', status: 'live' },
    { flt: 'BA-139', route: 'LHR → BLR', etd: '26 APR 21:15', etc: 'Burberry scarf, tea', gate: 'TBD', status: 'hold' },
    { flt: 'AI-174', route: 'SFO → MAA', etd: '26 APR 23:30', etc: 'Jordan 4 Retro', gate: 'G8',  status: 'boarded' },
  ];
  return (
    <section style={{ padding: '72px 56px', background: 'var(--ink)', color: 'var(--paper)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div className="micro" style={{ color: 'oklch(0.65 0.008 60)', marginBottom: 8 }}>live carrier board · last sync 09:42</div>
          <h2 className="serif-d" style={{ fontSize: 48, margin: 0, fontWeight: 400 }}>
            Six travelers. Twenty-one items. <em style={{ color: 'oklch(0.82 0.12 var(--accent-h))' }}>Boarding today.</em>
          </h2>
        </div>
        <Btn variant="ghost" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>Browse all →</Btn>
      </div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 13,
        border: '1px solid oklch(0.35 0.008 60)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '100px 180px 200px 1fr 80px 120px',
          padding: '10px 20px', borderBottom: '1px solid oklch(0.35 0.008 60)',
          color: 'oklch(0.65 0.008 60)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 10,
        }}>
          <div>Flight</div><div>Route</div><div>Departs</div><div>Carrying</div><div>Gate</div><div style={{ textAlign: 'right' }}>Status</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '100px 180px 200px 1fr 80px 120px',
            padding: '16px 20px', alignItems: 'center',
            borderBottom: i < rows.length - 1 ? '1px solid oklch(0.28 0.008 60)' : 'none',
            fontSize: 14,
          }}>
            <div style={{ fontWeight: 500 }}>{r.flt}</div>
            <div style={{ letterSpacing: '0.08em' }}>{r.route}</div>
            <div style={{ color: 'oklch(0.75 0.008 60)' }}>{r.etd}</div>
            <div style={{ fontFamily: 'var(--sans)', color: 'oklch(0.88 0.008 60)' }}>{r.etc}</div>
            <div>{r.gate}</div>
            <div style={{ textAlign: 'right' }}>
              {r.status === 'live' && <span style={{ color: 'oklch(0.75 0.13 150)' }}>● ON TIME</span>}
              {r.status === 'hold' && <span style={{ color: 'oklch(0.75 0.14 75)' }}>◐ HOLD</span>}
              {r.status === 'boarded' && <span style={{ color: 'oklch(0.7 0.008 60)' }}>✓ BOARDED</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// How it works — two columns as departure/arrival cards
function HowItWorks() {
  const buyer = [
    { n: '01', t: 'Post your manifest', d: 'A Pokémon ETB, K-beauty set, pair of Jordans — declare what you want and the country.' },
    { n: '02', t: 'Pay into escrow', d: 'Held by Razorpay. Released to the traveler only after you confirm delivery at your door.' },
    { n: '03', t: 'Your item flies home', d: 'A verified traveler buys it with their own money. A bike rider delivers at arrival.' },
  ];
  const traveler = [
    { n: '01', t: 'Browse the board', d: 'See what buyers need from your origin country. Filter by weight, price, deadline.' },
    { n: '02', t: 'Accept & purchase', d: 'Item is already paid for in escrow. Buy with your card, keep the receipt in-app.' },
    { n: '03', t: 'Earn per item', d: '₹500–1,500 per item carried. Hand off to our rider at the airport. Paid by UPI the same day.' },
  ];
  return (
    <section style={{ padding: '100px 56px', background: 'var(--paper)' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="micro" style={{ marginBottom: 10 }}>§ 02 · the mechanics</div>
        <h2 className="serif-d" style={{ fontSize: 60, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          One flight. Two journeys.
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'stretch', maxWidth: 1280, margin: '0 auto' }}>
        <HowColumn title="If you want something" subtitle="BUYER" items={buyer} />
        <Perf vertical />
        <HowColumn title="If you&rsquo;re flying in" subtitle="TRAVELER" items={traveler} align="right" />
      </div>
    </section>
  );
}

function HowColumn({ title, subtitle, items, align = 'left' }) {
  return (
    <div>
      <Chip variant="accent" style={{ marginBottom: 16 }}>{subtitle}</Chip>
      <h3 className="serif-d" style={{ fontSize: 34, margin: '0 0 32px', fontWeight: 400, fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: title }}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map(it => (
          <div key={it.n} style={{
            display: 'grid', gridTemplateColumns: '56px 1fr',
            gap: 20, padding: '20px 0',
            borderTop: '1px solid var(--rule)',
          }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--accent)', letterSpacing: '0.08em', paddingTop: 3 }}>{it.n}</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 500, marginBottom: 6 }}>{it.t}</div>
              <div style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Examples — manifest grid
function ManifestGrid() {
  return (
    <section style={{ padding: '100px 56px', background: 'oklch(0.97 0.006 85)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
        <div>
          <div className="micro" style={{ marginBottom: 10 }}>§ 03 · recent manifests</div>
          <h2 className="serif-d" style={{ fontSize: 56, margin: 0, fontWeight: 400 }}>
            What&rsquo;s coming off the plane.
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Chip>ALL</Chip>
          <Chip>TCG</Chip>
          <Chip>BEAUTY</Chip>
          <Chip>FOOTWEAR</Chip>
          <Chip>PANTRY</Chip>
          <Chip>APPAREL</Chip>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--ink)' }}>
        {EXAMPLES.map((ex, i) => {
          const col = i % 3, row = Math.floor(i / 3);
          return (
            <div key={ex.label} style={{
              padding: 24,
              background: 'var(--paper)',
              borderRight: col < 2 ? '1px solid var(--rule)' : 'none',
              borderBottom: row < 1 ? '1px solid var(--rule)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 18, minHeight: 340,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Chip>{ex.tag}</Chip>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{ex.from}</span>
              </div>
              <Placeholder label={`product · ${ex.tag.toLowerCase()}`} h={140} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.25 }}>{ex.label}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6 }}>ORIGIN · {ex.city.toUpperCase()}</div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px dashed var(--rule-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="micro">landed price</div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>{ex.inr}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="micro">vs resale</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)' }}>{ex.savings}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Trust — three receipts
function Trust() {
  const items = [
    { n: '01', t: 'Escrow, always', d: 'Every rupee sits with Razorpay. Released only on confirmed delivery. No exceptions.' },
    { n: '02', t: 'Verified travelers', d: 'Aadhaar + passport + face-match on signup. Average carrier has carried 9.2 items.' },
    { n: '03', t: 'Airport-to-door', d: 'Carrier never meets buyer. Items are handed to our bike partners at arrivals.' },
  ];
  return (
    <section style={{ padding: '100px 56px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 800, marginBottom: 64 }}>
        <div className="micro" style={{ marginBottom: 10 }}>§ 04 · trust declaration</div>
        <h2 className="serif-d" style={{ fontSize: 60, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          The money doesn&rsquo;t move<br/><em style={{ color: 'var(--accent)' }}>until your item does.</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {items.map((it, i) => (
          <div key={it.n} style={{
            padding: '32px 32px 32px 0',
            borderTop: '1px solid var(--ink)',
            paddingLeft: i > 0 ? 32 : 0,
            borderLeft: i > 0 ? '1px solid var(--rule)' : 'none',
          }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 22, letterSpacing: '0.1em' }}>§ {it.n}</div>
            <div style={{ fontSize: 26, fontWeight: 400, marginBottom: 12, letterSpacing: '-0.01em' }}>{it.t}</div>
            <div style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55 }}>{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Final CTA — departure card
function CTA() {
  return (
    <section style={{ padding: '120px 56px', background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="micro" style={{ color: 'oklch(0.65 0.008 60)', marginBottom: 16 }}>final call · departure gate</div>
        <h2 className="serif-d" style={{ fontSize: 96, lineHeight: 1, margin: 0, fontWeight: 400 }}>
          Tell us what you want. <em style={{ color: 'oklch(0.82 0.12 var(--accent-h))' }}>We&rsquo;ll fly it in.</em>
        </h2>
        <p style={{ fontSize: 19, color: 'oklch(0.78 0.008 60)', maxWidth: 520, margin: '32px auto 44px', lineHeight: 1.5 }}>
          Post your first request in under two minutes. Pay nothing until a traveler is matched.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Btn variant="accent" size="lg" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>Post a request →</Btn>
          <Btn variant="ghost" size="lg" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>See open routes</Btn>
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer style={{ padding: '48px 56px 32px', background: 'var(--paper)', borderTop: '1px solid var(--ink)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
        <div>
          <Logo size={22} />
          <div style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: 320 }}>
            Peer-to-peer import for India. Regd. under Lekeaana Technologies Pvt. Ltd., Bengaluru.
          </div>
        </div>
        {[
          { t: 'PRODUCT', l: ['Post a request', 'Browse routes', 'For travelers', 'Pricing'] },
          { t: 'COMPANY', l: ['About', 'Press', 'Careers', 'Partners'] },
          { t: 'TRUST', l: ['Escrow', 'Safety', 'Customs', 'Disputes'] },
          { t: 'LEGAL', l: ['Terms', 'Privacy', 'Refunds', 'Prohibited'] },
        ].map(col => (
          <div key={col.t}>
            <div className="micro" style={{ marginBottom: 14 }}>{col.t}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
              {col.l.map(x => <span key={x} style={{ cursor: 'pointer', color: 'var(--ink-2)' }}>{x}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid var(--rule)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
        <span>© 2025 LEKEAANA TECHNOLOGIES</span>
        <span>BENGALURU · MUMBAI · DELHI</span>
        <span>RAZORPAY SECURED · SOC 2</span>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div>
      <LandingNav />
      <Ticker />
      <Hero />
      <RouteBoard />
      <HowItWorks />
      <ManifestGrid />
      <Trust />
      <CTA />
      <LandingFooter />
    </div>
  );
}

window.Landing = Landing;
