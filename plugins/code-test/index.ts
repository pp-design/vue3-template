import { Plugin } from 'vite';

import { test } from './tester';

/**
 * 测试代码检测插件
 * @returns
 */
export default function createCodeTestPlugin(): Plugin {
  return {
    name: 'code-test-plugin',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html: string) {
      return test(html);
    },
    async transform(code: string) {
      return test(code);
    },
  };
}
