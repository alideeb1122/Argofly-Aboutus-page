import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { hero } from '../../data/about';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1764197419756-4defd13253bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400&q=85';

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_CSS = `
  .argo-about-hero { display: flex; align-items: stretch; min-height: 580px; }
  .argo-about-hero-text {
    flex: 0 0 55%;
    display: flex; flex-direction: column; justify-content: center;
    padding: clamp(5rem,9vw,8rem) clamp(2rem,5vw,5rem) clamp(4rem,8vw,7rem) clamp(2rem,6vw,7rem);
  }
  .argo-about-hero-image {
    flex: 0 0 45%;
    position: relative; overflow: hidden; min-height: 100%;
  }
  @media (max-width: 767px) {
    .argo-about-hero { flex-direction: column; }
    .argo-about-hero-text { flex: none; padding: 4rem 1.5rem 2.5rem; }
    .argo-about-hero-image { flex: none; height: 260px; min-height: unset; }
  }
`;

export function AboutHero() {
  return (
    <section style={{ position: 'relative', backgroundColor: 'transparent', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      <div className="argo-about-hero">
        {/* ── Left: text ── */}
        <div className="argo-about-hero-text">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.6rem' }}
          >
            <span style={{ display: 'block', width: 28, height: 2, backgroundColor: 'hsl(var(--primary))', borderRadius: 2, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: '0.65rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'hsl(var(--primary))',
              }}
            >
              {hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'hsl(var(--foreground))',
              whiteSpace: 'pre-line',
              margin: 0,
            }}
          >
            {hero.headline}
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              lineHeight: 1.75,
              color: 'hsl(var(--muted-foreground))',
              marginTop: '1.4rem',
              maxWidth: 480,
            }}
          >
            {hero.body}
          </motion.p>

          {/* Yellow accent rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.32, ease }}
            style={{
              marginTop: '2.8rem',
              width: 56,
              height: 3,
              backgroundColor: 'hsl(var(--primary))',
              transformOrigin: 'left center',
              borderRadius: 2,
            }}
          />
        </div>

        {/* ── Right: image ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease }}
          className="argo-about-hero-image"
        >
          <ImageWithFallback
            src={HERO_IMAGE}
            alt={hero.imageAlt}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          {/* Soft left-edge blend */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, var(--background) 0%, rgba(255,255,255,0.08) 22%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
