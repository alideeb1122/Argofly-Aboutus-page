import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { hero } from '../../data/about';
import heroPlaneImage from '../../../assets/hero-plane.jpg';

const HERO_IMAGE = heroPlaneImage;

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_CSS = `
  .argo-about-hero { position: relative; min-height: 580px; }
  .argo-about-hero-text {
    position: relative;
    z-index: 2;
    display: flex; flex-direction: column; justify-content: center;
    width: min(56%, 860px);
    padding: clamp(5rem,9vw,8rem) clamp(2rem,5vw,5rem) clamp(4rem,8vw,7rem) clamp(2rem,6vw,7rem);
  }
  .argo-about-hero-bg { position: absolute; inset: 0; overflow: hidden; }
  @media (max-width: 767px) {
    .argo-about-hero { min-height: 560px; }
    .argo-about-hero-text { width: 100%; padding: 4.2rem 1.5rem 3rem; }
  }
`;

export function AboutHero() {
  const [headlinePrimary, ...headlineSecondaryParts] = hero.headline.split('\n');
  const headlineSecondary = headlineSecondaryParts.join('\n').trim();
  const secondarySplit = headlineSecondary.split('#1');

  return (
    <section style={{ position: 'relative', backgroundColor: 'transparent', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      <div className="argo-about-hero">
        <div className="argo-about-hero-bg" aria-hidden="true">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt={hero.imageAlt}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '68% 45%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(218,231,244,0.90) 0%, rgba(218,231,244,0.76) 26%, rgba(218,231,244,0.44) 48%, rgba(218,231,244,0.12) 70%, transparent 100%), linear-gradient(180deg, rgba(4,116,196,0.10) 0%, rgba(4,116,196,0.03) 40%, rgba(4,116,196,0.00) 100%)',
            }}
          />
        </div>

        <div className="argo-about-hero-text">
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
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'hsl(var(--primary))',
              }}
            >
              {hero.eyebrow}
            </span>
          </motion.div>

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
              margin: 0,
            }}
          >
            {headlineSecondary ? (
              <>
                <span style={{ display: 'block', fontWeight: 700 }}>{headlinePrimary}</span>
                <span
                  style={{
                    display: 'block',
                    marginTop: '0.45rem',
                    fontWeight: 400,
                    fontSize: 'clamp(1.1rem, 2.3vw, 2.05rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  {secondarySplit.length > 1 ? (
                    <>
                      {secondarySplit[0]}
                      <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>#1</span>
                      {secondarySplit.slice(1).join('#1')}
                    </>
                  ) : (
                    headlineSecondary
                  )}
                </span>
              </>
            ) : (
              headlinePrimary
            )}
          </motion.h1>

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
      </div>
    </section>
  );
}
