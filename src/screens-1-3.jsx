// screens-1-3.jsx — Landing, Upload, Pick Trend

const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;

// ─────────────────────────────────────────────────────────────
// Screen 1: LANDING / HOME
// ─────────────────────────────────────────────────────────────
function ScreenLanding({ onCTA }) {
  const trends = [
    { name: 'Coquette dance',  posts: '1.2k posts', badge: 'New', seed: 0 },
    { name: 'Mirror lipsync',  posts: '890 posts',  badge: 'New', seed: 4 },
    { name: 'Slow-mo turn',    posts: '2.1k posts', badge: 'Hot', seed: 2 },
    { name: 'Get ready w/ me', posts: '640 posts',  badge: '',    seed: 7 },
    { name: 'Wind in hair',    posts: '1.5k posts', badge: 'Hot', seed: 5 },
    { name: 'Hand on chin',    posts: '420 posts',  badge: '',    seed: 3 },
  ];

  return (
    <div className="trendi-screen" style={{ overflow: 'auto' }}>
      <TrStatus />

      {/* Top nav */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 20,
      }}>
        <span className="trendi-logo">trendi</span>
        <a style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
          color: 'var(--text-muted)', textDecoration: 'none',
          letterSpacing: 0.04,
        }}>Trends ↗</a>
      </div>

      <div style={{ paddingTop: 132, paddingBottom: 220, position: 'relative' }}>
        {/* Hero */}
        <div style={{ padding: '12px 24px 0' }}>
          <div className="trendi-eyebrow" style={{ marginBottom: 18 }}>
            <span className="trendi-badge trendi-badge--dot">
              <span style={{ marginLeft: 2 }}>refreshed weekly</span>
            </span>
          </div>
          <h1 className="trendi-h1" style={{ marginBottom: 16 }}>
            Be on every<br/>trend.
          </h1>
          <p style={{
            fontSize: 17, lineHeight: 1.4, color: 'var(--text-muted)',
            margin: 0, maxWidth: 320, fontWeight: 400,
          }}>
            Upload your photo. Pick this week's viral. Post.
          </p>
        </div>

        {/* This week's trends — horizontal scroll */}
        <div style={{ marginTop: 36 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            padding: '0 24px', marginBottom: 14,
          }}>
            <h2 className="trendi-h2" style={{ fontSize: 22 }}>This week</h2>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--text-muted)', letterSpacing: 0.04,
            }}>06 / 24 ↗</span>
          </div>

          <div style={{
            display: 'flex', gap: 12, padding: '0 24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
          }}>
            {trends.map((t, i) => (
              <div key={i} style={{ width: 168, flexShrink: 0, scrollSnapAlign: 'start' }}>
                <TrendThumb seed={t.seed} name={t.name} posts={t.posts} badge={t.badge} />
              </div>
            ))}
            <div style={{ width: 8, flexShrink: 0 }} />
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding: '40px 24px 0' }}>
          <h2 className="trendi-h2" style={{ fontSize: 22, marginBottom: 16 }}>How it works</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { n: '01', t: 'Upload your photo', s: 'Camera or library, 5 seconds.' },
              { n: '02', t: 'Pick a trend',      s: 'Hand-picked from this week.' },
              { n: '03', t: 'Download HD',       s: '60 seconds. Post anywhere.' },
            ].map((s, i) => (
              <div key={i} className="trendi-card" style={{
                padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div className="trendi-mono" style={{
                  fontSize: 22, fontWeight: 600, color: 'var(--accent)',
                  width: 38,
                }}>{s.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 1 }}>{s.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated by */}
        <div style={{
          padding: '32px 24px 12px',
          fontSize: 13, color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff2e63, #c5ff3d, #2e5bff)',
          }} />
          <span>Curated by <strong style={{ color: 'var(--text)', fontWeight: 600 }}>@maddie.feeds</strong> ↗</span>
        </div>
      </div>

      <BottomCTA>
        <button className="trendi-btn trendi-btn--primary" style={{ width: '100%' }} onClick={onCTA}>
          Try it free
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </BottomCTA>

      <TrHome />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2: UPLOAD PHOTO
// ─────────────────────────────────────────────────────────────
function ScreenUpload({ uploaded = false, onBack, onContinue, onPick, error }) {
  return (
    <div className="trendi-screen">
      <TrStatus />
      <ScreenHeader step={1} total={2} onBack={onBack} />

      <div style={{ padding: '120px 24px 200px' }}>
        <h2 className="trendi-h2" style={{ marginBottom: 6 }}>
          Upload a photo<br/>of yourself.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
          Best results: clear face, good lighting, single person.
        </p>

        {/* Upload zone */}
        <div onClick={onPick} style={{
          marginTop: 22,
          aspectRatio: '4 / 5',
          borderRadius: 24,
          border: error
            ? '1.5px solid rgba(255,80,80,0.5)'
            : uploaded ? 'none' : '1.5px dashed var(--hairline-strong)',
          background: uploaded ? 'transparent' : 'var(--bg-elev)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {uploaded ? (
            <>
              <PortraitPlaceholder radius={24} />
              <div style={{
                position: 'absolute', top: 12, right: 12,
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--accent)', color: 'var(--on-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px var(--accent-glow)',
                animation: 'trendi-bounce-in 0.4s',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7.2l2.8 2.8L11 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent)', color: 'var(--on-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 8px 24px var(--accent-glow)',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 4v14M4 11h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' }}>
                Tap to upload
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Camera or photo library
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={{
            marginTop: 12, padding: '10px 14px',
            background: 'rgba(255,80,80,0.08)',
            border: '1px solid rgba(255,80,80,0.2)',
            borderRadius: 12,
            fontSize: 13, color: 'var(--text)',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <span style={{ color: '#ff5050', marginTop: 1 }}>⚠</span>
            <div>
              <strong style={{ display: 'block', marginBottom: 2 }}>No face detected.</strong>
              <span style={{ color: 'var(--text-muted)' }}>Try a clearer, front-facing photo.</span>
            </div>
          </div>
        )}

        {/* Camera / Library shortcuts */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={onPick} className="trendi-btn trendi-btn--secondary" style={{ flex: 1, height: 48, fontSize: 14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="4" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5.5 4l1-1.5h3L10.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Camera
          </button>
          <button onClick={onPick} className="trendi-btn trendi-btn--secondary" style={{ flex: 1, height: 48, fontSize: 14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="6" cy="7" r="1.2" fill="currentColor"/>
              <path d="M2.5 12l3.5-3.5 3 3 2-2 2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Library
          </button>
        </div>

        {uploaded && (
          <button onClick={onPick} style={{
            display: 'block', margin: '14px auto 0',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--accent)', fontSize: 14, fontWeight: 500,
            fontFamily: 'var(--font-display)',
          }}>↻ Retake</button>
        )}
      </div>

      <BottomCTA>
        <button
          onClick={uploaded ? onContinue : undefined}
          className={`trendi-btn ${uploaded ? 'trendi-btn--primary' : 'trendi-btn--disabled'}`}
          style={{ width: '100%' }}
        >
          Continue
        </button>
      </BottomCTA>

      <TrHome />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 3: PICK TREND
// ─────────────────────────────────────────────────────────────
function ScreenPick({ tab = 'Dancing', selected, onSelect, onTab, onBack, onGenerate }) {
  const trendsByTab = {
    Dancing: [
      { name: 'Coquette dance', posts: '1.2k posts', badge: 'New this week', seed: 0 },
      { name: 'Slow-mo turn',   posts: '2.1k posts', badge: 'Hot',           seed: 2 },
      { name: 'Wind in hair',   posts: '1.5k posts', badge: 'Hot',           seed: 5 },
      { name: 'Body roll',      posts: '780 posts',  badge: '',              seed: 1 },
      { name: 'Y2K shuffle',    posts: '630 posts',  badge: 'New',           seed: 6 },
      { name: 'Hand on chin',   posts: '420 posts',  badge: '',              seed: 3 },
    ],
    Lipsync: [
      { name: 'Mirror lipsync', posts: '890 posts',  badge: 'New this week', seed: 4 },
      { name: 'Whisper drama',  posts: '1.1k posts', badge: 'Hot',           seed: 7 },
      { name: 'Get ready w/ me',posts: '640 posts',  badge: '',              seed: 7 },
      { name: 'Phone-flip flex',posts: '510 posts',  badge: 'New',           seed: 0 },
    ],
  };
  const list = trendsByTab[tab] || [];

  return (
    <div className="trendi-screen">
      <TrStatus />

      {/* Sticky top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--hairline)',
        zIndex: 20, paddingTop: 54, paddingBottom: 12,
      }}>
        <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
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
          <div className="trendi-step">
            <span>Step 2 of 2</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <div className="trendi-step__dot trendi-step__dot--on" />
              <div className="trendi-step__dot trendi-step__dot--on" />
            </div>
          </div>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div className="trendi-tabs">
            {['Dancing', 'Lipsync', 'Custom'].map(t => (
              <button key={t}
                onClick={() => onTab && onTab(t)}
                className={`trendi-tabs__item ${tab === t ? 'trendi-tabs__item--active' : ''}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === 'Custom' ? (
        <div style={{ padding: '180px 20px 200px' }}>
          <h2 className="trendi-h2" style={{ fontSize: 24, marginBottom: 6 }}>Bring your own.</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.4 }}>
            Upload any video as your reference. We'll match the vibe.
          </p>
          <div style={{
            aspectRatio: '9 / 12',
            borderRadius: 24,
            border: '1.5px dashed var(--hairline-strong)',
            background: 'var(--bg-elev)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent)', color: 'var(--on-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 8px 24px var(--accent-glow)',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M5 6h12v10H5z M9 9l5 2-5 2z" fill="currentColor"/>
                </svg>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>
                Drop video
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                MP4 / MOV up to 60s
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 12, background: 'var(--bg-elev)', fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8 }}>
            <span>💡</span>
            <span>Works best with clear motion and good audio.</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '180px 16px 200px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          }}>
            {list.map((t, i) => (
              <TrendThumb
                key={i}
                seed={t.seed}
                name={t.name}
                posts={t.posts}
                badge={t.badge}
                selected={selected === i}
                onClick={() => onSelect && onSelect(i)}
              />
            ))}
          </div>
        </div>
      )}

      <BottomCTA>
        <button
          onClick={selected != null ? onGenerate : undefined}
          className={`trendi-btn ${selected != null ? 'trendi-btn--primary' : 'trendi-btn--disabled'}`}
          style={{ width: '100%' }}
        >
          Generate {selected != null && (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </BottomCTA>

      <TrHome />
    </div>
  );
}

Object.assign(window, { ScreenLanding, ScreenUpload, ScreenPick });
