import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("JSESSIONID");

  if (!isAuthenticated) {
    return NextResponse.redirect("http://localhost:8080/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};
