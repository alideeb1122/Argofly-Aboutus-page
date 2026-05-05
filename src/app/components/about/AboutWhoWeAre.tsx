import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { whoWeAre } from '../../data/about';
import whoWeArePlaneImage from '../../../assets/who-we-are-argo-logo.jpg';

const SIDE_IMAGE =
  whoWeArePlaneImage;

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutWhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Parallax on image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay: i * 0.1, ease },
  });

  return (
    <section
      ref={sectionRef}
        style={{ backgroundColor: 'transparent', position: 'relative' }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(4rem,7vw,7rem) clamp(1.5rem,4vw,3rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3.8rem, 7.2vw, 7.2rem)',
          alignItems: 'center',
        }}
      >
        {/* Text column */}
        <div>
          <motion.div {...stagger(0)} style={{ display: 'flex', alignItems: 'center', marginBottom: '1.4rem' }}>
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.28rem, 1.95vw, 1.75rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'hsl(var(--primary))',
              }}
            >
              {whoWeAre.eyebrow}
            </span>
          </motion.div>

          {whoWeAre.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...stagger(0.08 + i * 0.08)}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.18vw, 1.1rem)',
                lineHeight: 1.74,
                color: 'hsl(var(--muted-foreground))',
                marginBottom: '1.05rem',
                maxWidth: 700,
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          style={{
            position: 'relative',
            width: 'min(100%, 560px)',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            justifySelf: 'center',
            marginLeft: 'clamp(1.5rem, 3.5vw, 3.25rem)',
          }}
        >
          {/* Decorative border offset */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 16,
              right: -16,
              bottom: -16,
              left: 16,
              border: '2px solid hsl(var(--primary-border))',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              overflow: 'hidden',
              borderRadius: 12,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            <motion.div style={{ y: imgY, height: '100%', width: '100%' }}>
              <ImageWithFallback
                src={SIDE_IMAGE}
                alt="Aviation technology and booking infrastructure"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '52% 48%',
                  display: 'block',
                  borderRadius: 12,
                }}
              />
            </motion.div>
          </div>

          {/* Yellow accent square */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: -8,
              left: -8,
              width: 48,
              height: 48,
              backgroundColor: 'hsl(var(--primary))',
              opacity: 0.18,
              zIndex: 2,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
