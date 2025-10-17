import rateLimit from 'express-rate-limit';
import { Request } from 'express';

const createRateLimiter = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message || 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => req.ip || 'unknown',
  });
};

// Auth endpoints - strict limits
export const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many authentication attempts, please try again in 15 minutes.'
);

// General API endpoints
export const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100 // 100 requests
);

// File upload endpoints
export const uploadLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  10, // 10 uploads
  'Upload limit exceeded, please try again in 1 hour.'
);

// Admin endpoints - higher limits
export const adminLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  200 // 200 requests
);