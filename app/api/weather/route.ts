import { env } from 'cloudflare:workers';
import { getWeather, WeatherError } from '../../../server/weather';

export async function GET(request: Request) {
  try {
    return Response.json(await getWeather(env));
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
      headers: {
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'referrer-policy': 'no-referrer',
        'content-security-policy': "script-src 'none'; frame-ancestors 'none';",
      },
    });
  }
}

export const POST = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
export const OPTIONS = GET;
