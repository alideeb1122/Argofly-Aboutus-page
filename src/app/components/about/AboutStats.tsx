import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { stats } from '../../data/about';
import statsGlassBackdrop from '../../../assets/stats-glass-bg.png';

const ease = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;

    const decimals = Number.isInteger(target)
      ? 0
      : (target.toString().split('.')[1]?.length ?? 0);

    let raf = 0;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // cubic-out
      const next = eased * target;
      setValue(Number(next.toFixed(decimals)));
      if (pct < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function formatCount(value: number, target: number) {
  const decimals = Number.isInteger(target)
    ? 0
    : (target.toString().split('.')[1]?.length ?? 0);

  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatItem({
  stat,
  index,
  active,
}: {
  stat: (typeof stats)[0];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(stat.value, active);
  const formattedCount = formatCount(count, stat.value);
  const isLast = index === stats.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease }}
      style={{
        flex: 1,
        padding: '2.15rem 2rem 2.25rem',
        borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.55)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 6,
        minWidth: 160,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "'Oswald', 'Sora', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 4.4vw, 3.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: 'rgba(32,86,166,0.98)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 4,
          fontVariantNumeric: 'tabular-nums lining-nums',
          fontFeatureSettings: '"tnum" 1, "lnum" 1',
          textShadow: '0 1px 0 rgba(255,255,255,0.35)',
        }}
      >
        <span style={{ fontSize: '56%', color: 'rgba(9,128,220,1)', fontWeight: 700 }}>{stat.prefix}</span>
        <span>{formattedCount}</span>
        {stat.suffix && (
          <span style={{ fontSize: '65%', color: 'hsl(var(--primary))', fontWeight: 700 }}>{stat.suffix}</span>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          fontWeight: 700,
          fontSize: 'clamp(0.98rem, 1.45vw, 1.05rem)',
          lineHeight: 1.2,
          color: 'rgba(40,58,86,0.96)',
          marginTop: 2,
          minHeight: '1.2em',
          width: '100%',
          maxWidth: 320,
          marginInline: 'auto',
        }}
      >
        {stat.label}
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          fontWeight: 500,
          fontSize: 'clamp(0.92rem, 1.25vw, 1rem)',
          lineHeight: 1.3,
          color: 'rgba(46,72,106,0.98)',
          letterSpacing: '0.01em',
          marginTop: 2,
          minHeight: '1.3em',
          width: '100%',
          maxWidth: 320,
          marginInline: 'auto',
        }}
      >
        {stat.sublabel}
      </div>
    </motion.div>
  );
}

export function AboutStats({ introDone }: { introDone: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const active = inView && introDone;

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 5,
        marginTop: '-1px',
        padding: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundImage: `url(${statsGlassBackdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          background:
            'linear-gradient(180deg, rgba(176,210,236,0.36) 0%, rgba(201,222,239,0.3) 38%, rgba(225,235,244,0.28) 66%, rgba(235,242,248,0.34) 100%)',
          borderTop: '1px solid rgba(255,255,255,0)',
          borderLeft: '1px solid rgba(255,255,255,0.46)',
          borderRight: '1px solid rgba(255,255,255,0.46)',
          borderBottom: '1px solid rgba(166,194,216,0.45)',
          boxShadow: '0 14px 28px rgba(25,54,88,0.14)',
          backdropFilter: 'blur(18px) saturate(136%)',
          WebkitBackdropFilter: 'blur(18px) saturate(136%)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))',
            pointerEvents: 'none',
          }}
        />
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} active={active} />
        ))}
      </div>
    </section>
  );
}

