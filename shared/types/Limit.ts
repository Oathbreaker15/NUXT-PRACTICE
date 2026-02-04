  const LIMIT_OPTIONS = [8, 16, 32, 64] as const;
  export type LimitValue = typeof LIMIT_OPTIONS[number];