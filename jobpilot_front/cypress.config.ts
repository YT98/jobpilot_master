import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    "cypress-react-selector": {
      "root": "__next"
    }
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
