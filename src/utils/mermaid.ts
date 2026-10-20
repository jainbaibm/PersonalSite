/**
 * Client-only Mermaid rendering. Mermaid is loaded lazily the first time a page
 * contains a diagram, so pages without diagrams never download it.
 * Diagrams follow the active colour theme (html[data-theme]).
 */
type MermaidApi = (typeof import('mermaid'))['default'];
type ThemeName = 'executive' | 'consulting';

let loader: Promise<MermaidApi> | null = null;
let initializedFor: ThemeName | null = null;
let counter = 0;

const palettes: Record<ThemeName, Record<string, string>> = {
  // Subtle blue/violet on white — Executive Technology.
  executive: {
    primary: '#EFF4FF',
    primaryBorder: '#2563EB',
    secondary: '#F5F3FF',
    secondaryBorder: '#7C3AED',
    tertiary: '#F8FAFC',
    tertiaryBorder: '#CBD5E1',
    text: '#0B1120',
    body: '#334155',
    line: '#64748B',
    actorLine: '#94A3B8',
  },
  // Muted steel blue and slate-teal — Premium Consulting.
  consulting: {
    primary: '#F2F5F9',
    primaryBorder: '#3F5B80',
    secondary: '#F1F6F6',
    secondaryBorder: '#3F6B68',
    tertiary: '#F7F8FA',
    tertiaryBorder: '#D3D7DE',
    text: '#1C1F24',
    body: '#434952',
    line: '#7A818D',
    actorLine: '#A3A9B4',
  },
};

function currentTheme(): ThemeName {
  return document.documentElement.dataset.theme === 'consulting' ? 'consulting' : 'executive';
}

function configure(mermaid: MermaidApi, theme: ThemeName) {
  const p = palettes[theme];
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: '"Inter Variable", Inter, system-ui, sans-serif',
    themeVariables: {
      fontSize: '15px',
      background: '#FFFFFF',
      primaryColor: p.primary,
      primaryBorderColor: p.primaryBorder,
      primaryTextColor: p.text,
      secondaryColor: p.secondary,
      secondaryBorderColor: p.secondaryBorder,
      secondaryTextColor: p.text,
      tertiaryColor: p.tertiary,
      tertiaryBorderColor: p.tertiaryBorder,
      tertiaryTextColor: p.text,
      mainBkg: p.primary,
      nodeBorder: p.primaryBorder,
      lineColor: p.line,
      textColor: p.body,
      titleColor: p.text,
      clusterBkg: p.tertiary,
      clusterBorder: p.tertiaryBorder,
      edgeLabelBackground: '#FFFFFF',
      actorBkg: p.primary,
      actorBorder: p.primaryBorder,
      actorTextColor: p.text,
      actorLineColor: p.actorLine,
      signalColor: p.body,
      signalTextColor: p.text,
      labelBoxBkgColor: p.primary,
      labelBoxBorderColor: p.primaryBorder,
      labelTextColor: p.text,
      loopTextColor: p.text,
      noteBkgColor: p.secondary,
      noteBorderColor: p.secondaryBorder,
      noteTextColor: p.text,
      activationBkgColor: p.secondary,
      activationBorderColor: p.secondaryBorder,
      sequenceNumberColor: '#FFFFFF',
    },
    flowchart: { htmlLabels: true, curve: 'basis', padding: 12 },
    sequence: { useMaxWidth: true },
  });
  initializedFor = theme;
}

export async function renderMermaid(code: string): Promise<string> {
  loader ??= import('mermaid').then(({ default: mermaid }) => mermaid);
  const mermaid = await loader;
  const theme = currentTheme();
  if (initializedFor !== theme) configure(mermaid, theme);
  const { svg } = await mermaid.render(`mmd-${++counter}`, code);
  return svg;
}
