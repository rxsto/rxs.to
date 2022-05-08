import SvgBrandDiscordVue from "~/components/svg/brand/SvgBrandDiscord.vue";
import SvgBrandGithubVue from "~/components/svg/brand/SvgBrandGithub.vue";
import SvgBrandLinkedinVue from "~/components/svg/brand/SvgBrandLinkedin.vue";
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
    component: SvgBrandGithubVue
  },
  {
    id: 'linkedin',
    display: 'LinkedIn',
    url: 'https://linkedin.com/in/oskar-lang',
    component: SvgBrandLinkedinVue
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
