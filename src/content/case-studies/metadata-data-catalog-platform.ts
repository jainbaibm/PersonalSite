import type { CaseStudy } from './types';

export const metadataDataCatalogPlatform: CaseStudy = {
  slug: 'metadata-data-catalog-platform',
  title: 'Cloud-native metadata and data-catalog platform on Google Cloud',
  summary:
    'A GCP-native architecture for the system of record behind data intake, ingestion, keying and analytics lifecycle stages — supporting governance, lineage and cross-team data discovery.',
  kind: 'experience',
  reviewStatus: 'draft',
  domain: 'Data governance',
  client: 'Equifax',
  clientAnonymized: 'A global data and analytics company',
  role: 'Technical Architect',
  period: '2023 – 2024',
  tags: ['Data governance', 'Google Cloud', 'Event-driven', 'Metadata', 'ERB governance'],
  verifiedFacts: [
    'Architected the metadata and data-catalog platform serving as the system of record for data intake, ingestion, keying and analytics lifecycle stages.',
    'Designed the GCP-native architecture (Firestore, Pub/Sub, Bigtable, BigQuery) supporting governance, lineage tracking and data discovery.',
    'Defined architecture supporting compliance and data-sensitivity classification requirements with governance teams.',
    'Led solutioning for downstream integration with Data Fabric programs for standardized metadata exchange.',
    'Presented the architecture at Enterprise Review Board sessions and secured approval.',
  ],

  context: [
    'In a data-intensive business, knowing what data exists, where it came from and how sensitive it is matters as much as the data itself. Metadata about datasets moved through several lifecycle stages — intake, ingestion, keying and analytics — owned by different teams.',
  ],
  problem: [
    'No single system of record for dataset metadata across lifecycle stages.',
    'Lineage and sensitivity classification were hard to trace across teams.',
    'Downstream data programs needed a standardized way to consume metadata.',
  ],
  functionalRequirements: [
    'Capture and version metadata for datasets across lifecycle stages.',
    'Track lineage between datasets and processing steps.',
    'Support classification of data sensitivity for compliance.',
    'Publish metadata changes to downstream consumers in a standard format.',
    'Integrate with the enterprise data catalog (Collibra).',
  ],
  nonFunctionalRequirements: [
    'Auditability suitable for a regulated environment.',
    'Scalable reads for discovery and analytics.',
    'Loose coupling between metadata producers and consumers.',
  ],
  constraints: [
    'Architecture had to pass Enterprise Review Board approval.',
    'Alignment with existing governance tooling and processes.',
  ],
  approach: [
    'Metadata services own writes to an operational document store, and every change is published as an event. Consumers — the catalog, analytics stores and downstream data programs — subscribe rather than calling the services directly.',
    'Different access patterns get different stores: a document store for operational metadata, a wide-column store for high-volume lineage lookups, and a warehouse for governance analytics and reporting.',
    'I presented the design at Enterprise Review Board sessions and secured approval, which set a governance precedent for the program.',
  ],
  diagram: {
    caption: 'Generalized metadata platform architecture (simplified; not the deployed design).',
    description:
      'Lifecycle systems for intake, ingestion, keying and analytics call metadata services, which write to Firestore and publish change events to Pub/Sub. Subscribers update a Bigtable lineage store, a BigQuery governance warehouse, the enterprise data catalog, and downstream data-fabric consumers.',
    code: `flowchart LR
  subgraph Lifecycle stages
    I[Intake]
    G[Ingestion]
    K[Keying]
    A[Analytics]
  end
  I & G & K & A --> MS[Metadata services<br/>Java · Spring Boot]
  MS --> FS[(Firestore<br/>operational metadata)]
  MS -->|change events| PS{{Pub/Sub}}
  PS --> LN[(Bigtable<br/>lineage)]
  PS --> BQ[(BigQuery<br/>governance analytics)]
  PS --> CAT[[Enterprise data catalog]]
  PS --> DF[[Downstream data programs]]`,
  },
  technologyChoices: [
    { tech: 'Firestore', rationale: 'Flexible document model for evolving metadata schemas with managed scaling.' },
    { tech: 'Pub/Sub', rationale: 'Decouples metadata producers from many consumers; supports fan-out to downstream programs.' },
    { tech: 'Bigtable', rationale: 'Low-latency, high-volume key lookups suited to lineage graphs.' },
    { tech: 'BigQuery', rationale: 'Serverless analytics for governance reporting across the metadata estate.' },
    { tech: 'Collibra integration', rationale: 'Keeps the enterprise catalog as the business-facing view of governed data.' },
  ],
  alternatives: [
    { option: 'Single relational database for all metadata', tradeoff: 'Simpler operations, but harder to scale lineage lookups and evolve schemas.' },
    { option: 'Synchronous API calls to each consumer', tradeoff: 'Tighter coupling and cascading failures when a consumer is unavailable.' },
    { option: 'Event-driven, polyglot persistence (chosen)', tradeoff: 'More moving parts and eventual consistency, but each access pattern gets the right store.' },
  ],
  security: [
    'Sensitivity classification captured as first-class metadata to drive access decisions downstream.',
    'Service-level identities with least-privilege access to each data store.',
  ],
  scalability: [
    'Managed, serverless-style GCP services scale with metadata volume.',
    'Event fan-out lets new consumers join without changes to producers.',
  ],
  deployment: [
    'Containerized Java services (Docker) on Google Cloud.',
    'Event flows observable end to end so lineage gaps can be detected.',
  ],
  outcomes: [
    'A system of record for metadata across intake, ingestion, keying and analytics stages.',
    'ERB-approved architecture that established a governance precedent for the program.',
    'Standardized metadata exchange with downstream Data Fabric programs.',
  ],
  lessons: [
    'Governance architecture succeeds when it is useful to engineers, not only auditors.',
    'Bringing governance stakeholders into design early shortens review cycles.',
  ],
};
