// screens-4-7.jsx — Generating, Result Preview, Paywall, Success

// ─────────────────────────────────────────────────────────────
// Screen 4: GENERATING
// ─────────────────────────────────────────────────────────────
function ScreenGenerating({ progress = 0.4, status = 'Adding the sauce…' }) {
  // big radial scanning effect over a portrait
  return (
    <div className="trendi-screen">
      <TrStatus />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 100px',
      }}>
        {/* Photo with shader effect */}
        <div style={{
          position: 'relative',
          width: 220, height: 280, borderRadius: 28, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px var(--accent-glow)',
        }}>
          <PortraitPlaceholder size="100%" radius={28} />

          {/* Scanline */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 80,
            top: `${progress * 100}%`, transform: 'translateY(-50%)',
            background: 'linear-gradient(180deg, transparent 0%, var(--accent) 50%, transparent 100%)',
            mixBlendMode: 'screen', opacity: 0.7,
            transition: 'top 0.6s linear',
            filter: 'blur(2px)',
          }} />

          {/* Holo grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              repeating-linear-gradient(0deg, transparent 0 4px, rgba(255,255,255,0.06) 4px 5px),
              repeating-linear-gradient(90deg, transparent 0 4px, var(--accent-glow) 4px 4.4px)
            `,
            mixBlendMode: 'screen', opacity: 0.4,
          }} />

          {/* corner brackets */}
          {[
            { top: 12, left: 12, b: 'top left' },
            { top: 12, right: 12, b: 'top right' },
            { bottom: 12, left: 12, b: 'bottom left' },
            { bottom: 12, right: 12, b: 'bottom right' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', ...c,
              width: 18, height: 18,
              borderTop: c.b.startsWith('top') ? '2px solid var(--accent)' : 'none',
              borderBottom: c.b.startsWith('bottom') ? '2px solid var(--accent)' : 'none',
              borderLeft: c.b.endsWith('left') ? '2px solid var(--accent)' : 'none',
              borderRight: c.b.endsWith('right') ? '2px solid var(--accent)' : 'none',
            }} />
          ))}
        </div>

        {/* Status */}
        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <h2 className="trendi-h2" style={{ fontSize: 26 }}>
            {status}
          </h2>
          <div style={{
            marginTop: 12,
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
            letterSpacing: 0.04,
          }}>
            usually takes 60s · ~{Math.max(5, Math.round(60 - progress * 60))}s left
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: 24,
          width: '100%', maxWidth: 260, height: 4, borderRadius: 999,
          background: 'var(--bg-elev-2)', overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: `${progress * 100}%`,
            background: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent-glow)',
            borderRadius: 999,
            transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Step indicator dots — analyzing / matching / sauce / almost */}
        <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
          {['Analyze', 'Match', 'Sauce', 'Final'].map((s, i) => {
            const active = i === Math.floor(progress * 4);
            const done = i < Math.floor(progress * 4);
            return (
              <div key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: 0.06, textTransform: 'uppercase',
                color: done ? 'var(--text-muted)' : active ? 'var(--accent)' : 'var(--text-faint)',
                fontWeight: active ? 700 : 500,
              }}>
                {done ? '✓ ' : ''}{s}
              </div>
            );
          })}
        </div>
      </div>

      <TrHome />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 5: RESULT PREVIEW
// ─────────────────────────────────────────────────────────────
function ScreenResult({ onPay, onShare, onTryAnother, onStartOver, onBack }) {
  return (
    <div className="trendi-screen">
      <TrStatus />

      <ScreenHeader onBack={onBack} />

      <div style={{ padding: '120px 16px 230px' }}>
        <div style={{ padding: '0 8px' }}>
          <div className="trendi-eyebrow" style={{ marginBottom: 8 }}>just for you</div>
          <h2 className="trendi-h2" style={{ fontSize: 30 }}>Your trend is ready.</h2>
        </div>

        {/* Video player */}
        <div style={{
          marginTop: 18, position: 'relative',
          aspectRatio: '9 / 16', borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(60% 50% at 50% 35%, #f0c8a8 0%, #c89b75 60%, transparent 70%),
              radial-gradient(80% 60% at 50% 75%, #2a3340 0%, transparent 70%),
              linear-gradient(180deg, #ff2e63 0%, #5c0024 100%)
            `,
          }} />

          {/* Subject silhouette */}
          <div style={{
            position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: '85%',
            background: `
              radial-gradient(50% 30% at 50% 18%, #f0c8a8 0%, #c89b75 80%, transparent 100%),
              radial-gradient(40% 30% at 50% 70%, #2a3340 0%, transparent 80%)
            `,
            filter: 'blur(0.5px)',
          }} />

          {/* hair */}
          <div style={{
            position: 'absolute', top: '8%', left: '34%', width: '32%', height: '20%',
            background: '#1a1410',
            borderRadius: '50% 50% 30% 30%',
          }} />

          {/* particles */}
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: 4, height: 4, borderRadius: '50%',
              background: '#fff', opacity: 0.6,
              left: `${(i * 17) % 90 + 5}%`,
              top: `${(i * 31) % 80 + 10}%`,
              boxShadow: '0 0 8px #fff',
              animation: `trendi-float ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}

          {/* film grain */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at top, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />

          {/* watermark */}
          <div style={{
            position: 'absolute', right: 12, bottom: 12,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
            color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 11, letterSpacing: -0.02,
            padding: '4px 8px', borderRadius: 6,
            display: 'flex', alignItems: 'center', gap: 4,
            border: '0.5px solid rgba(255,255,255,0.2)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 2, background: 'var(--accent)',
            }} />
            trendi.app
          </div>

          {/* play / mute */}
          <div style={{
            position: 'absolute', left: 12, bottom: 12,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4v6L5 8V6L2 4z M5 5h2L9.5 2v10L7 9H5z" fill="currentColor"/>
              <path d="M11 4l3 6M14 4l-3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* progress */}
          <div style={{
            position: 'absolute', left: 12, right: 12, bottom: 56, height: 3,
            borderRadius: 2, background: 'rgba(255,255,255,0.2)',
          }}>
            <div style={{ width: '34%', height: '100%', borderRadius: 2, background: '#fff' }} />
          </div>
        </div>
      </div>

      <BottomCTA>
        <button onClick={onPay} className="trendi-btn trendi-btn--primary" style={{ width: '100%' }}>
          Download HD — no watermark
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v9M4 7l4 4 4-4M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 12, padding: '0 4px',
        }}>
          <button onClick={onShare} style={{
            background: 'transparent', border: 'none', color: 'var(--text-muted)',
            fontSize: 13, cursor: 'pointer', padding: 4,
            fontFamily: 'var(--font-display)', fontWeight: 500,
          }}>
            ↗ Share preview
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={onTryAnother} style={{
              background: 'var(--bg-elev)', border: '1px solid var(--hairline)',
              color: 'var(--text)', fontSize: 12, cursor: 'pointer',
              padding: '6px 10px', borderRadius: 999,
              fontFamily: 'var(--font-display)', fontWeight: 500,
            }}>another trend</button>
            <button onClick={onStartOver} style={{
              background: 'var(--bg-elev)', border: '1px solid var(--hairline)',
              color: 'var(--text)', fontSize: 12, cursor: 'pointer',
              padding: '6px 10px', borderRadius: 999,
              fontFamily: 'var(--font-display)', fontWeight: 500,
            }}>start over</button>
          </div>
        </div>
      </BottomCTA>

      <TrHome />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 6: PAYWALL
// ─────────────────────────────────────────────────────────────
function ScreenPaywall({ plan = 'weekly', onPlan, onContinue, onClose }) {
  return (
    <div className="trendi-screen">
      <TrStatus />

      {/* Faint dimmed preview behind */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7)),
          radial-gradient(circle at 50% 30%, var(--accent-glow) 0%, transparent 60%)`,
      }} />

      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'var(--bg)',
        borderRadius: '28px 28px 0 0',
        border: '1px solid var(--hairline)',
        borderBottom: 'none',
        padding: '14px 20px 100px',
        animation: 'trendi-rise 0.3s',
      }}>
        {/* drag handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 4,
          background: 'var(--hairline-strong)',
          margin: '0 auto 14px',
        }} />

        {/* close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 16,
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--bg-elev)', border: 'none',
          color: 'var(--text)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className="trendi-h2" style={{ fontSize: 28, marginBottom: 6 }}>
          Get the clean version.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 22px', lineHeight: 1.4 }}>
          HD video, no watermark, ready to post.
        </p>

        {/* Plans */}
        <div style={{ display: 'grid', gap: 10 }}>
          <PlanCard
            id="weekly"
            selected={plan === 'weekly'}
            onClick={() => onPlan && onPlan('weekly')}
            badge="Best Value"
            title="Weekly Pass"
            price="$9.99"
            unit="/ week"
            features={['Unlimited HD downloads', 'All trends', 'Cancel anytime']}
          />
          <PlanCard
            id="single"
            selected={plan === 'single'}
            onClick={() => onPlan && onPlan('single')}
            title="Just this one"
            price="$4.99"
            unit="one-time"
            features={['1 HD download']}
          />
        </div>

        {/* Trust signals */}
        <div style={{
          marginTop: 16, padding: '10px 12px',
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          color: 'var(--text-muted)', letterSpacing: 0.04,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          textTransform: 'uppercase',
        }}>
          <span>🔒 secure</span>
          <span>·</span>
          <span>cancel anytime</span>
          <span>·</span>
          <span>30-day refund</span>
        </div>
      </div>

      <BottomCTA>
        <button onClick={onContinue} className="trendi-btn trendi-btn--primary" style={{ width: '100%' }}>
          Continue to checkout
        </button>
      </BottomCTA>

      <TrHome />
    </div>
  );
}

function PlanCard({ id, selected, onClick, title, price, unit, features, badge }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative',
      padding: '16px 16px 14px',
      borderRadius: 18,
      background: selected ? 'var(--bg-elev-2)' : 'var(--bg-elev)',
      border: selected ? '1.5px solid var(--accent)' : '1.5px solid var(--hairline)',
      boxShadow: selected ? '0 0 0 4px var(--accent-glow)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.18s',
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -10, left: 16,
          padding: '3px 10px', borderRadius: 999,
          background: 'var(--accent)', color: 'var(--on-accent)',
          fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700,
          letterSpacing: 0.06, textTransform: 'uppercase',
        }}>{badge}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* radio */}
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          border: selected ? '2px solid var(--accent)' : '2px solid var(--hairline-strong)',
          background: selected ? 'var(--accent)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: 2,
          transition: 'all 0.15s',
        }}>
          {selected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2 2 4-4" stroke="var(--on-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: -0.01 }}>
              {title}
            </div>
            <div className="trendi-mono" style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.02 }}>
              {price}<span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>{unit}</span>
            </div>
          </div>

          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 3 }}>
            {features.map((f, i) => (
              <li key={i} style={{
                fontSize: 12.5, color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 5l2 2 4-4" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 7: SUCCESS
// ─────────────────────────────────────────────────────────────
function ScreenSuccess({ saved = false, onDownload, onShareIG, onShareTT, onAgain }) {
  return (
    <div className="trendi-screen">
      <TrStatus />

      {/* Confetti */}
      {!saved && (
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 5,
        }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const colors = ['var(--accent)', '#FFE600', '#2E5BFF', '#C5FF3D', '#FF8A00'];
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i * 13) % 100}%`,
                top: -20,
                width: 6, height: 10,
                background: colors[i % colors.length],
                borderRadius: 1,
                animation: `trendi-confetti-fall ${2 + (i % 4) * 0.5}s ease-out infinite`,
                animationDelay: `${(i % 8) * 0.15}s`,
              }} />
            );
          })}
        </div>
      )}

      <div style={{ padding: '110px 24px 200px', position: 'relative', zIndex: 10 }}>
        <div className="trendi-eyebrow" style={{ marginBottom: 6, color: 'var(--accent)' }}>
          payment confirmed
        </div>
        <h2 className="trendi-h2" style={{ fontSize: 36, marginBottom: 8, animation: 'trendi-rise 0.4s' }}>
          You're on<br/>the trend.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.4 }}>
          Clean HD, no watermark. Now post it before it dies.
        </p>

        {/* HD video */}
        <div style={{
          position: 'relative',
          aspectRatio: '9 / 13', borderRadius: 22, overflow: 'hidden',
          boxShadow: '0 20px 60px var(--accent-glow)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(60% 50% at 50% 35%, #f0c8a8 0%, #c89b75 60%, transparent 70%),
              radial-gradient(80% 60% at 50% 75%, #2a3340 0%, transparent 70%),
              linear-gradient(180deg, #ff2e63 0%, #5c0024 100%)
            `,
          }} />
          <div style={{
            position: 'absolute', top: '8%', left: '34%', width: '32%', height: '20%',
            background: '#1a1410', borderRadius: '50% 50% 30% 30%',
          }} />
          {/* HD chip */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
            color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600,
            fontSize: 10, letterSpacing: 0.06,
            padding: '4px 8px', borderRadius: 6, textTransform: 'uppercase',
            border: '0.5px solid rgba(255,255,255,0.2)',
          }}>
            HD · 1080p · 9:16
          </div>
        </div>
      </div>

      <BottomCTA>
        <button
          onClick={onDownload}
          className="trendi-btn trendi-btn--primary"
          style={{ width: '100%' }}
        >
          {saved ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Saved to Photos
            </>
          ) : (
            <>
              Download to phone
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M4 7l4 4 4-4M3 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button onClick={onShareTT} className="trendi-btn trendi-btn--secondary" style={{ flex: 1, height: 44, fontSize: 13 }}>
            Share to TikTok
          </button>
          <button onClick={onShareIG} className="trendi-btn trendi-btn--secondary" style={{ flex: 1, height: 44, fontSize: 13 }}>
            Share to IG
          </button>
        </div>
        <button onClick={onAgain} style={{
          display: 'block', width: '100%',
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer',
          padding: 12, marginTop: 4,
          fontFamily: 'var(--font-display)', fontWeight: 500,
        }}>+ make another</button>
      </BottomCTA>

      <TrHome />
    </div>
  );
}

Object.assign(window, { ScreenGenerating, ScreenResult, ScreenPaywall, ScreenSuccess });
