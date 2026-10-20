import { Mail } from 'lucide-react';
import { Link } from 'react-router';
import { nav, site } from '../content/site';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { Logo } from './Header';
import { Container } from './ui';

export function Footer() {
  return (
    <footer className="dark-section bg-navy-950 text-slate-400">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {site.tagline}. Architecture that connects business goals to secure, scalable and maintainable systems.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {[...nav, { label: 'Contact', to: '/contact/' }].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-sm font-semibold text-white">Connect</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li>
                <a href={site.linkedin} className="inline-flex items-center gap-2 hover:text-white" rel="me noopener noreferrer" target="_blank">
                  <LinkedInIcon className="size-4" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              {site.github && (
                <li>
                  <a href={site.github} className="inline-flex items-center gap-2 hover:text-white" rel="me noopener noreferrer" target="_blank">
                    <GitHubIcon className="size-4" /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                  <Mail className="size-4 shrink-0" aria-hidden="true" /> {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Personal website. Not affiliated with any employer, client or cloud provider. Views are my own.
          </p>
        </div>
      </Container>
    </footer>
  );
}
