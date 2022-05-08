import SvgBrandDiscordVue from "~/components/svg/brand/SvgBrandDiscord.vue";
import SvgBrandGitHubVue from "~~/components/svg/brand/SvgBrandGitHub.vue";
import SvgBrandLinkedInVue from "~/components/svg/brand/SvgBrandLinkedIn.vue";
import SvgBrandTwitterVue from "~/components/svg/brand/SvgBrandTwitter.vue";
import SvgBrandYouTubeVue from "~/components/svg/brand/SvgBrandYouTube.vue";

export const socials: Array<Social> = [
  {
    id: 'twitter',
    display: 'Twitter',
    url: 'https://twitter.com/rxsto_official',
    component: SvgBrandTwitterVue
  },
  {
    id: 'github',
    display: 'Github',
    url: 'https://github.com/rxsto',
    component: SvgBrandGitHubVue
  },
  {
    id: 'linkedin',
    display: 'LinkedIn',
    url: 'https://linkedin.com/in/oskar-lang',
    component: SvgBrandLinkedInVue
  },
  {
    id: 'youtube',
    display: 'YouTube',
    url: 'https://www.youtube.com/c/rxsto',
    component: SvgBrandYouTubeVue
  },
  {
    id: 'discord',
    display: 'Discord',
    url: 'https://discord.gg/r7tqQVs',
    component: SvgBrandDiscordVue
  }
]
