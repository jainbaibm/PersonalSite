import type { CaseStudy } from './types';

export const claimsMicroservices: CaseStudy = {
  slug: 'claims-microservices',
  title: 'High-volume claims microservices for internal and partner consumers',
  summary:
    'Microservices handling 100K+ claims transactions a day for an insurance claims platform, with secure APIs shared with third-party vendors and big-data storage for claims and party data.',
  kind: 'experience',
  reviewStatus: 'draft',
  domain: 'Insurance',
  client: 'MetLife (via Cognizant)',
  clientAnonymized: 'A global insurance provider',
  role: 'Architect-level contributor, HLD/LLD through support; team lead for 30 engineers and analysts',
  period: '2014 – 2020',
  tags: ['Microservices', 'Java', 'Big data', 'Partner APIs', 'IAM'],
  verifiedFacts: [
    'Designed microservices handling 100K+ claims transactions per day for internal and third-party vendor consumption.',
    'Defined web-services architecture (Spring MVC, Spring Boot) integrating with HBase and Titan for claims and party data.',
    'Defined IAM access policies and secure authentication controls for claims data services shared with vendors.',
    'Led and mentored a team of 30 engineers and business analysts.',
  ],

  context: [
    'An insurance claims platform served internal operations teams and external vendors who needed access to claims and party data.',
  ],
  problem: [
    'High, sustained transaction volumes across internal and partner channels.',
    'Claims and party data with complex relationships that needed fast lookup.',
    'Data exposed to third parties had to be tightly controlled.',
  ],
  functionalRequirements: [
    'Services to submit, query and update claims.',
    'Party (claimant, member, provider) lookup with relationship traversal.',
    'Search across claims data.',
    'Secure APIs for third-party vendor consumption.',
  ],
  nonFunctionalRequirements: [
    'Sustained throughput of 100K+ transactions a day.',
    'Authenticated, authorized access for every partner call.',
    'Maintainability across a large, distributed team.',
  ],
  constraints: [
    'Enterprise Java stack and existing relational systems (Oracle).',
    'Regulated insurance data with strict access expectations.',
  ],
  approach: [
    'Claims capabilities were decomposed into services with clear ownership, exposed through REST web services built on Spring MVC and Spring Boot.',
    'Storage followed access patterns: a wide-column store for high-volume claims records, a graph store for party relationships, and a search index for discovery — alongside the existing relational system of record.',
    'Access control was designed in from the start: authentication for every consumer and access policies limiting what each vendor could see.',
  ],
  diagram: {
    caption: 'Generalized claims services architecture (simplified; not the deployed design).',
    description:
      'Internal applications and third-party vendors call claims APIs through an authentication and access-policy layer. Claims, party and search services handle requests, storing claims records in HBase, party relationships in a Titan graph, search indexes in Solr, and reference data in Oracle.',
    code: `flowchart LR
  INT[Internal apps] --> SEC{{AuthN &<br/>access policies}}
  VEN[Third-party vendors] --> SEC
  SEC --> CS[Claims service]
  SEC --> PS[Party service]
  SEC --> SS[Search service]
  CS --> HB[(HBase<br/>claims records)]
  PS --> TI[(Titan graph<br/>party relationships)]
  SS --> SO[(Solr index)]
  CS --> OR[(Oracle<br/>reference data)]`,
  },
  technologyChoices: [
    { tech: 'Java 8, Spring & Spring Boot', rationale: 'Enterprise-standard platform with strong support for REST services.' },
    { tech: 'HBase', rationale: 'Horizontal scale for high-volume claims records.' },
    { tech: 'Titan', rationale: 'Graph model for party relationships that are awkward in relational joins.' },
    { tech: 'Solr', rationale: 'Full-text and faceted search across claims.' },
  ],
  alternatives: [
    { option: 'Relational database for everything', tradeoff: 'Operational simplicity, but relationship traversal and volume become bottlenecks.' },
    { option: 'Polyglot persistence per access pattern (chosen)', tradeoff: 'More technologies to operate, but each workload is served efficiently.' },
  ],
  security: [
    'Authentication controls on every service exposed to vendors.',
    'Access policies restricting each vendor to the data it needs.',
  ],
  scalability: [
    'Stateless services scale horizontally behind the access layer.',
    'Wide-column storage scales with claims volume.',
  ],
  deployment: [
    'Automated builds and deployments with Bamboo.',
    'Team delivered the full lifecycle from HLD/LLD to production support.',
  ],
  outcomes: [
    'Services sustaining 100K+ claims transactions a day for internal and partner consumers.',
    'Recognized as Best Performer of the Year 2016; part of the team recognized as Top Revenue Maker of the account.',
  ],
  lessons: [
    'Partner-facing data needs explicit access design long before the first vendor is onboarded.',
    'Polyglot persistence pays off only when each store has a clear owner and purpose.',
  ],
};
