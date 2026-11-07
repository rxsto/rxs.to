import { env } from 'cloudflare:workers';
import { getWeather, WeatherError } from '../../../server/weather';

export async function GET(request: Request) {
  try {
    return Response.json(await getWeather(env), { headers: { 'cache-control': 'public, max-age=300', 'x-content-type-options': 'nosniff' } });
  } catch (error) {
    if (!(error instanceof WeatherError)) throw error;
    return Response.json({
      error: true,
      url: request.url,
      statusCode: 502,
      statusMessage: error.message,
      message: error.message,
    }, {
      status: 502,
      statusText: error.message,

    });
  }
}

export async function HEAD(request: Request) {
  const response = await GET(request);
  return new Response(null, { status: response.status, headers: response.headers });
}
function methodNotAllowed() { return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } }); }
export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
