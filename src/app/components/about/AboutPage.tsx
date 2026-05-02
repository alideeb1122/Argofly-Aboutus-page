import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AboutHero } from './AboutHero';
import { AboutStats } from './AboutStats';
import { AboutWhoWeAre } from './AboutWhoWeAre';
import { AboutValues } from './AboutValues';
import { AboutMarquee } from './AboutMarquee';
import { AboutTimeline } from './AboutTimeline';
import { AboutCTA } from './AboutCTA';
import { AboutFeatures } from './AboutFeatures';
import { AboutFooter } from './AboutFooter';
import argoLoader from '../../../assets/argo.gif';

const INTRO_DONE_KEY = 'argo_about_intro_seen';
const ENABLE_ABOUT_INTRO = false;

function AboutIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_DONE_KEY, '1');
      onDone();
    }, 2900);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        background:
          'radial-gradient(circle at 18% 20%, rgba(255,255,255,0.34), transparent 36%), radial-gradient(circle at 84% 14%, rgba(180,223,255,0.34), transparent 40%), radial-gradient(circle at 76% 84%, rgba(113,184,236,0.26), transparent 44%), linear-gradient(175deg, #9fd3ff 0%, #67afe8 34%, #3a87cf 64%, #1f5ea5 100%)',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ x: '-14%', opacity: 0.35 }}
        animate={{ x: '14%', opacity: [0.32, 0.46, 0.32] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '12%',
          left: '-10%',
          width: '58vw',
          maxWidth: 820,
          minWidth: 320,
          height: '22vh',
          borderRadius: 999,
          filter: 'blur(24px)',
          background:
            'radial-gradient(ellipse at 35% 50%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.24) 46%, rgba(255,255,255,0) 75%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ x: '10%', opacity: 0.26 }}
        animate={{ x: '-16%', opacity: [0.2, 0.34, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '14%',
          right: '-8%',
          width: '52vw',
          maxWidth: 780,
          minWidth: 280,
          height: '24vh',
          borderRadius: 999,
          filter: 'blur(28px)',
          background:
            'radial-gradient(ellipse at 56% 44%, rgba(238,248,255,0.55) 0%, rgba(238,248,255,0.2) 50%, rgba(238,248,255,0) 76%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
        style={{
          position: 'relative',
          width: 'min(360px, 62vw)',
          borderRadius: 24,
          padding: '1rem',
          background:
            'linear-gradient(165deg, rgba(238,248,255,0.92) 0%, rgba(218,238,255,0.84) 52%, rgba(205,229,250,0.80) 100%)',
          border: '1px solid rgba(255,255,255,0.52)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 22px 58px rgba(14,60,110,0.30), 0 0 42px rgba(114,194,255,0.35)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.12, 0.52, 0.12], transition: { duration: 1.75, repeat: Infinity } }}
          style={{
            position: 'absolute',
            inset: -3,
            borderRadius: 26,
            background:
              'conic-gradient(from 80deg, rgba(126,204,255,0.2), rgba(31,145,222,0.56), rgba(126,204,255,0.22))',
            filter: 'blur(16px)',
            pointerEvents: 'none',
          }}
        />
        <img
          src={argoLoader}
          alt="Argo Loading"
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            borderRadius: 18,
            display: 'block',
            filter: 'contrast(1.08) brightness(1.06) saturate(1.04)',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ x: '-46%', opacity: 0 }}
        animate={{
          x: ['-46%', '132%'],
          opacity: [0, 0.56, 0],
          transition: { duration: 1.15, delay: 1.65, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(102deg, transparent 32%, rgba(255,255,255,0.72) 49%, transparent 66%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

export function AboutPage() {
  const [showIntro, setShowIntro] = useState(false);
  const [introDone, setIntroDone] = useState(!ENABLE_ABOUT_INTRO);

  useEffect(() => {
    if (!ENABLE_ABOUT_INTRO) {
      setShowIntro(false);
      setIntroDone(true);
      return;
    }

    const seen = window.sessionStorage.getItem(INTRO_DONE_KEY) === '1';
    if (seen) {
      setIntroDone(true);
      setShowIntro(false);
      return;
    }
    setShowIntro(true);
  }, []);

  return (
    <main
      className="argo-about-page"
      style={{
        width: '100%',
        background:
          'linear-gradient(180deg, #f9fcff 0%, #ffffff 28%, #f8fbff 58%, #f1f7fd 82%, #eaf3fb 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {showIntro ? (
          <AboutIntro
            onDone={() => {
              setShowIntro(false);
              setIntroDone(true);
            }}
          />
        ) : null}
      </AnimatePresence>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 12% 10%, rgba(4, 116, 196, 0.08), transparent 28%), radial-gradient(circle at 82% 18%, rgba(4, 116, 196, 0.08), transparent 24%), radial-gradient(circle at 20% 72%, rgba(4, 116, 196, 0.06), transparent 26%), radial-gradient(circle at 86% 84%, rgba(4, 116, 196, 0.06), transparent 22%)',
        }}
      />
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 20, scale: 1.02, filter: 'blur(12px)', clipPath: 'inset(0 0 100% 0)' }}
        animate={
          introDone
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                clipPath: 'inset(0 0 0% 0)',
              }
            : {}
        }
        transition={{ duration: 1.2, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={
            introDone
              ? { opacity: [0.58, 0], transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } }
              : {}
          }
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.62), rgba(255,255,255,0.14) 46%, transparent 68%)',
          }}
        />
        <AboutHero introDone={introDone} />
        <AboutStats introDone={introDone} />
        <AboutWhoWeAre />
        <AboutFeatures />
        <AboutMarquee />
        <AboutValues />
        <AboutTimeline />
        <AboutCTA />
        <AboutFooter />
      </motion.div>
    </main>
  );
}

