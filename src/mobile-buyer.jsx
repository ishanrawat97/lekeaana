/* Mobile buyer flow — post a request, review, tracking entry */
/* global React, IOSDevice, Logo, Chip, Btn, Field, Route, Placeholder, Stamp, Perf */

const { useState } = React;

function PhoneLabel({ n, title, sub }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 14 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
        {n} · {title}
      </div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function PhoneShell({ children }) {
  return (
    <IOSDevice width={360} height={760}>
      <div style={{ background: 'var(--paper)', minHeight: '100%', paddingTop: 48 }}>{children}</div>
    </IOSDevice>
  );
}

function AppNav({ title, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px 14px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M8 2 L2 8 L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{title}</span>
      </div>
      {right || <Logo size={14} />}
    </div>
  );
}

// Screen 1 — Buyer home (dashboard)
function BuyerHome() {
  return (
    <PhoneShell>
      <AppNav title="LK · Dashboard" />
      <div style={{ padding: '18px 16px 24px' }}>
        <div className="micro" style={{ marginBottom: 6 }}>welcome, Aanya</div>
        <div className="serif-d" style={{ fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          You have <em style={{ color: 'var(--accent)' }}>2 items</em> en route.
        </div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Active item — boarding pass mini */}
        <div className="pass" style={{ padding: 16, background: 'var(--paper)', border: '1px solid var(--ink)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <Chip variant="live">● IN TRANSIT</Chip>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>LK-8842</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>Pokémon Prismatic ETB ×2</div>
          <Route from="USA" to="IND" size="md" fromLabel="LAX · booked" toLabel="BLR · 25 apr" />
          <hr className="perf" style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-2)' }}>
            <span>AI-102 · A. Deshmukh</span>
            <span style={{ color: 'var(--accent)' }}>Confirm ETA →</span>
          </div>
        </div>

        {/* Second active */}
        <div style={{ padding: 14, border: '1px solid var(--rule)', background: 'var(--paper)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Chip>● MATCHED</Chip>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>LK-8847</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Laneige Lip Mask ×3</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>KOR → IND · 02 MAY · awaiting purchase</div>
        </div>

        {/* Draft */}
        <div style={{ padding: 14, border: '1px dashed var(--rule-2)', background: 'oklch(0.97 0.006 85)' }}>
          <div className="micro" style={{ marginBottom: 6 }}>DRAFT · not posted</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Uniqlo × JJK tee (L)</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Finish and post →</div>
        </div>
      </div>

      <div style={{ padding: '24px 16px 12px' }}>
        <Btn variant="primary" style={{ width: '100%' }}>+ Post a new request</Btn>
      </div>

      <div style={{ padding: '12px 16px 30px' }}>
        <div className="micro" style={{ marginBottom: 10 }}>suggested from your wishlist</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {['COSRX Snail Essence','MDH Masalas'].map(x => (
            <div key={x} style={{ border: '1px solid var(--rule)', padding: 10 }}>
              <Placeholder label="img" h={70} />
              <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8 }}>{x}</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

// Screen 2 — Post a request (form in boarding-pass style)
function BuyerPost() {
  return (
    <PhoneShell>
      <AppNav title="New Request · 2 of 3" />
      <div style={{ padding: '20px 16px 12px' }}>
        <div className="micro" style={{ marginBottom: 6 }}>DECLARATION</div>
        <div className="serif-d" style={{ fontSize: 26, lineHeight: 1.15 }}>
          What would you like <em>carried home?</em>
        </div>
      </div>

      {/* Form — manifest style */}
      <div style={{ margin: '8px 16px', border: '1px solid var(--ink)', background: 'var(--paper)' }}>
        <div style={{ padding: 14, borderBottom: '1px dashed var(--rule-2)' }}>
          <div className="micro" style={{ marginBottom: 6 }}>item description</div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>Pokémon Prismatic ETB</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Sealed box · Target exclusive</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px dashed var(--rule-2)' }}>
          <div style={{ padding: 14, borderRight: '1px dashed var(--rule-2)' }}>
            <div className="micro" style={{ marginBottom: 6 }}>origin</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>USA</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Los Angeles, CA</div>
          </div>
          <div style={{ padding: 14 }}>
            <div className="micro" style={{ marginBottom: 6 }}>qty</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>02</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Max 3 / request</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px dashed var(--rule-2)' }}>
          <div style={{ padding: 14, borderRight: '1px dashed var(--rule-2)' }}>
            <div className="micro" style={{ marginBottom: 6 }}>retail price</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>$99.98</div>
          </div>
          <div style={{ padding: 14 }}>
            <div className="micro" style={{ marginBottom: 6 }}>carrier fee</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500, color: 'var(--accent)' }}>₹1,200</div>
          </div>
        </div>
        <div style={{ padding: 14 }}>
          <div className="micro" style={{ marginBottom: 6 }}>needed by</div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 500 }}>30 APR 2025 · 9 days</div>
        </div>
      </div>

      {/* Receipt preview */}
      <div style={{ margin: '16px 16px 20px', padding: 14, background: 'var(--accent-wash)', border: '1px solid var(--accent)' }}>
        <div className="micro" style={{ marginBottom: 8, color: 'var(--accent-ink)' }}>escrow receipt · preview</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-2)', padding: '2px 0' }}>
          <span>Item × 2 ($99.98 × 2 @ ₹84)</span><span className="mono">₹16,796</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-2)', padding: '2px 0' }}>
          <span>Carrier fee</span><span className="mono">₹1,200</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-2)', padding: '2px 0' }}>
          <span>Rider + service (6%)</span><span className="mono">₹1,080</span>
        </div>
        <div style={{ borderTop: '1px dashed var(--accent)', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 15 }}>
          <span>Hold in escrow</span><span className="mono" style={{ color: 'var(--accent-ink)' }}>₹19,076</span>
        </div>
      </div>

      <div style={{ padding: '0 16px 30px', display: 'flex', gap: 10 }}>
        <Btn variant="ghost" style={{ flex: 0 }} size="md">Back</Btn>
        <Btn variant="primary" style={{ flex: 1 }} size="md">Post &amp; pay escrow →</Btn>
      </div>
    </PhoneShell>
  );
}

// Screen 3 — Match confirmation (boarding pass issued)
function BuyerMatched() {
  return (
    <PhoneShell>
      <AppNav title="Match confirmed" />
      <div style={{ padding: '28px 16px 16px', textAlign: 'center' }}>
        <Stamp rotate={-6} style={{ color: 'var(--live)' }}>MATCHED</Stamp>
        <div className="serif-d" style={{ fontSize: 32, lineHeight: 1.1, marginTop: 18, letterSpacing: '-0.01em' }}>
          Your <em style={{ color: 'var(--accent)' }}>boarding pass</em><br/>has been issued.
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10 }}>
          A. Deshmukh accepted at 09:34 IST · flying AI-102 on 24 APR
        </div>
      </div>

      {/* Mini boarding pass */}
      <div style={{ margin: '12px 14px 16px' }}>
        <div className="pass" style={{ background: 'var(--paper)', border: '1px solid var(--ink)' }}>
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div className="micro">LEKEAANA · LK-8842</div>
              <div className="micro">SEQ 027/128</div>
            </div>
            <Route from="USA" to="IND" size="lg" fromLabel="LAX · 24 apr" toLabel="BLR · 25 apr" />
            <hr className="perf" style={{ margin: '14px 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="manifest" value="POKÉMON ETB ×2" size="sm" />
              <Field label="carrier" value="A. DESHMUKH" size="sm" />
              <Field label="flight" value="AI-102" size="sm" />
              <Field label="escrow" value="₹19,076" size="sm" />
            </div>
          </div>
          <div style={{ background: 'oklch(0.97 0.006 85)', padding: 14, borderTop: '1.5px dashed var(--ink)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 120 36" width="70%" height="36" preserveAspectRatio="none">
              {[2,3,1,4,2,1,3,2,4,1,2,3,1,2,4,3,1,2,3,1,4,2,1,3,2].map((w,i,a)=> {
                const x = a.slice(0,i).reduce((s,v)=>s+v+1.2,0);
                return <rect key={i} x={x} y="0" width={w} height="36" fill="var(--ink)"/>;
              })}
            </svg>
            <div>
              <div className="micro">gate</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}>B14</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '8px 16px 12px' }}>
        <div className="micro" style={{ marginBottom: 10 }}>next steps</div>
        {[
          { on: true, t: 'Payment captured in escrow', s: '₹19,076 held with Razorpay' },
          { on: false, t: 'Carrier purchases the item', s: 'ETA within 48h' },
          { on: false, t: 'Handoff at Bengaluru airport', s: '25 APR · rider assigned' },
          { on: false, t: 'You confirm delivery', s: 'Escrow releases to carrier' },
        ].map((s,i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--rule)' : 'none' }}>
            <div style={{ width: 18, height: 18, border: '1.5px solid var(--ink)', background: s.on ? 'var(--ink)' : 'transparent', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.on && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5l3 3 5-6" stroke="var(--paper)" strokeWidth="1.5" fill="none" strokeLinecap="square"/></svg>}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px 28px' }}>
        <Btn variant="primary" style={{ width: '100%' }}>Track this flight →</Btn>
      </div>
    </PhoneShell>
  );
}

window.BuyerFlow = function BuyerFlow() {
  return (
    <>
      <div>
        <PhoneLabel n="01" title="Buyer · home" sub="Aanya has 2 items en route" />
        <BuyerHome />
      </div>
      <div>
        <PhoneLabel n="02" title="Post a request" sub="Manifest declaration" />
        <BuyerPost />
      </div>
      <div>
        <PhoneLabel n="03" title="Match confirmed" sub="Boarding pass issued" />
        <BuyerMatched />
      </div>
    </>
  );
};

window.PhoneLabel = PhoneLabel;
window.PhoneShell = PhoneShell;
window.AppNav = AppNav;
