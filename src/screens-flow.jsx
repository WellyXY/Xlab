// Trendi Web — Flow screens 2-7

// ─── Screen 2: Upload ───────────────────────────────────────────
function ScreenUpload({ onBack, onContinue }) {
  const [state, setState] = useState('empty'); // empty | uploading | ready | error
  const [progress, setProgress] = useState(0);
  const [photo, setPhoto] = useState(null); // { url, name, size, w, h }
  const fileRef = useRef(null);

  useEffect(() => () => { if (photo?.url) URL.revokeObjectURL(photo.url); }, []);

  const startUpload = (errorPath = false) => {
    setState('uploading');
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 7 + Math.random() * 9;
      if (p >= 100) {
        clearInterval(t);
        setProgress(100);
        setTimeout(() => setState(errorPath ? 'error' : 'ready'), 320);
      } else setProgress(p);
    }, 90);
  };

  const handlePick = (file) => {
    if (!file) return;
    if (photo?.url) URL.revokeObjectURL(photo.url);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setPhoto({ url, name: file.name, size: file.size, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.src = url;
    startUpload(false);
  };

  const reset = () => {
    if (photo?.url) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    setState('empty');
  };

  const fmtSize = (b) => !b ? '' : (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);

  return (
    <Stage max={760}>
      <div style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <button className="tw-btn tw-btn--ghost" style={{ height: 42, fontSize: 15, padding: '0 16px' }} onClick={onBack}>← Back</button>
          <StepRow step={1} total={2} />
        </div>

        <div className="tw-eyebrow" style={{ marginBottom: 14 }}>Upload</div>
        <h2 className="tw-h2" style={{ marginBottom: 12 }}>Drop a photo of <em style={{ color: 'var(--accent)' }}>yourself</em>.</h2>
        <p className="tw-lede" style={{ marginBottom: 36 }}>
          Best results: clear face, soft light, single person. We won't upload anywhere until you tap continue.
        </p>

        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handlePick(e.target.files?.[0])} />

        {/* Upload zone */}
        <div
          onClick={() => state === 'empty' && fileRef.current?.click()}
          style={{
            position: 'relative', border: `1.5px dashed ${state === 'error' ? '#d96666' : 'var(--hairline-strong)'}`,
            borderRadius: 24, background: 'var(--surface)',
            minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: state === 'empty' ? 'pointer' : 'default',
            transition: 'border-color .2s, background .2s',
            overflow: 'hidden',
          }}
        >
          {state === 'empty' && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 20h16"/>
                </svg>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, marginBottom: 10, letterSpacing: '-0.02em' }}>Drop a photo here</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 26 }}>or pick from your library · JPG, PNG, HEIC up to 12MB</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button className="tw-btn tw-btn--primary" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>Choose photo</button>
                <button className="tw-btn tw-btn--ghost" onClick={(e) => { e.stopPropagation(); startUpload(false); }}>Use webcam</button>
              </div>
            </div>
          )}

          {state === 'uploading' && (
            <div style={{ textAlign: 'center', width: '100%', padding: 60 }}>
              <div className="tw-mono" style={{ fontSize: 13.5, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 18, textTransform: 'uppercase' }}>
                Uploading · {Math.round(progress)}%
              </div>
              <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 2, overflow: 'hidden', maxWidth: 420, margin: '0 auto' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width .12s' }} />
              </div>
            </div>
          )}

          {state === 'ready' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: 36, width: '100%', justifyContent: 'center', animation: 'tw-rise .4s' }}>
              {photo ? (
                <div style={{
                  width: 200, height: 250, borderRadius: 18, overflow: 'hidden',
                  flexShrink: 0, background: 'var(--surface-2)',
                }}>
                  <img src={photo.url} alt="your photo" style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  }} />
                </div>
              ) : (
                <Portrait size={200} radius={18} />
              )}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#3a8a5b', fontSize: 15, fontWeight: 500, marginBottom: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Face detected · good lighting
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, marginBottom: 8, wordBreak: 'break-all', letterSpacing: '-0.015em' }}>
                  {photo?.name || 'selfie-may-08.jpg'}
                </div>
                <div className="tw-mono" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  {photo ? `${fmtSize(photo.size)} · ${photo.w}×${photo.h}` : '2.4 MB · 1170×1560'}
                </div>
                <a onClick={reset} style={{ display: 'inline-block', marginTop: 16, fontSize: 15, color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}>
                  Use a different photo
                </a>
              </div>
            </div>
          )}

          {state === 'error' && (
            <div style={{ textAlign: 'center', padding: 50 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fde7e7', color: '#d96666', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22 }}>!</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, marginBottom: 8, letterSpacing: '-0.02em' }}>We couldn't find a face</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 380, margin: '0 auto 20px' }}>
                Try a clearer photo with one person, head and shoulders, no sunglasses.
              </div>
              <button className="tw-btn tw-btn--ghost" onClick={() => startUpload(false)}>Try again</button>
            </div>
          )}
        </div>

        {/* Sneaky test row to flip to error state */}
        {state === 'empty' && (
          <div style={{ display: 'flex', gap: 14, marginTop: 16, fontSize: 14, color: 'var(--text-faint)', justifyContent: 'center' }}>
            <span>Demo:</span>
            <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => startUpload(false)}>simulate upload</a>
            <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => startUpload(true)}>simulate error</a>
          </div>
        )}

        {/* Continue */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
          <button
            className={`tw-btn ${state === 'ready' ? 'tw-btn--accent' : 'tw-btn--disabled'}`}
            style={{ height: 54, padding: '0 30px', fontSize: 16.5 }}
            onClick={onContinue}
          >Continue →</button>
        </div>
      </div>
    </Stage>
  );
}

// ─── Screen 3: Pick Trend ───────────────────────────────────────
function ScreenPick({ onBack, onContinue }) {
  const [tab, setTab] = useState('Dancing');
  const [selected, setSelected] = useState(null);
  const [customUploaded, setCustomUploaded] = useState(false);

  const lists = {
    Dancing: TRENDS.slice(0, 6),
    Lipsync: [
      { name: 'Whisper monologue', posts: '3.2k posts', badge: 'NEW',      video: 'src/videos/grwm.mp4' },
      { name: 'Caught off guard',  posts: '1.4k posts',                    video: 'src/videos/mirror-pan.mp4' },
      { name: 'Pov: you said it',  posts: '5.6k posts', badge: 'TRENDING', video: 'src/videos/coffee-pov.mp4' },
      { name: 'Inner voice cut',   posts: '720 posts',                     video: 'src/videos/golden-walk.mp4' },
      { name: 'Audio swap',        posts: '2.1k posts',                    video: 'src/videos/brat-summer-loop.mp4' },
      { name: 'Director\'s cut',   posts: '980 posts',                     video: 'src/videos/slow-mo-flip.mp4' },
    ],
  };

  return (
    <Stage max={1080}>
      <div style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <button className="tw-btn tw-btn--ghost" style={{ height: 42, fontSize: 15, padding: '0 16px' }} onClick={onBack}>← Back</button>
          <StepRow step={2} total={2} />
        </div>

        <div className="tw-eyebrow" style={{ marginBottom: 14 }}>Pick</div>
        <h2 className="tw-h2" style={{ marginBottom: 32 }}>Now pick this week's <em style={{ color: 'var(--accent)' }}>vibe</em>.</h2>

        <div className="tw-tabs" style={{ marginBottom: 32 }}>
          {['Dancing', 'Lipsync', 'Custom'].map(t => (
            <button key={t} className={`tw-tabs__item ${tab === t ? 'tw-tabs__item--active' : ''}`} onClick={() => { setTab(t); setSelected(null); }}>
              {t}
            </button>
          ))}
        </div>

        {tab !== 'Custom' ? (
          <div className="tw-pick-grid">
            {lists[tab].map((t, i) => (
              <TrendCard key={t.name} seed={i + (tab === 'Lipsync' ? 4 : 0)} name={t.name} posts={t.posts} badge={t.badge}
                video={t.video}
                selected={selected === t.name} onClick={() => setSelected(t.name)} />
            ))}
          </div>
        ) : (
          <div className="tw-card" style={{ padding: 56, textAlign: 'center', border: customUploaded ? '1px solid var(--accent)' : undefined }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2z"/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, marginBottom: 10, letterSpacing: '-0.02em' }}>
              {customUploaded ? 'reference-clip.mov' : 'Drop a reference video'}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24, maxWidth: 420, margin: '0 auto 24px' }}>
              {customUploaded ? '00:14 · 1080×1920 · we\'ll match the motion and audio' : 'Any video. We\'ll match motion and energy. Best with clear movement.'}
            </div>
            <button className={`tw-btn ${customUploaded ? 'tw-btn--ghost' : 'tw-btn--primary'}`} onClick={() => setCustomUploaded(true)}>
              {customUploaded ? 'Replace video' : 'Choose video'}
            </button>
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="tw-bottom-bar">
        <div style={{ fontSize: 16, color: 'var(--text-muted)' }}>
          {tab === 'Custom'
            ? (customUploaded ? <>Custom reference ready</> : <>Upload a reference video to continue</>)
            : (selected ? <>Selected: <strong style={{ color: 'var(--text)' }}>{selected}</strong></> : <>Pick a trend to continue</>)}
        </div>
        <button
          className={`tw-btn ${(selected || (tab === 'Custom' && customUploaded)) ? 'tw-btn--accent' : 'tw-btn--disabled'}`}
          style={{ height: 54, padding: '0 30px', fontSize: 16.5 }}
          onClick={onContinue}
        >Generate ✨</button>
      </div>
    </Stage>
  );
}

// ─── Screen 4: Generating ───────────────────────────────────────
function ScreenGenerating({ onDone }) {
  const stages = [
    'Analyzing your photo…',
    'Matching the trend…',
    'Adding the sauce…',
    'Almost there…',
  ];
  const [stage, setStage] = useState(0);
  const [pct, setPct] = useState(0);
  const [secs, setSecs] = useState(72);

  useEffect(() => {
    const total = 8000; // 8s for demo
    const start = Date.now();
    const tick = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / total);
      setPct(t * 100);
      setStage(Math.min(stages.length - 1, Math.floor(t * stages.length)));
      setSecs(Math.max(1, Math.round(72 * (1 - t))));
      if (t >= 1) {
        clearInterval(tick);
        setTimeout(onDone, 600);
      }
    }, 80);
    return () => clearInterval(tick);
  }, []);

  return (
    <Stage max={680}>
      <div style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
        {/* Animated portrait with shader ring */}
        <div style={{ position: 'relative', width: 220, height: 280, margin: '0 auto 40px' }}>
          <div style={{
            position: 'absolute', inset: -16, borderRadius: 32,
            background: `conic-gradient(from ${pct * 3.6}deg, var(--accent), transparent 50%, var(--accent))`,
            animation: 'tw-spin 2.4s linear infinite',
            filter: 'blur(14px)', opacity: 0.55,
          }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden' }}>
            <Portrait size={220} radius={24} />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
              backgroundSize: '200% 100%',
              animation: 'tw-shimmer 1.6s linear infinite',
              mixBlendMode: 'overlay',
            }} />
          </div>
        </div>

        <div className="tw-eyebrow" style={{ marginBottom: 14 }}>Making your video</div>
        <h2 className="tw-h2" style={{ marginBottom: 12 }} key={stage}>
          <span style={{ animation: 'tw-rise .4s' }}>{stages[stage]}</span>
        </h2>
        <div className="tw-mono" style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 32 }}>
          ~{secs}s remaining
        </div>

        <div style={{ height: 3, background: 'var(--surface-2)', borderRadius: 2, overflow: 'hidden', maxWidth: 380, margin: '0 auto' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', transition: 'width .12s' }} />
        </div>

        <div style={{ marginTop: 36, color: 'var(--text-faint)', fontSize: 14.5 }}>
          You can switch tabs. We'll keep working.
        </div>
      </div>
    </Stage>
  );
}

// ─── Screen 5: Result Preview ────────────────────────────────────
function ScreenResult({ onAgain, onDownload, onRestart }) {
  return (
    <Stage max={1080}>
      <div className="tw-result-grid">
        {/* Video player */}
        <div style={{ position: 'relative', maxWidth: 420, width: '100%' }}>
          <TrendCard seed={2} video="src/videos/slow-mo-flip.mp4" />
          {/* watermark */}
          <div style={{
            position: 'absolute', bottom: 14, right: 14,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
            trendi
          </div>
          {/* play indicator */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.45)', color: '#fff',
            padding: '6px 12px', borderRadius: 999, fontSize: 13, fontFamily: 'var(--font-mono)',
          }}>● LIVE PREVIEW · 0:14</div>
        </div>

        <div>
          <div className="tw-badge tw-badge--accent" style={{ marginBottom: 24 }}>Your trend is ready</div>
          <h2 className="tw-h2" style={{ marginBottom: 14 }}>You're <em style={{ color: 'var(--accent)' }}>on it.</em></h2>
          <p className="tw-lede" style={{ marginBottom: 32 }}>
            Free preview includes a small watermark. Download HD to remove it and post directly.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 380 }}>
            <button className="tw-btn tw-btn--accent" style={{ height: 58, fontSize: 17 }} onClick={onDownload}>
              Download HD · no watermark
            </button>
            <button className="tw-btn tw-btn--ghost" style={{ height: 50 }}>
              Share preview (with watermark)
            </button>
          </div>

          <div style={{ display: 'flex', gap: 24, marginTop: 32, fontSize: 16 }}>
            <a onClick={onAgain} style={{ color: 'var(--text)', textDecoration: 'underline', cursor: 'pointer' }}>Try another trend</a>
            <a onClick={onRestart} style={{ color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>Start over</a>
          </div>

          <div style={{ marginTop: 48, padding: 20, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-soft)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1v10M3 6l5-5 5 5M2 14h12"/>
              </svg>
            </div>
            <div style={{ fontSize: 15.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Pro tip:</strong> sharing the watermarked preview to Stories drives a 3× higher viral rate than posting the HD straight away. Friends will ask.
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// ─── Screen 6: Paywall ──────────────────────────────────────────
function ScreenPaywall({ onClose, onPay }) {
  const [plan, setPlan] = useState('weekly');

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(20,15,10,0.4)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: 'tw-rise .3s', zIndex: 50,
    }}>
      <div style={{
        background: 'var(--bg)', width: '100%', maxWidth: 640,
        borderRadius: '28px 28px 0 0',
        padding: '20px 40px 40px',
        animation: 'tw-rise .35s',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 44, height: 4, borderRadius: 2, background: 'var(--hairline-strong)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div className="tw-eyebrow">Checkout</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 22, color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
        </div>

        <h2 className="tw-h2" style={{ marginBottom: 8 }}>Get the <em style={{ color: 'var(--accent)' }}>clean</em> version.</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 28, lineHeight: 1.5 }}>
          HD video, no watermark, ready to post. Cancel anytime.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {/* Weekly */}
          <div onClick={() => setPlan('weekly')} style={{
            padding: 22, borderRadius: 18, cursor: 'pointer',
            background: plan === 'weekly' ? 'var(--accent-soft)' : 'var(--surface)',
            border: plan === 'weekly' ? '2px solid var(--accent)' : '2px solid transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: -12, left: 22, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--accent)', color: 'var(--on-accent)',
              padding: '5px 12px', borderRadius: 999 }}>Best value</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, marginBottom: 6, letterSpacing: '-0.02em' }}>Weekly Pass</div>
              <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>Unlimited HD downloads · all trends · cancel anytime</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="tw-mono" style={{ fontSize: 28, fontWeight: 500 }}>$9.99</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>/ week</div>
            </div>
          </div>

          {/* One-off */}
          <div onClick={() => setPlan('once')} style={{
            padding: 22, borderRadius: 18, cursor: 'pointer',
            background: plan === 'once' ? 'var(--accent-soft)' : 'var(--surface)',
            border: plan === 'once' ? '2px solid var(--accent)' : '2px solid var(--hairline)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, marginBottom: 6, letterSpacing: '-0.02em' }}>Just this one</div>
              <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>Single HD download, no commitment</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="tw-mono" style={{ fontSize: 26, fontWeight: 500 }}>$4.99</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>once</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18, fontSize: 14, color: 'var(--text-muted)', marginBottom: 22, justifyContent: 'center' }}>
          <span>🔒 Secure checkout</span>
          <span>·</span>
          <span>Cancel anytime</span>
          <span>·</span>
          <span>Money-back guarantee</span>
        </div>

        <button className="tw-btn tw-btn--accent" style={{ width: '100%', height: 60, fontSize: 17.5 }} onClick={onPay}>
          Continue to checkout · {plan === 'weekly' ? '$9.99' : '$4.99'}
        </button>
      </div>
    </div>
  );
}

// ─── Screen 7: Success ──────────────────────────────────────────
function ScreenSuccess({ onAgain }) {
  const [downloaded, setDownloaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const confetti = useMemo(() => Array.from({ length: 28 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.2 + Math.random() * 0.8,
    color: ['#d96666', '#ffd0c2', '#7d8d6e', '#ffe2a8', '#4a5cdb'][i % 5],
    size: 6 + Math.random() * 8,
  })), []);

  return (
    <Stage max={680}>
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
          {confetti.map((c, i) => (
            <div key={i} style={{
              position: 'absolute', top: 0, left: `${c.left}%`,
              width: c.size, height: c.size * 0.4, background: c.color,
              animation: `tw-confetti ${c.duration}s ${c.delay}s forwards ease-in`,
            }} />
          ))}
        </div>
      )}

      <div style={{ paddingTop: 64, paddingBottom: 80, textAlign: 'center' }}>
        <div className="tw-eyebrow" style={{ marginBottom: 14 }}>Success</div>
        <h2 className="tw-h2" style={{ marginBottom: 14 }}>You're <em style={{ color: 'var(--accent)' }}>on the trend.</em></h2>
        <p className="tw-lede" style={{ marginBottom: 36, marginInline: 'auto', textAlign: 'center' }}>
          Saved a clean HD copy. Push it to TikTok or Reels while it's still hot.
        </p>

        <div style={{ width: 280, margin: '0 auto 36px', position: 'relative' }}>
          <TrendCard seed={2} video="src/videos/slow-mo-flip.mp4" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320, margin: '0 auto' }}>
          <button className="tw-btn tw-btn--accent" style={{ height: 52 }} onClick={() => setDownloaded(true)}>
            {downloaded ? '✓ Saved to downloads' : 'Download to device'}
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="tw-btn tw-btn--ghost" style={{ flex: 1 }}>Post to TikTok</button>
            <button className="tw-btn tw-btn--ghost" style={{ flex: 1 }}>Post to Reels</button>
          </div>
          <button className="tw-btn" style={{ background: 'transparent', color: 'var(--text-muted)', height: 48, fontSize: 15 }} onClick={onAgain}>
            Make another →
          </button>
        </div>
      </div>
    </Stage>
  );
}

Object.assign(window, { ScreenUpload, ScreenPick, ScreenGenerating, ScreenResult, ScreenPaywall, ScreenSuccess });
