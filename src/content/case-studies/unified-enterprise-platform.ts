import type { CaseStudy } from './types';

export const unifiedEnterprisePlatform: CaseStudy = {
  slug: 'unified-enterprise-platform',
  title: 'A unified, API-first platform experience across 30+ enterprise applications',
  summary:
    'Component-driven UI and API-first backend architecture that brought 30+ medical imaging applications onto shared platform services, a common design system and standardized API contracts.',
  kind: 'experience',
  reviewStatus: 'draft',
  domain: 'Healthcare',
  client: 'GE Healthcare (via Quest Global)',
  clientAnonymized: 'A global healthcare technology company',
  role: 'Lead Solution Architect',
  period: '2024 – 2026',
  tags: ['Platform architecture', 'API-first', 'Micro-frontends', 'IAM / RBAC', 'AWS'],
  verifiedFacts: [
    'Unified medical imaging workflows across 30+ enterprise applications and digital channels, serving 5M+ users.',
    'Defined centralized platform services: authentication, SSO, navigation and theming.',
    'Designed a multi-tenant, reusable design-system architecture that reduced UI development effort across product teams.',
    'Designed IAM policies and RBAC across microservices and the API layer for least-privilege access.',
    'Led a cross-functional team of 26 across onsite and offshore locations.',
  ],

  context: [
    'The organization offered a large portfolio of clinical and imaging applications, built over many years by different product teams. Each had its own navigation, sign-in experience and visual language, and many integrated with enterprise systems such as SAP and Salesforce.',
    'The business goal was a harmonized experience: one coherent product family for clinicians and operators, delivered without forcing every product team onto a single release train.',
  ],
  problem: [
    'Inconsistent user experience across applications increased training effort and made the portfolio feel fragmented.',
    'Every team re-implemented cross-cutting concerns — authentication, navigation, theming — which duplicated effort and created security inconsistencies.',
    'There was no shared contract for how front ends consumed backend services, so integration patterns varied team by team.',
  ],
  functionalRequirements: [
    'Single sign-on and a consistent shell (navigation, theming, user context) across participating applications.',
    'A reusable component library and design system usable by many product teams.',
    'Standardized REST APIs for front ends to consume platform and domain services.',
    'Role-based access to features and data across applications.',
  ],
  nonFunctionalRequirements: [
    'Support a very large user base (5M+ users) across regions.',
    'Independent deployability for product teams.',
    'Least-privilege access enforced consistently at the API layer.',
    'Multi-tenant design so the same platform services serve many products.',
  ],
  constraints: [
    'Existing applications on different stacks and release cycles could not be rewritten at once.',
    'Healthcare context: security and privacy expectations are high.',
    'Integration with existing enterprise platforms (SAP, Salesforce) had to be preserved.',
  ],
  approach: [
    'The architecture separates a thin, shared platform layer from product-owned domain services. The platform layer provides the application shell, design system and centralized services (authentication, SSO, navigation, theming); products plug into it through documented contracts.',
    'On the backend, an API gateway fronts microservices so that cross-cutting policies — authentication, rate limiting, routing — are applied once. Front ends consume backend capabilities through standardized REST contracts that I owned and reviewed across teams.',
    'Access control is designed as a first-class platform concern: IAM policies for service-to-service access and RBAC claims evaluated consistently at the API layer.',
  ],
  diagram: {
    caption: 'Generalized platform architecture (simplified; not the deployed design).',
    description:
      'Users reach a shared application shell that hosts product UIs built with a common design system. The shell calls an API gateway, which applies authentication and RBAC before routing to platform services (identity and SSO, navigation, theming) and product domain microservices. Domain services integrate with enterprise systems such as ERP and CRM.',
    code: `flowchart LR
  U([Users]) --> SH[Application shell<br/>+ design system]
  SH --> P1[Product UI A]
  SH --> P2[Product UI B]
  SH --> P3[Product UI …]
  P1 & P2 & P3 --> GW{{API gateway<br/>AuthN · RBAC · routing}}
  subgraph Platform services
    ID[Identity & SSO]
    NAV[Navigation]
    TH[Theming]
  end
  subgraph Domain microservices
    D1[Service A]
    D2[Service B]
  end
  GW --> ID & NAV & TH
  GW --> D1 & D2
  D1 --> DB[(Relational DB)]
  D2 --> EXT[[ERP / CRM integration]]`,
  },
  technologyChoices: [
    { tech: 'Java 21 & Spring Boot', rationale: 'Mature ecosystem for secure, observable microservices and the team’s core skill set.' },
    { tech: 'Angular', rationale: 'Strong fit for a large, component-driven design system shared across many teams.' },
    { tech: 'Apigee API gateway', rationale: 'Centralized API policy enforcement, security and analytics for many consuming applications.' },
    { tech: 'AWS (ECS/EKS, Lambda, Aurora)', rationale: 'Containers for long-running services, serverless for event-driven tasks, managed relational storage.' },
    { tech: 'PostgreSQL / Aurora', rationale: 'Relational consistency for platform metadata with managed operations.' },
  ],
  alternatives: [
    { option: 'Rewrite applications into a single front end', tradeoff: 'Maximum consistency, but unacceptable delivery risk and loss of team autonomy.' },
    { option: 'Style guide only, no shared runtime services', tradeoff: 'Cheap to start, but cross-cutting concerns stay duplicated and drift over time.' },
    { option: 'Shared shell + design system + platform services (chosen)', tradeoff: 'Requires platform ownership and contract governance, but lets teams adopt incrementally.' },
  ],
  security: [
    'Centralized authentication and SSO as a platform service, so products do not implement their own sign-in.',
    'IAM policies scoped per service following least privilege.',
    'RBAC enforced at the API layer so authorization rules are consistent across applications.',
  ],
  scalability: [
    'Stateless services behind the gateway scale horizontally.',
    'Multi-tenant platform services are shared across products rather than duplicated.',
    'The shell and design system are delivered as static assets, keeping front-end scaling inexpensive.',
  ],
  deployment: [
    'Containerized services on AWS (ECS/EKS) with product teams deploying independently against stable contracts.',
    'Platform services versioned so consuming applications can upgrade on their own schedule.',
  ],
  outcomes: [
    'A single architecture unifying 30+ applications and digital channels for 5M+ users.',
    'Reduced UI development effort across product teams through the reusable design-system architecture.',
    'Consistent, least-privilege access control across the platform’s microservices and API layer.',
    'Architecture aligned with business and UX goals through direct engagement with client CTO and VP Engineering stakeholders.',
  ],
  lessons: [
    'Platform adoption is a product problem as much as a technical one: clear contracts, documentation and migration paths matter as much as the code.',
    'Owning API contracts centrally early on prevents expensive divergence later.',
  ],
};
