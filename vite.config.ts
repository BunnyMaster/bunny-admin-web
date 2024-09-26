import { getPluginsList } from "./build/plugins";
import { exclude, include } from "./build/optimize";
import { type ConfigEnv, loadEnv, type UserConfigExport } from "vite";
import { __APP_INFO__, alias, root, wrapperEnv } from "./build/utils";
import { serverOptions } from "./build/server";
import { buildEnvironment } from "./build/buildEnv";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } =
    wrapperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias },
    // 服务端渲染
    server: serverOptions(mode),
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION, VITE_PORT),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: { include, exclude },
    esbuild: {
      pure: ["console.log", "debugger"],
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: "import { h } from 'vue';"
    },
    build: buildEnvironment(),
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
};
