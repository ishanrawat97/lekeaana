/* Mobile traveler flow — browse board, accept, carrying list */
/* global React, PhoneShell, AppNav, PhoneLabel, Chip, Btn, Field, Route, Placeholder, Stamp, OPEN_REQUESTS */

// Screen 1 — Board (browse requests) — flight-board style
function TravelerBoard() {
  return (
    <PhoneShell>
      <AppNav title="Carrier Board · BLR" />
      <div style={{ padding: '18px 16px 12px' }}>
        <div className="micro" style={{ marginBottom: 6 }}>you&rsquo;re flying</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <Route from="LAX" to="BLR" size="md" fromLabel="from" toLabel="to" />
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 8 }}>AI-102 · DEP 24 APR 22:10 · ARR 25 APR 21:40</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px', borderBottom: '1px solid var(--rule)' }}>
        {[['all',18],['TCG',4],['Beauty',7],['Shoes',3],['Pantry',2],['Other',2]].map(([t,n],i) => (
          <div key={t} style={{
            padding: '6px 10px', fontSize: 11,
            fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase',
            border: '1px solid var(--rule)',
            background: i === 0 ? 'var(--ink)' : 'var(--paper)',
            color: i === 0 ? 'var(--paper)' : 'var(--ink-2)',
          }}>
            {t} {n}
          </div>
        ))}
      </div>

      {/* Board rows */}
      <div>
        {OPEN_REQUESTS.map((r, i) => (
          <div key={r.id} style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--rule)',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 10, alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--accent)' }}>{r.id}</span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>·</span>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{r.from} → IND</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{r.item}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>
                QTY {r.qty} · ${r.usd} retail · {r.days}d left · {r.city}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 16, fontWeight: 500, color: 'var(--accent)' }}>₹{r.fee}</div>
              <div className="micro" style={{ fontSize: 9 }}>CARRIER FEE</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', background: 'oklch(0.97 0.006 85)', borderTop: '1px dashed var(--rule-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-2)' }}>
          <span>If you carry all 4 items</span>
          <span className="mono" style={{ fontWeight: 600, color: 'var(--accent)' }}>₹4,250 earned</span>
        </div>
      </div>
    </PhoneShell>
  );
}

// Screen 2 — Accept request (contract view)
function TravelerAccept() {
  return (
    <PhoneShell>
      <AppNav title="Accept request · LK-8842" />
      <div style={{ padding: '22px 16px 12px' }}>
        <Chip variant="accent" style={{ marginBottom: 12 }}>PRE-FLIGHT · REVIEW &amp; SIGN</Chip>
        <div className="serif-d" style={{ fontSize: 26, lineHeight: 1.15 }}>
          Carry <em>2 sealed boxes</em> from Los Angeles.
        </div>
      </div>

      <div style={{ margin: '8px 14px 16px', border: '1px solid var(--ink)', background: 'var(--paper)' }}>
        <div style={{ padding: 14, display: 'flex', gap: 12 }}>
          <Placeholder label="box" h={66} w={66} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Pokémon Prismatic ETB</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>Target exclusive · sealed</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>EST. WT 680G · DIMS 24×24×8CM</div>
          </div>
        </div>
        <div style={{ borderTop: '1px dashed var(--rule-2)', padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="pickup" value="TARGET, LA" size="sm" />
          <Field label="qty" value="02 UNITS" size="sm" />
          <Field label="buyer" value="R. MENON" size="sm" />
          <Field label="drop" value="BLR · 560095" size="sm" />
        </div>
      </div>

      {/* Earnings receipt */}
      <div style={{ margin: '0 14px 16px', padding: 14, background: 'var(--accent-wash)', border: '1px dashed var(--accent)' }}>
        <div className="micro" style={{ marginBottom: 10, color: 'var(--accent-ink)' }}>YOUR EARNINGS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '2px 0' }}>
          <span>Carrier fee</span><span className="mono">₹1,200</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '2px 0' }}>
          <span>On-time bonus</span><span className="mono">+₹200</span>
        </div>
        <div style={{ borderTop: '1px dashed var(--accent)', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 16 }}>
          <span>Paid to your UPI</span><span className="mono" style={{ color: 'var(--accent-ink)' }}>₹1,400</span>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>RELEASED ON DELIVERY CONFIRMATION · SAME DAY</div>
      </div>

      {/* Contract */}
      <div style={{ margin: '0 14px 20px', padding: 14, border: '1px solid var(--rule)' }}>
        <div className="micro" style={{ marginBottom: 8 }}>CARRIER AGREEMENT · §1.2</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
          I&rsquo;ll purchase this item with my own funds, keep the receipt in-app, and hand it
          unopened to the Lekeaana rider at BLR on 25 APR. Items are insured to ₹18,000.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
          <div style={{ width: 16, height: 16, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5l3 3 5-6" stroke="var(--paper)" strokeWidth="1.6" fill="none"/></svg>
          </div>
          <span style={{ fontSize: 12 }}>I agree to carry this item</span>
        </div>
      </div>

      <div style={{ padding: '0 16px 28px', display: 'flex', gap: 10 }}>
        <Btn variant="ghost">Decline</Btn>
        <Btn variant="primary" style={{ flex: 1 }}>Accept &amp; board →</Btn>
      </div>
    </PhoneShell>
  );
}

// Screen 3 — Carrying (traveler dashboard)
function TravelerCarrying() {
  return (
    <PhoneShell>
      <AppNav title="Carrying · AI-102" />
      <div style={{ padding: '22px 16px 16px' }}>
        <div className="micro" style={{ marginBottom: 6 }}>flight departs in</div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.01em' }}>03 : 42 : 18</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>24 APR 22:10 · LAX Gate 74B</div>
      </div>

      {/* Manifest cards */}
      <div style={{ padding: '0 14px 8px' }}>
        <div className="micro" style={{ marginBottom: 10, paddingLeft: 4 }}>your manifest · 3 items</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { id: 'LK-8842', item: 'Pokémon Prismatic ETB ×2', fee: 1400, status: 'purchased', stamp: '✓ BOUGHT' },
            { id: 'LK-8834', item: 'Jordan 4 Retro · size 10', fee: 1500, status: 'pending', stamp: 'TO BUY' },
            { id: 'LK-8831', item: 'Stanley Quencher 40oz', fee: 800, status: 'pending', stamp: 'TO BUY' },
          ].map(m => (
            <div key={m.id} style={{ padding: 14, border: '1px solid var(--ink)', background: 'var(--paper)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)' }}>{m.id}</span>
                <Chip variant={m.status === 'purchased' ? 'live' : 'hold'}>{m.stamp}</Chip>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{m.item}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--rule-2)' }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                  {m.status === 'purchased' ? 'Receipt uploaded · Target LA' : 'Tap to mark purchased'}
                </span>
                <span className="mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)' }}>₹{m.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total earnings */}
      <div style={{ margin: '16px 14px 16px', padding: 14, background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="micro" style={{ color: 'oklch(0.7 0.008 60)' }}>total on arrival</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 500, marginTop: 2 }}>₹3,700</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="micro" style={{ color: 'oklch(0.7 0.008 60)' }}>paid via UPI</div>
            <div className="mono" style={{ fontSize: 12, marginTop: 2 }}>aanya@okicici</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 28px' }}>
        <Btn variant="primary" style={{ width: '100%' }}>View rider handoff at BLR →</Btn>
      </div>
    </PhoneShell>
  );
}

window.TravelerFlow = function TravelerFlow() {
  return (
    <>
      <div>
        <PhoneLabel n="01" title="Carrier board" sub="Flight-board style browsing" />
        <TravelerBoard />
      </div>
      <div>
        <PhoneLabel n="02" title="Accept request" sub="Contract &amp; earnings receipt" />
        <TravelerAccept />
      </div>
      <div>
        <PhoneLabel n="03" title="Carrying" sub="Manifest &amp; countdown" />
        <TravelerCarrying />
      </div>
    </>
  );
};
