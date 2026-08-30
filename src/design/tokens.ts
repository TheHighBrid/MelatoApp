export const colors = {
  ink: '#080808',
  graphite: '#161616',
  bone: '#F5F1E8',
  warmWhite: '#FAF7F1',
  muted: '#A9A49B',
  line: 'rgba(245, 241, 232, 0.16)',
  accent: '#C9974A',
  danger: '#A33A35',
} as const;

export const layout = {
  gutter: 20,
  gutterCompact: 14,
  contentMaxWidth: 720,
  radius: {
    none: 0,
    subtle: 2,
  },
  touchTarget: 44,
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  hero: 72,
} as const;

export const typography = {
  display: {
    family: 'serif',
    weight: '700' as const,
    letterSpacing: -1.6,
  },
  ui: {
    family: 'sans-serif',
    weight: '400' as const,
    letterSpacing: 0,
  },
  meta: {
    family: 'sans-serif',
    weight: '600' as const,
    letterSpacing: 1.6,
  },
} as const;

export const motion = {
  quickMs: 180,
  standardMs: 220,
  slowMs: 280,
} as const;
