import { Code2, Maximize2, X } from 'lucide-react';
import { useEffect, useId, useRef, useState, type RefObject } from 'react';
import type { Diagram } from '../content/case-studies/types';
import { renderMermaid } from '../utils/mermaid';
import { useTheme } from './theme';
import { Tag, cx } from './ui';

/** Renders a Mermaid diagram with an expandable full-size view, source toggle and text alternative. */
export function DiagramViewer({
  diagram,
  label = 'Conceptual',
  className,
}: {
  diagram: Diagram;
  label?: string;
  className?: string;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const descId = useId();
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    renderMermaid(diagram.code)
      .then((s) => !cancelled && setSvg(s))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [diagram.code, theme]);

  return (
    <figure className={cx('not-prose overflow-hidden rounded-xl border border-line bg-surface shadow-sm', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <Tag tone="violet">{label}</Tag>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setShowSource((s) => !s)}
            aria-pressed={showSource}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-ink"
          >
            <Code2 className="size-4" aria-hidden="true" /> {showSource ? 'Hide source' : 'Source'}
          </button>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            disabled={!svg}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-ink disabled:opacity-50"
          >
            <Maximize2 className="size-4" aria-hidden="true" /> Expand
          </button>
        </div>
      </div>

      {showSource ? (
        <pre className="diagram-source m-0 max-h-[28rem] overflow-auto bg-navy-950 p-4 text-[0.8rem] leading-relaxed text-slate-200">
          <code>{diagram.code}</code>
        </pre>
      ) : (
        <div className="overflow-x-auto p-4 sm:p-6" tabIndex={svg ? 0 : undefined} role={svg ? 'region' : undefined} aria-label={svg ? 'Diagram (scrollable)' : undefined}>
          {svg ? (
            <div role="img" aria-describedby={descId} className="diagram-svg mx-auto min-w-[34rem] max-w-3xl" dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div className="grid min-h-56 place-items-center text-sm text-muted">
              {failed ? 'The diagram could not be rendered. View the source or the text description below.' : 'Loading diagram…'}
            </div>
          )}
        </div>
      )}

      <figcaption className="border-t border-line px-4 py-3 text-sm text-slate-600">
        <span className="font-medium text-slate-800">{diagram.caption}</span>
        <details className="mt-1.5">
          <summary className="cursor-pointer text-blue-700 hover:text-blue-800">Text description</summary>
          <p id={descId} className="mt-2 leading-relaxed">
            {diagram.description}
          </p>
        </details>
      </figcaption>

      <DiagramDialog dialogRef={dialogRef} svg={svg} title={diagram.caption} />
    </figure>
  );
}

function DiagramDialog({ dialogRef, svg, title }: { dialogRef: RefObject<HTMLDialogElement | null>; svg: string | null; title: string }) {
  const titleId = useId();
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="diagram-dialog m-auto h-[92vh] w-[96vw] max-w-6xl rounded-xl bg-surface p-0 shadow-2xl backdrop:bg-navy-950/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
          <h2 id={titleId} className="text-sm font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          {svg && <div className="diagram-svg diagram-svg--large mx-auto min-w-[48rem]" dangerouslySetInnerHTML={{ __html: svg }} />}
        </div>
      </div>
    </dialog>
  );
}

/** Upgrades `.mermaid-block` placeholders produced by the Markdown renderer into diagrams. */
export function useMermaidBlocks(container: RefObject<HTMLElement | null>, key: string) {
  const { theme } = useTheme();
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    let cancelled = false;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('.mermaid-block[data-mermaid]'));
    blocks.forEach((block) => {
      const code = block.dataset.mermaid ?? '';
      renderMermaid(code)
        .then((svg) => {
          if (cancelled) return;
          block.innerHTML = `<div class="diagram-svg mx-auto min-w-[30rem] max-w-3xl" role="img" aria-label="Diagram">${svg}</div>`;
          block.setAttribute('tabindex', '0');
          block.setAttribute('role', 'region');
          block.setAttribute('aria-label', 'Diagram (scrollable)');
          block.classList.add('is-rendered');
        })
        .catch(() => {
          /* keep the source fallback */
        });
    });
    return () => {
      cancelled = true;
    };
  }, [container, key, theme]);
}
