import type { FooterContent } from '../../data/about';
import { footer } from '../../data/about';
import caesarRoadLogo from '../../../assets/logo-caesar-road-white.svg';

export function AboutFooter() {
  const data: FooterContent = footer;

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10"
      style={{
        background:
          'linear-gradient(180deg, #5a93cf 0%, #74a7d8 36%, #9ec3e6 72%, #d2e4f3 100%)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "linear-gradient(180deg, rgba(44, 92, 148, 0.42) 0%, rgba(76, 129, 188, 0.34) 36%, rgba(125, 176, 222, 0.24) 72%, rgba(210, 228, 243, 0.18) 100%), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 62%',
          opacity: 0.98,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(21, 58, 108, 0.38) 0%, rgba(35, 88, 149, 0.28) 34%, rgba(84, 138, 195, 0.18) 72%, rgba(180, 216, 241, 0.12) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.14), transparent 0 18%), radial-gradient(circle at 82% 14%, rgba(13,227,246,0.12), transparent 0 16%), radial-gradient(circle at 70% 82%, rgba(255,255,255,0.10), transparent 0 20%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '160px 160px',
          opacity: 0.18,
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.16))',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.16))',
          pointerEvents: 'none',
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          {data.columns.map((column, i) => (
            <div
              key={column.heading}
              className={i === 0 ? '' : 'xl:border-l xl:border-white/14 xl:pl-8'}
            >
              <h3 className="text-[#eaf4ff] font-semibold tracking-[0.14em] uppercase text-[1.02rem] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.22)]">
                {column.heading}
              </h3>
              <ul className="list-none p-0 m-0 space-y-1.5 max-w-[17rem]">
                {column.lines.map((line, index) => (
                  <li
                    key={index}
                    className={
                      line.startsWith('+')
                        ? 'font-semibold text-white text-[1.15rem] leading-8 tracking-[0.01em] drop-shadow-[0_2px_5px_rgba(0,0,0,0.24)]'
                        : 'text-[rgba(248,252,255,0.98)] text-[1rem] leading-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                    }
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[rgba(245,250,255,0.98)] text-sm">
          <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.16)]">{data.bottomBarLeft}</span>
          <span className="inline-flex items-center gap-2 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
            <span>{data.bottomBarRight}</span>
            <img
              src={caesarRoadLogo}
              alt="Caesar Road"
              className="h-6 w-auto opacity-90"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
