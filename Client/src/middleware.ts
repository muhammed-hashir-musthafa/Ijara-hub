import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Allow all requests
  return NextResponse.next();
}