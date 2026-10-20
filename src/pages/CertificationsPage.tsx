import { CertificationCard } from '../components/cards';
import { ContactCta } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { PageHeader, Section, SectionHeading } from '../components/ui';
import { certifications } from '../content/certifications';
import { profile } from '../content/profile';

export function CertificationsPage() {
  const featured = certifications.filter((c) => c.featured);
  const other = certifications.filter((c) => !c.featured);

  return (
    <>
      <Seo
        title="Certifications"
        description="AWS Certified Solutions Architect – Professional and Google Cloud Certified – Professional Cloud Architect, plus education and recognition."
        path="/certifications/"
      />
      <PageHeader
        eyebrow="Certifications"
        title="Professional-level cloud architecture certifications"
        intro="Certified at the professional level on both AWS and Google Cloud — the two platforms I design on most."
      />

      <Section labelledBy="cloud-certs">
        <h2 id="cloud-certs" className="sr-only">
          Cloud certifications
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((c) => (
            <CertificationCard key={c.id} cert={c} />
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="more-creds">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHeading id="more-creds" eyebrow="Also" title="Other certifications" />
            <div className="grid gap-5">
              {other.map((c) => (
                <CertificationCard key={c.id} cert={c} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Education" title="Degrees" />
            <ul className="grid gap-4">
              {profile.education.map((e) => (
                <li key={e.degree} className="rounded-xl border border-line bg-surface p-5">
                  <p className="font-semibold text-ink">{e.degree}</p>
                  <p className="mt-1 text-sm text-slate-600">{e.school}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Recognition" title="Awards" />
            <ul className="grid gap-4">
              {profile.awards.map((a) => (
                <li key={a.title} className="rounded-xl border border-line bg-surface p-5">
                  <p className="font-semibold text-ink">{a.title}</p>
                  {a.org && <p className="mt-1 text-sm text-slate-600">{a.org}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
