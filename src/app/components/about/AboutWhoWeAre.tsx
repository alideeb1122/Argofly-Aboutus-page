import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { whoWeAre } from '../../data/about';
import whoWeArePlaneImage from '../../../assets/who-we-are-paper-plane.jpg';

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
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

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
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
      >
        {/* Text column */}
        <div>
          <motion.div {...stagger(0)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.4rem' }}>
            <span style={{ display: 'block', width: 24, height: 2, backgroundColor: 'hsl(var(--primary))', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.96rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'hsl(var(--primary))',
              }}
            >
              {whoWeAre.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            {...stagger(0.07)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.022em',
              color: 'hsl(var(--foreground))',
              whiteSpace: 'pre-line',
              margin: '0 0 1.8rem',
            }}
          >
            {whoWeAre.headline}
          </motion.h2>

          {whoWeAre.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...stagger(0.14 + i * 0.08)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.97rem',
                lineHeight: 1.8,
                color: 'hsl(var(--muted-foreground))',
                marginBottom: '1rem',
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
            height: 'clamp(300px, 42vw, 480px)',
            overflow: 'hidden',
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
            <motion.div style={{ y: imgY, height: '116%', width: '100%', marginTop: '-8%' }}>
              <ImageWithFallback
                src={SIDE_IMAGE}
                alt="Aviation technology and booking infrastructure"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '82% 58%', display: 'block', borderRadius: 12 }}
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
