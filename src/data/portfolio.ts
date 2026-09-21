// Language-independent portfolio data. Translated copy lives in src/i18n/translations.ts,
// indexed in the same order as the arrays below.

export const links = {
  linkedin: 'https://linkedin.com/in/alvarobernalcau',
  github: 'https://github.com/alvarobernal2412',
  email: 'alvaro.bernalcaunedo@unisg.ch',
  cv: '/CV_AlvaroBernalCaunedo.pdf',
};

export const experience = [
  {
    period: { en: 'Jan 2026 — present', es: 'Ene 2026 — presente', de: 'Jan 2026 — heute' },
    place: 'Univ. of St. Gallen (HSG) · CH',
    logo: '/hsgLogo.webp',
    logoAlt: 'Universität St. Gallen',
    logoHeight: 22,
    hybrid: true,
    tags: ['Process mining', 'Provenance trees', 'Python', 'Rust', 'Teaching'],
    icons: [],
  },
  {
    period: { en: 'Mar 2025 — 2026', es: 'Mar 2025 — 2026', de: 'Mär 2025 — 2026' },
    place: 'Universidad de Sevilla · Dept. LSI',
    logo: '/us.webp',
    logoAlt: 'Universidad de Sevilla',
    logoHeight: 44,
    hybrid: true,
    tags: ['GCP', 'Node.js', 'React', 'MongoDB', 'Grafana', 'Docker', 'Node-RED', 'GitHub Actions'],
    icons: ['ChartCandlestick', 'Brain', 'Users'],
  },
  {
    period: { en: 'Oct 2023 — Mar 2025', es: 'Oct 2023 — Mar 2025', de: 'Okt 2023 — Mär 2025' },
    place: 'Universidad de Sevilla · Dept. LSI',
    logo: '/us.webp',
    logoAlt: 'Universidad de Sevilla',
    logoHeight: 44,
    hybrid: true,
    tags: ['JavaScript', 'Express', 'MongoDB', 'Tailwind', 'Docker', 'React', 'Node-RED', 'GitHub Actions'],
    icons: ['TrendingUp', 'Bot', 'Workflow', 'FlaskConical'],
  },
];

export const publications = [
  { year: '2026', venue: 'ER 2026', conference: 'Conceptual Modeling', authors: 'Álvaro Bernal-Caunedo, Marco Franceschetti, Hagen Völzer, Manuel Resinas, Barbara Weber', title: 'A Conceptual Model to Enhance Process Mining Analysis with Provenance' },
];

export const projects = [
  {
    name: 'Harmony LTD',
    demo: 'https://htld-doc.vercel.app',
    source: 'https://github.com/orgs/ISPP-07/repositories',
    tags: ['FastAPI', 'Next', 'Postgres', 'Docker', 'AWS', 'Git & GitHub'],
  },
  {
    name: 'STATUS (POC)',
    demo: 'https://status-landing-page.vercel.app',
    source: 'https://github.com/orgs/statuscompliance/repositories',
    tags: ['Node.js', 'React', 'MongoDB', 'Docker', 'Grafana', 'Redis', 'CI/CD'],
  },
  {
    name: 'Intelligent Compliance (TFG)',
    demo: 'https://status-docs.netlify.app/docs/Tooling/openAI',
    source: 'https://github.com/statuscompliance/status-frontend',
    thesis: '/TFG_Alvbercau.pdf',
    tags: ['Node-RED', 'OpenAI API', 'JavaScript', 'Docker', 'Node.js'],
  },
  {
    name: 'CloudMedix',
    demo: 'https://cloudmedixgp.netlify.app/',
    source: 'https://github.com/FIS2425/workshift-svc',
    tags: ['Rust', 'React', 'Docker', 'Microservices', 'API Gateway', 'Vite'],
  },
];

export const education = [
  { period: { en: 'Jan 2026 — present', es: 'Ene 2026 — presente', de: 'Jan 2026 — heute' }, school: 'University of St. Gallen (HSG), Switzerland', status: 'inProgress' },
  { period: { en: '2024 — 2025', es: '2024 — 2025', de: '2024 — 2025' }, school: 'Escuela Internacional de Posgrado', status: 'completed' },
  { period: { en: '2018 — 2024', es: '2018 — 2024', de: '2018 — 2024' }, school: 'ETSII, Universidad de Sevilla', status: 'completed' },
] as const;

export const certifications = [
  { name: 'Cambridge C1 Advanced', year: '2023' },
  { name: 'Deutsch Stufe 1 (A1)', year: '2022' },
];

// Live artifact: a reconstructed exploratory process-mining session.
export type NodeKind = 'load' | 'filter' | 'discover' | 'analyze' | 'annotate' | 'export';

export const nodes: {
  id: string; x: number; y: number; w: number; kind: NodeKind;
  label: string; t: string; a: string; b: string;
}[] = [
  { id: 'n0', x: 10, y: 150, w: 118, kind: 'load', label: 'load event log', t: '00:00', a: '1.2M', b: '13.7k' },
  { id: 'n1', x: 168, y: 80, w: 144, kind: 'filter', label: 'variants ≥ 20 cases', t: '01:12', a: '86%', b: '214' },
  { id: 'n2', x: 168, y: 232, w: 144, kind: 'filter', label: 'duration > 7 days', t: '02:40', a: '2,140', b: '11.4d' },
  { id: 'n3', x: 356, y: 26, w: 152, kind: 'discover', label: 'inductive · 0.4', t: '04:05', a: '0.94', b: '0.81' },
  { id: 'n4', x: 356, y: 112, w: 152, kind: 'discover', label: 'heuristic miner', t: '05:31', a: '0.91', b: '0.77' },
  { id: 'n5', x: 356, y: 246, w: 152, kind: 'analyze', label: 'cluster traces', t: '06:18', a: '3', b: '0.62' },
  { id: 'n6', x: 548, y: 26, w: 146, kind: 'analyze', label: 'conformance check', t: '08:02', a: '6.1%', b: '38ms' },
  { id: 'n7', x: 548, y: 112, w: 146, kind: 'analyze', label: 'compare cohorts', t: '09:44', a: '4.8d', b: 'p<.01' },
  { id: 'n8', x: 548, y: 246, w: 146, kind: 'annotate', label: 'flag bottleneck', t: '11:20', a: '1', b: '4' },
  { id: 'n9', x: 548, y: 180, w: 146, kind: 'export', label: 'export why.jsonld', t: '13:05', a: '47', b: '6' },
];

export const edges: [string, string][] = [
  ['n0', 'n1'], ['n0', 'n2'], ['n1', 'n3'], ['n1', 'n4'], ['n2', 'n5'],
  ['n3', 'n6'], ['n4', 'n7'], ['n5', 'n8'], ['n7', 'n9'], ['n8', 'n9'], ['n6', 'n9'],
];
