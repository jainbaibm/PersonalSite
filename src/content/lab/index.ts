/**
 * Architecture Lab: reference architectures, patterns, ADRs and checklists.
 * Every entry is a generic, conceptual example — none describe a specific employer's system.
 */
import type { Diagram } from '../case-studies/types';

export type LabType = 'Reference architecture' | 'Pattern' | 'ADR' | 'Checklist';

export interface LabSection {
  heading: string;
  body?: string[];
  list?: string[];
  /** Rendered as a checklist with checkboxes (purely visual aid; state is not saved). */
  checklist?: string[];
}

export interface LabEntry {
  slug: string;
  title: string;
  type: LabType;
  summary: string;
  tags: string[];
  diagram?: Diagram;
  sections: LabSection[];
}

export const labEntries: LabEntry[] = [
  {
    slug: 'gateway-microservices-kafka',
    title: 'API Gateway → Microservices → Kafka → Data Stores',
    type: 'Reference architecture',
    summary: 'A baseline for synchronous APIs at the edge and asynchronous, event-driven processing behind them.',
    tags: ['Microservices', 'Event-driven', 'Kafka'],
    diagram: {
      caption: 'Conceptual reference architecture.',
      description:
        'Clients call an API gateway that handles authentication and rate limiting and routes to order and customer services. The order service writes to its own database and publishes events to Kafka using the outbox pattern. Billing and notification services consume the events, each with its own store; a dead-letter topic captures failed messages.',
      code: `flowchart LR
  C([Clients]) --> GW{{API gateway<br/>AuthN · rate limit}}
  GW --> OS[Order service]
  GW --> CS[Customer service]
  OS --> ODB[(Orders DB<br/>+ outbox)]
  CS --> CDB[(Customer DB)]
  ODB -. outbox relay .-> K{{Kafka<br/>order-events}}
  K --> BS[Billing service]
  K --> NS[Notification service]
  BS --> BDB[(Billing DB)]
  K -. failures .-> DLQ[[Dead-letter topic]]`,
    },
    sections: [
      {
        heading: 'When to use it',
        body: [
          'Use this shape when the request path must stay fast and simple, but downstream work — billing, notifications, analytics — can happen asynchronously and independently.',
        ],
      },
      {
        heading: 'Key design decisions',
        list: [
          'Each service owns its data; no shared database between services.',
          'Publish events with the transactional outbox pattern so the database write and the event never diverge.',
          'Choose partition keys (for example, order ID) that preserve ordering where it matters.',
          'Make every consumer idempotent — delivery is at-least-once.',
          'Route poison messages to a dead-letter topic with enough context to replay them.',
        ],
      },
      {
        heading: 'Trade-offs',
        list: [
          'Eventual consistency: users may briefly see stale downstream state.',
          'More infrastructure to operate (brokers, schema registry, monitoring of consumer lag).',
          'Debugging requires correlation IDs and distributed tracing across the async hop.',
        ],
      },
    ],
  },
  {
    slug: 'cloud-native-kubernetes',
    title: 'Cloud-native application on Kubernetes (EKS / GKE)',
    type: 'Reference architecture',
    summary: 'A production-ready baseline for running containerized services on managed Kubernetes.',
    tags: ['Kubernetes', 'AWS', 'GCP', 'DevOps'],
    diagram: {
      caption: 'Conceptual reference architecture.',
      description:
        'A CI pipeline builds, scans and pushes images to a container registry, then deploys to a managed Kubernetes cluster. Traffic enters through a cloud load balancer and ingress controller to services running as deployments with horizontal pod autoscaling across availability zones. Services use managed databases and a secrets manager; metrics and logs flow to an observability stack.',
      code: `flowchart TB
  DEV([Developers]) --> CI[CI pipeline<br/>build · test · scan]
  CI --> REG[(Container registry)]
  CI -->|deploy| K8S
  U([Users]) --> LB[Cloud load balancer]
  subgraph K8S[Managed Kubernetes · multi-AZ]
    ING[Ingress controller] --> SVC1[Service A<br/>HPA]
    ING --> SVC2[Service B<br/>HPA]
  end
  LB --> ING
  SVC1 & SVC2 --> DB[(Managed database)]
  SVC1 & SVC2 --> SEC[[Secrets manager]]
  K8S --> OBS[Metrics · logs · traces]`,
    },
    sections: [
      {
        heading: 'Baseline practices',
        list: [
          'Managed control plane (EKS or GKE); worker nodes spread across availability zones.',
          'Resource requests and limits on every container; horizontal pod autoscaling on meaningful metrics.',
          'Readiness and liveness probes that reflect real dependency health.',
          'Workload identity (IRSA on EKS, Workload Identity on GKE) instead of static credentials.',
          'Network policies to restrict east-west traffic by default.',
          'Images scanned in CI and pulled from a private registry.',
        ],
      },
      {
        heading: 'Trade-offs',
        list: [
          'Kubernetes adds real operational complexity; for a handful of services, a simpler managed runtime (ECS, Cloud Run) may be the better choice.',
          'Multi-AZ improves availability but increases cross-zone traffic cost.',
        ],
      },
    ],
  },
  {
    slug: 'secure-api-integration',
    title: 'Secure enterprise API integration',
    type: 'Reference architecture',
    summary: 'Exposing internal capabilities to partners without exposing internal systems.',
    tags: ['API management', 'Security', 'Integration'],
    diagram: {
      caption: 'Conceptual reference architecture.',
      description:
        'Partner applications obtain tokens from an identity provider using OAuth 2.0 client credentials and call an API gateway over mutual TLS. The gateway validates tokens, enforces scopes, quotas and schema validation, then calls internal integration services through a private network. Integration services call systems of record with least-privilege service identities. All access is logged to an audit store.',
      code: `sequenceDiagram
  autonumber
  participant P as Partner app
  participant IdP as Identity provider
  participant GW as API gateway
  participant IS as Integration service
  participant SoR as System of record
  P->>IdP: Client credentials (mTLS)
  IdP-->>P: Access token (scoped)
  P->>GW: API call + token
  GW->>GW: Validate token, scope, quota, schema
  GW->>IS: Forward (private network)
  IS->>SoR: Least-privilege service identity
  SoR-->>IS: Data
  IS-->>GW: Filtered response
  GW-->>P: Response`,
    },
    sections: [
      {
        heading: 'Controls',
        list: [
          'OAuth 2.0 client credentials with short-lived, narrowly scoped tokens per partner.',
          'Mutual TLS for high-trust B2B integrations.',
          'Schema validation and payload size limits at the gateway.',
          'Per-partner quotas and spike arrest to protect back ends.',
          'Responses filtered to the fields each partner is entitled to.',
          'Centralized audit logging of who called what, when.',
        ],
      },
      {
        heading: 'Common pitfalls',
        list: [
          'Sharing one credential across many partners — revocation becomes impossible.',
          'Pass-through APIs that expose internal data models and couple partners to them.',
          'Authorization only at the gateway, with no checks inside services.',
        ],
      },
    ],
  },
  {
    slug: 'observability-tracing',
    title: 'Observability and distributed tracing',
    type: 'Reference architecture',
    summary: 'Metrics, logs and traces correlated end to end so production questions can be answered quickly.',
    tags: ['Observability', 'Reliability', 'SRE'],
    diagram: {
      caption: 'Conceptual reference architecture.',
      description:
        'Services instrumented with OpenTelemetry SDKs send metrics, logs and traces to a collector. The collector exports metrics to Prometheus, logs to Elasticsearch, and traces to a tracing back end. Grafana provides dashboards across all three, and an alert manager notifies on-call engineers based on SLO burn rates.',
      code: `flowchart LR
  subgraph Services
    A[Service A] --- B[Service B] --- C[Service C]
  end
  A & B & C -->|OTel SDK| COL[OpenTelemetry collector]
  COL --> PM[(Prometheus<br/>metrics)]
  COL --> ES[(Elasticsearch<br/>logs)]
  COL --> TR[(Tracing back end)]
  PM & ES & TR --> GF[Grafana dashboards]
  PM --> AM[Alertmanager<br/>SLO burn-rate alerts]
  AM --> ON([On-call])`,
    },
    sections: [
      {
        heading: 'Principles',
        list: [
          'Propagate a trace context (W3C traceparent) across every hop, including message headers.',
          'Log in structured JSON with trace and span IDs so logs link to traces.',
          'Alert on symptoms users feel (latency, errors, saturation) rather than on every cause.',
          'Define SLOs per user journey and alert on error-budget burn rate.',
          'Control cardinality — unbounded labels make metrics expensive and slow.',
        ],
      },
    ],
  },
  {
    slug: 'rag-knowledge-assistant',
    title: 'RAG-based enterprise knowledge assistant',
    type: 'Reference architecture',
    summary: 'Retrieval-augmented generation with permission-aware retrieval, guardrails and evaluation.',
    tags: ['GenAI', 'RAG', 'AWS'],
    diagram: {
      caption: 'Conceptual reference architecture.',
      description:
        'Documents are ingested, chunked and embedded into a vector index with access-control metadata. At query time, the user’s entitlements filter a hybrid search; the top passages are re-ranked and sent with the question to a foundation model behind guardrails. The answer is returned with citations and the interaction is logged for evaluation.',
      code: `flowchart TB
  Q([User question]) --> AUTH[Resolve entitlements]
  AUTH --> HS[Hybrid search<br/>keyword + vector<br/>ACL filter]
  IDX[(Vector index<br/>chunks + ACL metadata)] --> HS
  HS --> RR[Re-rank top-k]
  RR --> PR[Prompt assembly<br/>instructions + context]
  PR --> GR{{Guardrails}}
  GR --> FM[Foundation model]
  FM --> ANS[Answer + citations]
  ANS --> EV[(Evaluation log)]`,
    },
    sections: [
      {
        heading: 'Design notes',
        list: [
          'Enforce document permissions at retrieval time — never rely on the model to withhold information.',
          'Chunk on semantic boundaries (headings, sections) and keep source metadata with each chunk.',
          'Hybrid retrieval usually beats pure vector search on enterprise content full of codes and identifiers.',
          'Ask the model to cite sources and to refuse when context is insufficient.',
          'Build an evaluation set of real questions before tuning prompts or swapping models.',
        ],
      },
      {
        heading: 'Status',
        body: ['Conceptual. See the related case study and article for a fuller discussion.'],
      },
    ],
  },
  {
    slug: 'resilience-patterns',
    title: 'Resilience and fault-tolerance patterns',
    type: 'Pattern',
    summary: 'Timeouts, retries, circuit breakers and bulkheads — and how they fit together on one call path.',
    tags: ['Resilience', 'Microservices', 'Reliability'],
    diagram: {
      caption: 'Conceptual call path with resilience controls.',
      description:
        'A request passes through a timeout, then a bulkhead that limits concurrent calls, then a circuit breaker. If the breaker is closed, the call goes to the dependency with retries using exponential back-off and jitter. If the breaker is open or retries are exhausted, a fallback returns a cached or degraded response.',
      code: `flowchart LR
  R([Request]) --> TO[Timeout]
  TO --> BH[Bulkhead<br/>max concurrency]
  BH --> CB{Circuit<br/>breaker}
  CB -->|closed| RT[Retry<br/>exp. back-off + jitter]
  RT --> DEP[[Dependency]]
  CB -->|open| FB[Fallback<br/>cached / degraded]
  RT -->|exhausted| FB`,
    },
    sections: [
      {
        heading: 'Patterns',
        list: [
          'Timeouts: every remote call has one, shorter than the caller’s own deadline.',
          'Retries: only for idempotent operations, with exponential back-off, jitter and a retry budget.',
          'Circuit breaker: stop calling a failing dependency and give it time to recover.',
          'Bulkhead: isolate resources so one slow dependency cannot exhaust all threads or connections.',
          'Fallback: degrade gracefully — cached data, defaults or a clear partial response.',
          'Idempotency keys: make retries safe for writes.',
        ],
      },
      {
        heading: 'Implementation in Java',
        body: [
          'In Spring Boot services, Resilience4j provides these patterns as composable decorators with metrics that integrate with Micrometer and Prometheus.',
        ],
      },
    ],
  },
  {
    slug: 'adr-event-streaming-vs-queue',
    title: 'ADR-001: Event streaming (Kafka) vs. message queue (SQS) for order events',
    type: 'ADR',
    summary: 'A sample architecture decision record showing how to document a messaging choice.',
    tags: ['ADR', 'Event-driven', 'Governance'],
    sections: [
      { heading: 'Status', body: ['Accepted (sample ADR for illustration).'] },
      {
        heading: 'Context',
        body: [
          'Order events must reach several independent consumers (billing, notifications, analytics). Some consumers need to replay history after a bug fix, and new consumers will be added over time. Ordering per order matters; global ordering does not.',
        ],
      },
      {
        heading: 'Options considered',
        list: [
          'Amazon SQS with SNS fan-out — fully managed, minimal operations, but no replay and per-consumer queues to manage.',
          'Apache Kafka (managed, e.g. Amazon MSK or Confluent) — retention and replay, consumer groups, per-key ordering; more to operate and tune.',
          'Database polling — simple, but couples consumers to the producer’s schema and does not scale.',
        ],
      },
      {
        heading: 'Decision',
        body: [
          'Use managed Kafka with order ID as the partition key, a 7-day retention period and a schema registry. Publish via the transactional outbox pattern.',
        ],
      },
      {
        heading: 'Consequences',
        list: [
          'Positive: consumers can replay; new consumers can be added without producer changes; per-order ordering is preserved.',
          'Negative: the team must monitor consumer lag and manage schema evolution; cost is higher than SQS at low volume.',
          'Follow-up: define a dead-letter and replay runbook; revisit if volume stays low after six months.',
        ],
      },
    ],
  },
  {
    slug: 'architecture-review-checklist',
    title: 'Architecture review checklist',
    type: 'Checklist',
    summary: 'The questions I ask in a design review before a solution goes to build.',
    tags: ['Governance', 'Design review'],
    sections: [
      {
        heading: 'Business & scope',
        checklist: [
          'Is the business outcome stated, and how will we measure it?',
          'Are in-scope and out-of-scope capabilities explicit?',
          'Are the key non-functional requirements quantified (volume, latency, availability, RPO/RTO)?',
        ],
      },
      {
        heading: 'Architecture',
        checklist: [
          'Are service and data ownership boundaries clear?',
          'Are integration styles (sync vs. async) chosen deliberately for each interaction?',
          'Are significant decisions captured as ADRs with alternatives considered?',
          'Is there a migration or coexistence plan for legacy systems?',
        ],
      },
      {
        heading: 'Security',
        checklist: [
          'Is authentication and authorization defined for every entry point?',
          'Do service identities follow least privilege?',
          'Is sensitive data classified, encrypted and minimized?',
          'Has a threat model been reviewed for external integrations?',
        ],
      },
      {
        heading: 'Reliability & operations',
        checklist: [
          'Are failure modes and fallbacks defined for each dependency?',
          'Are SLOs, dashboards and alerts defined before go-live?',
          'Can we deploy and roll back safely and quickly?',
          'Is capacity planned and load-tested against expected peaks?',
        ],
      },
      {
        heading: 'Cost & sustainability',
        checklist: [
          'Is the cost model understood at expected and peak volume?',
          'Are managed services used where they reduce operational burden?',
          'Who owns the system after launch, and do they have what they need?',
        ],
      },
    ],
  },
];

export function getLabEntry(slug: string) {
  return labEntries.find((e) => e.slug === slug);
}
