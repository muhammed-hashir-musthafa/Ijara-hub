export const RATE_LIMITS = {
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
  },
  API: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  UPLOAD: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
  },
  ADMIN: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
  },
} as const;