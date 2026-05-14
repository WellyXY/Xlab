// Trendi Web — Screen 1: Landing

const TRENDS = [
  { name: 'Coquette dance',     posts: '2.4k posts', badge: 'NEW',      video: 'src/videos/coquette-dance.mp4' },
  { name: 'Brat summer loop',   posts: '1.8k posts',                    video: 'src/videos/brat-summer-loop.mp4' },
  { name: 'Slow-mo hair flip',  posts: '4.1k posts', badge: 'TRENDING', video: 'src/videos/slow-mo-flip.mp4' },
  { name: 'Mirror selfie pan',  posts: '892 posts',                     video: 'src/videos/mirror-pan.mp4' },
  { name: 'Coffee shop POV',    posts: '1.1k posts', badge: 'NEW',      video: 'src/videos/coffee-pov.mp4' },
  { name: 'Get ready w/ me',    posts: '3.6k posts',                    video: 'src/videos/grwm.mp4' },
  { name: 'Rain window mood',   posts: '640 posts',                     video: 'src/videos/golden-walk.mp4' },
  { name: 'Golden hour walk',   posts: '2.0k posts',                    video: 'src/videos/golden-walk.mp4' },
];

function ScreenLanding({ onStart }) {
  const galleryRef = useRef(null);
  const scroll = (dir) => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <div>
      {/* HERO */}
      <Stage max={1180}>
        <div className="tw-hero-grid">
          <div>
            <div className="tw-badge tw-badge--accent tw-badge--dot" style={{ marginBottom: 28 }}>
              Refreshed weekly · Curated by @sofialayne
            </div>
            <h1 className="tw-h1">
              Be on every<br/><em>trend</em>, before it dies.
            </h1>
            <p className="tw-lede" style={{ marginTop: 28 }}>
              Upload a photo. Pick this week's viral. Post in 60 seconds — no editing,
              no learning curve, no cringe.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, alignItems: 'center' }}>
              <button className="tw-btn tw-btn--accent" style={{ height: 58, fontSize: 17.5, padding: '0 30px' }} onClick={onStart}>
                Try it free →
              </button>
              <button className="tw-btn tw-btn--ghost" style={{ height: 58, fontSize: 16.5, padding: '0 24px' }}>
                See examples
              </button>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 36, color: 'var(--text-muted)', fontSize: 15 }}>
              <span>★ 4.9 · 12k creators</span>
              <span>·</span>
              <span>No watermark with HD</span>
              <span>·</span>
              <span>iOS, Android, Web</span>
            </div>
          </div>

          {/* Hero collage */}
          <div className="tw-hero-collage">
            <div style={{ position: 'absolute', top: 20, left: 24, width: 200, transform: 'rotate(-6deg)' }}>
              <TrendCard seed={0} name="Coquette dance" posts="2.4k posts" badge="NEW" video="src/videos/coquette-dance.mp4" />
            </div>
            <div style={{ position: 'absolute', top: 8, right: 0, width: 230, transform: 'rotate(4deg)' }}>
              <TrendCard seed={2} name="Slow-mo flip" posts="4.1k posts" video="src/videos/slow-mo-flip.mp4" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 80, width: 220, transform: 'rotate(2deg)' }}>
              <TrendCard seed={5} name="GRWM" posts="3.6k posts" video="src/videos/grwm.mp4" />
            </div>
          </div>
        </div>
      </Stage>

      {/* THIS WEEK'S TRENDS */}
      <div style={{ borderTop: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        <Stage max={1280}>
         <div className="tw-section-pad">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div className="tw-eyebrow" style={{ marginBottom: 10 }}>This week · May 4 — May 10</div>
              <h2 className="tw-h2">What's <em>actually</em> hitting</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tw-btn tw-btn--ghost" style={{ width: 46, height: 46, padding: 0 }} onClick={() => scroll(-1)}>←</button>
              <button className="tw-btn tw-btn--ghost" style={{ width: 46, height: 46, padding: 0 }} onClick={() => scroll(1)}>→</button>
            </div>
          </div>

          <div ref={galleryRef} style={{
            display: 'flex', gap: 16, overflowX: 'auto', overflowY: 'hidden',
            scrollSnapType: 'x mandatory', paddingBottom: 8,
          }}>
            {TRENDS.map((t, i) => (
              <div key={i} style={{ width: 220, flexShrink: 0, scrollSnapAlign: 'start' }}>
                <TrendCard seed={i} name={t.name} posts={t.posts} badge={t.badge} video={t.video} onClick={onStart} />
              </div>
            ))}
          </div>
         </div>
        </Stage>
      </div>

      {/* HOW IT WORKS */}
      <Stage max={1180}>
       <div className="tw-section-pad" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div className="tw-eyebrow" style={{ marginBottom: 12 }}>How it works</div>
        <h2 className="tw-h2" style={{ marginBottom: 40, maxWidth: 600 }}>
          Three steps. Sixty seconds. <em>Done.</em>
        </h2>
        <div className="tw-steps-grid">
          {[
            { n: '01', t: 'Upload', d: 'A clear selfie. Good light. That\'s the whole brief.' },
            { n: '02', t: 'Pick', d: 'Choose this week\'s trend or drop in your own reference video.' },
            { n: '03', t: 'Post', d: 'Download HD without watermark. Push it straight to TikTok or Reels.' },
          ].map((s, i) => (
            <div key={i} className="tw-card" style={{ padding: 24, minHeight: 200 }}>
              <div className="tw-mono" style={{ fontSize: 14, color: 'var(--text-faint)', marginBottom: 24 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.02em' }}>{s.t}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}
        </div>
       </div>
      </Stage>

      {/* CURATED BY */}
      <div style={{ borderTop: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        <Stage max={1180}>
         <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #ffd0c2, #d96666)' }} />
              <div>
                <div style={{ fontSize: 16, color: 'var(--text-muted)' }}>Trends curated by</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.015em' }}>@sofialayne</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 15, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <a>Privacy</a><a>Terms</a><a>Instagram</a><a>Contact</a>
            </div>
         </div>
        </Stage>
      </div>
    </div>
  );
}

window.ScreenLanding = ScreenLanding;
window.TRENDS = TRENDS;
