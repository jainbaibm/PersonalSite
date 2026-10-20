export interface Diagram {
  /** Mermaid source. */
  code: string;
  caption: string;
  /** Accessible text description of what the diagram shows. */
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  /**
   * experience: based on the owner's verified work, generalized and anonymized.
   * conceptual: an illustrative design that was not deployed as described.
   */
  kind: 'experience' | 'conceptual';
  /** 'draft' shows a "pending owner review" notice. Set to 'approved' after review. */
  reviewStatus: 'draft' | 'approved';
  domain: string;
  /** Real client / employer — only shown when site.discloseClientNames is true. */
  client?: string;
  /** Anonymized description used otherwise. */
  clientAnonymized: string;
  role: string;
  period?: string;
  tags: string[];
  /** Facts taken verbatim from the resume; shown as "Verified highlights". */
  verifiedFacts: string[];

  context: string[];
  problem: string[];
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  constraints: string[];
  approach: string[];
  diagram: Diagram;
  technologyChoices: { tech: string; rationale: string }[];
  alternatives: { option: string; tradeoff: string }[];
  security: string[];
  scalability: string[];
  deployment: string[];
  outcomes: string[];
  lessons: string[];
}
