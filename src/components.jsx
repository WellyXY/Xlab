// components.jsx — shared Trendi UI components

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Status bar (clean, opaque-text)
// ─────────────────────────────────────────────────────────────
function TrStatus({ time = '9:41' }) {
  return (
    <div className="trendi-status">
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
      <div className="trendi-status__icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="currentColor"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 3C9.4 3 11.2 3.7 12.5 5L13.5 4C12 2.4 9.9 1.5 7.5 1.5C5.1 1.5 3 2.4 1.5 4L2.5 5C3.8 3.7 5.6 3 7.5 3Z" fill="currentColor"/>
          <circle cx="7.5" cy="9" r="1.4" fill="currentColor"/>
          <path d="M7.5 6C8.7 6 9.8 6.5 10.6 7.3L11.6 6.3C10.5 5.2 9.1 4.5 7.5 4.5C5.9 4.5 4.5 5.2 3.4 6.3L4.4 7.3C5.2 6.5 6.3 6 7.5 6Z" fill="currentColor"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor"/>
          <path d="M23 4v4c0.7 -0.2 1.2 -1 1.2 -2c0 -1 -0.5 -1.8 -1.2 -2z" fill="currentColor" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// Home indicator (overlay so screens can color-match)
function TrHome({ tone = 'auto' }) {
  const c = tone === 'dark' ? 'rgba(0,0,0,0.4)' : tone === 'light' ? 'rgba(255,255,255,0.7)' : 'currentColor';
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 70, pointerEvents: 'none',
    }}>
      <div style={{ width: 134, height: 5, borderRadius: 100, background: c, opacity: 0.85 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Trend video thumb — animated abstract loop with persona label
// Uses CSS gradients + subtle motion; deterministic from seed.
// ─────────────────────────────────────────────────────────────
function TrendThumb({ seed = 0, name, posts, badge, selected, onClick, ratio = '9 / 16' }) {
  const palettes = [
    ['#FF2E63', '#7A1B3F', '#FFC0D6'],
    ['#C5FF3D', '#3D5C00', '#E8FFB0'],
    ['#2E5BFF', '#091F66', '#A8C0FF'],
    ['#FF8A00', '#5C2E00', '#FFD9A8'],
    ['#9D4EDD', '#3A1761', '#E0C8FF'],
    ['#00D9C0', '#00524A', '#A8FFEF'],
    ['#FF3D7F', '#5C0024', '#FFC2D8'],
    ['#FFE600', '#5C5400', '#FFF59E'],
  ];
  const p = palettes[seed % palettes.length];
  const styleA = `radial-gradient(80% 60% at ${20 + (seed*17)%60}% ${20 + (seed*23)%60}%, ${p[0]} 0%, transparent 60%),
                 radial-gradient(70% 50% at ${60 + (seed*11)%30}% ${70 + (seed*19)%20}%, ${p[2]} 0%, transparent 55%),
                 linear-gradient(${(seed*47)%180}deg, ${p[1]} 0%, ${p[0]} 100%)`;
  return (
    <div onClick={onClick} style={{
      position: 'relative', aspectRatio: ratio, borderRadius: 18, overflow: 'hidden',
      cursor: 'pointer', flexShrink: 0,
      boxShadow: selected ? '0 0 0 3px var(--accent), 0 0 24px var(--accent-glow)' : '0 4px 16px rgba(0,0,0,0.25)',
      transition: 'box-shadow 0.2s, transform 0.2s',
      transform: selected ? 'scale(1.02)' : 'scale(1)',
      background: '#000',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: styleA }}>
        {/* Animated blob layers (silent autoplay vibe) */}
        <div style={{
          position: 'absolute', width: '70%', height: '70%',
          left: '15%', top: '15%',
          background: `radial-gradient(circle, ${p[2]}cc 0%, transparent 70%)`,
          mixBlendMode: 'screen',
          animation: `trendi-blob ${8 + (seed%5)}s ease-in-out infinite`,
          animationDelay: `${-seed * 0.7}s`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(${(seed*31)%180}deg, transparent 0 8px, rgba(255,255,255,0.04) 8px 9px)`,
        }} />
      </div>

      {/* film grain */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top, transparent 50%, rgba(0,0,0,0.45) 100%)',
      }} />

      {/* Selected check */}
      {selected && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--accent)', color: 'var(--on-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 3px rgba(0,0,0,0.4)',
          animation: 'trendi-bounce-in 0.3s',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7.2l2.8 2.8L11 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* badge top-left */}
      {badge && (
        <div style={{
          position: 'absolute', top: 10, left: 10,
          fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 600,
          letterSpacing: 0.06, textTransform: 'uppercase',
          background: 'rgba(0,0,0,0.55)', color: '#fff',
          padding: '4px 8px', borderRadius: 999, backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255,255,255,0.15)',
        }}>
          {badge}
        </div>
      )}

      {/* metadata bottom */}
      {(name || posts) && (
        <div style={{
          position: 'absolute', left: 10, right: 10, bottom: 10,
          color: '#fff',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
            letterSpacing: '-0.01em', lineHeight: 1.15,
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}>{name}</div>
          {posts && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.85,
              marginTop: 2,
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}>{posts}</div>
          )}
        </div>
      )}

      {/* play indicator (small dot) */}
      <div style={{
        position: 'absolute', bottom: 11, right: 12,
        width: 6, height: 6, borderRadius: '50%',
        background: '#fff',
        animation: 'trendi-pulse 1.6s ease-in-out infinite',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// User photo placeholder — abstract portrait silhouette
// ─────────────────────────────────────────────────────────────
function PortraitPlaceholder({ size = '100%', radius = 24 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, overflow: 'hidden',
      position: 'relative',
      background: `
        radial-gradient(50% 40% at 50% 38%, #f0c8a8 0%, #c89b75 70%, transparent 75%),
        radial-gradient(50% 35% at 50% 75%, #2a3340 0%, #1a1f2a 60%, transparent 70%),
        linear-gradient(180deg, #6b8aa0 0%, #2d4456 60%, #1a2a36 100%)
      `,
    }}>
      {/* Hair */}
      <div style={{
        position: 'absolute', top: '12%', left: '28%', width: '44%', height: '36%',
        background: '#1a1410',
        borderRadius: '50% 50% 40% 40%',
      }} />
      {/* Subtle stripes overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(90deg, transparent 0 12px, rgba(0,0,0,0.04) 12px 13px)',
      }} />
    </div>
  );
}

// Bottom CTA bar — sticks to bottom of phone screen, above home indicator
function BottomCTA({ children, sticky = true }) {
  return (
    <div style={{
      position: sticky ? 'absolute' : 'relative',
      left: 0, right: 0, bottom: 0,
      padding: '14px 20px 28px',
      background: sticky ? 'linear-gradient(180deg, transparent 0%, var(--bg) 30%)' : 'transparent',
      zIndex: 40,
    }}>
      {children}
    </div>
  );
}

// Header with back button + step indicator
function ScreenHeader({ step, total, onBack, right }) {
  return (
    <div style={{
      position: 'absolute', top: 54, left: 0, right: 0,
      padding: '8px 16px',
      display: 'flex', alignItems: 'center', gap: 12,
      zIndex: 30,
    }}>
      <button onClick={onBack} aria-label="Back" style={{
        width: 38, height: 38, borderRadius: 999,
        background: 'var(--bg-elev)', border: '1px solid var(--hairline)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text)', cursor: 'pointer', flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {step != null && (
        <div className="trendi-step">
          <span>Step {step} of {total}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`trendi-step__dot ${i < step ? 'trendi-step__dot--on' : ''}`} />
            ))}
          </div>
        </div>
      )}
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

Object.assign(window, {
  TrStatus, TrHome, TrendThumb, PortraitPlaceholder, BottomCTA, ScreenHeader,
});
