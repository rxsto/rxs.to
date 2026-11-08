import handler from 'vinext/server/fetch-handler';
import { responseHeaders } from './response-headers';
export default {
  async fetch(...args: Parameters<typeof handler.fetch>) {
    return responseHeaders(await handler.fetch(...args));
  },
};
