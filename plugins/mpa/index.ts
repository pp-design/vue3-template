/** ********************************************************
 * 本插件参考自：vite-plugin-mpa(https://github.com/IndexXuan/vite-plugin-mpa)
 * 由于原插件无法满足定制化需求，所以参考原插件做了定制化处理
 **********************************************************/

import { Plugin } from 'vite';
import shell from 'shelljs';
import path from 'path';
import pretty from 'pretty';

import history from 'connect-history-api-fallback';

import { getHistoryReWriteRuleList, getMPAInput, getOpenPage } from './utils';

export default function createMpaPlugin(viteEnv: ViteEnv, isBuild: boolean): Plugin {
  let userConfig: any = null;
  return {
    name: 'vite-plugin-mpa',
    enforce: 'pre',
    config(config: any) {
      userConfig = config;
      userConfig.build = userConfig.build || {};
      userConfig.build.rollupOptions = userConfig.build.rollupOptions || {};
      // 遍历所有的页面
      userConfig.build.rollupOptions.input = getMPAInput();
      userConfig.server = userConfig.server || {};
      userConfig.server.open = userConfig.build.rollupOptions.input || getOpenPage();
    },
    transformIndexHtml(html) {
      let content: string = html;
      const protocol = viteEnv.VITE_HTTPS ? 'https' : 'http';
      content = content.replace(/VITE_HTTPS/gi, protocol);
      return pretty(content);
    },
    configureServer({ middlewares: app }) {
      const historyConnect: any = history({
        verbose: true,
        disableDotRule: undefined,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        rewrites: getHistoryReWriteRuleList(viteEnv),
      });
      app.use(historyConnect);
    },
    closeBundle() {
      if (isBuild) {
        const dest = userConfig?.build?.outDir || 'dist';
        const destPath: string = path.resolve(dest);
        const pagesPath: string = path.resolve(destPath, 'src');

        shell.mv('-f', `${pagesPath}/*`, destPath);
        shell.rm('-rf', pagesPath);
      }
    },
  };
}
