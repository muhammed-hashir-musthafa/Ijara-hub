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
  roleRoutes: {
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
    console.log(payload, "payload");
    console.log("JWT verification successful", secret);
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
 * RBAC - checks if user role has access to route
 */
function hasAccess(pathname: string, userRole?: UserRole): boolean {
  for (const [route, allowedRoles] of Object.entries(
    middlewareConfig.roleRoutes
  )) {
    if (pathname.startsWith(route)) {
      return userRole ? allowedRoles.includes(userRole) : false;
    }
  }
  return true;
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
  console.log("ip", ip);
  console.log(pathname, "pathname");

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Public routes
  if (
    middlewareConfig.publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  // JWT Authentication
  const token = request.cookies.get("token")?.value;
  console.log("token", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifyToken(token);
  console.log(user, "user");
  if (!user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // RBAC
  if (!hasAccess(pathname, user.role)) {
    return new NextResponse(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
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
