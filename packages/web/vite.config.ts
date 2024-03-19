import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import vueJsx from "@vitejs/plugin-vue-jsx";

import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    eslintPlugin({
      include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"],
    }),
  ],
  resolve: {
    //设置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "*": path.resolve(""),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 定义全局的scss变量
        // 给导入的路径最后加上 ;
        additionalData: `@import '@/styles/var.scss';`,
      },
    },
    // 使用tailwindcss
    postcss: {
      plugins: [autoprefixer, tailwindcss],
    },
  },
  server: {
    port: 6010,
    open: true,
    proxy: {
      // "/v-uibuilder-server": {
      //     target: "http://localhost:3200",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace("/v-uibuilder-server", ""),
      // },
    },
  },
});
