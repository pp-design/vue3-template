import { Plugin } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

/**
 * MockJS，只在开发环节中使用
 * @returns
 */
export default function createMockPlugin(isBuild: boolean): Plugin {
  return viteMockServe({
    ignore: /^_/,
    mockPath: 'src/mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
          import { setupProdMockServer } from "@src/mock/_index";
          setupProdMockServer();
        `,
    logger: true,
  });
}
