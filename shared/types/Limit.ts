  const LIMIT_OPTIONS = [{ key: 8 }, { key: 16 }, { key: 32 }, { key: 64 }] as const;
  export type LimitValue = typeof LIMIT_OPTIONS[number];