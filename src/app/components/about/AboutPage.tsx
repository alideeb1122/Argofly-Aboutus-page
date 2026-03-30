import { AboutHero } from './AboutHero';
import { AboutStats } from './AboutStats';
import { AboutWhoWeAre } from './AboutWhoWeAre';
import { AboutValues } from './AboutValues';
import { AboutMarquee } from './AboutMarquee';
import { AboutTimeline } from './AboutTimeline';
import { AboutCTA } from './AboutCTA';
import { AboutFeatures } from './AboutFeatures';
import { AboutFooter } from './AboutFooter';

export function AboutPage() {
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
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 12% 10%, rgba(70, 143, 215, 0.08), transparent 28%), radial-gradient(circle at 82% 18%, rgba(13, 227, 246, 0.08), transparent 24%), radial-gradient(circle at 20% 72%, rgba(70, 143, 215, 0.06), transparent 26%), radial-gradient(circle at 86% 84%, rgba(13, 227, 246, 0.06), transparent 22%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AboutHero />
        <AboutStats />
        <AboutWhoWeAre />
        <AboutFeatures />
        <AboutValues />
        <AboutMarquee />
        <AboutTimeline />
        <AboutCTA />
        <AboutFooter />
      </div>
    </main>
  );
}
