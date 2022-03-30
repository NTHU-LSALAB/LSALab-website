import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import markdown from "vite-plugin-md";
import { resolve } from "path";
import hljs from "highlight.js";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      markdown({
        markdownItOptions: {
          html: true,
          typographer: true,
          linkify: false,
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }

            return "";
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "https://lsalab.cs.nthu.edu.tw/v1",
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ""),
    //     },
    //   },
    // },
    base: process.env.VITE_BASE_URL,
  });
};
