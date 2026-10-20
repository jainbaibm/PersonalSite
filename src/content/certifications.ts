/**
 * Certifications. Verification URLs, dates and badge images are OWNER INPUT:
 * leave a field empty and the site simply omits it. Never guess credential IDs.
 */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** Short label used on badges and cards. */
  short: string;
  description: string;
  /** e.g. 'Mar 2024'. Empty = hidden. */
  issued: string;
  /** e.g. 'Mar 2026'. Empty = hidden. */
  expires: string;
  /** Public verification link (Credly, Google Cloud credential page…). Empty = hidden. */
  verifyUrl: string;
  /** Path under /public to an official badge image. Empty = a neutral generated mark is shown. */
  badge: string;
  featured: boolean;
}

export const certifications: Certification[] = [
  {
    id: 'aws-sap',
    name: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services',
    short: 'AWS SA Professional',
    description:
      'Validates advanced skills in designing distributed systems and applications on AWS: complex multi-account organizations, migration and modernization, cost control, and reliability and security at scale.',
    issued: '',
    expires: '',
    verifyUrl: '',
    badge: '',
    featured: true,
  },
  {
    id: 'gcp-pca',
    name: 'Google Cloud Certified – Professional Cloud Architect',
    issuer: 'Google Cloud',
    short: 'GCP Professional Cloud Architect',
    description:
      'Validates the ability to design, develop and manage robust, secure, scalable and highly available solutions on Google Cloud that meet business objectives.',
    issued: '',
    expires: '',
    verifyUrl: '',
    badge: '',
    featured: true,
  },
  {
    id: 'scjp',
    name: 'Sun Certified Java Programmer (SCJP)',
    issuer: 'Sun Microsystems',
    short: 'SCJP',
    description: 'Foundational certification in the Java programming language.',
    issued: '',
    expires: '',
    verifyUrl: '',
    badge: '',
    featured: false,
  },
];
