import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { stats } from '../../data/about';

const ease = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = requestAnimationFrame(function tick(ts) {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // cubic-out
      setValue(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
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
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'hsl(var(--foreground))',
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        <span style={{ fontSize: '60%', color: 'hsl(var(--primary))', fontWeight: 600 }}>{stat.prefix}</span>
        {count}
        {stat.suffix && (
          <span style={{ fontSize: '65%', color: 'hsl(var(--primary))', fontWeight: 700 }}>{stat.suffix}</span>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '0.95rem',
          color: 'hsl(var(--foreground))',
        }}
      >
        {stat.label}
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '0.75rem',
          color: 'hsl(var(--muted-foreground))',
          letterSpacing: '0.01em',
        }}
      >
        {stat.sublabel}
      </div>
    </motion.div>
  );
}

export function AboutStats() {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { once: true, margin: '-60px' });

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
