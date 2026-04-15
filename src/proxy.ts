import { type NextRequest, NextResponse } from "next/server";

function randomNonce(): string {
  // Edge middleware: avoid Node `Buffer` (same as Buffer.from(uuid).toString("base64") for ASCII).
  return btoa(crypto.randomUUID());
}

function buildContentSecurityPolicy(nonce: string): string {
  const directives = [
    "default-src 'self'",
    // next-contentlayer2 useMDXComponent compiles MDX on the client via new Function().
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`,
    // React style={{}} and common libs set inline style attributes (no nonce on attrs).
    `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = randomNonce();
  const contentSecurityPolicyHeaderValue = buildContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );
  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
