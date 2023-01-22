import { NextResponse } from "next/server";

export default async function middleware(req) {
  const url = req.nextUrl.clone();

  // fetch here requires an absolute URL to the auth API route
  const {
    data: { auth },
  } = await fetch(`${url.origin}/api/authssr`, {
    headers: req.headers,
  }).then((res) => res.json());
  // we patch the callback to send the user back to where auth was required
  url.search = new URLSearchParams(`callbackUrl=${url}`).toString();
  url.pathname = `/api/auth/signin`;

  return !auth ? NextResponse.redirect(url) : NextResponse.next();
}

export const config = { matcher: ["/bookmarks", "/profile", "/notifications", "/profile/:path*"] };
