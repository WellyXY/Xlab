// Trendi Web — main app + tweaks



function TrendiApp() {
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "clay"
  }/*EDITMODE-END*/);

  const [screen, setScreen] = useState('landing');
  const [paywallOpen, setPaywallOpen] = useState(false);

  // Apply accent to root
  useEffect(() => {
    document.documentElement.dataset.accent = t.accent;
  }, [t.accent]);

  const showStartOver = screen !== 'landing';

  return (
    <div className="tw-app" data-accent={t.accent}>
      <TopNav current={screen} onLogo={() => { setScreen('landing'); setPaywallOpen(false); }} />

      {screen === 'landing'    && <ScreenLanding   onStart={() => setScreen('upload')} />}
      {screen === 'upload'     && <ScreenUpload    onBack={() => setScreen('landing')} onContinue={() => setScreen('pick')} />}
      {screen === 'pick'       && <ScreenPick      onBack={() => setScreen('upload')} onContinue={() => setScreen('generating')} />}
      {screen === 'generating' && <ScreenGenerating onDone={() => setScreen('result')} />}
      {screen === 'result'     && <ScreenResult    onAgain={() => setScreen('pick')} onRestart={() => setScreen('upload')} onDownload={() => setPaywallOpen(true)} />}
      {screen === 'success'    && <ScreenSuccess   onAgain={() => setScreen('pick')} />}

      {paywallOpen && screen === 'result' && (
        <ScreenPaywall onClose={() => setPaywallOpen(false)} onPay={() => { setPaywallOpen(false); setScreen('success'); }} />
      )}

      {/* Floating screen jumper for prototype navigation */}
      <ScreenJumper current={screen} onJump={(s) => { setPaywallOpen(false); setScreen(s); }} />

      <TweaksPanel>
        <TweakSection title="Accent">
          <TweakRadio
            label="Accent"
            value={t.accent}
            onChange={(v) => setTweak('accent', v)}
            options={['clay', 'sage', 'indigo']}
          />
          <TweakColor
            label="Preview"
            value={t.accent === 'clay' ? '#d96666' : t.accent === 'sage' ? '#7d8d6e' : '#4a5cdb'}
            options={['#d96666', '#7d8d6e', '#4a5cdb']}
            onChange={(hex) => {
              const map = { '#d96666': 'clay', '#7d8d6e': 'sage', '#4a5cdb': 'indigo' };
              setTweak('accent', map[hex] || 'clay');
            }}
          />
        </TweakSection>
        <TweakSection title="Jump to screen">
          <TweakSelect
            label="Screen"
            value={screen}
            onChange={(v) => { setPaywallOpen(false); setScreen(v); }}
            options={['landing', 'upload', 'pick', 'generating', 'result', 'success']}
          />
          <TweakButton onClick={() => { setScreen('result'); setPaywallOpen(true); }}>Open paywall (6)</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// Discrete numbered jumper between screens
function ScreenJumper({ current, onJump }) {
  const screens = [
    { id: 'landing', n: 1 },
    { id: 'upload', n: 2 },
    { id: 'pick', n: 3 },
    { id: 'generating', n: 4 },
    { id: 'result', n: 5 },
    { id: 'success', n: 7 },
  ];
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: 16, transform: 'translateX(-50%)',
      display: 'flex', gap: 4, padding: 4, background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)', border: '1px solid var(--hairline)',
      borderRadius: 999, zIndex: 40, fontFamily: 'var(--font-mono)', fontSize: 11,
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    }}>
      {screens.map((s) => (
        <button key={s.id} onClick={() => onJump(s.id)} style={{
          width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: current === s.id ? 'var(--text)' : 'transparent',
          color: current === s.id ? 'var(--bg)' : 'var(--text-muted)',
          fontWeight: 600, fontSize: 11,
        }}>{s.n}</button>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TrendiApp />);
