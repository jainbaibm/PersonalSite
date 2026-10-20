import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

/** Scrolls to the top (or to the #hash target) on navigation and moves focus for screen-reader users. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (!hash) return;
    }
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}

export function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
