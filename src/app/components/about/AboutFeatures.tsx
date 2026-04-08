import type { FeatureItem, FeaturesSection } from '../../data/about';
import { featuresSection } from '../../data/about';
import { Card } from '../ui/card';
import { cn } from '../ui/utils';
import MemoryIcon from '@mui/icons-material/Memory';
import TuneIcon from '@mui/icons-material/Tune';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import InsightsIcon from '@mui/icons-material/Insights';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useRevealOnScroll } from './useRevealOnScroll';

const ICONS: Record<FeatureItem['iconKey'], JSX.Element> = {
  intelligence: <MemoryIcon fontSize="small" />,
  flexibility: <TuneIcon fontSize="small" />,
  coverage: <PublicIcon fontSize="small" />,
  security: <SecurityIcon fontSize="small" />,
  analytics: <InsightsIcon fontSize="small" />,
};

const FEATURE_CARD_PATTERNS: Record<
  FeatureItem['iconKey'],
  { background: string; accent: string; position?: string; size?: string }
> = {
  intelligence: {
    background:
      'linear-gradient(132deg, transparent 0 58%, rgba(255,255,255,0.42) 61%, transparent 66%), linear-gradient(145deg, transparent 0 70%, rgba(4,116,196,0.12) 72%, transparent 76%), linear-gradient(90deg, transparent 0 70%, rgba(4,116,196,0.12) 70.5% 71.2%, transparent 71.8%), linear-gradient(121deg, transparent 0 62%, rgba(4,116,196,0.12) 62.5% 63.2%, transparent 64%), radial-gradient(circle at 78% 34%, rgba(4,116,196,0.18) 0 1.5px, transparent 2px), radial-gradient(circle at 92% 52%, rgba(4,116,196,0.16) 0 1.5px, transparent 2px)',
    accent: 'radial-gradient(circle at center, rgba(4,116,196,0.20), rgba(4,116,196,0.06) 58%, transparent 76%)',
    position: 'right top',
    size: '100% 100%',
  },
  flexibility: {
    background:
      'linear-gradient(128deg, transparent 0 54%, rgba(255,255,255,0.40) 57%, transparent 62%), linear-gradient(156deg, transparent 0 64%, rgba(4,116,196,0.12) 66%, transparent 71%), linear-gradient(106deg, transparent 0 59%, rgba(4,116,196,0.11) 59.5% 60.2%, transparent 61%), linear-gradient(90deg, transparent 0 74%, rgba(4,116,196,0.10) 74.5% 75.2%, transparent 76%), radial-gradient(circle at 74% 66%, rgba(4,116,196,0.14) 0 1.5px, transparent 2px), radial-gradient(circle at 90% 40%, rgba(4,116,196,0.14) 0 1.5px, transparent 2px)',
    accent: 'radial-gradient(circle at center, rgba(4,116,196,0.18), rgba(4,116,196,0.05) 60%, transparent 78%)',
    position: 'right center',
    size: '100% 100%',
  },
  coverage: {
    background:
      'linear-gradient(134deg, transparent 0 52%, rgba(255,255,255,0.42) 55%, transparent 60%), linear-gradient(118deg, transparent 0 64%, rgba(4,116,196,0.11) 64.5% 65.2%, transparent 66%), linear-gradient(151deg, transparent 0 56%, rgba(4,116,196,0.11) 56.5% 57.2%, transparent 58%), linear-gradient(90deg, transparent 0 74%, rgba(4,116,196,0.10) 74.6% 75.4%, transparent 76.2%), radial-gradient(circle at 74% 34%, rgba(4,116,196,0.16) 0 1.5px, transparent 2px), radial-gradient(circle at 92% 46%, rgba(4,116,196,0.16) 0 1.5px, transparent 2px), radial-gradient(circle at 82% 78%, rgba(4,116,196,0.16) 0 1.5px, transparent 2px)',
    accent: 'radial-gradient(circle at center, rgba(4,116,196,0.18), rgba(4,116,196,0.05) 62%, transparent 80%)',
    position: 'right center',
    size: '100% 100%',
  },
  security: {
    background:
      'linear-gradient(132deg, transparent 0 54%, rgba(255,255,255,0.38) 57%, transparent 62%), linear-gradient(180deg, transparent 0 36%, rgba(4,116,196,0.10) 36.5% 37.3%, transparent 38% 63%, rgba(4,116,196,0.10) 63.5% 64.3%, transparent 65%), linear-gradient(90deg, transparent 0 76%, rgba(4,116,196,0.11) 76.4% 77.2%, transparent 78%), linear-gradient(118deg, transparent 0 61%, rgba(4,116,196,0.10) 61.5% 62.2%, transparent 63%), radial-gradient(circle at 82% 48%, rgba(4,116,196,0.16) 0 1.5px, transparent 2px)',
    accent: 'radial-gradient(circle at center, rgba(4,116,196,0.18), rgba(4,116,196,0.04) 62%, transparent 80%)',
    position: 'right top',
    size: '100% 100%',
  },
  analytics: {
    background:
      'linear-gradient(136deg, transparent 0 53%, rgba(255,255,255,0.40) 56%, transparent 61%), linear-gradient(180deg, transparent 0 54%, rgba(4,116,196,0.10) 54.5% 55.3%, transparent 56.2% 100%), linear-gradient(150deg, transparent 0 50%, rgba(4,116,196,0.12) 50.5% 51.3%, transparent 52.2% 100%), linear-gradient(114deg, transparent 0 64%, rgba(4,116,196,0.10) 64.5% 65.2%, transparent 66%), radial-gradient(circle at 80% 68%, rgba(4,116,196,0.16) 0 1.5px, transparent 2px), radial-gradient(circle at 91% 42%, rgba(4,116,196,0.14) 0 1.5px, transparent 2px)',
    accent: 'radial-gradient(circle at center, rgba(4,116,196,0.18), rgba(4,116,196,0.05) 60%, transparent 78%)',
    position: 'right bottom',
    size: '100% 100%',
  },
};

const RADAR_CSS = `
  @keyframes argo-radar-blip {
    0%, 100% { opacity: 0.12; transform: scale(0.75); }
    24% { opacity: 0.16; transform: scale(0.82); }
    32% { opacity: 1; transform: scale(1.16); }
    44% { opacity: 0.22; transform: scale(0.9); }
  }
`;

export function AboutFeatures() {
  const { ref, isVisible, prefersReducedMotion } = useRevealOnScroll<HTMLDivElement>();
  const data: FeaturesSection = featuresSection;

  return (
    <section
      ref={ref}
      className={cn(
        'w-full px-4 py-10 sm:px-6 sm:py-14 lg:py-16',
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        prefersReducedMotion && 'opacity-100 translate-y-0',
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: RADAR_CSS }} />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl bg-[hsl(var(--surface-dark))] text-[hsl(var(--surface-dark-foreground))] shadow-[0_24px_80px_rgba(15,23,42,0.55)] lg:grid-cols-12">
          {/* Left panel */}
          <div className="relative flex flex-col gap-7 overflow-hidden px-6 py-10 sm:px-8 lg:col-span-5 lg:py-14">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
              style={{ objectPosition: 'center center' }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[#0474c4]/30" />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(4,116,196,0.93) 0%, rgba(36,126,201,0.86) 48%, rgba(191,221,244,0.80) 100%)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.28), transparent 45%),
                  radial-gradient(circle at 80% 70%, rgba(255,255,255,0.18), transparent 55%),
                  repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 12px),
                  repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 16px)
                `,
              }}
            />
            <div className="relative z-10 flex flex-col gap-7">
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)] before:opacity-0 before:transition-opacity before:duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_0_24px_rgba(255,255,255,0.06)] hover:before:opacity-100">
                {data.label && (
                  <p className="inline-flex w-fit items-center rounded-full border border-white/55 bg-white/90 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[hsl(var(--primary))] shadow-[0_6px_18px_rgba(4,116,196,0.14)]">
                    {data.label}
                  </p>
                )}
                <h2 className="font-display text-4xl font-bold tracking-tight leading-[1.08] text-[#f3f7fb] drop-shadow-[0_1px_1px_rgba(0,0,0,0.28)] md:text-5xl">
                  {data.heading}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-[1.85] text-[#eaf3fb]/85 md:text-base">
                  {data.intro}
                </p>

                <p className="mt-2 max-w-lg text-sm leading-[1.9] text-white/75 md:text-base">
                  Designed to empower travel professionals with scalable technology, automation, and
                  real-time operational control.
                </p>

                  <div className="mt-8 flex items-center gap-5 text-sm leading-relaxed text-white/75">
                    <span className="font-display inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e1dd5a]/24 text-[0.92rem] font-medium tracking-[-0.01em] text-[#f3ee9b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
                      400+
                    </span>
                  <span>airlines, hotels, and services unified in one modern platform.</span>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-white/35 animate-[ping_2.6s_ease-out_infinite]" />
                  <span className="absolute inset-2 rounded-full border border-white/30 animate-[ping_2.6s_ease-out_infinite] [animation-delay:0.7s]" />
                  <span className="absolute inset-4 rounded-full border border-white/25 animate-[ping_2.6s_ease-out_infinite] [animation-delay:1.4s]" />
                  <span
                    className="absolute -left-1 top-[28%] h-2 w-2 rounded-full bg-[#d7fbff]"
                    style={{
                      boxShadow: '0 0 0 6px rgba(215,251,255,0.05)',
                      animation: prefersReducedMotion ? undefined : 'argo-radar-blip 5.2s ease-in-out infinite',
                      animationDelay: '0.15s',
                    }}
                  />
                  <span
                    className="absolute -right-0.5 top-[16%] h-2 w-2 rounded-full bg-[#f6fffd]"
                    style={{
                      boxShadow: '0 0 0 5px rgba(246,255,253,0.05)',
                      animation: prefersReducedMotion ? undefined : 'argo-radar-blip 5.2s ease-in-out infinite',
                      animationDelay: '0.95s',
                    }}
                  />
                  <span
                    className="absolute right-[6%] -bottom-0.5 h-2.5 w-2.5 rounded-full bg-[#dffcff]"
                    style={{
                      boxShadow: '0 0 0 6px rgba(223,252,255,0.05)',
                      animation: prefersReducedMotion ? undefined : 'argo-radar-blip 5.2s ease-in-out infinite',
                      animationDelay: '1.75s',
                    }}
                  />
                  <span
                    className="absolute left-[10%] bottom-[10%] h-1.5 w-1.5 rounded-full bg-white/80"
                    style={{
                      boxShadow: '0 0 0 5px rgba(255,255,255,0.04)',
                      animation: prefersReducedMotion ? undefined : 'argo-radar-blip 5.2s ease-in-out infinite',
                      animationDelay: '2.25s',
                    }}
                  />
                  <span className="absolute inset-[18px] rounded-full border border-white/25 bg-white/10" />
                  <TrackChangesIcon className="relative z-10 h-9 w-9 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="bg-muted px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:col-span-7">
            <div className="space-y-3">
              {data.items.map((item, index) => {
                const icon = ICONS[item.iconKey];
                const highlight = item.highlight;

                return (
                  <Card
                    key={item.title}
                    className={cn(
                      'group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card px-4 py-4 shadow-sm transition-all duration-300 ease-out sm:px-5 sm:py-5',
                      'transform-gpu',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                      highlight && 'border-primary/20 shadow-lg',
                      'hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_16px_34px_rgba(4,116,196,0.12)]',
                    )}
                    style={{
                      transitionDelay: isVisible && !prefersReducedMotion ? `${index * 80}ms` : '0ms',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 translate-x-2 scale-[0.985] opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                      style={{
                        backgroundImage: FEATURE_CARD_PATTERNS[item.iconKey].background,
                        backgroundPosition: FEATURE_CARD_PATTERNS[item.iconKey].position ?? 'right center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: FEATURE_CARD_PATTERNS[item.iconKey].size ?? '100% 100%',
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-110"
                      style={{
                        background: FEATURE_CARD_PATTERNS[item.iconKey].accent,
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.00) 52%, rgba(247,251,255,0.58) 100%)',
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-[18%] opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(118deg, transparent 0 56%, rgba(255,255,255,0.55) 60%, transparent 66%)',
                      }}
                    />
                    <div
                      className={cn(
                        'relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-border bg-muted text-primary transition-transform duration-300 ease-out',
                        'group-hover:scale-105',
                      )}
                    >
                      {icon}
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <h3 className="font-display text-[0.98rem] font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-[0.86rem] leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
