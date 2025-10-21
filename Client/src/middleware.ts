import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { UserRole } from "@/types/auth";

/**
 * In-memory store for rate limiting tracking
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const middlewareConfig = {
  rateLimit: { windowMs: 60000, maxRequests: 100 },
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/articles",
    "/careers",
    "/help",
    "/privacy",
    "/terms",
    "/rooms",
    "/cars",
    "/login",
    "/renter/signup",
    "/owner/signup",
    "/admin/login",
  ],
  protectedRoutes: {
    "/admin": ["admin"] as UserRole[],
    "/owner": ["owner", "admin"] as UserRole[],
    "/profile": ["renter", "owner", "admin"] as UserRole[],
    "/messages": ["renter", "owner", "admin"] as UserRole[],
  },
};

/**
 * Verifies JWT token and extracts user information
 */
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "fallback-secret"
    );
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload, "payload");
    // console.log("JWT verification successful", secret);
    return payload as {
      id: string;
      email: string;
      role: UserRole;
      isVerified: boolean;
    };
  } catch {
    return null;
  }
}

// Rate limiting
/**
 * Rate limiting per IP address
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `rate_${ip}`;
  const limit = rateLimitStore.get(key);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + middlewareConfig.rateLimit.windowMs,
    });
    return true;
  }

  if (limit.count >= middlewareConfig.rateLimit.maxRequests) return false;

  limit.count++;
  return true;
}

// RBAC check
/**
 * Check if route is protected and requires authentication
 */
function isProtectedRoute(pathname: string): boolean {
  return Object.keys(middlewareConfig.protectedRoutes).some(route => 
    pathname.startsWith(route)
  );
}

/**
 * RBAC - checks if user role has access to route
 */
function hasAccess(pathname: string, userRole: UserRole): boolean {
  for (const [route, allowedRoles] of Object.entries(
    middlewareConfig.protectedRoutes
  )) {
    if (pathname.startsWith(route)) {
      return allowedRoles.includes(userRole);
    }
  }
  return false;
}

/**
 * Main middleware function - RBAC, JWT, Rate Limiting
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  // console.log("ip", ip);
  // console.log(pathname, "pathname");

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check for public routes (including dynamic routes)
  const isPublic = middlewareConfig.publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
  
  // Special handling for dynamic routes
  const isDynamicPublicRoute = 
    pathname.startsWith('/rooms/') || 
    pathname.startsWith('/cars/');
  
  if (isPublic || isDynamicPublicRoute) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const requiresAuth = isProtectedRoute(pathname);
  
  if (!requiresAuth) {
    return NextResponse.next();
  }

  // JWT Authentication for protected routes
  const token = request.cookies.get("token")?.value;
  // console.log("token", token);
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifyToken(token);
  // console.log(user, "user");
  
  if (!user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // RBAC - check if user has access to this protected route
  if (!hasAccess(pathname, user.role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Success
  const response = NextResponse.next();
  response.headers.set("x-user-id", user.id);
  response.headers.set("x-user-role", user.role);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
