// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Mapping of protected routes → required roles
export const protectedRoutes: Record<string, string[]> = {
  "/staffList": ["admin"],
  "/patientList": ["admin", "receptionniste"],
  "/appointmentListPatient": ["patient"],
  "/appointmentList": ["medecin"],
  "/consultation": ["medecin"],
  "/profile": ["medecin", "admin", "receptionniste"],
  "/patientEdit": ["admin", "receptionniste"],
};

// Public routes that don't require authentication
const publicPaths = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("access_token")?.value;

  // Allow public routes
  if (publicPaths.some((p) => url.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Ignore public files by checking for a file extension
  if (
    publicPaths.some((p) => url.pathname.startsWith(p)) ||
    url.pathname.match(/\.[^\/]+$/)
  ) {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const decoded: any = jwtDecode(token);
    const roles: string[] = decoded?.realm_access?.roles || [];

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    for (const [path, rolesRequired] of Object.entries(protectedRoutes)) {
      if (
        url.pathname.startsWith(path) &&
        !rolesRequired.some((r) => roles.includes(r))
      ) {
        url.pathname = "/404";
        return NextResponse.rewrite(url);
      }
    }

    return NextResponse.next();
  } catch (err) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/staffList",
    "/patientList",
    "/appointmentListPatient",
    "/appointmentList",
    "/consultation",
    "/profile",
    "/patientEdit/:path*",
  ],
};
