import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cta } from '../../data/about';

const ease = [0.22, 1, 0.36, 1] as const;
const SUPPORT_IMAGE =
  'https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=2000&h=500&fit=crop';

export function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const stagger = (d: number) => ({
    initial: { opacity: 0, y: 22 },
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
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem) clamp(4rem,7vw,6rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div {...stagger(0)} style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.74rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'hsl(var(--primary))',
            }}
          >
            {cta.eyebrow}
          </p>
          <h3
            style={{
              margin: '0.75rem 0 0',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem,4.2vw,3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: 'hsl(var(--foreground))',
              maxWidth: 720,
            }}
          >
            {cta.headline}
          </h3>
          <p
            style={{
              margin: '0.9rem 0 0',
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem,1.45vw,1.12rem)',
              lineHeight: 1.65,
              color: 'hsl(var(--muted-foreground))',
              maxWidth: 620,
            }}
          >
            {cta.body}
          </p>
        </motion.div>

        <motion.div
          {...stagger(0.08)}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 26,
            border: '1px solid rgba(4,116,196,0.24)',
            background:
              'linear-gradient(104deg, rgba(228,243,254,0.95) 0%, rgba(237,248,255,0.96) 42%, rgba(211,237,252,0.92) 74%, rgba(191,229,250,0.90) 100%)',
            boxShadow: '0 18px 42px rgba(4,116,196,0.10)',
            minHeight: 250,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(228,243,254,0.18) 0%, rgba(228,243,254,0.00) 30%, rgba(228,243,254,0.00) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: -36,
              top: -44,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.26), rgba(255,255,255,0.03) 66%, transparent 78%)',
              filter: 'blur(1px)',
            }}
          />

          <img
            className="hidden md:block"
            src={SUPPORT_IMAGE}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 58%',
              opacity: 0.74,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(239,248,255,0.26) 0%, rgba(233,246,255,0.34) 32%, rgba(214,238,252,0.50) 64%, rgba(187,225,248,0.66) 100%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              gap: '1.25rem',
              padding: 'clamp(1.5rem,3.5vw,2.5rem) clamp(1.4rem,3.6vw,3.2rem)',
            }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center min-h-[250px]"
          >
            <div />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
              className="w-full md:min-w-[290px]"
            >
              <a
                href={cta.primaryHref ?? '#'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 999,
                  padding: '0.95rem 1.3rem',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#fff',
                  background:
                    'linear-gradient(135deg, rgba(4,116,196,0.96) 0%, rgba(31,145,218,0.95) 100%)',
                  border: '1px solid rgba(255,255,255,0.62)',
                  boxShadow: '0 10px 22px rgba(4,116,196,0.25)',
                }}
              >
                {cta.primaryLabel}
              </a>
              <a
                href={cta.secondaryHref ?? '#'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 999,
                  padding: '0.95rem 1.3rem',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'hsl(var(--primary))',
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(4,116,196,0.35)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              >
                {cta.secondaryLabel}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
