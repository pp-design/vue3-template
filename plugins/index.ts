import { ConfigEnv, Plugin } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import createVueJSXPlugin from '@vitejs/plugin-vue-jsx';

import createMpaPlugin from './mpa';
import createHtmlInclude from './html-include';
import createMockPlugin from './mock';
import createSvgIconsPlugin from './svg-icons';
import createCDNReplace from './cdn-replace';

/**
 * 插件合集
 * @returns
 */
export function createPlugins(config: ConfigEnv, viteEnv: ViteEnv): Plugin[] {
  const isBuild: boolean = config.mode === 'production';

  const plugins: Plugin[] = [
    createVuePlugin(),
    createVueJSXPlugin(),
    createSvgIconsPlugin(),
    createCDNReplace(viteEnv, isBuild),
  ];

  // mockjs插件
  if (viteEnv.VITE_USE_MOCK) {
    plugins.push(createMockPlugin(isBuild));
  }

  // 多页面插件
  if (viteEnv.VITE_USE_MPA) {
    plugins.push(createMpaPlugin(viteEnv, isBuild));
  }

  // // Include插件
  if (viteEnv.VITE_USE_INC) {
    plugins.push(createHtmlInclude(viteEnv, isBuild));
  }
  return plugins;
}
