import { Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { nav, site } from '../content/site';
import { ThemeSwitch, ThemeToggleButton } from './theme';
import { Container, cx } from './ui';

export function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3 rounded-md" aria-label={`${site.name}, home`}>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-lg bg-ink text-sm font-bold tracking-tight text-white"
      >
        JB
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cx('text-[0.95rem] font-semibold', dark ? 'text-white' : 'text-ink')}>{site.name}</span>
        <span className={cx('text-xs', dark ? 'text-slate-400' : 'text-muted')}>{site.role}</span>
      </span>
    </Link>
  );
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cx(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-ink hover:bg-slate-100',
  );

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur supports-[backdrop-filter]:bg-page/75">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <Link
            to="/contact/"
            className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 sm:inline-flex"
          >
            Let’s Connect
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-ink ring-1 ring-line hover:bg-slate-100 xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-surface shadow-lg shadow-slate-900/5 xl:hidden"
      >
        <nav aria-label="Mobile">
          <Container className="py-3">
            <ul className="grid gap-1">
              {[{ label: 'Home', to: '/' }, ...nav, { label: 'Contact', to: '/contact/' }].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cx(
                        'block rounded-md px-3 py-3 text-base font-medium',
                        isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-100',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ThemeSwitch className="mt-4 border-t border-line pt-4" />
          </Container>
        </nav>
      </div>
    </header>
  );
}
