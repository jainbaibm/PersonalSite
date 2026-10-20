import type { CaseStudy } from './types';

export const dealerNetworkApiIntegration: CaseStudy = {
  slug: 'dealer-network-api-integration',
  title: 'Standardized API integration across a 1,200+ dealer network',
  summary:
    'A retail integration layer that replaced manual, PDF-based dealer invoice exchange with standardized APIs between an automotive manufacturer and third-party dealer management systems.',
  kind: 'experience',
  reviewStatus: 'draft',
  domain: 'Automotive',
  client: 'Nissan Digital',
  clientAnonymized: 'A global automotive manufacturer (European dealer network)',
  role: 'Technical Architect — owner of solution design (HLD) through delivery',
  period: '2020 – 2023',
  tags: ['Enterprise integration', 'API management', 'Partner APIs', 'AWS', 'IAM'],
  verifiedFacts: [
    'Replaced a manual, PDF-based dealer data exchange with automated, standardized APIs.',
    'Spanned a pan-European dealer management landscape of 1,200+ dealers.',
    'Connected internal systems with third-party DMS vendors via standardized APIs.',
    'Designed IAM roles and access policies for API and DMS-vendor integrations.',
    'Reduced dealer-side manual data entry; led 8–15 onsite/offshore developers.',
  ],

  context: [
    'Dealers across Europe run their businesses on dealer management systems (DMS) supplied by many different vendors. Invoice and retail data had to flow between those systems and the manufacturer’s internal platforms.',
    'Historically this exchange relied on PDF documents and manual re-keying, which was slow, error-prone and expensive for dealers.',
  ],
  problem: [
    'Manual data entry on the dealer side, repeated across more than a thousand dealers.',
    'Many DMS vendors, each with different data formats and integration capabilities.',
    'Internal systems of record, ERP and mainframe estates that could not be changed quickly.',
  ],
  functionalRequirements: [
    'Standardized APIs for dealer invoice and retail data exchange.',
    'Onboarding path for third-party DMS vendors.',
    'Routing and transformation of data into internal systems of record.',
    'Traceability of each exchanged document.',
  ],
  nonFunctionalRequirements: [
    'Secure, least-privilege access per vendor and integration.',
    'Resilience to partner downtime and variable payload quality.',
    'Scalable onboarding — adding a vendor should not require new bespoke architecture.',
  ],
  constraints: [
    'Coexistence with ERP (SAP), CRM (Salesforce), mainframe and webMethods integration estates.',
    'Third-party vendors control their own release schedules.',
    'Multi-country context with differing business processes.',
  ],
  approach: [
    'I designed a Retail Integration Layer that exposes one standardized, versioned API contract to all DMS vendors, managed through an API gateway. Behind the gateway, serverless and service components validate, transform and route payloads to internal systems.',
    'The key decision was to standardize the external contract and absorb vendor variation at the edge, so internal systems see one canonical shape regardless of which DMS sent the data.',
    'I owned the end-to-end solution design — requirements, HLD and business alignment — and worked with client CTO and VP Engineering stakeholders on the integration roadmap.',
  ],
  diagram: {
    caption: 'Generalized integration architecture (simplified; internal system names withheld).',
    description:
      'Dealer management systems from multiple vendors call a single standardized API through an API gateway that authenticates each vendor. A validation and transformation layer maps payloads to a canonical model, then an integration layer routes data to ERP, CRM, mainframe and internal systems of record, with an audit store for traceability.',
    code: `flowchart LR
  subgraph Dealers
    V1[DMS vendor A]
    V2[DMS vendor B]
    V3[DMS vendor …]
  end
  V1 & V2 & V3 -->|Standard API| GW{{API gateway<br/>per-vendor auth}}
  GW --> VAL[Validate &<br/>transform]
  VAL --> CAN[Canonical<br/>model]
  CAN --> RT[Integration<br/>routing]
  RT --> ERP[[ERP]]
  RT --> CRM[[CRM]]
  RT --> MF[[Mainframe /<br/>systems of record]]
  VAL --> AUD[(Audit &<br/>trace store)]`,
  },
  technologyChoices: [
    { tech: 'Apigee', rationale: 'Partner-facing API management: per-vendor credentials, quotas, versioning and analytics.' },
    { tech: 'AWS Lambda', rationale: 'Event-style validation and transformation with low operational overhead for variable volumes.' },
    { tech: 'Aurora / PostgreSQL', rationale: 'Durable, queryable record of exchanged documents and their status.' },
    { tech: 'webMethods, Cleo, SAP & Salesforce connectors', rationale: 'Reuse of the existing enterprise integration estate instead of bypassing it.' },
    { tech: 'Java 11 & Spring Boot', rationale: 'Consistent service implementation and team skills.' },
  ],
  alternatives: [
    { option: 'Point-to-point integrations per vendor', tradeoff: 'Fast for the first vendor, but cost and risk grow with every new one.' },
    { option: 'File-based batch exchange (SFTP)', tradeoff: 'Simple for vendors, but slow feedback and weak validation compared with APIs.' },
    { option: 'Standard API with edge transformation (chosen)', tradeoff: 'Requires contract governance and vendor onboarding effort, but scales across the network.' },
  ],
  security: [
    'Dedicated credentials and IAM roles per vendor integration, following least privilege.',
    'Authentication and quota enforcement at the gateway before any internal call.',
    'Payload validation at the edge to protect downstream systems of record.',
  ],
  scalability: [
    'New vendors onboard to the same contract rather than requiring new integration paths.',
    'Serverless processing scales with submission volume.',
  ],
  deployment: [
    'Managed services on AWS with the API gateway as the single partner entry point.',
    'Audit store supports traceability of each exchanged document for support teams.',
  ],
  outcomes: [
    'Replaced manual, PDF-based exchange with automated APIs across a 1,200+ dealer network.',
    'Reduced dealer-side manual data entry.',
    'Individual recognition: employee-of-the-year award (2022).',
  ],
  lessons: [
    'In partner integration, the contract is the product: invest in documentation, sandbox access and versioning policy.',
    'Absorb variation at the edge so internal systems stay simple.',
  ],
};
