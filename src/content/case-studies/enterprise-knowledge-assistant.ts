import type { CaseStudy } from './types';

export const enterpriseKnowledgeAssistant: CaseStudy = {
  slug: 'enterprise-knowledge-assistant',
  title: 'AI-enabled enterprise knowledge retrieval (conceptual design)',
  summary:
    'A conceptual architecture for a permission-aware RAG assistant on AWS that answers employee questions from enterprise documents with citations. Illustrative — not a deployed system.',
  kind: 'conceptual',
  reviewStatus: 'approved',
  domain: 'Cross-industry',
  clientAnonymized: 'Illustrative enterprise scenario',
  role: 'Conceptual design',
  tags: ['GenAI', 'RAG', 'Amazon Bedrock', 'OpenSearch', 'Security'],
  verifiedFacts: [],

  context: [
    'Large organizations hold critical knowledge in policies, runbooks, design documents and tickets spread across many systems. Employees spend significant time searching for answers that already exist.',
    'This page sketches how I would approach an enterprise knowledge assistant. It is an illustrative design, not a description of a delivered system.',
  ],
  problem: [
    'Knowledge is fragmented across repositories with different access controls.',
    'Keyword search misses relevant content phrased differently.',
    'A generative assistant must not leak documents a user is not allowed to see, and must not invent answers.',
  ],
  functionalRequirements: [
    'Answer natural-language questions with citations to source documents.',
    'Respect source-system permissions for every retrieved passage.',
    'Keep the index fresh as documents change.',
    'Capture user feedback on answer quality.',
  ],
  nonFunctionalRequirements: [
    'Grounded answers — refuse when evidence is insufficient.',
    'Predictable cost per query and acceptable latency.',
    'Auditability of prompts, retrieved context and responses.',
  ],
  constraints: [
    'No training on sensitive data; use retrieval rather than fine-tuning for knowledge.',
    'Data stays within the organization’s cloud account and region.',
  ],
  approach: [
    'Ingestion pipelines extract, chunk and embed documents, storing vectors together with access-control metadata in a vector-capable search index.',
    'At query time, the service resolves the user’s entitlements, runs hybrid (keyword + vector) retrieval filtered by those entitlements, and passes only permitted passages to the model with instructions to cite sources and refuse when unsure.',
    'Guardrails filter inputs and outputs; every interaction is logged for evaluation and audit.',
  ],
  diagram: {
    caption: 'Conceptual RAG architecture — illustrative only.',
    description:
      'Source systems feed an ingestion pipeline that chunks and embeds documents into an OpenSearch vector index with access-control metadata. A user question goes through an API layer to a retrieval service that applies the user’s permissions, retrieves permitted passages, and calls a foundation model on Amazon Bedrock with guardrails. The answer returns with citations; interactions are logged for evaluation.',
    code: `flowchart LR
  subgraph Ingestion
    SRC[[Document sources]] --> CH[Extract & chunk]
    CH --> EM[Embed]
  end
  EM --> VX[(OpenSearch<br/>vectors + ACL metadata)]
  U([Employee]) --> API{{API layer<br/>SSO · entitlements}}
  API --> RS[Retrieval service]
  RS -->|filtered hybrid search| VX
  RS --> LLM[Bedrock model<br/>+ guardrails]
  LLM -->|answer + citations| API
  RS --> LOG[(Audit & evaluation log)]`,
  },
  technologyChoices: [
    { tech: 'Amazon Bedrock', rationale: 'Managed access to foundation models and guardrails inside the cloud account.' },
    { tech: 'Amazon OpenSearch', rationale: 'Hybrid keyword and vector search with metadata filtering for permissions.' },
    { tech: 'AWS Lambda / Step Functions', rationale: 'Event-driven ingestion that scales with document change volume.' },
    { tech: 'Java & Spring Boot', rationale: 'Retrieval service built on the same platform as the surrounding enterprise services.' },
  ],
  alternatives: [
    { option: 'Fine-tune a model on internal documents', tradeoff: 'Hard to keep current, cannot enforce per-user permissions, and risks memorizing sensitive data.' },
    { option: 'Keyword search only', tradeoff: 'Cheap and predictable, but weak on paraphrased questions and gives no synthesized answer.' },
    { option: 'Permission-aware RAG (chosen)', tradeoff: 'More components and evaluation effort, but current, cited and access-controlled answers.' },
  ],
  security: [
    'Entitlements resolved per request; retrieval filtered before anything reaches the model.',
    'Input and output guardrails for prompt injection and sensitive-data leakage.',
    'Private networking and encryption for indexes and logs.',
  ],
  scalability: [
    'Stateless retrieval service scales horizontally.',
    'Caching of frequent questions and embeddings to control cost.',
  ],
  deployment: [
    'Infrastructure as code; separate environments for evaluation and production.',
    'Offline evaluation sets and online feedback tracked before each prompt or model change.',
  ],
  outcomes: [
    'Not applicable — conceptual design. Success would be measured by answer groundedness, citation accuracy, time saved per query and cost per query.',
  ],
  lessons: [
    'In enterprise RAG, retrieval quality and access control dominate outcomes; model choice is secondary.',
    'Treat evaluation as a continuous pipeline, not a launch gate.',
  ],
};
