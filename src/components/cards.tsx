import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Clock,
  Cloud,
  Container as ContainerIcon,
  ExternalLink,
  Layers,
  Plug,
  Radio,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router';
import { clientLabel, type CaseStudy } from '../content/case-studies';
import type { ArticleMeta } from '../content/articles';
import { formatDate } from '../content/articles';
import type { Certification } from '../content/certifications';
import { depthLabel, type ExpertiseArea } from '../content/expertise';
import type { LabEntry } from '../content/lab';
import { asset } from '../utils/paths';
import { Tag, cx } from './ui';

export const expertiseIcons = {
  layers: Layers,
  cloud: Cloud,
  boxes: Boxes,
  plug: Plug,
  radio: Radio,
  shield: ShieldCheck,
  container: ContainerIcon,
  sparkles: Sparkles,
} as const;

const cardBase =
  'card-glow group relative flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-lg hover:shadow-slate-900/5 focus-within:border-blue-600';

export function ExpertiseCard({ area, compact }: { area: ExpertiseArea; compact?: boolean }) {
  const Icon = expertiseIcons[area.icon];
  return (
    <article className={cardBase}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        {area.depth === 'exploring' && <Tag tone="amber">{depthLabel[area.depth]}</Tag>}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink">
        <Link to={`/architecture/#${area.id}`} className="after:absolute after:inset-0 after:rounded-xl">
          {area.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{area.summary}</p>
      {!compact && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key technologies">
          {area.technologies.slice(0, 5).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function CaseStudyCard({ study, dark }: { study: CaseStudy; dark?: boolean }) {
  return (
    <article
      className={cx(
        cardBase,
        dark && 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:shadow-none',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone={study.kind === 'conceptual' ? 'violet' : dark ? 'dark' : 'blue'}>
          {study.kind === 'conceptual' ? 'Conceptual design' : study.domain}
        </Tag>
        {study.period && <span className={cx('text-xs', dark ? 'text-slate-400' : 'text-muted')}>{study.period}</span>}
      </div>
      <h3 className={cx('mt-4 text-lg font-semibold leading-snug', dark ? 'text-white' : 'text-ink')}>
        <Link to={`/case-studies/${study.slug}/`} className="after:absolute after:inset-0 after:rounded-xl">
          {study.title}
        </Link>
      </h3>
      <p className={cx('mt-1 text-sm', dark ? 'text-slate-400' : 'text-muted')}>{clientLabel(study)}</p>
      <p className={cx('mt-3 flex-1 text-[0.95rem] leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>{study.summary}</p>
      <span className={cx('mt-5 inline-flex items-center gap-1.5 text-sm font-semibold', dark ? 'text-blue-300' : 'text-blue-700')}>
        Read case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </article>
  );
}

export function ArticleCard({ article, dark }: { article: ArticleMeta; dark?: boolean }) {
  return (
    <article className={cx(cardBase, dark && 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:shadow-none')}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone={dark ? 'dark' : 'blue'}>{article.category}</Tag>
        {article.draft && <Tag tone="amber">Draft</Tag>}
      </div>
      <h3 className={cx('mt-4 text-lg font-semibold leading-snug', dark ? 'text-white' : 'text-ink')}>
        <Link to={`/blog/${article.slug}/`} className="after:absolute after:inset-0 after:rounded-xl">
          {article.title}
        </Link>
      </h3>
      <p className={cx('mt-3 flex-1 text-[0.95rem] leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>{article.summary}</p>
      <p className={cx('mt-5 flex items-center gap-3 text-xs', dark ? 'text-slate-400' : 'text-muted')}>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden="true" /> {article.readingMinutes} min read
        </span>
      </p>
    </article>
  );
}

export function LabCard({ entry }: { entry: LabEntry }) {
  return (
    <article className={cardBase}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone={entry.type === 'ADR' ? 'violet' : entry.type === 'Checklist' ? 'amber' : 'blue'}>{entry.type}</Tag>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">
        <Link to={`/architecture-lab/${entry.slug}/`} className="after:absolute after:inset-0 after:rounded-xl">
          {entry.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-600">{entry.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
        {entry.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CertificationCard({ cert, dark }: { cert: Certification; dark?: boolean }) {
  return (
    <article
      className={cx(
        'flex h-full flex-col rounded-xl border p-6',
        dark ? 'border-white/10 bg-white/[0.04]' : 'border-line bg-surface',
      )}
    >
      <div className="flex items-start gap-4">
        {cert.badge ? (
          <img src={asset(cert.badge)} alt={`${cert.name} badge`} width={72} height={72} loading="lazy" className="size-18 shrink-0" />
        ) : (
          <span
            aria-hidden="true"
            className={cx(
              'grid size-14 shrink-0 place-items-center rounded-xl ring-1',
              dark ? 'bg-blue-500/10 text-blue-300 ring-blue-400/30' : 'bg-blue-50 text-blue-700 ring-blue-100',
            )}
          >
            {cert.featured ? <BadgeCheck className="size-7" /> : <Award className="size-7" />}
          </span>
        )}
        <div>
          <h3 className={cx('text-lg font-semibold leading-snug', dark ? 'text-white' : 'text-ink')}>{cert.name}</h3>
          <p className={cx('mt-1 text-sm', dark ? 'text-slate-400' : 'text-muted')}>{cert.issuer}</p>
        </div>
      </div>
      <p className={cx('mt-4 flex-1 text-[0.95rem] leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>{cert.description}</p>
      {(cert.issued || cert.expires) && (
        <dl className={cx('mt-4 flex gap-6 text-sm', dark ? 'text-slate-300' : 'text-slate-600')}>
          {cert.issued && (
            <div>
              <dt className="text-xs uppercase tracking-wide opacity-75">Issued</dt>
              <dd className="font-medium">{cert.issued}</dd>
            </div>
          )}
          {cert.expires && (
            <div>
              <dt className="text-xs uppercase tracking-wide opacity-75">Valid until</dt>
              <dd className="font-medium">{cert.expires}</dd>
            </div>
          )}
        </dl>
      )}
      {cert.verifyUrl && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('mt-5 inline-flex items-center gap-1.5 text-sm font-semibold', dark ? 'text-blue-300' : 'text-blue-700')}
        >
          Verify credential <ExternalLink className="size-4" aria-hidden="true" />
          <span className="sr-only">for {cert.name} (opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}
