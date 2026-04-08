import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import type { Airline } from '../../data/about';
import { airlinesRow1, airlinesRow2 } from '../../data/about';

const ease = [0.22, 1, 0.36, 1] as const;

// ─── SVG mark lookup ────────────────────────────────────────────
// Each mark is 28×28 viewBox, rendered via currentColor (monochrome).
const MARKS: Record<string, React.ReactNode> = {
  EK: ( // Emirates – three tapered horizontal bars
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="8"  width="20" height="2.5" rx="1" fill="currentColor" />
      <rect x="4" y="13" width="15" height="2.5" rx="1" fill="currentColor" />
      <rect x="4" y="18" width="20" height="2.5" rx="1" fill="currentColor" />
    </svg>
  ),
  LH: ( // Lufthansa – circle + stylised crane wing
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 16 Q14 8 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  ),
  SQ: ( // Singapore Airlines – stylised kris / wave
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4 L14 24 M8 10 Q14 6 20 10 M8 18 Q14 14 20 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  ),
  QR: ( // Qatar Airways – oryx silhouette simplified
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M9 22 L12 14 L10 8 L14 6 L18 8 L16 14 L19 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="4.5" r="2" fill="currentColor" />
    </svg>
  ),
  TK: ( // Turkish Airlines – star & crescent simplified
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M7 14 A7 7 0 1 1 21 14 A5 5 0 1 0 7 14 Z" fill="currentColor" opacity="0.85" />
      <path d="M18 10 L19 13 L22 13 L20 15 L21 18 L18 16 L15 18 L16 15 L14 13 L17 13 Z" fill="currentColor" />
    </svg>
  ),
  BA: ( // British Airways – speedmarque arrow
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 14 L16 7 L16 11 L23 11 L23 17 L16 17 L16 21 Z" fill="currentColor" opacity="0.9" />
    </svg>
  ),
  AF: ( // Air France – wave ribbon
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 18 Q10 6 24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M4 22 Q10 10 24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
    </svg>
  ),
  KL: ( // KLM – crown outline
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 21 L5 13 L9 17 L14 8 L19 17 L23 13 L23 21 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  DL: ( // Delta – triangle
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 5 L24 22 L4 22 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  EY: ( // Etihad – geometric 'E' formed from angular paths
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M8 7 L20 7 M8 7 L8 21 M8 14 L17 14 M8 21 L20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  FR: ( // Ryanair – harp string
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M9 5 Q5 14 9 23 L19 23 L19 5 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <line x1="12" y1="8"  x2="12" y2="23" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="6"  x2="15" y2="23" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  U2: ( // easyJet – angled plane nose
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 20 L20 8 M20 8 L20 15 M20 8 L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  W6: ( // Wizz Air – bold W
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 8 L8 20 L14 12 L20 20 L24 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  '6E': ( // IndiGo – simple 'i' dot mark
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="7" r="2.5" fill="currentColor" />
      <rect x="11.5" y="12" width="5" height="12" rx="2" fill="currentColor" />
    </svg>
  ),
  AK: ( // AirAsia – stylised 'A' peak
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 22 L14 5 L24 22 M8 17 L20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  VY: ( // Vueling – orbit arc
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
      <circle cx="14" cy="5"  r="2.5" fill="currentColor" />
    </svg>
  ),
  FZ: ( // flydubai – speed lines + circle
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="5.5" fill="currentColor" opacity="0.9" />
      <path d="M4 11 L10 11 M4 14 L8 14 M4 17 L10 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  LA: ( // LATAM – L-shape
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M9 6 L9 22 L21 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  DY: ( // Norwegian – N-path
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 22 L6 6 L22 22 L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  HV: ( // Transavia – H-bar
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M7 6 L7 22 M21 6 L21 22 M7 14 L21 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  ),
};

// Fallback: two-letter badge
function DefaultMark({ code }: { code: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <text
        x="14"
        y="18"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="9"
        fill="currentColor"
      >
        {code}
      </text>
    </svg>
  );
}

function AirlinePill({ airline }: { airline: Airline }) {
  const mark = MARKS[airline.code] ?? <DefaultMark code={airline.code} />;
  const [logoFailed, setLogoFailed] = useState(false);
  const logoUrl = `https://www.gstatic.com/flights/airline_logos/70px/${encodeURIComponent(airline.code)}.png`;

  return (
    <div
      aria-label={airline.name}
      title={airline.name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 132,
        height: 64,
        margin: '0 0.65rem',
        borderRadius: 18,
        border: '1px solid rgba(143, 164, 191, 0.22)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.76) 0%, rgba(246,250,254,0.9) 100%)',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.65)',
        color: 'hsl(var(--foreground))',
        opacity: 0.7,
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.opacity = '1';
        el.style.transform = 'translateY(-2px)';
        el.style.borderColor = 'rgba(4, 116, 196, 0.32)';
        el.style.boxShadow = '0 16px 34px rgba(4, 116, 196, 0.12), inset 0 1px 0 rgba(255,255,255,0.72)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.opacity = '0.7';
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(143, 164, 191, 0.22)';
        el.style.boxShadow = '0 10px 28px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.65)';
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 20%, rgba(4,116,196,0.12), transparent 20%), radial-gradient(circle at 82% 78%, rgba(4,116,196,0.08), transparent 24%)',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          width: 52,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {logoFailed ? (
          mark
        ) : (
          <img
            src={logoUrl}
            alt={airline.name}
            loading="lazy"
            onError={() => setLogoFailed(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              filter: 'saturate(1.02) contrast(1.04)',
            }}
          />
        )}
      </span>
    </div>
  );
}

const MARQUEE_CSS = `
@keyframes argo-scroll-fwd { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes argo-scroll-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
.argo-about-track-fwd { animation: argo-scroll-fwd 48s linear infinite; }
.argo-about-track-fwd:hover { animation-play-state: paused; }
.argo-about-track-rev { animation: argo-scroll-rev 56s linear infinite; }
.argo-about-track-rev:hover { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .argo-about-track-fwd, .argo-about-track-rev { animation: none; }
}
`;

function MarqueeRow({ airlines, cls }: { airlines: Airline[]; cls: string }) {
  const doubled = [...airlines, ...airlines];
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={cls} style={{ display: 'flex', width: 'max-content', alignItems: 'center', height: 88 }}>
        {doubled.map((a, i) => (
          <AirlinePill key={`${a.code}-${i}`} airline={a} />
        ))}
      </div>
    </div>
  );
}

export function AboutMarquee() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'transparent',
        borderTop: '1px solid hsl(var(--section-border))',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(3rem,5vw,5rem) clamp(1.5rem,4vw,3rem) 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.8rem,3vw,3rem)' }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '0.65rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.7rem',
            }}
          >
            Trusted by Airlines Worldwide
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.6rem,2.8vw,2.2rem)',
              letterSpacing: '-0.02em',
              color: 'hsl(var(--foreground))',
              margin: 0,
            }}
          >
            <span style={{ fontWeight: 800, color: 'hsl(var(--primary))' }}>+400</span>{' '}Airline Partners
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        {/* Gradient edge masks */}
        <div style={{ position: 'relative' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, background: 'linear-gradient(90deg, rgba(247,251,255,0.98), rgba(247,251,255,0))', zIndex: 2, pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, background: 'linear-gradient(270deg, rgba(241,247,253,0.98), rgba(241,247,253,0))', zIndex: 2, pointerEvents: 'none' }} />

          <div style={{ borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))', marginBottom: 1 }}>
            <MarqueeRow airlines={airlinesRow1} cls="argo-about-track-fwd" />
          </div>
          <div style={{ borderBottom: '1px solid hsl(var(--border))' }}>
            <MarqueeRow airlines={airlinesRow2} cls="argo-about-track-rev" />
          </div>
        </div>
      </motion.div>

      <div style={{ height: 'clamp(1.5rem,3vw,3rem)' }} />
    </section>
  );
}
