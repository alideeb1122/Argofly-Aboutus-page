import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { values } from '../../data/about';

const ease = [0.22, 1, 0.36, 1] as const;

const CARD_IMAGES: Record<string, string> = {
  mission:
    'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1400&q=80',
  vision:
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80',
  values:
    'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=1400',
};

const CARD_IMAGE_POSITIONS: Record<string, string> = {
  mission: 'center 46%',
  vision: 'center 46%',
  values: 'center 30%',
};

function MissionIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M7 21.5L14.4 15.2L22.8 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="21.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.4" cy="15.2" r="2.1" fill="currentColor" />
      <circle cx="22.8" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.5" />
      <motion.path
        d="M10.8 18.4L17.8 12.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.35, ease }}
      />
      <motion.path
        d="M16.6 11.2L21.6 12L18.6 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -7, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.38, ease, delay: hovered ? 0.05 : 0 }}
      />
      <motion.circle
        cx="22.8"
        cy="9"
        r="5.8"
        stroke="currentColor"
        strokeWidth="1.1"
        initial={false}
        animate={{ opacity: hovered ? 0.2 : 0, scale: hovered ? 1.04 : 0.88 }}
        transition={{ duration: 0.35, ease }}
      />
    </svg>
  );
}

function VisionIcon({ hovered, mouseX, mouseY }: { hovered: boolean; mouseX: number; mouseY: number }) {
  const pupilX = 15 + mouseX * 2.6;
  const pupilY = 15 + mouseY * 2.1;
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path
        d="M3.5 15s4.3-7.5 11.5-7.5S26.5 15 26.5 15 22.2 22.5 15 22.5 3.5 15 3.5 15z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle
        cx={pupilX}
        cy={pupilY}
        r="3.2"
        fill="currentColor"
        initial={false}
        animate={{ scale: hovered ? 1.02 : 0.96 }}
        transition={{ duration: 0.35, ease }}
      />
      <circle cx="15" cy="15" r="6.2" stroke="currentColor" strokeWidth="1.2" opacity="0.32" />
      <motion.rect
        x="5"
        y="8"
        width="6"
        height="14"
        rx="2.5"
        fill="currentColor"
        initial={false}
        animate={{ opacity: hovered ? 0.12 : 0, x: hovered ? 14 : 0 }}
        transition={{ duration: 0.55, ease }}
      />
    </svg>
  );
}

function ValuesIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <motion.circle
        cx="15"
        cy="15"
        r="10.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3.2 3.2"
        initial={false}
        animate={{
          opacity: hovered ? 0.26 : 0.08,
          rotate: hovered ? 26 : 0,
        }}
        transition={{ duration: 0.45, ease }}
        style={{ transformOrigin: '15px 15px' }}
      />
      <motion.path
        d="M15 4.3l2.85 6.1 6.74 1.04-4.88 4.72 1.16 6.66L15 19.86l-5.87 2.96 1.16-6.66-4.88-4.72 6.74-1.04L15 4.3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ rotate: hovered ? 12 : 0, scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.4, ease }}
      />
      <motion.circle
        cx="24"
        cy="8"
        r="1.5"
        fill="currentColor"
        initial={false}
        animate={{
          opacity: hovered ? 0.9 : 0,
          scale: hovered ? 1 : 0.2,
          x: hovered ? 0 : -2,
          y: hovered ? 0 : 2,
        }}
        transition={{ duration: 0.35, ease }}
      />
      <motion.circle
        cx="6.8"
        cy="22"
        r="1.3"
        fill="currentColor"
        initial={false}
        animate={{
          opacity: hovered ? 0.7 : 0,
          scale: hovered ? 1 : 0.2,
          x: hovered ? 0 : 2,
          y: hovered ? 0 : -2,
        }}
        transition={{ duration: 0.4, ease, delay: hovered ? 0.04 : 0 }}
      />
    </svg>
  );
}

function ValueIcon({
  cardId,
  hovered,
  mouseX,
  mouseY,
}: {
  cardId: string;
  hovered: boolean;
  mouseX: number;
  mouseY: number;
}) {
  if (cardId === 'mission') return <MissionIcon hovered={hovered} />;
  if (cardId === 'vision') return <VisionIcon hovered={hovered} mouseX={mouseX} mouseY={mouseY} />;
  return <ValuesIcon hovered={hovered} />;
}

function ValueCard({ card, index }: { card: (typeof values)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const cardImage = CARD_IMAGES[card.id];
  const imagePosition = CARD_IMAGE_POSITIONS[card.id] ?? 'center';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        setPointer({
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y)),
        });
      }}
      onMouseLeave={() => {
        setHovered(false);
        setPointer({ x: 0, y: 0 });
      }}
      style={{
        backgroundColor: 'var(--background)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: hovered ? 'hsl(var(--primary))' : 'hsl(var(--border))',
        borderRadius: 2,
        cursor: 'default',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 48px hsl(var(--primary) / 0.12), 0 6px 18px rgba(15,23,42,0.08)'
          : '0 4px 18px rgba(15,23,42,0.05)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 460,
      }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.45, ease }}
        style={{
          height: 176,
          position: 'relative',
          overflow: 'hidden',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        <img
          src={cardImage}
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: imagePosition,
            display: 'block',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(8, 22, 38, 0.16) 0%, rgba(255,255,255,0.04) 34%, rgba(255,255,255,0.54) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(4,116,196,0.10) 0%, rgba(4,116,196,0.04) 44%, transparent 80%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 52,
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.82) 100%)',
          }}
        />
      </motion.div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 176,
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
        }}
      >
        <motion.div
          animate={{ y: hovered ? -2 : 0, scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease }}
          style={{
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 18,
            color: 'hsl(var(--primary))',
            boxShadow: hovered ? '0 14px 32px hsl(var(--primary) / 0.16)' : '0 8px 22px rgba(15,23,42,0.08)',
            border: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          <ValueIcon cardId={card.id} hovered={hovered} mouseX={pointer.x} mouseY={pointer.y} />
        </motion.div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '4.6rem clamp(1.8rem, 3vw, 2.4rem) clamp(2rem, 3vw, 2.4rem)',
          borderTop: '1px solid hsl(var(--border))',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.84rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'hsl(var(--primary) / 0.88)',
            marginBottom: '0.8rem',
            textAlign: 'center',
          }}
        >
          {card.eyebrow}
        </div>

        {/* Headline */}
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1.08rem, 1.8vw, 1.22rem)',
            lineHeight: 1.32,
            letterSpacing: '-0.01em',
            color: 'hsl(var(--foreground))',
            margin: '0 0 1rem',
            textAlign: 'center',
          }}
        >
          {card.headline}
        </h3>

        {/* Accent line */}
        <div
          style={{
            width: hovered ? 46 : 32,
            height: 2,
            backgroundColor: hovered ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            margin: '0 auto 1.1rem',
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />

        {/* Body */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.9rem',
            lineHeight: 1.75,
            color: 'hsl(var(--muted-foreground))',
            margin: 0,
            textAlign: 'center',
          }}
        >
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export function AboutValues() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section style={{ backgroundColor: 'transparent', borderTop: '1px solid hsl(var(--section-border))' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(4rem,7vw,7rem) clamp(1.5rem,4vw,3rem)',
        }}
      >
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,4vw,4rem)' }}>
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
              Our Foundation
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
            Mission, Vision &{' '}
            <span style={{ color: 'hsl(var(--primary))' }}>Values</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {values.map((card, i) => (
            <ValueCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
