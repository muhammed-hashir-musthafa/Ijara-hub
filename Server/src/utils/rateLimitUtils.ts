import rateLimit from 'express-rate-limit';
import { Request } from 'express';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Custom key generator for user-based rate limiting
export const userBasedKeyGenerator = (req: AuthRequest): string => {
  const userId = req.user?.id;
  return userId ? `user:${userId}` : `ip:${req.ip || 'unknown'}`;
};

// IP-based key generator (default)
export const ipBasedKeyGenerator = (req: Request): string => {
  return `ip:${req.ip || 'unknown'}`;
};

// Create user-specific rate limiter
export const createUserRateLimiter = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message || 'Too many requests from this user, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: userBasedKeyGenerator,
  });
};

// Strict rate limiter for sensitive operations
export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: { error: 'Too many attempts for this sensitive operation. Please try again in 1 hour.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipBasedKeyGenerator,
});

// Rate limiter for password reset
export const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 password reset attempts
  message: { error: 'Too many password reset attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipBasedKeyGenerator,
});