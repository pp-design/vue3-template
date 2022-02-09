import { Plugin } from 'vite';
import { pathRewrite } from '../utils/pathRewrite';

import { replaceCDN } from './rollup-plugin-cdn-replace';

const name = 'cdn-replace-plugin';

// 图片正则
const IMG_REG = /(\.(png|jpg|gif|bmp|psd|tiff|tga|eps))$/gi;

/**
 * CDN地址转换插件
 * @param options
 * @returns
 */
export default function createCDNReplace(viteEnv: ViteEnv, isBuild: boolean): Plugin {
  let userConfig: any = null;
  return {
    name,
    enforce: 'pre',
    config(config: any) {
      userConfig = config;
      if (isBuild && viteEnv.VITE_USE_IED) {
        userConfig.build = config.build || {};
        userConfig.build.rollupOptions = config.build.rollupOptions || {};
        userConfig.build.rollupOptions.output = config.build.rollupOptions.output || {};

        // 图片抽离到 ossweb-img 文件夹中
        userConfig.build.rollupOptions.output.assetFileNames = (option: any) => {
          const { name } = option;
          IMG_REG.lastIndex = 0;
          if (IMG_REG.test(name)) {
            return 'ossweb-img/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        };

        // 使用插件来替换蜘蛛CDN地址
        userConfig.build.rollupOptions.output.plugins = userConfig.build.rollupOptions.output.plugins || [];
        userConfig.build.rollupOptions.output.plugins.push(replaceCDN(viteEnv));
      }
    },
    transform(code: string) {
      const finalCode: string = pathRewrite(code, viteEnv, isBuild);
      return {
        code: finalCode,
      };
    },
  };
}
