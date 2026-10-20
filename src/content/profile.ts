/**
 * Professional profile. Every fact here comes from the owner's resume (Oct 2026).
 * Edit freely; layout components only read from this file.
 */

export interface Stat {
  value: string;
  label: string;
}

export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  client?: string;
  domain?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  achievements?: string[];
}

export interface EarlierRole {
  company: string;
  title: string;
  period: string;
  note: string;
}

export const profile = {
  photo: {
    src: '/images/profile.webp',
    fallback: '/images/profile.jpg',
    width: 354,
    height: 472,
    alt: 'Portrait of Jain Bai B in a grey suit and red tie',
  },

  headline: 'Designing Secure, Scalable Enterprise Systems.',
  intro:
    'I’m a Solution Architect with 17+ years of experience translating business goals into secure, scalable, and cost-efficient technology platforms across cloud, distributed systems, and modern enterprise architecture.',

  shortBio:
    'I design enterprise platforms across healthcare, automotive, insurance and data governance — from API-first integration layers and event-driven microservices to dual-cloud architectures on AWS and Google Cloud. I work closely with CTOs and engineering leaders to turn strategy into designs teams can build, run and evolve.',

  stats: [
    { value: '17+', label: 'years in enterprise software engineering and architecture' },
    { value: '30+', label: 'enterprise applications unified on one platform architecture' },
    { value: '1,200+', label: 'dealers connected through standardized API integration' },
    { value: '100K+', label: 'claims transactions a day handled by microservices I designed' },
  ] satisfies Stat[],

  about: [
    'I’ve spent 17 years building and architecting enterprise software — starting as a Java/J2EE engineer at IBM and growing through team-lead, senior associate and architect roles at Keane, Infosys, Cognizant, Nissan Digital, Equifax and Quest Global.',
    'Most recently I led architecture for a component-driven, API-first platform that unifies medical imaging workflows across 30+ enterprise applications for a global healthcare technology client, with technical leadership over a 26-person onsite/offshore engineering team.',
    'Before that I architected a GCP-native metadata and data-catalog platform for data governance, owned the dealer data integration architecture across a pan-European dealer network of 1,200+ dealers, and designed claims microservices handling 100K+ transactions a day for a global insurer.',
    'Across those programs, the thread is the same: understand the business outcome, make the trade-offs explicit, and give engineering teams an architecture that is secure by default, observable in production and simple enough to change.',
  ],

  principles: [
    {
      title: 'Start from the business outcome',
      body: 'Architecture exists to serve a business capability. I anchor every design in the outcome, the constraints and the cost of being wrong before choosing technology.',
    },
    {
      title: 'Make trade-offs explicit',
      body: 'Every significant decision is a trade-off between consistency, latency, cost, delivery speed and operability. I write them down — in ADRs and design reviews — so they can be challenged and revisited.',
    },
    {
      title: 'Secure and least-privilege by default',
      body: 'IAM, RBAC and API security are designed in from the first diagram, not bolted on before go-live. I have owned access-control architecture on three major programs.',
    },
    {
      title: 'Design for operations',
      body: 'A system is only as good as its behaviour at 3 a.m. Observability, failure modes, rollback and capacity are first-class requirements.',
    },
    {
      title: 'Standardize the contracts, not the teams',
      body: 'Clear API contracts, shared platform services and reusable components let many teams move independently without fragmenting the platform.',
    },
    {
      title: 'Prefer evolvable over clever',
      body: 'I favour boring, well-understood building blocks and clean boundaries, so the architecture can absorb the next requirement instead of resisting it.',
    },
  ],

  leadership: [
    'Led and mentored engineering teams of up to 30 people across onsite and offshore locations, with several team members advancing into senior and lead roles.',
    'Engaged directly with client CTO and VP Engineering stakeholders to align business goals, standards and architecture roadmaps.',
    'Presented designs at Enterprise Review Board (ERB) sessions and secured approval for implementation, establishing a governance precedent for the program.',
    'Contributed technical solutioning and effort estimation to RFP and RFI responses in the automotive integration domain.',
  ],

  balance: [
    { quality: 'Business value', approach: 'Trace each architectural element to a capability or outcome; cut what does not earn its keep.' },
    { quality: 'Security', approach: 'Least-privilege IAM, RBAC at the API layer, and threat-driven reviews of every integration boundary.' },
    { quality: 'Reliability', approach: 'Define failure modes early; use timeouts, retries with back-off, idempotency and graceful degradation.' },
    { quality: 'Scalability', approach: 'Scale stateless services horizontally, decouple with events where it pays, and measure before optimizing.' },
    { quality: 'Maintainability', approach: 'Clear service boundaries, versioned contracts, reusable platform services and documented decisions.' },
    { quality: 'Cost', approach: 'Right-size managed services, prefer serverless for spiky workloads, and make cost a design-review criterion.' },
  ],

  interests: [
    'Cloud architecture and multi-cloud strategy across AWS and Google Cloud',
    'Enterprise modernization — moving legacy systems to cloud-native microservices',
    'AI-enabled enterprise systems: retrieval-augmented generation, LLM integration and AI governance',
    'Architecture governance that helps teams move faster rather than slower',
  ],

  domains: [
    { name: 'Healthcare', years: '4 yrs' },
    { name: 'Insurance / Claims', years: '5.5 yrs' },
    { name: 'Automotive', years: '3 yrs' },
    { name: 'Data Governance & Insurance', years: '1 yr' },
  ],

  competencies: [
    'Enterprise & Solution Architecture',
    'Cloud Strategy (AWS, GCP)',
    'Microservices & Event-Driven Design',
    'API & Integration Architecture',
    'Security Architecture (IAM / RBAC)',
    'GenAI-enabling platforms (Bedrock, SageMaker)',
    'Architecture Governance (ERB)',
    'Technical Leadership & Mentoring',
    'Presales & RFP Solutioning',
    'Data Governance & Catalog Platforms',
    'DevOps & Containerization',
    'CXO / Client Stakeholder Engagement',
  ],

  skills: [
    {
      group: 'Cloud Platforms',
      items: [
        'AWS: EC2, Lambda, S3, RDS/Aurora, SQS/SNS, ECS/EKS, CloudFormation, API Gateway, Route 53, CloudWatch, Step Functions, Glue, Athena, SageMaker, Bedrock, OpenSearch',
        'GCP: GKE, Firestore, BigQuery, Dataflow, Pub/Sub, Cloud Storage, Bigtable',
      ],
    },
    { group: 'Architecture & Patterns', items: ['Microservices, SOA, Event-Driven Architecture, Multi-tenant SaaS, API-first Design, Enterprise Architecture'] },
    { group: 'Integration & APIs', items: ['REST, SOAP, Apigee API Gateway, SAP / Salesforce integration, Mainframe / webMethods integration, Apache Kafka'] },
    { group: 'Security', items: ['IAM policy design, Role-Based Access Control (RBAC), least-privilege access control'] },
    { group: 'DevOps & Platform', items: ['Docker, Kubernetes (EKS / GKE), CI/CD (Jenkins, Bitbucket, SonarQube, Nexus), Git, SVN'] },
    { group: 'Data & GenAI', items: ['HBase, Titan, Solr, data governance / catalog platforms (Collibra), Amazon Bedrock, SageMaker, OpenSearch'] },
    { group: 'Languages & Frameworks', items: ['Java (8–21), J2EE, TypeScript, JavaScript, Spring, Spring Boot, Hibernate, Struts, Angular, JSF'] },
    { group: 'Databases', items: ['Oracle, MySQL, DB2, PostgreSQL'] },
    { group: 'Observability & Methods', items: ['Prometheus, Grafana, ELK Stack; Agile, TDD, XP, OOAD, UML'] },
  ],

  experience: [
    {
      company: 'Quest Global',
      title: 'Solution Architect',
      start: 'Aug 2024',
      end: 'May 2026',
      client: 'GE Healthcare',
      domain: 'Healthcare',
      summary:
        'Lead architect for the Harmonized User Experience (HUE) platform — a component-driven, API-first architecture unifying medical imaging workflows across 30+ enterprise applications and digital channels, serving 5M+ users.',
      highlights: [
        'Architected the platform’s component-driven UI and API-first backend spanning 30+ enterprise applications.',
        'Designed a multi-tenant, reusable design-system architecture that standardized UX and reduced UI development effort across product teams.',
        'Defined centralized platform services — authentication, SSO, navigation, theming — integrated into a microservices backend.',
        'Owned frontend–backend API contract decisions, standardizing REST-based service consumption across teams.',
        'Designed IAM policies and RBAC across microservices and the API layer to enforce least-privilege access.',
        'Led and mentored a cross-functional team of 26 (onsite/offshore); engaged directly with client CTO and VP Engineering.',
      ],
      technologies: ['Java 21', 'Spring Boot', 'Angular', 'AWS Lambda', 'EC2', 'Aurora', 'ECS/EKS', 'SageMaker', 'Bedrock', 'OpenSearch', 'Kafka', 'Docker', 'Apigee', 'PostgreSQL', 'SAP', 'Salesforce'],
    },
    {
      company: 'Equifax',
      title: 'Technical Architect',
      start: 'Jul 2023',
      end: 'Aug 2024',
      domain: 'Data Governance / Insurance',
      summary:
        'Architected the metadata and data-catalog platform serving as the system of record for data intake, ingestion, keying and analytics lifecycle stages.',
      highlights: [
        'Designed the GCP-native architecture (Firestore, Pub/Sub, Bigtable, BigQuery) supporting data governance, lineage tracking and cross-team data discovery.',
        'Partnered with data operations and governance teams on compliance and data-sensitivity classification requirements.',
        'Led technical solutioning for downstream integration with Data Fabric programs, enabling standardized metadata exchange.',
        'Presented designs at Enterprise Review Board (ERB) sessions and secured approval, establishing a governance precedent for the program.',
      ],
      technologies: ['Java 17', 'Spring Boot', 'Firestore', 'Pub/Sub', 'BigQuery', 'Bigtable', 'Cloud Storage', 'Docker', 'Collibra'],
    },
    {
      company: 'Nissan Digital',
      title: 'Technical Architect',
      start: 'Feb 2020',
      end: 'Jun 2023',
      domain: 'Automotive',
      summary:
        'Owned architecture for the Dealer Data Integration (DDI) program, automating API-based dealer invoice data exchange across a pan-European Dealer Management System landscape of 1,200+ dealers.',
      highlights: [
        'Architected the Retail Integration Layer, replacing a manual, PDF-based dealer data exchange with automated APIs.',
        'Designed integration architecture connecting internal systems with third-party DMS vendors through standardized APIs.',
        'Owned end-to-end solution design (HLD), requirements definition and business alignment from architecture through delivery.',
        'Designed IAM roles and access policies for API and DMS-vendor integrations.',
        'Reduced dealer-side manual data entry across 1,200+ dealers; led 8–15 onsite/offshore developers.',
        'Contributed solutioning and effort estimation to RFP/RFI responses.',
      ],
      technologies: ['Java 11', 'Spring Boot', 'AWS Lambda', 'Aurora', 'Apigee', 'SAP', 'Cleo Connector', 'webMethods', 'PostgreSQL', 'Salesforce', 'Mainframe'],
      achievements: ['ACE Employee of the Year 2022'],
    },
    {
      company: 'Cognizant Technology Solutions',
      title: 'Senior Associate',
      start: 'Jun 2014',
      end: 'Jan 2020',
      client: 'MetLife',
      domain: 'Insurance',
      summary:
        'Architect-level contributor across the full lifecycle of the MetLife Group Service (MGS) claims platform, designing microservices handling 100K+ claims transactions per day.',
      highlights: [
        'Contributed across planning, HLD/LLD, development, implementation, testing and support.',
        'Designed microservices handling 100K+ claims transactions a day for internal and third-party vendor consumption.',
        'Defined web-services architecture (Spring MVC, Spring Boot) integrating with big-data storage (HBase, Titan) for claims and party data.',
        'Defined IAM access policies and secure authentication controls for claims data services shared with vendors.',
        'Led and mentored a team of 30 engineers and business analysts across onshore and offshore locations.',
      ],
      technologies: ['Java 8', 'Spring', 'Spring Boot', 'Hibernate', 'HBase', 'Titan', 'Solr', 'Oracle', 'Bamboo'],
      achievements: ['Best Performer of the Year 2016', 'Part of the team recognized as Top Revenue Maker of the Retail Account'],
    },
  ] satisfies Role[],

  earlierRoles: [
    { company: 'Infosys', title: 'Technology Analyst', period: 'Nov 2012 – May 2014', note: 'Java/J2EE application development and enterprise integration' },
    { company: 'Keane India', title: 'Team Lead', period: 'Aug 2010 – Oct 2012', note: 'Led a development team delivering client applications; introduced early Agile practices' },
    { company: 'IBM India', title: 'Software Engineer', period: 'Oct 2009 – Aug 2010', note: 'Core Java/J2EE development' },
  ] satisfies EarlierRole[],

  keyAchievements: [
    'Modernized legacy applications to cloud-native microservices, achieving a 70% reduction in deployment time.',
    'Architected API-first platforms integrating 50+ external services.',
    'Delivered enterprise IAM and access-control architecture across three major programs.',
    'Established ERB-approved architecture governance practices on a data-governance program.',
    'Led and mentored engineering teams of up to 30, with multiple team members advancing into senior and lead roles.',
    'Hands-on architecture experience with GenAI-enabling services — Amazon Bedrock, SageMaker and OpenSearch.',
  ],

  education: [
    { degree: 'Master of Engineering (M.E.), Computer Science', school: 'MSEC Engineering College, Anna University' },
    { degree: 'Bachelor of Technology (B.Tech), Information Technology', school: 'AKCE Engineering College, Anna University' },
  ],

  awards: [
    { title: 'ACE Employee of the Year 2022', org: 'Nissan Digital' },
    { title: 'Best Performer of the Year 2016', org: 'Cognizant' },
    { title: 'Top Revenue Maker, Retail Account (team recognition)', org: 'Cognizant' },
    { title: 'Client recognition from PepsiCo leadership for product success across North America', org: '' },
  ],
};

export type Profile = typeof profile;
