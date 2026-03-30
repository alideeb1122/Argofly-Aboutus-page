import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { cta } from '../../data/about';

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovPrimary, setHovPrimary] = useState(false);
  const [hovSecondary, setHovSecondary] = useState(false);

  const stagger = (d: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: d, ease },
  });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'transparent',
        borderTop: '1px solid hsl(var(--section-border))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sky-tint background strip */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 90% at 50% 110%, hsl(var(--accent-light)) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(4rem,7vw,7rem) clamp(1.5rem,4vw,3rem)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          {...stagger(0)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.4rem' }}
        >
          <span style={{ display: 'block', width: 20, height: 1.5, backgroundColor: 'hsl(var(--border))' }} />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '0.65rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            {cta.eyebrow}
          </span>
          <span style={{ display: 'block', width: 20, height: 1.5, backgroundColor: 'hsl(var(--border))' }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...stagger(0.07)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            color: 'hsl(var(--foreground))',
            whiteSpace: 'pre-line',
            margin: '0 auto',
            maxWidth: 600,
          }}
        >
          {cta.headline}
        </motion.h2>

        {/* Body */}
        <motion.p
          {...stagger(0.14)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.97rem',
            lineHeight: 1.75,
            color: 'hsl(var(--muted-foreground))',
            maxWidth: 480,
            margin: '1.3rem auto 0',
          }}
        >
          {cta.body}
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...stagger(0.2)}
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2.4rem',
          }}
        >
          {/* Primary */}
          <button
            onMouseEnter={() => setHovPrimary(true)}
            onMouseLeave={() => setHovPrimary(false)}
            style={{
              padding: '0.85rem 2rem',
              backgroundColor: hovPrimary ? 'hsl(var(--primary-hover))' : 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '0.06em',
              border: 'none',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
              transform: hovPrimary ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hovPrimary
                ? '0 8px 24px hsl(var(--primary) / 0.32)'
                : '0 2px 8px hsl(var(--primary) / 0.18)',
            }}
          >
            {cta.primaryLabel}
          </button>

          {/* Secondary */}
          <button
            onMouseEnter={() => setHovSecondary(true)}
            onMouseLeave={() => setHovSecondary(false)}
            style={{
              padding: '0.85rem 2rem',
              backgroundColor: 'transparent',
              color: hovSecondary ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '0.82rem',
              letterSpacing: '0.06em',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: hovSecondary ? 'hsl(var(--primary))' : 'hsl(var(--border))',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'color 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
              transform: hovSecondary ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            {cta.secondaryLabel}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
