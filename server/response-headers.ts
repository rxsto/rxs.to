export function responseHeaders(response: Response): Response {
  const result = new Response(response.body, response);
  result.headers.set('X-Content-Type-Options', 'nosniff');
  result.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  result.headers.set('X-Frame-Options', 'DENY');
  result.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
  if (result.headers.get('content-type')?.includes('text/html')) {
    result.headers.set('Cache-Control', 'no-store');
  }
  return result;
}
