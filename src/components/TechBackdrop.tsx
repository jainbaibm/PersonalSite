import {
  Bot,
  Boxes,
  BrainCircuit,
  Cloud,
  CloudCog,
  Cpu,
  Database,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { cx } from './ui';

/**
 * Decorative AI / cloud icon pattern for hero and page-header backgrounds.
 * Thin steel-blue line icons, faded towards the content side by a CSS mask
 * (.tech-backdrop). Purely visual: hidden from assistive technology.
 */
type Placement = { Icon: LucideIcon; x: number; y: number; size: number; opacity: number; float?: boolean };

const hero: Placement[] = [
  { Icon: Cloud, x: 56, y: 10, size: 68, opacity: 0.2, float: true },
  { Icon: BrainCircuit, x: 77, y: 6, size: 58, opacity: 0.22 },
  { Icon: Cpu, x: 92, y: 26, size: 46, opacity: 0.18, float: true },
  { Icon: CloudCog, x: 45, y: 32, size: 38, opacity: 0.1 },
  { Icon: Server, x: 66, y: 38, size: 42, opacity: 0.14 },
  { Icon: Bot, x: 83, y: 44, size: 36, opacity: 0.12 },
  { Icon: Sparkles, x: 58, y: 60, size: 30, opacity: 0.12, float: true },
  { Icon: Database, x: 91, y: 62, size: 50, opacity: 0.18 },
  { Icon: Network, x: 72, y: 72, size: 54, opacity: 0.16, float: true },
  { Icon: Boxes, x: 42, y: 70, size: 32, opacity: 0.08 },
  { Icon: ShieldCheck, x: 55, y: 84, size: 38, opacity: 0.12 },
  { Icon: Workflow, x: 93, y: 86, size: 42, opacity: 0.14 },
];

const header: Placement[] = [
  { Icon: Cloud, x: 70, y: 14, size: 56, opacity: 0.16, float: true },
  { Icon: BrainCircuit, x: 86, y: 8, size: 48, opacity: 0.18 },
  { Icon: Cpu, x: 94, y: 48, size: 40, opacity: 0.14 },
  { Icon: Database, x: 78, y: 58, size: 42, opacity: 0.12, float: true },
  { Icon: Network, x: 62, y: 64, size: 44, opacity: 0.1 },
  { Icon: ShieldCheck, x: 88, y: 82, size: 34, opacity: 0.1 },
  { Icon: Server, x: 56, y: 26, size: 34, opacity: 0.08 },
];

/** Connector pairs (indices into the placement list) drawn as faint dashed links. */
const heroLinks: [number, number][] = [[0, 1], [1, 2], [0, 4], [4, 5], [2, 5], [4, 8], [5, 7], [8, 7], [8, 10], [7, 11], [6, 8], [3, 4]];
const headerLinks: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 2], [3, 4], [2, 5], [6, 0]];

export function TechBackdrop({ variant = 'hero', className }: { variant?: 'hero' | 'header'; className?: string }) {
  const items = variant === 'hero' ? hero : header;
  const links = variant === 'hero' ? heroLinks : headerLinks;
  return (
    <div aria-hidden="true" className={cx('tech-backdrop pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Architecture-sketch connectors; shown in the Executive theme only (see .tech-links). */}
      <svg className="tech-links absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={items[a]!.x}
            y1={items[a]!.y}
            x2={items[b]!.x}
            y2={items[b]!.y}
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {items.map(({ Icon, x, y, size, opacity, float }, i) => (
        <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, opacity, transform: 'translate(-50%, -50%)' }}>
          <span className={cx('block', float && 'tech-float')} style={float ? { animationDelay: `${i * 0.8}s` } : undefined}>
            <Icon strokeWidth={1.1} style={{ width: size, height: size }} />
          </span>
        </span>
      ))}
    </div>
  );
}
