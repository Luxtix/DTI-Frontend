import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (
    !req.auth &&
    (req.nextUrl.pathname.startsWith("/user") ||
      req.nextUrl.pathname.startsWith("/organizer"))
  ) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (
    req.auth?.user.role === "ORGANIZER" &&
    req.nextUrl.pathname.startsWith("/user")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (
    req.auth?.user.role === "USER" &&
    req.nextUrl.pathname.startsWith("/organizer")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});
