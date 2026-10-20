import { CaseStudyCard } from '../components/cards';
import { ContactCta } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { Notice, PageHeader, Section, SectionHeading } from '../components/ui';
import { caseStudies } from '../content/case-studies';

export function CaseStudiesPage() {
  const experience = caseStudies.filter((c) => c.kind === 'experience');
  const conceptual = caseStudies.filter((c) => c.kind === 'conceptual');

  return (
    <>
      <Seo
        title="Case Studies"
        description="Architecture case studies: unified enterprise platforms, dealer-network API integration, cloud-native data catalog on Google Cloud, high-volume claims microservices and conceptual enterprise RAG."
        path="/case-studies/"
      />
      <PageHeader
        eyebrow="Case studies"
        title="How I approach real architecture problems"
        intro="Each case study follows the same structure — context, requirements, constraints, approach, trade-offs and outcomes — so you can see the reasoning, not just the result."
      >
        <div className="mt-8 max-w-3xl">
          <Notice tone="blue" title="About confidentiality">
            Programs are described in generalized form. Client names, internal system names and proprietary details are withheld, and diagrams are
            simplified representations rather than the deployed designs. Outcomes listed are those I can verify.
          </Notice>
        </div>
      </PageHeader>

      <Section labelledBy="experience-title">
        <SectionHeading id="experience-title" eyebrow="From my experience" title="Programs I’ve architected" />
        <div className="grid gap-5 md:grid-cols-2">
          {experience.map((c) => (
            <CaseStudyCard key={c.slug} study={c} />
          ))}
        </div>
      </Section>

      {conceptual.length > 0 && (
        <Section tone="muted" labelledBy="conceptual-title">
          <SectionHeading
            id="conceptual-title"
            eyebrow="Conceptual designs"
            title="Illustrative architectures"
            intro="Designs that show how I would approach a problem. They are not descriptions of deployed systems."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {conceptual.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>
      )}

      <ContactCta />
    </>
  );
}
