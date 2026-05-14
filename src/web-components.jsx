// Trendi Web — single-file app (all screens + nav)

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Trend visual — bright, abstract loop card
// ─────────────────────────────────────────────────────────────
function TrendCard({ seed = 0, name, posts, badge, selected, onClick, video, size = 'md' }) {
  const palettes = [
    ['#ffd0c2', '#d96666', '#fff5e6'],
    ['#e2d4ff', '#7a5cdb', '#f5edff'],
    ['#cfe6d4', '#7d8d6e', '#eaf2e0'],
    ['#ffe2a8', '#e0a55c', '#fff7e0'],
    ['#c2dfff', '#4a7cc9', '#ebf3ff'],
    ['#ffd6e8', '#d96695', '#ffeaf4'],
    ['#fff0c2', '#bfa14a', '#fff8db'],
    ['#d6f0e8', '#5fa890', '#eaf6f0'],
  ];
  const p = palettes[seed % palettes.length];
  const angle = (seed * 47) % 180;

  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!video || !videoRef.current || !cardRef.current) return;
    const el = videoRef.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    }, { threshold: 0.4 });
    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [video]);

  return (
    <div ref={cardRef} onClick={onClick} style={{
      position: 'relative', aspectRatio: '9 / 14', borderRadius: 18, overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default', flexShrink: 0,
      background: video ? 'var(--surface-2)' : `linear-gradient(${angle}deg, ${p[0]} 0%, ${p[2]} 100%)`,
      border: selected ? '2px solid var(--accent)' : (video ? 'none' : '1px solid var(--hairline)'),
      boxShadow: selected
        ? '0 0 0 4px var(--accent-soft), 0 10px 28px rgba(40,30,20,0.10)'
        : (video
            ? '0 8px 22px rgba(40,30,20,0.07)'
            : '0 1px 2px rgba(40,30,20,0.04), 0 8px 24px rgba(40,30,20,0.05)'),
      transition: 'transform .2s, box-shadow .2s',
      transform: selected ? 'translateY(-2px)' : 'translateY(0)',
    }}>
      {video ? (
        <video
          ref={videoRef}
          className="tw-video"
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <>
          <div style={{
            position: 'absolute', width: '60%', height: '50%',
            left: '20%', top: '30%',
            background: p[1], opacity: 0.5,
            animation: `tw-blob ${8 + (seed%5)}s ease-in-out infinite`,
            animationDelay: `${-seed*0.7}s`,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `repeating-linear-gradient(${angle}deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 15px)`,
          }} />
        </>
      )}

      {video && (name || posts) && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }} />
      )}

      {badge && (
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          background: 'rgba(255,255,255,0.92)', color: 'var(--text)',
          padding: '5px 10px', borderRadius: 999, backdropFilter: 'blur(8px)',
        }}>{badge}</div>
      )}
      {selected && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--accent)', color: 'var(--on-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7.2l2.8 2.8L11 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      {(name || posts) && (
        <div style={{
          position: 'absolute', left: 12, right: 12, bottom: 12,
          color: video ? '#fff' : 'var(--text)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            {name}
          </div>
          {posts && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: video ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', marginTop: 4 }}>
              {posts}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Top app nav
function TopNav({ onLogo, current }) {
  return (
    <div className="tw-nav">
      <span className="tw-logo" onClick={onLogo} style={{ cursor: 'pointer' }}>trendi</span>
      <div className="tw-nav-links">
        <a>Trends</a>
        <a>How it works</a>
        <a>Pricing</a>
        {current && current !== 'landing' && (
          <button className="tw-btn tw-btn--ghost" style={{ height: 42, fontSize: 15, padding: '0 18px' }} onClick={onLogo}>
            Start over
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Stage layout — centered content with max width (responsive)
// ─────────────────────────────────────────────────────────────
function Stage({ children, max = 1080, flush = false }) {
  return (
    <div className="tw-stage" style={{ maxWidth: max, padding: flush ? 0 : undefined }}>
      {children}
    </div>
  );
}

// Step indicator inline
function StepRow({ step, total }) {
  return (
    <div className="tw-step">
      <span>Step {step} of {total}</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`tw-step__dot ${i < step ? 'tw-step__dot--on' : ''}`} />
        ))}
      </div>
    </div>
  );
}

// Photo placeholder used in upload preview & generation
function Portrait({ size = 240, radius = 20 }) {
  return (
    <div style={{
      width: size, height: size * 1.25, borderRadius: radius, overflow: 'hidden',
      position: 'relative',
      background: `
        radial-gradient(50% 40% at 50% 38%, #f0c8a8 0%, #c89b75 70%, transparent 75%),
        radial-gradient(50% 35% at 50% 75%, #2a3340 0%, #1a1f2a 60%, transparent 70%),
        linear-gradient(180deg, #c4d4e0 0%, #94a8b8 60%, #7a90a0 100%)
      `,
    }}>
      <div style={{
        position: 'absolute', top: '12%', left: '28%', width: '44%', height: '34%',
        background: '#1a1410', borderRadius: '50% 50% 40% 40%',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HeroProcess — driver video + ref photo → generated result
// ─────────────────────────────────────────────────────────────
function HeroProcess() {
  const driverRef = useRef(null);
  const resultRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      const els = [driverRef.current, resultRef.current].filter(Boolean);
      if (entry.isIntersecting) {
        els.forEach((el) => el.play().catch(() => {}));
      } else {
        els.forEach((el) => el.pause());
      }
    }, { threshold: 0.3 });
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="tw-hero-process">
      <div className="tw-hero-card tw-hero-card--driver">
        <video
          ref={driverRef}
          className="tw-video"
          src="src/videos/hero-driver.mp4"
          muted loop playsInline preload="metadata"
        />
        <span className="tw-hero-tag">The trend</span>
      </div>

      <div className="tw-hero-card tw-hero-card--ref">
        <img className="tw-hero-img" src="src/videos/hero-ref.jpg" alt="My reference photo" />
        <span className="tw-hero-tag">My photo</span>
      </div>

      <div className="tw-hero-card tw-hero-card--result">
        <video
          ref={resultRef}
          className="tw-video"
          src="src/videos/hero-result.mp4"
          muted loop playsInline preload="metadata"
        />
        <div className="tw-hero-shine" aria-hidden />
        <span className="tw-hero-tag tw-hero-tag--accent">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden style={{ marginRight: 5 }}>
            <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z"/>
          </svg>
          My version
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { TrendCard, TopNav, Stage, StepRow, Portrait, HeroProcess });
