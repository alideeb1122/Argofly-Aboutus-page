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
        padding: '2.4rem 2rem',
        borderRight: isLast ? 'none' : '1px solid hsl(var(--primary-border))',
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
          color: 'hsl(var(--foreground))',
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
          fontVariantNumeric: 'tabular-nums lining-nums',
          fontFeatureSettings: '"tnum" 1, "lnum" 1',
          textShadow: '0 1px 0 rgba(255,255,255,0.35)',
        }}
      >
        <span style={{ fontSize: '56%', color: 'hsl(var(--primary))', fontWeight: 700 }}>{stat.prefix}</span>
        <span>{formattedCount}</span>
        {stat.suffix && (
          <span style={{ fontSize: '65%', color: 'hsl(var(--primary))', fontWeight: 700 }}>{stat.suffix}</span>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: '0.95rem',
          color: 'hsl(var(--foreground))',
          marginLeft: 0,
        }}
      >
        {stat.label}
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: '0.75rem',
          color: 'hsl(var(--muted-foreground))',
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
        backgroundColor: 'hsl(var(--primary-light))',
        borderTop: '1px solid hsl(var(--primary-border))',
        borderBottom: '1px solid hsl(var(--primary-border))',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} active={active} />
        ))}
      </div>
    </section>
  );
}

