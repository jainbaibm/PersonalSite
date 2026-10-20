import { createContext, useContext, useEffect } from 'react';
import { applyHead, type HeadMeta } from '../utils/head';

/** During prerendering, the server passes a collector that receives the page's head metadata. */
export const HeadContext = createContext<{ meta?: HeadMeta } | null>(null);

export function Seo(meta: HeadMeta) {
  const collector = useContext(HeadContext);
  if (collector) collector.meta = meta;

  const key = JSON.stringify(meta);
  useEffect(() => {
    applyHead(JSON.parse(key) as HeadMeta);
  }, [key]);

  return null;
}
