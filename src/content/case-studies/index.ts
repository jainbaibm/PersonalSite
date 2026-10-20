import { site } from '../site';
import { claimsMicroservices } from './claims-microservices';
import { dealerNetworkApiIntegration } from './dealer-network-api-integration';
import { enterpriseKnowledgeAssistant } from './enterprise-knowledge-assistant';
import { metadataDataCatalogPlatform } from './metadata-data-catalog-platform';
import type { CaseStudy } from './types';
import { unifiedEnterprisePlatform } from './unified-enterprise-platform';

export type { CaseStudy } from './types';

/** Order here is the order shown on the site. */
export const caseStudies: CaseStudy[] = [
  unifiedEnterprisePlatform,
  dealerNetworkApiIntegration,
  metadataDataCatalogPlatform,
  claimsMicroservices,
  enterpriseKnowledgeAssistant,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function clientLabel(c: CaseStudy) {
  return site.discloseClientNames && c.client ? c.client : c.clientAnonymized;
}
