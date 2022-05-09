import { chargebee, cloud, cloudflare, figma, git, grafana, influxdb, java, kotlin, kubernetes, mongodb, nuxt, postgres, prometheus, rabbitmq, redis, sentry, tailwindcss, vue } from './technologies'

export const projects: Array<Project> = [
  {
    id: 'hydra',
    url: 'https://hydra.bot',
    name: 'Hydra',
    heading: 'The perfect and only Discord bot you\'ll ever need.',
    description: "I bootstrapped Hydra's image by introducing a user-friendly web application with features like subscription management and powerful dashboards. I currently manage general development and steer the project into a new era of highly useful Discord features.",
    technologies: [
      chargebee,
      cloud,
      cloudflare,
      figma,
      git,
      grafana,
      influxdb,
      java,
      kotlin,
      kubernetes,
      mongodb,
      nuxt,
      postgres,
      prometheus,
      rabbitmq,
      redis,
      sentry,
      tailwindcss,
      vue,
    ]
  },
  {
    id: 'groovy',
    url: 'https://groovy.bot',
    name: 'Groovy',
    heading: 'Discord\'s best and most popular music bot.',
    description: "I ignited Groovy's massive growth by establishing a well-formed web-presence and overhauling the in-place donation-based premium system. Maintaining such a gigantic service at scale certainly brought up various challenges, at its peak Groovy was used by over 50 million people each month.",
    technologies: [
      chargebee,
      cloud,
      cloudflare,
      git,
      influxdb,
      java,
      kubernetes,
      mongodb,
      nuxt,
      rabbitmq,
      redis,
      sentry,
      tailwindcss,
      vue,
    ]
  },
  {
    id: 'aero',
    url: 'https://aero.bot',
    name: 'Aero',
    heading: 'An intuitive community management tool.',
    description: "I manage and maintain Aero's bare-metal infrastructure and required external software whilst supervising development of internal blazingly fast microservices. Discord is a confusing and sometimes dangerous place to navigate, Aero's job is to make your experience on the platform a lot smoother.",
    technologies: [
      cloudflare,
      git,
      grafana,
      java,
      kotlin,
      kubernetes,
      mongodb,
      nuxt,
      prometheus,
      redis,
      sentry,
      tailwindcss,
      vue,
    ]
  }
]
