import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { stats } from '../../data/about';

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
        borderRight: isLast ? 'none' : '1px solid rgba(146,182,213,0.58)',
        display: 'flex',
        flexDirection: 'column',
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
          color: 'rgba(54,92,157,0.96)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
          fontVariantNumeric: 'tabular-nums lining-nums',
          fontFeatureSettings: '"tnum" 1, "lnum" 1',
          textShadow: '0 1px 0 rgba(255,255,255,0.35)',
        }}
      >
        <span style={{ fontSize: '56%', color: 'rgba(15,121,201,1)', fontWeight: 700 }}>{stat.prefix}</span>
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
          color: 'rgba(46,57,74,0.95)',
          marginLeft: 0,
        }}
      >
        {stat.label}
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          fontWeight: 400,
          fontSize: 'clamp(0.92rem, 1.25vw, 1rem)',
          color: 'rgba(91,104,123,0.92)',
          letterSpacing: '0.01em',
          marginLeft: 0,
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
        marginTop: 'clamp(-1.1rem, -2.2vw, -1.8rem)',
        padding: 0,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          borderRadius: '34px 34px 0 0',
          background:
            'linear-gradient(180deg, rgba(162,204,236,0.42) 0%, rgba(192,218,239,0.34) 30%, rgba(220,233,244,0.3) 55%, rgba(233,241,248,0.4) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.82)',
          borderLeft: '1px solid rgba(255,255,255,0.46)',
          borderRight: '1px solid rgba(255,255,255,0.46)',
          borderBottom: '1px solid rgba(166,194,216,0.45)',
          boxShadow: '0 20px 38px rgba(25,54,88,0.18)',
          backdropFilter: 'blur(22px) saturate(145%)',
          WebkitBackdropFilter: 'blur(22px) saturate(145%)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '-8%',
            width: '42%',
            height: '100%',
            background: 'linear-gradient(105deg, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 55%, rgba(255,255,255,0))',
            filter: 'blur(2px)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-30%',
            right: '8%',
            width: '30%',
            height: '160%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 46%, rgba(255,255,255,0) 72%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.72), rgba(255,255,255,0))',
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

