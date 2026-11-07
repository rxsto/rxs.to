import type { NextConfig } from 'next';

const config: NextConfig = {
  // Link previews must receive project metadata before the body, regardless of user agent.
  htmlLimitedBots: /.*/,
};

export default config;
