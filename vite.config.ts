import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

type Rule = { selector: string; clone(overrides: { selector: string }): Rule; after(node: unknown): void };
type Helpers = { AtRule: new (props: { name: string; params: string; nodes: Rule[] }) => unknown };

const dark = ':root[data-theme="dark"]';

// Copied from Hydra: Arc switches themes only on data-theme; this follows the system when it is unset.
const systemTheme = {
  postcssPlugin: "system-theme",
  Rule(rule: Rule, { AtRule }: Helpers) {
    if (!rule.selector.includes(dark)) return;
    const selector = rule.selector.replaceAll(dark, ":root:not([data-theme])");
    rule.after(new AtRule({ name: "media", params: "(prefers-color-scheme: dark)", nodes: [rule.clone({ selector })] }));
  },
};

export default defineConfig({
  css: { postcss: { plugins: [systemTheme] } },
  plugins: [
    tailwindcss(),
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
