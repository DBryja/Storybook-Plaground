import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
      path.resolve(__dirname, "../src/**/*.mdx"),
      path.resolve(__dirname, "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)")
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
}
export default config;

export const framework = {
  name: "@storybook/nextjs",
  options: {}
};

export const docs = {
  autodocs: true
};