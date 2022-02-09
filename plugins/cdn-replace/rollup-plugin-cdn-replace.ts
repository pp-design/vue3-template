import { escapeRegExp } from '../utils/escapeRegExp';

// 只对js/css文本内容做替换
const TEXT_REG = /\.(css|js)$/;

const name = 'rollup-plugin-cdn-replace';

/**
 * Vite没有提供output generate hook的调用，只能通过Rollup的插件来做
 * @param options
 * @returns
 */
export function replaceCDN(viteEnv: ViteEnv) {
  const baseURL = `${viteEnv.VITE_HOST}${viteEnv.VITE_BASE_URL}ossweb-img/`;

  // 检测数据是否正确
  if (!viteEnv.VITE_IED_CDN) {
    console.log('请在 .env 文件中设置 VITE_IED_BASE 地址！');
    process.exit(0);
  }

  const baseURLReg = new RegExp(escapeRegExp(baseURL), 'g');
  return {
    name,
    generateBundle(rollupOptions: any, info: any) {
      const bundles: any[] = Object.values(info);
      bundles?.forEach((bundle: any) => {
        const finalBundle: any = bundle;
        const { fileName, source, code } = bundle;
        if (TEXT_REG.test(fileName)) {
          if (source) {
            finalBundle.source = source.replace(baseURLReg, viteEnv.VITE_IED_CDN);
          }
          if (code) {
            finalBundle.code = code.replace(baseURLReg, viteEnv.VITE_IED_CDN);
          }
        }
      });
    },
  };
}
