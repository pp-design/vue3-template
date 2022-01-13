import { resolve } from 'path';
import { ConfigEnv, UserConfig } from 'vite';
import { createPlugins } from './plugins/index';
import { loadViteEnv } from './plugins/utils/env';

export default (configEnv: ConfigEnv): UserConfig => {
  const { mode } = configEnv;
  const viteEnv: ViteEnv = loadViteEnv(mode);
  // base地址
  let base: string = viteEnv.VITE_BASE_URL;
  if (mode === 'production') {
    base = viteEnv.VITE_HOST + base;
  }

  return {
    base,
    plugins: [...createPlugins(configEnv, viteEnv)],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/'),
        '@src': resolve(__dirname, './src/'),
        '@public': resolve(__dirname, './public/'),
        '@assets': resolve(__dirname, './src/assets'),
        '@components': resolve(__dirname, './src/components'),
      },
    },
    server: {
      https: viteEnv.VITE_HTTPS,
      host: '0.0.0.0',
      hmr: {
        host: '0.0.0.0',
      },
    },
    build: {
      // 禁止颜色被hex
      target: 'chrome51',
      /** 避免资源被打包成base64 */
      assetsInlineLimit: 0,
    },
  };
};
