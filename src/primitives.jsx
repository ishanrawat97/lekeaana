/* Shared primitives — boarding-pass UI atoms */
/* global React */

const { useState, useEffect, useRef, createContext, useContext, useMemo } = React;

// ───────── Chip / Code ─────────
function Chip({ children, variant = 'default', style }) {
  const cls = 'chip' + (variant !== 'default' ? ' ' + variant : '');
  return <span className={cls} style={style}>{children}</span>;
}

// ───────── Field block (label over value, monospaced) ─────────
function Field({ label, value, align = 'left', size = 'md', style }) {
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 13 : 16;
  return (
    <div style={{ textAlign: align, ...style }}>
      <div className="micro" style={{ marginBottom: 4 }}>{label}</div>
      <div className="mono" style={{ fontSize, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.1 }}>{value}</div>
    </div>
  );
}

// ───────── Route display (FROM → TO) ─────────
function Route({ from, to, fromLabel, toLabel, size = 'md' }) {
  const codeSize = size === 'xl' ? 56 : size === 'lg' ? 40 : 28;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size === 'xl' ? 20 : 14 }}>
      <div>
        <div className="micro" style={{ marginBottom: 4 }}>{fromLabel || 'from'}</div>
        <div className="mono" style={{ fontSize: codeSize, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>{from}</div>
      </div>
      <svg width={size === 'xl' ? 42 : 28} height={12} viewBox="0 0 42 12" fill="none" style={{ marginTop: 18 }}>
        <path d="M0 6 L34 6 M28 1 L34 6 L28 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" fill="none"/>
      </svg>
      <div>
        <div className="micro" style={{ marginBottom: 4 }}>{toLabel || 'to'}</div>
        <div className="mono" style={{ fontSize: codeSize, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1 }}>{to}</div>
      </div>
    </div>
  );
}

// ───────── Striped placeholder ─────────
function Placeholder({ label, h = 180, w = '100%', style }) {
  return (
    <div className="placeholder" style={{ height: h, width: w, ...style }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
        {label}
      </div>
    </div>
  );
}

// ───────── Stamp ─────────
function Stamp({ children, color, style, rotate = -4 }) {
  return (
    <span className="stamp stamp-double" style={{ color: color || 'var(--accent)', transform: `rotate(${rotate}deg)`, ...style }}>
      {children}
    </span>
  );
}

// ───────── Perforation ─────────
function Perf({ vertical = false, style }) {
  return vertical
    ? <div className="perf-v" style={style} />
    : <hr className="perf" style={style} />;
}

// ───────── Logo ─────────
function Logo({ size = 20, color = 'var(--ink)' }) {
  return (
    <span style={{ fontFamily: 'var(--sans)', fontSize: size, fontWeight: 600, letterSpacing: '-0.02em', color }}>
      lekeaana<span style={{ color: 'var(--accent)' }}>.</span>
    </span>
  );
}

// ───────── Button ─────────
function Btn({ children, variant = 'primary', onClick, as = 'button', href, style, size = 'md' }) {
  const cls = `btn btn-${variant}`;
  const base = size === 'lg' ? { height: 52, padding: '0 22px', fontSize: 15 } : size === 'sm' ? { height: 34, padding: '0 12px', fontSize: 13 } : {};
  const props = { className: cls, onClick, style: { ...base, ...style } };
  if (as === 'a') return <a href={href} {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
}

// ───────── Data ─────────
const CATALOG = [
  { code: 'USA', name: 'United States', city: 'San Francisco', ap: 'SFO' },
  { code: 'KOR', name: 'South Korea', city: 'Seoul', ap: 'ICN' },
  { code: 'JPN', name: 'Japan', city: 'Tokyo', ap: 'NRT' },
  { code: 'FRA', name: 'France', city: 'Paris', ap: 'CDG' },
  { code: 'ITA', name: 'Italy', city: 'Milan', ap: 'MXP' },
  { code: 'GBR', name: 'United Kingdom', city: 'London', ap: 'LHR' },
];

const EXAMPLES = [
  { label: 'Pokémon Prismatic Evolutions ETB', from: 'USA', city: 'Los Angeles', savings: 'Save ₹7,500', inr: '₹4,500', local: '$49.99', tag: 'TCG' },
  { label: 'Laneige Lip Sleeping Mask', from: 'KOR', city: 'Seoul', savings: '⅓ the price', inr: '₹820', local: '₩11,000', tag: 'Beauty' },
  { label: 'Air Jordan 4 Retro "Bred"', from: 'USA', city: 'New York', savings: 'At retail', inr: '₹18,400', local: '$210', tag: 'Footwear' },
  { label: 'MDH Deggi Mirch 500g × 3', from: 'IND', city: 'Delhi', savings: '⅒ of NRI stores', inr: '₹840', local: '—', tag: 'Pantry' },
  { label: 'Uniqlo × Jujutsu Kaisen tee', from: 'JPN', city: 'Tokyo', savings: 'Unavailable in IN', inr: '₹1,990', local: '¥2,990', tag: 'Apparel' },
  { label: 'Chanel Coco Mademoiselle 100ml', from: 'FRA', city: 'Paris CDG duty-free', savings: 'No CIF markup', inr: '₹14,200', local: '€138', tag: 'Perfume' },
];

const OPEN_REQUESTS = [
  { id: 'LK-8842', item: 'Pokémon Prismatic ETB', from: 'USA', qty: 2, usd: 100, fee: 1200, days: 9, buyer: 'R. Menon', city: 'Bengaluru 560095' },
  { id: 'LK-8839', item: 'Laneige Lip Mask ×3', from: 'KOR', qty: 3, usd: 30, fee: 650, days: 14, buyer: 'A. Sharma', city: 'Mumbai 400050' },
  { id: 'LK-8834', item: 'Jordan 4 Retro, size 10', from: 'USA', qty: 1, usd: 210, fee: 1500, days: 5, buyer: 'K. Iyer', city: 'Chennai 600004' },
  { id: 'LK-8830', item: 'Chanel Coco 100ml', from: 'FRA', qty: 1, usd: 150, fee: 900, days: 12, buyer: 'M. Kapoor', city: 'Delhi 110016' },
];

Object.assign(window, {
  Chip, Field, Route, Placeholder, Stamp, Perf, Logo, Btn,
  CATALOG, EXAMPLES, OPEN_REQUESTS,
});
