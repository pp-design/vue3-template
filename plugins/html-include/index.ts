import { Plugin } from 'vite';
import { resolve } from 'path';
import shell from 'shelljs';
import pretty from 'pretty';
import { escapeRegExp } from '../utils/escapeRegExp';
import { pathRewrite } from '../utils/pathRewrite';

const name = 'vite-html-include-plugin';

const cwd = process.cwd();

const INCLUDE_REG = /<!--( |)+include( )+(.*?htm)( )+(\[.*\]|).*?-->/gi;

/**
 * 模板插件
 * @returns
 */
export default function htmlInclude(viteEnv: ViteEnv, isBuild: boolean): Plugin {
  /**
   * 转化模板
   * @param content
   * @param include
   * @returns
   */
  function convert(html: string, include: string): string {
    let content: string = html;
    const escapeInclude: string = escapeRegExp(include);
    const replaceReg = new RegExp(escapeInclude);
    const cleanReg = new RegExp(escapeInclude, 'g');
    const includeUrl = resolve(cwd, include.replace(INCLUDE_REG, '$3'));
    let includeParams = include.replace(INCLUDE_REG, '$5');
    if (shell.test('-e', includeUrl)) {
      const includeContent = shell.cat(includeUrl).stdout;
      content = content.replace(replaceReg, includeContent);

      if (includeParams) {
        includeParams = JSON.parse(includeParams);
        // 替换参数
        const paramsLen: number = includeParams?.length;
        for (let i = 0; i < paramsLen; i++) {
          const paramsReg = new RegExp(escapeRegExp(`{${i}}`), 'g');
          content = content.replace(paramsReg, includeParams[i]);
        }
      }
    }
    content = content.replace(cleanReg, '');

    // 静态路径的处理
    content = pathRewrite(content, viteEnv, isBuild);

    return content;
  }

  return {
    name,
    transformIndexHtml(html) {
      let content: string = html;
      const includes = Array.from(new Set(content.match(INCLUDE_REG)));
      const len: number = includes?.length || 0;
      for (let i = 0; i < len; i++) {
        content = convert(content, includes[i]);
      }
      return pretty(content);
    },
  };
}
