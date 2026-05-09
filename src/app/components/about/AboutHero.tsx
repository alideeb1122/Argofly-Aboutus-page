import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { hero } from '../../data/about';
import heroVideo from '../../../assets/banner(1)22.mp4';

const HERO_VIDEO = heroVideo;
const HERO_VIDEO_RECOVERY_MS = 2500;

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_CSS = `
  .argo-about-hero { position: relative; min-height: 580px; }
  .argo-about-hero-text {
    position: relative;
    z-index: 2;
    display: flex; flex-direction: column; justify-content: center;
    width: min(54%, 820px);
    padding: clamp(17.8rem,29vw,22rem) clamp(2rem,5vw,5rem) clamp(1.9rem,3.4vw,2.8rem) clamp(1.2rem,3vw,1.9rem);
  }
  .argo-about-hero-bg { position: absolute; inset: 0; overflow: hidden; background: #7ab8ea; }
  @media (max-width: 767px) {
    .argo-about-hero { min-height: 560px; }
    .argo-about-hero-text { width: 100%; padding: 5.8rem 1.25rem 3rem; }
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
            color: 'rgba(248,252,255,0.98)',
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
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

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
        // Retry playback on slow or unstable networks.
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
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              defaultMuted
              playsInline
              preload="metadata"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '76% 50%',
              }}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="argo-about-hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={introDone ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.95, delay: 0.26, ease }}
            style={{
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: 'clamp(1.69rem, 3.12vw, 2.72rem)',
              lineHeight: 1.14,
              letterSpacing: '-0.01em',
              color: 'rgba(248,252,255,0.98)',
              textShadow: '0 2px 10px rgba(0,0,0,0.26)',
              margin: 0,
              maxWidth: 760,
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
                    fontSize: 'clamp(1.69rem, 3.12vw, 2.72rem)',
                    lineHeight: 1.14,
                    letterSpacing: '-0.01em',
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
                    marginTop: '0.28rem',
                    fontWeight: 700,
                    fontSize: 'clamp(1.69rem, 3.12vw, 2.72rem)',
                    lineHeight: 1.14,
                    letterSpacing: '-0.01em',
                    color: 'rgba(248,252,255,0.98)',
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
                fontSize: 'clamp(0.98rem, 1.72vw, 1.22rem)',
                lineHeight: 1.5,
                color: 'rgba(239,248,255,0.95)',
                textShadow: '0 1px 8px rgba(0,0,0,0.22)',
                marginTop: '1rem',
                maxWidth: 820,
                marginLeft: 0,
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
