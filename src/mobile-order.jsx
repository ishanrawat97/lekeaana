/* Mobile order tracking — the hero screen, boarding-pass + receipt */
/* global React, PhoneShell, AppNav, PhoneLabel, Chip, Btn, Field, Route, Placeholder, Stamp */

const { useState: useStateOrder } = React;

function OrderTracking() {
  const steps = [
    { k: 'accepted',  t: 'Request accepted',     s: '09:34 · 24 APR',  on: true },
    { k: 'escrow',    t: 'Escrow captured',      s: '₹19,076 · Razorpay', on: true },
    { k: 'purchased', t: 'Purchased in LA',      s: 'Target · receipt on file', on: true },
    { k: 'packed',    t: 'Packed for AI-102',    s: 'Seat 32A · carry-on', on: true, now: true },
    { k: 'arrived',   t: 'Landed at BLR',        s: 'Rider en route',   on: false },
    { k: 'delivered', t: 'Delivered to your door', s: 'Confirm to release escrow', on: false },
  ];

  return (
    <PhoneShell>
      <AppNav title="Order · LK-8842" right={<span className="mono" style={{ fontSize: 10, color: 'var(--accent)' }}>● LIVE</span>} />

      {/* Pass header */}
      <div style={{ padding: '22px 16px 10px' }}>
        <div className="micro" style={{ marginBottom: 8 }}>boarding pass · in transit</div>
        <div className="serif-d" style={{ fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          Your item is <em style={{ color: 'var(--accent)' }}>somewhere over the Pacific.</em>
        </div>
      </div>

      {/* Full pass */}
      <div style={{ margin: '10px 14px 18px' }}>
        <div className="pass" style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', overflow: 'visible' }}>
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div className="micro">manifest</div>
                <div style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>Pokémon Prismatic ETB ×2</div>
              </div>
              <Stamp rotate={4} style={{ color: 'var(--live)' }}>IN FLIGHT</Stamp>
            </div>

            <Route from="LAX" to="BLR" size="lg" fromLabel="24 apr · 22:10 pdt" toLabel="25 apr · 21:40 ist" />

            <hr className="perf" style={{ margin: '16px 0' }} />

            {/* Flight progress path */}
            <div style={{ position: 'relative', padding: '10px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 10, height: 10, background: 'var(--ink)', borderRadius: '50%' }} />
                <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink)', margin: '0 6px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '62%', top: -12, transform: 'translateX(-50%)',
                    fontSize: 18, color: 'var(--accent)',
                  }}>✈</div>
                </div>
                <div style={{ width: 10, height: 10, border: '1.5px solid var(--ink)', borderRadius: '50%', background: 'var(--paper)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <div className="mono" style={{ fontSize: 10 }}>LAX · DEPARTED</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)' }}>7H 12M LEFT</div>
                <div className="mono" style={{ fontSize: 10 }}>BLR · 21:40</div>
              </div>
            </div>

            <hr className="perf" style={{ margin: '14px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="carrier" value="A. DESHMUKH" size="sm" />
              <Field label="flight" value="AI-102 · 32A" size="sm" />
              <Field label="rider" value="SWIGGY GO · TBD" size="sm" />
              <Field label="sealed to" value="₹18,000" size="sm" />
            </div>
          </div>

          {/* Tear-off w/ barcode */}
          <div style={{ borderTop: '1.5px dashed var(--ink)', padding: 14, background: 'oklch(0.97 0.006 85)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 120 36" width="70%" height="36" preserveAspectRatio="none">
              {[2,3,1,4,2,1,3,2,4,1,2,3,1,2,4,3,1,2,3,1,4,2,1,3,2,1,3,4,2].map((w,i,a)=> {
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

      {/* Progress as stamp sequence */}
      <div style={{ padding: '0 16px 4px' }}>
        <div className="micro" style={{ marginBottom: 12 }}>journey log</div>
        <div>
          {steps.map((s, i) => (
            <div key={s.k} style={{
              display: 'grid', gridTemplateColumns: '28px 1fr auto',
              gap: 12, padding: '14px 0',
              borderBottom: i < steps.length - 1 ? '1px solid var(--rule)' : 'none',
              alignItems: 'center',
              opacity: s.on ? 1 : 0.5,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: '1.5px solid var(--ink)',
                background: s.on ? 'var(--ink)' : 'var(--paper)',
                color: 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
                position: 'relative',
              }}>
                {s.on ? '✓' : <span style={{ color: 'var(--ink)' }}>{i+1}</span>}
                {s.now && (
                  <span style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    border: '1.5px solid var(--accent)', animation: 'pulse 2s infinite',
                  }} />
                )}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: s.now ? 600 : 500 }}>{s.t}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{s.s}</div>
              </div>
              {s.now && <Chip variant="accent">NOW</Chip>}
            </div>
          ))}
        </div>
      </div>

      {/* Receipt */}
      <div style={{ margin: '18px 14px 14px', border: '1px solid var(--rule)', background: 'oklch(0.97 0.006 85)' }}>
        <div style={{ padding: 14, borderBottom: '1px dashed var(--rule-2)' }}>
          <div className="micro" style={{ marginBottom: 8 }}>escrow · razorpay</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', color: 'var(--ink-2)' }}>
            <span>Item × 2 @ $99.98</span><span className="mono">₹16,796</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', color: 'var(--ink-2)' }}>
            <span>Carrier fee · A. Deshmukh</span><span className="mono">₹1,200</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', color: 'var(--ink-2)' }}>
            <span>Rider &amp; service (6%)</span><span className="mono">₹1,080</span>
          </div>
          <div style={{ borderTop: '1px dashed var(--rule-2)', marginTop: 6, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 14 }}>
            <span>Held in escrow</span><span className="mono">₹19,076</span>
          </div>
        </div>
        <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
          <span className="mono" style={{ letterSpacing: '0.08em', color: 'var(--ink-3)' }}>TXN pay_MvR8e2L · 24 APR 09:35</span>
          <span className="mono" style={{ color: 'var(--accent)' }}>VIEW RECEIPT ↗</span>
        </div>
      </div>

      <div style={{ padding: '4px 16px 28px' }}>
        <Btn variant="primary" style={{ width: '100%' }}>Message A. Deshmukh</Btn>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1);} 50% { opacity: 0.3; transform: scale(1.12);} }`}</style>
    </PhoneShell>
  );
}

// Delivered (completed) variant
function OrderDelivered() {
  return (
    <PhoneShell>
      <AppNav title="Order · LK-8817" right={<span className="mono" style={{ fontSize: 10, color: 'var(--live)' }}>✓ DELIVERED</span>} />
      <div style={{ padding: '28px 16px 14px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', marginBottom: 22 }}>
          <Stamp rotate={-5} style={{ color: 'var(--live)' }}>DELIVERED 25 APR</Stamp>
        </div>
        <div className="serif-d" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.01em' }}>
          Arrived. <em style={{ color: 'var(--accent)' }}>Escrow released.</em>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 14 }}>Signed for at 22:04 IST · 560095</div>
      </div>

      <div style={{ margin: '16px 14px 18px' }}>
        <Placeholder label="delivery photo · signed receipt" h={180} />
      </div>

      {/* Final pass — with rotated stamps */}
      <div style={{ margin: '0 14px 18px', position: 'relative' }}>
        <div className="pass" style={{ background: 'var(--paper)', border: '1px solid var(--ink)', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="micro">FINAL · LK-8817 · COMPLETE</div>
            <div className="micro">DEC 2024 · LK</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Laneige Lip Sleeping Mask ×3</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>SEL → BLR · KE-647 · CARRIER S. RAO</div>
          <hr className="perf" style={{ margin: '12px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="delivered" value="25 APR · 22:04" size="sm" />
            <Field label="paid carrier" value="₹650" size="sm" />
          </div>
        </div>
        {/* Overlapping stamps */}
        <div style={{ position: 'absolute', top: -10, right: 14 }}>
          <Stamp rotate={12}>PAID</Stamp>
        </div>
      </div>

      {/* Rate carrier */}
      <div style={{ margin: '0 14px 20px', padding: 14, border: '1px solid var(--rule)' }}>
        <div className="micro" style={{ marginBottom: 10 }}>rate your carrier</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--paper-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>SR</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>S. Rao</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>12 CARRIES · 4.97★</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} style={{
              flex: 1, height: 42, border: '1px solid var(--rule)',
              background: n <= 5 ? 'var(--accent-wash)' : 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: 'var(--accent)',
            }}>★</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px 28px' }}>
        <Btn variant="primary" style={{ width: '100%' }}>Post another request →</Btn>
      </div>
    </PhoneShell>
  );
}

window.OrderFlow = function OrderFlow() {
  return (
    <>
      <div>
        <PhoneLabel n="hero" title="In transit" sub="The flagship screen · live boarding pass" />
        <OrderTracking />
      </div>
      <div>
        <PhoneLabel n="final" title="Delivered" sub="Escrow released · rate carrier" />
        <OrderDelivered />
      </div>
    </>
  );
};
