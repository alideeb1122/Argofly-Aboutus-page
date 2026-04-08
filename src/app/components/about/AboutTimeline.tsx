import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '../../data/about';

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const TIMELINE_CARD_IMAGES = [
  "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80')",
  "url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80')",
  "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80')",
  "url('https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1200&q=80')",
] as const;

const TIMELINE_CARD_PATTERN = `
  linear-gradient(135deg, rgba(10, 30, 54, 0.18) 0%, rgba(55, 109, 165, 0.10) 36%, rgba(255, 255, 255, 0.02) 68%),
  radial-gradient(circle at 18% 22%, rgba(4, 116, 196, 0.18), transparent 0 24%),
  radial-gradient(circle at 82% 78%, rgba(4, 116, 196, 0.16), transparent 0 20%),
  linear-gradient(115deg, rgba(4, 116, 196, 0.10) 0 1px, transparent 1px 100%),
  linear-gradient(25deg, rgba(4, 116, 196, 0.09) 0 1px, transparent 1px 100%)
`;

// ─── Desktop milestone (alternating sides) ────────────────────
function DesktopMilestone({
  m,
  index,
}: {
  m: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;
  const [hovered, setHovered] = useState(false);
  const cardImage = TIMELINE_CARD_IMAGES[index % TIMELINE_CARD_IMAGES.length];

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 64px 1fr',
        alignItems: 'start',
        marginBottom: '3rem',
      }}
    >
      {/* Left slot */}
      <div style={{ paddingRight: '2.5rem', paddingTop: 4 }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              backgroundColor: 'var(--background)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'hsl(var(--border))',
              borderRight: '3px solid hsl(var(--primary))',
              padding: '1.4rem 1.6rem',
              textAlign: 'right',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: hovered
                ? '0 18px 44px rgba(4, 116, 196, 0.14), 0 4px 14px rgba(15, 23, 42, 0.08)'
                : '0 6px 18px rgba(15, 23, 42, 0.05)',
              transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease',
            }}
          >
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                scale: hovered ? 1.08 : 1,
                opacity: hovered ? 0.92 : 0.58,
              }}
              transition={{ duration: 0.45, ease }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `${TIMELINE_CARD_PATTERN}, ${cardImage}`,
                backgroundSize: hovered
                  ? '120% 120%, auto, auto, 26px 26px, 36px 36px, 126%'
                  : '112% 112%, auto, auto, 24px 24px, 32px 32px, 118%',
                backgroundPosition: 'center, center, center, center, center, center',
                transformOrigin: 'center center',
                pointerEvents: 'none',
                filter: hovered ? 'saturate(1.02)' : 'saturate(0.96)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(250,252,255,0.70) 0%, rgba(246,250,254,0.76) 100%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                color: 'hsl(var(--foreground))',
                marginBottom: '0.45rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {m.title}
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'hsl(var(--muted-foreground))',
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {m.body}
            </p>
          </motion.div>
        )}
      </div>

      {/* Centre node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05, type: 'spring', stiffness: 200, damping: 18 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'var(--background)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'hsl(var(--primary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 0 0 5px hsl(var(--primary-light))',
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))' }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            color: 'hsl(var(--primary))',
            marginTop: 7,
          }}
        >
          {m.year}
        </motion.div>
      </div>

      {/* Right slot */}
      <div style={{ paddingLeft: '2.5rem', paddingTop: 4 }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              backgroundColor: 'var(--background)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'hsl(var(--border))',
              borderLeft: '3px solid hsl(var(--primary))',
              padding: '1.4rem 1.6rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: hovered
                ? '0 18px 44px rgba(4, 116, 196, 0.14), 0 4px 14px rgba(15, 23, 42, 0.08)'
                : '0 6px 18px rgba(15, 23, 42, 0.05)',
              transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease',
            }}
          >
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                scale: hovered ? 1.08 : 1,
                opacity: hovered ? 0.92 : 0.58,
              }}
              transition={{ duration: 0.45, ease }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `${TIMELINE_CARD_PATTERN}, ${cardImage}`,
                backgroundSize: hovered
                  ? '120% 120%, auto, auto, 26px 26px, 36px 36px, 126%'
                  : '112% 112%, auto, auto, 24px 24px, 32px 32px, 118%',
                backgroundPosition: 'center, center, center, center, center, center',
                transformOrigin: 'center center',
                pointerEvents: 'none',
                filter: hovered ? 'saturate(1.02)' : 'saturate(0.96)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(250,252,255,0.70) 0%, rgba(246,250,254,0.76) 100%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                color: 'hsl(var(--foreground))',
                marginBottom: '0.45rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {m.title}
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'hsl(var(--muted-foreground))',
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {m.body}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Mobile milestone ─────────────────────────────────────────
function MobileMilestone({ m, index }: { m: (typeof timeline)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);
  const cardImage = TIMELINE_CARD_IMAGES[index % TIMELINE_CARD_IMAGES.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.8rem',
        paddingLeft: '0.5rem',
        borderLeft: '2px solid hsl(var(--primary-border))',
        paddingTop: 2,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.72)',
        boxShadow: hovered
          ? '0 18px 44px rgba(4, 116, 196, 0.14), 0 4px 14px rgba(15, 23, 42, 0.08)'
          : '0 6px 18px rgba(15, 23, 42, 0.05)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          scale: hovered ? 1.08 : 1,
          opacity: hovered ? 0.9 : 0.56,
        }}
        transition={{ duration: 0.45, ease }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `${TIMELINE_CARD_PATTERN}, ${cardImage}`,
          backgroundSize: hovered
            ? '120% 120%, auto, auto, 26px 26px, 36px 36px, 126%'
            : '112% 112%, auto, auto, 24px 24px, 32px 32px, 118%',
          backgroundPosition: 'center, center, center, center, center, center',
          pointerEvents: 'none',
          filter: hovered ? 'saturate(1.02)' : 'saturate(0.96)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(250,252,255,0.68) 0%, rgba(246,250,254,0.78) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            color: 'hsl(var(--primary))',
            marginBottom: '0.3rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {m.year}
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            color: 'hsl(var(--foreground))',
            marginBottom: '0.35rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {m.title}
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: 'hsl(var(--muted-foreground))',
            margin: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {m.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────
export function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  // GSAP ScrollTrigger — draws the centre line
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineFillRef.current || !lineTrackRef.current) return;
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: lineTrackRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.4,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'transparent', borderTop: '1px solid hsl(var(--section-border))', position: 'relative' }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(4rem,7vw,7rem) clamp(1.5rem,4vw,3rem)',
        }}
      >
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}
          >
            <span style={{ width: 20, height: 1.5, backgroundColor: 'hsl(var(--border))', display: 'block' }} />
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
              Growth & Innovation
            </span>
            <span style={{ width: 20, height: 1.5, backgroundColor: 'hsl(var(--border))', display: 'block' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.022em',
              color: 'hsl(var(--foreground))',
              margin: 0,
            }}
          >
            Growth & Innovation
          </motion.h2>
        </div>

        {/* ── Desktop timeline ── (hidden on mobile via inline style) */}
        <div className="hidden md:block" style={{ position: 'relative' }}>
          {/* Track container for GSAP */}
          <div
            ref={lineTrackRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              transform: 'translateX(-50%)',
              background:
                'linear-gradient(180deg, rgba(188, 208, 227, 0.72) 0%, rgba(205, 221, 236, 0.82) 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.55), 0 0 18px rgba(4, 116, 196, 0.08)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            {/* Animated fill line */}
            <div
              ref={lineFillRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(180deg, rgba(4, 116, 196, 0.96) 0%, rgba(4, 116, 196, 0.94) 58%, rgba(39, 115, 201, 0.92) 100%)',
                boxShadow: '0 0 14px rgba(4, 116, 196, 0.22), 0 0 24px rgba(4, 116, 196, 0.18)',
                transformOrigin: 'top center',
              }}
            />
          </div>

          {/* Milestones */}
          {timeline.map((m, i) => (
            <DesktopMilestone key={m.year} m={m} index={i} />
          ))}

          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '-0.15rem',
              marginBottom: '0.85rem',
            }}
          >
            <div
              style={{
                width: 2,
                height: 92,
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(4, 116, 196, 0.88) 0 9px, rgba(4, 116, 196, 0.88) 9px 10px, transparent 10px 17px)',
                boxShadow: '0 0 14px rgba(4, 116, 196, 0.14)',
                borderRadius: 999,
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        {/* ── Mobile timeline ── */}
        <div className="md:hidden">
          {timeline.map((m, i) => (
            <MobileMilestone key={m.year} m={m} index={i} />
          ))}

          <div
            aria-hidden="true"
            style={{
              width: 3,
              height: 68,
              marginLeft: '0.5rem',
              marginTop: '-0.05rem',
              marginBottom: '0.9rem',
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(4, 116, 196, 0.86) 0 8px, rgba(4, 116, 196, 0.86) 8px 9px, transparent 9px 15px)',
              boxShadow: '0 0 12px rgba(4, 116, 196, 0.12)',
              borderRadius: 999,
              opacity: 0.88,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          style={{
            marginTop: 'clamp(1.2rem, 3vw, 2rem)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
              letterSpacing: '-0.01em',
              color: 'hsl(var(--foreground))',
              margin: 0,
              opacity: 0.82,
            }}
          >
            Our story is still taking flight.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
