import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { hero } from '../../data/about';
import heroVideo from '../../../assets/hero-optimized.mp4';

const HERO_VIDEO = heroVideo;
const HERO_VIDEO_RECOVERY_MS = 2500;

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_CSS = `
  .argo-about-hero { position: relative; min-height: 580px; }
  .argo-about-hero-text {
    position: relative;
    z-index: 2;
    display: flex; flex-direction: column; justify-content: center;
    width: min(56%, 860px);
    padding: clamp(7.2rem,11vw,10rem) clamp(2rem,5vw,5rem) clamp(4.8rem,8vw,7rem) clamp(2rem,6vw,7rem);
  }
  .argo-about-hero-bg { position: absolute; inset: 0; overflow: hidden; }
  @media (max-width: 767px) {
    .argo-about-hero { min-height: 560px; }
    .argo-about-hero-text { width: 100%; padding: 5.8rem 1.5rem 3rem; }
  }
`;

export function AboutHero({ introDone }: { introDone: boolean }) {
  const [headlinePrimary, ...headlineSecondaryParts] = hero.headline.split('\n');
  const headlineSecondary = headlineSecondaryParts.join('\n').trim();
  const secondarySplit = headlineSecondary.split('#1');
  const hasBody = hero.body.trim().length > 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const renderEmphasizedLine = (line: string, emphasize: boolean) => {
    if (!line.trim()) return null;
    if (!emphasize) return line;
    const [firstWord, ...rest] = line.trim().split(' ');
    return (
      <>
        <span
          style={{
            color: 'hsl(var(--primary))',
            textShadow: '0 8px 22px rgba(24,111,214,0.22)',
          }}
        >
          {firstWord}
        </span>
        {rest.length ? ` ${rest.join(' ')}` : ''}
      </>
    );
  };
  const renderSecondaryLine = (line: string) => {
    const target = 'Execution';
    const index = line.indexOf(target);
    if (index === -1) return line;
    const before = line.slice(0, index);
    const after = line.slice(index + target.length);
    return (
      <>
        {before}
        <span
          style={{
            color: 'hsl(var(--primary))',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          {target}
        </span>
        {after}
      </>
    );
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    let stallTimer = 0;

    const clearStallTimer = () => {
      if (!stallTimer) return;
      window.clearTimeout(stallTimer);
      stallTimer = 0;
    };

    const recoverPlayback = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;

      if (currentVideo.readyState < 3) {
        currentVideo.load();
      }

      currentVideo.play().catch(() => {
        // Keep retrying on constrained/free hosts; no fallback replacement.
      });
    };

    const ensurePlayback = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;
      currentVideo.play().catch(() => {
        // Autoplay can be delayed by browser policies; retry through existing recovery hooks.
      });
    };

    const scheduleRecovery = () => {
      clearStallTimer();
      stallTimer = window.setTimeout(recoverPlayback, HERO_VIDEO_RECOVERY_MS);
    };

    const handleError = () => {
      scheduleRecovery();
    };

    const handleHealthyPlayback = () => {
      clearStallTimer();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        ensurePlayback();
      }
    };

    video.addEventListener('waiting', scheduleRecovery);
    video.addEventListener('stalled', scheduleRecovery);
    video.addEventListener('suspend', scheduleRecovery);
    video.addEventListener('canplay', handleHealthyPlayback);
    video.addEventListener('loadedmetadata', ensurePlayback);
    video.addEventListener('loadeddata', ensurePlayback);
    video.addEventListener('playing', handleHealthyPlayback);
    video.addEventListener('error', handleError);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    ensurePlayback();

    return () => {
      clearStallTimer();
      video.removeEventListener('waiting', scheduleRecovery);
      video.removeEventListener('stalled', scheduleRecovery);
      video.removeEventListener('suspend', scheduleRecovery);
      video.removeEventListener('canplay', handleHealthyPlayback);
      video.removeEventListener('loadedmetadata', ensurePlayback);
      video.removeEventListener('loadeddata', ensurePlayback);
      video.removeEventListener('playing', handleHealthyPlayback);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section style={{ position: 'relative', backgroundColor: 'transparent', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      <div className="argo-about-hero">
        <div className="argo-about-hero-bg" aria-hidden="true">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <motion.video
              ref={videoRef}
              autoPlay
              loop
              muted
              defaultMuted
              playsInline
              preload="auto"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                introDone
                  ? {
                      scale: [1.11, 1.03, 1],
                      opacity: [0, 0.62, 1],
                      transition: { duration: 1.6, ease },
                    }
                  : { scale: 1, opacity: 1 }
              }
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '94% 45%',
              }}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </motion.video>
          </div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={
              introDone
                ? {
                    opacity: [1, 0.92, 1],
                    transition: { duration: 1.35, ease },
                  }
                : {}
            }
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(96deg, rgba(242,247,253,0.78) 0%, rgba(238,245,252,0.60) 34%, rgba(228,239,250,0.34) 52%, rgba(216,231,246,0.14) 74%, rgba(210,226,243,0.06) 100%), linear-gradient(180deg, rgba(10,45,85,0.22) 0%, rgba(10,45,85,0.10) 42%, rgba(10,45,85,0.03) 100%)',
            }}
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: '-22%' }}
            animate={
              introDone
                ? {
                    opacity: [0, 0.52, 0],
                    x: ['-22%', '70%', '126%'],
                    transition: { duration: 1.35, ease, delay: 0.2 },
                  }
                : {}
            }
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(100deg, transparent 34%, rgba(255,255,255,0.26) 50%, transparent 66%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        <div className="argo-about-hero-text">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 24 }}
            animate={introDone ? { opacity: [0, 0.4, 0], y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.25, ease }}
            style={{
              position: 'absolute',
              inset: '-14% -18% -8% -10%',
              zIndex: -1,
              pointerEvents: 'none',
              background:
                'radial-gradient(circle at 20% 40%, rgba(255,255,255,0.56), rgba(255,255,255,0.16) 34%, transparent 58%)',
              filter: 'blur(10px)',
            }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={introDone ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.95, delay: 0.26, ease }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'hsl(var(--foreground))',
              textShadow: '0 2px 10px rgba(255,255,255,0.12)',
              margin: 0,
            }}
          >
            {headlineSecondary ? (
              <>
                <motion.span
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  animate={
                    introDone
                      ? reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{ duration: 0.72, delay: 0.3, ease }}
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    fontSize: 'clamp(2.02rem, 4.1vw, 3.45rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                  }}
                >
                  {renderEmphasizedLine(headlinePrimary, false)}
                </motion.span>
                <motion.span
                  initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={
                    introDone
                      ? reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{ duration: 0.65, delay: 0.5, ease }}
                  style={{
                    display: 'block',
                    marginTop: '0.45rem',
                    fontWeight: 700,
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  {secondarySplit.length > 1 ? (
                    <>
                      {secondarySplit[0]}
                      <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>#1</span>
                      {secondarySplit.slice(1).join('#1')}
                    </>
                  ) : (
                    renderSecondaryLine(headlineSecondary)
                  )}
                </motion.span>
              </>
            ) : (
              renderEmphasizedLine(headlinePrimary, false)
            )}
          </motion.h1>

          {hasBody ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.88, delay: 0.46, ease }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                lineHeight: 1.75,
                color: 'hsl(214 42% 27%)',
                marginTop: '1.4rem',
                maxWidth: 480,
              }}
            >
              {hero.body}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.32, ease }}
            style={{
              display: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}
