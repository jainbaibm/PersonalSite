/**
 * Architecture expertise areas.
 * `depth` is shown on the page so readers can tell delivered experience from learning interests:
 *  - production: delivered on client programs (per resume)
 *  - applied:    used within programs as part of a wider architecture
 *  - exploring:  an active learning / research interest
 */
export type Depth = 'production' | 'applied' | 'exploring';

export const depthLabel: Record<Depth, string> = {
  production: 'Delivered on programs',
  applied: 'Applied within programs',
  exploring: 'Active learning interest',
};

export interface RelatedLink {
  label: string;
  to: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  icon: 'layers' | 'cloud' | 'boxes' | 'plug' | 'radio' | 'shield' | 'container' | 'sparkles';
  depth: Depth;
  summary: string;
  description: string;
  technologies: string[];
  /** Technologies or practices the owner is learning, not claiming production depth in. */
  exploring?: string[];
  concerns: string[];
  related: RelatedLink[];
}

export const expertise: ExpertiseArea[] = [
  {
    id: 'solution-enterprise-architecture',
    title: 'Solution & Enterprise Architecture',
    icon: 'layers',
    depth: 'production',
    summary: 'Turning business goals into end-to-end designs, roadmaps and governed decisions.',
    description:
      'I own solution design from requirements and high-level design through delivery: capability mapping, target-state architecture, integration strategy and the governance that keeps many teams aligned. I have presented and defended designs at Enterprise Review Boards and worked directly with CTOs on modernization roadmaps.',
    technologies: ['HLD / LLD', 'Architecture Decision Records', 'UML', 'OOAD', 'Enterprise Review Board governance', 'RFP / RFI solutioning'],
    concerns: [
      'Standardization vs. team autonomy — shared platforms reduce duplication but can slow teams if over-centralized.',
      'Target-state ambition vs. incremental, fundable delivery steps.',
      'Documenting decisions just enough to be useful without creating shelfware.',
    ],
    related: [
      { label: 'Case study: Unified platform experience across 30+ applications', to: '/case-studies/unified-enterprise-platform/' },
      { label: 'Architecture review checklist', to: '/architecture-lab/architecture-review-checklist/' },
      { label: 'Article: ADRs as a lightweight governance habit', to: '/blog/architecture-decision-records/' },
    ],
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture: AWS & GCP',
    icon: 'cloud',
    depth: 'production',
    summary: 'Dual-cloud architecture with managed services chosen for fit, cost and operability.',
    description:
      'I design on both AWS and Google Cloud and hold the professional architect certifications for each. On AWS I have worked with Lambda, EC2, Aurora, ECS/EKS, API Gateway, Step Functions and the GenAI services; on GCP I designed a Firestore, Pub/Sub, Bigtable and BigQuery platform for data governance.',
    technologies: ['AWS Lambda', 'EC2', 'S3', 'RDS / Aurora', 'SQS / SNS', 'ECS / EKS', 'API Gateway', 'Step Functions', 'CloudFormation', 'CloudWatch', 'GKE', 'Firestore', 'Pub/Sub', 'Bigtable', 'BigQuery', 'Dataflow'],
    concerns: [
      'Managed services vs. portability — leaning into managed services usually wins on operability; abstract only where exit cost is real.',
      'Serverless vs. containers — cost and cold-start behaviour against operational control.',
      'Data residency, multi-region resilience and their cost.',
    ],
    related: [
      { label: 'Case study: Cloud-native metadata & data catalog platform', to: '/case-studies/metadata-data-catalog-platform/' },
      { label: 'Reference: Cloud-native application on Kubernetes', to: '/architecture-lab/cloud-native-kubernetes/' },
      { label: 'Article: Least-privilege IAM for microservices', to: '/blog/least-privilege-iam-for-microservices/' },
    ],
  },
  {
    id: 'microservices-distributed-systems',
    title: 'Microservices & Distributed Systems',
    icon: 'boxes',
    depth: 'production',
    summary: 'Service boundaries, data ownership and failure handling for high-volume systems.',
    description:
      'I have designed microservices handling 100K+ claims transactions a day, and modernized legacy applications into cloud-native services — cutting deployment time by 70%. My focus is clean domain boundaries, explicit contracts and predictable behaviour under failure.',
    technologies: ['Java 8–21', 'Spring Boot', 'Spring MVC', 'Hibernate', 'REST', 'PostgreSQL', 'Oracle', 'HBase', 'Solr'],
    concerns: [
      'Service granularity — too fine creates chatty, fragile systems; too coarse recreates the monolith.',
      'Consistency across services: sagas and idempotency vs. distributed transactions.',
      'Operational overhead of many deployables vs. independent release cadence.',
    ],
    related: [
      { label: 'Case study: High-volume claims microservices', to: '/case-studies/claims-microservices/' },
      { label: 'Pattern: Resilience and fault tolerance', to: '/architecture-lab/resilience-patterns/' },
      { label: 'Article: Idempotent Kafka consumers in Spring Boot', to: '/blog/idempotent-kafka-consumers-spring-boot/' },
    ],
  },
  {
    id: 'api-integration',
    title: 'API Management & Enterprise Integration',
    icon: 'plug',
    depth: 'production',
    summary: 'API-first integration across partners, SaaS platforms and legacy systems.',
    description:
      'I architected a retail integration layer that replaced manual, PDF-based dealer data exchange with standardized APIs across 1,200+ dealers, and have delivered API-first platforms integrating 50+ external services — including SAP, Salesforce, mainframe and webMethods estates.',
    technologies: ['Apigee', 'AWS API Gateway', 'REST', 'SOAP', 'SAP integration', 'Salesforce integration', 'webMethods', 'Cleo', 'Mainframe integration'],
    concerns: [
      'Canonical data models vs. pragmatic per-partner mappings.',
      'Synchronous APIs vs. asynchronous exchange for partners with variable availability.',
      'Versioning and deprecation policy across many external consumers.',
    ],
    related: [
      { label: 'Case study: Standardized API integration across a dealer network', to: '/case-studies/dealer-network-api-integration/' },
      { label: 'Reference: Secure enterprise API integration', to: '/architecture-lab/secure-api-integration/' },
      { label: 'Article: API-first integration across a partner network', to: '/blog/api-first-partner-integration/' },
    ],
  },
  {
    id: 'event-driven-kafka',
    title: 'Event-Driven Architecture & Kafka',
    icon: 'radio',
    depth: 'applied',
    summary: 'Decoupling producers and consumers with events, streams and queues.',
    description:
      'I use event-driven design where it reduces coupling and absorbs load — with Kafka on a healthcare platform, Pub/Sub on GCP, and SQS/SNS on AWS. I pay particular attention to delivery semantics, ordering and idempotent consumers.',
    technologies: ['Apache Kafka', 'Google Pub/Sub', 'Amazon SQS / SNS', 'Spring Boot'],
    exploring: ['Kafka Streams', 'Change Data Capture (Debezium)'],
    concerns: [
      'At-least-once delivery means consumers must be idempotent.',
      'Ordering guarantees vs. parallelism (partition key design).',
      'Event streaming vs. simple queues — retention and replay against operational cost.',
    ],
    related: [
      { label: 'Reference: API Gateway → Microservices → Kafka → Data stores', to: '/architecture-lab/gateway-microservices-kafka/' },
      { label: 'ADR: Event streaming vs. message queue', to: '/architecture-lab/adr-event-streaming-vs-queue/' },
      { label: 'Article: Idempotent Kafka consumers in Spring Boot', to: '/blog/idempotent-kafka-consumers-spring-boot/' },
    ],
  },
  {
    id: 'security-reliability-observability',
    title: 'Security, Reliability & Observability',
    icon: 'shield',
    depth: 'production',
    summary: 'Least-privilege access, resilient services and systems you can see into.',
    description:
      'I have delivered IAM and access-control architecture on three major programs — designing IAM policies, RBAC and secure authentication for services shared with third parties. I design for failure and for observability from the start, using Prometheus, Grafana and the ELK stack.',
    technologies: ['IAM policy design', 'RBAC', 'SSO', 'API security', 'Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch'],
    exploring: ['OpenTelemetry', 'Service-level objectives (SLOs) and error budgets'],
    concerns: [
      'Fine-grained authorization vs. complexity and latency at the API layer.',
      'High availability targets vs. the cost of multi-AZ and multi-region designs.',
      'Signal vs. noise — metrics, logs and traces that answer real operational questions.',
    ],
    related: [
      { label: 'Reference: Observability and distributed tracing', to: '/architecture-lab/observability-tracing/' },
      { label: 'Reference: Secure enterprise API integration', to: '/architecture-lab/secure-api-integration/' },
      { label: 'Article: Least-privilege IAM for microservices', to: '/blog/least-privilege-iam-for-microservices/' },
    ],
  },
  {
    id: 'devops-platform',
    title: 'DevOps, Kubernetes & Platform Engineering',
    icon: 'container',
    depth: 'applied',
    summary: 'Containerized delivery on EKS and GKE with automated, quality-gated pipelines.',
    description:
      'I design deployment architecture around Docker and Kubernetes (EKS, GKE) with CI/CD pipelines built on Jenkins, Bitbucket, SonarQube and Nexus. Modernizing legacy applications to containerized microservices delivered a 70% reduction in deployment time.',
    technologies: ['Docker', 'Kubernetes', 'Amazon EKS', 'Google GKE', 'Amazon ECS', 'Jenkins', 'Bitbucket', 'SonarQube', 'Nexus', 'Git'],
    exploring: ['GitOps (Argo CD / Flux)', 'Internal developer platforms'],
    concerns: [
      'Kubernetes vs. simpler managed runtimes — capability against the operational burden.',
      'Shared platform services vs. team ownership of their own pipelines.',
      'Release speed vs. change safety: progressive delivery and fast rollback.',
    ],
    related: [
      { label: 'Reference: Cloud-native application on Kubernetes', to: '/architecture-lab/cloud-native-kubernetes/' },
      { label: 'Architecture review checklist', to: '/architecture-lab/architecture-review-checklist/' },
    ],
  },
  {
    id: 'ai-genai',
    title: 'AI & Generative AI Architecture',
    icon: 'sparkles',
    depth: 'applied',
    summary: 'GenAI-enabling services on AWS today; enterprise RAG and LLM integration as a growing focus.',
    description:
      'I have hands-on architecture experience with the AWS services that enable GenAI — Amazon Bedrock, SageMaker and OpenSearch — within an enterprise platform. Retrieval-augmented generation, LLM integration patterns and AI governance are areas I am actively developing; the RAG material on this site is conceptual.',
    technologies: ['Amazon Bedrock', 'Amazon SageMaker', 'Amazon OpenSearch'],
    exploring: ['Retrieval-augmented generation (RAG)', 'LLM evaluation and guardrails', 'Agentic workflows', 'AI governance'],
    concerns: [
      'Grounding and hallucination risk — retrieval quality matters more than model choice.',
      'Data access control: retrieval must respect the same permissions as the source systems.',
      'Cost and latency per request vs. answer quality.',
    ],
    related: [
      { label: 'Conceptual case study: AI-enabled enterprise knowledge retrieval', to: '/case-studies/enterprise-knowledge-assistant/' },
      { label: 'Reference: RAG-based enterprise knowledge assistant', to: '/architecture-lab/rag-knowledge-assistant/' },
      { label: 'Article: Designing RAG for the enterprise', to: '/blog/designing-enterprise-rag/' },
    ],
  },
];
