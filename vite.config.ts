import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  plugins: [
    vue(),

    AutoImport({
      // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
      // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
      imports: ["vue"],
      // 第三方组件库的解析器
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ["src/components/"],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ["vue", "md"],
      // 解析的 UI 组件库，这里以 Element Plus 和 Ant Design Vue 为例
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
  ],
  server: {
    host: "0.0.0.0", //自定义主机名
    port: 8991, //自定义端口

    proxy: {
      "/api": {
        target: "http://47.92.170.190:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/fastapi": {
        target: "https://127.0.0.1:8000",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fastapi/, ""),
      },
      "/ws": {
        target: "ws://127.0.0.1:8000",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
      "/xu": {
        target: "http://192.168.28.33:8060/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xu/, ""),
      },
      "/online": {
        target: "http://47.92.170.190:5005",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/online/, ""),
      },
    },
  },
  resolve: {
    // 配置路径别名
    alias: [
      // @代替src
      {
        find: "@",
        replacement: path.resolve("./src"),
      },
    ],
  },
})
