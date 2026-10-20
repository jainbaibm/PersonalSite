import { Check, Palette } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useId, useState, type ReactNode } from 'react';
import { site } from '../content/site';
import { cx } from './ui';

/** The two color themes. Their colors live in src/styles/index.css. */
export const themes = [
  { id: 'executive', name: 'Executive Technology', short: 'Executive', hint: 'Navy + blue', swatch: ['#0b1120', '#2563eb'] },
  { id: 'consulting', name: 'Premium Consulting', short: 'Consulting', hint: 'White + charcoal', swatch: ['#1c1f24', '#3f5b80'] },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

/** Browser-chrome color per theme (mobile address bar). */
const chromeColor: Record<ThemeId, string> = { executive: '#0B1120', consulting: '#FFFFFF' };

/** Key used by the pre-paint script in index.html — keep the two in sync. */
export const THEME_STORAGE_KEY = 'jb-theme';

export const isThemeId = (v: unknown): v is ThemeId => themes.some((t) => t.id === v);

const ThemeContext = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: site.defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start from the default so prerendered HTML hydrates cleanly, then adopt
  // whatever the pre-paint script already applied to <html>.
  const [theme, setThemeState] = useState<ThemeId>(site.defaultTheme);

  useEffect(() => {
    const applied = document.documentElement.dataset.theme;
    if (isThemeId(applied)) setThemeState(applied);
    else document.documentElement.dataset.theme = site.defaultTheme;
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    const root = document.documentElement;
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', chromeColor[next]);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode): the choice lasts for this page view */
    }
    setThemeState(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/** Compact header button: flips between the two themes. */
export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const current = themes.find((t) => t.id === theme)!;
  const next = themes.find((t) => t.id !== theme)!;
  const label = `Color theme: ${current.name}. Switch to ${next.name}`;
  return (
    <button
      type="button"
      onClick={() => setTheme(next.id)}
      title={label}
      className={cx(
        'inline-flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-700 ring-1 ring-line transition-colors hover:bg-slate-100 hover:text-ink',
        className,
      )}
    >
      <Palette className="size-4 shrink-0" aria-hidden="true" />
      <span aria-hidden="true" className="flex -space-x-1">
        {next.swatch.map((c) => (
          <span key={c} className="size-3 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
        ))}
      </span>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="hidden 2xl:inline">
        {next.short}
      </span>
    </button>
  );
}

/** Labelled two-option control for the mobile menu and footer. */
export function ThemeSwitch({ dark, className }: { dark?: boolean; className?: string }) {
  const { theme, setTheme } = useTheme();
  const labelId = useId();
  return (
    <div className={className}>
      <p id={labelId} className={cx('text-xs font-semibold uppercase tracking-[0.14em]', dark ? 'text-slate-400' : 'text-muted')}>
        Color theme
      </p>
      <div role="group" aria-labelledby={labelId} className="mt-2 grid grid-cols-2 gap-2">
        {themes.map((t) => {
          const active = t.id === theme;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => setTheme(t.id)}
              className={cx(
                'flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm ring-1 ring-inset transition-colors',
                dark
                  ? active
                    ? 'bg-white/10 text-white ring-white/40'
                    : 'text-slate-300 ring-white/15 hover:bg-white/5 hover:text-white'
                  : active
                    ? 'bg-blue-50 text-ink ring-blue-600'
                    : 'text-slate-700 ring-line hover:bg-slate-50',
              )}
            >
              <span aria-hidden="true" className="flex shrink-0 -space-x-1">
                {t.swatch.map((c) => (
                  <span key={c} className="size-3.5 rounded-full ring-2 ring-white/80" style={{ backgroundColor: c }} />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-tight">{t.short}</span>
                <span className={cx('block text-xs leading-tight', dark ? 'text-slate-400' : 'text-muted')}>{t.hint}</span>
              </span>
              {active && <Check className="size-4 shrink-0" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
