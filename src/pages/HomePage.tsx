import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { ArticleCard, CaseStudyCard, CertificationCard, ExpertiseCard } from '../components/cards';
import { ContactCta, ProfilePhoto } from '../components/content-blocks';
import { DiagramViewer } from '../components/DiagramViewer';
import { TechBackdrop } from '../components/TechBackdrop';
import { Seo } from '../components/Seo';
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, Tag } from '../components/ui';
import { articles } from '../content/articles';
import { caseStudies } from '../content/case-studies';
import { certifications } from '../content/certifications';
import { expertise } from '../content/expertise';
import { getLabEntry } from '../content/lab';
import { profile } from '../content/profile';
import { site } from '../content/site';
import { personJsonLd, websiteJsonLd } from '../utils/head';

/** Renders the headline with its last two words in the brand gradient. */
function GradientHeadline({ text }: { text: string }) {
  const words = text.split(' ');
  const tail = words.slice(-2).join(' ');
  const head = words.slice(0, -2).join(' ');
  return (
    <>
      {head} <span className="text-blue-700">{tail}</span>
    </>
  );
}

export function HomePage() {
  const featuredLab = getLabEntry('gateway-microservices-kafka');
  const featuredCerts = certifications.filter((c) => c.featured);

  return (
    <>
      <Seo
        title={`${site.name} — Senior Solution Architect | Cloud, Enterprise & AI Architecture`}
        description="Senior Solution Architect with 18 years designing secure, scalable enterprise systems on AWS and Google Cloud — microservices, API integration, distributed systems and GenAI. AWS and Google Cloud professional certified."
        path="/"
        type="profile"
        jsonLd={[personJsonLd, websiteJsonLd]}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line surface-header">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <TechBackdrop variant="hero" className="opacity-60 md:opacity-100" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <Eyebrow>Senior Solution Architect · Cloud &amp; Enterprise Architecture</Eyebrow>
            <h1 id="hero-title" className="mt-4 text-[2.6rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-6xl">
              <GradientHeadline text={profile.headline} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{profile.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/case-studies/">
                Explore My Architecture Work <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/contact/" variant="secondary">
                Let’s Connect
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600" aria-label="Credentials">
              {featuredCerts.map((c) => (
                <li key={c.id} className="inline-flex items-center gap-2">
                  <BadgeCheck className="size-4 text-blue-700" aria-hidden="true" /> {c.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-slate-900/5">
              <ProfilePhoto priority className="aspect-[4/5] w-full rounded-xl bg-slate-100 object-cover object-top" />
              <div className="px-2 pt-4 pb-2">
                <p className="text-lg font-semibold text-ink">{site.name}</p>
                <p className="text-sm text-slate-600">{site.role}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-4" aria-hidden="true" /> {site.location}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Snapshot */}
      <section aria-label="Career snapshot" className="border-b border-line bg-surface">
        <Container>
          <dl className="grid grid-cols-2 divide-line py-10 lg:grid-cols-4 lg:divide-x">
            {profile.stats.map((s) => (
              <div key={s.label} className="px-2 py-4 lg:px-8 lg:first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{s.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-slate-600">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Introduction */}
      <Section labelledBy="intro-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Introduction</Eyebrow>
            <h2 id="intro-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Architecture that connects strategy to working systems.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate-600">
            <p>{profile.shortBio}</p>
            <p>
              My work spans <strong className="font-semibold text-slate-800">healthcare</strong>,{' '}
              <strong className="font-semibold text-slate-800">insurance</strong>,{' '}
              <strong className="font-semibold text-slate-800">automotive</strong> and{' '}
              <strong className="font-semibold text-slate-800">data governance</strong>. I’ve led teams of up to 30 engineers and
              presented designs to enterprise review boards and client CTOs.
            </p>
            <Link to="/about/" className="inline-flex items-center gap-1.5 text-base font-semibold text-blue-700 hover:text-blue-800">
              More about my approach <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Expertise */}
      <Section tone="muted" labelledBy="expertise-title">
        <SectionHeading
          id="expertise-title"
          eyebrow="Core expertise"
          title="Capabilities across the architecture stack"
          intro="From enterprise integration to cloud platforms and AI — each area is labelled by how deeply I’ve applied it."
          action={
            <ButtonLink to="/architecture/" variant="secondary">
              All expertise
            </ButtonLink>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((area) => (
            <ExpertiseCard key={area.id} area={area} compact />
          ))}
        </div>
      </Section>

      {/* Selected work */}
      <Section labelledBy="work-title">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Architecture case studies"
          intro="Generalized write-ups of programs I’ve architected. Client details are withheld and diagrams are simplified representations."
          action={
            <ButtonLink to="/case-studies/" variant="secondary">
              All case studies
            </ButtonLink>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies
            .filter((c) => c.kind === 'experience')
            .slice(0, 4)
            .map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
        </div>
      </Section>

      {/* Architecture lab + writing */}
      <Section tone="dark" labelledBy="lab-title" className="relative overflow-hidden">
        <SectionHeading
          id="lab-title"
          dark
          eyebrow="Architecture Lab"
          title="Reference architectures, patterns and decisions"
          intro="Conceptual designs and checklists I use to reason about systems — written to be reused."
          action={
            <ButtonLink to="/architecture-lab/" variant="light">
              Open the lab
            </ButtonLink>
          }
        />
        {featuredLab?.diagram && (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <DiagramViewer diagram={featuredLab.diagram} label="Conceptual reference" />
            <div className="flex flex-col justify-center">
              <Tag tone="dark">{featuredLab.type}</Tag>
              <h3 className="mt-4 text-2xl font-semibold text-white">{featuredLab.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-300">{featuredLab.summary}</p>
              <Link
                to={`/architecture-lab/${featuredLab.slug}/`}
                className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue-300 hover:text-blue-200"
              >
                Read the design notes <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
        <h3 className="mt-16 text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">Latest writing</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} dark />
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section labelledBy="certs-title">
        <SectionHeading
          id="certs-title"
          eyebrow="Certifications"
          title="Professional-level certified on AWS and Google Cloud"
          action={
            <ButtonLink to="/certifications/" variant="secondary">
              Certification details
            </ButtonLink>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featuredCerts.map((c) => (
            <CertificationCard key={c.id} cert={c} />
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
