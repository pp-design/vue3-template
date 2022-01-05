import { Rewrite } from 'connect-history-api-fallback';
import glob from 'fast-glob';

import { IPage } from './types';

const cwd: string = process.cwd();
const ROUTER_PAGE_REG = /src\/index\.html$/gi;
const PAGE_REG = /src\/pages\/(\w+)\/index\.html$/gi;

// 项目的Base地址
let base = '';
// 页面数据
let pages: IPage[] = [];

/**
 * 检索所有符合规范的页面
 * @returns
 */
export function initializePages(): void {
  // 清理页面数据
  pages = [];

  // 所有页面
  const allFiles = glob.sync(['src/pages/**/index.html', 'src/index.html']);
  allFiles?.forEach((file: string) => {
    PAGE_REG.lastIndex = 0;
    ROUTER_PAGE_REG.lastIndex = 0;
    if (PAGE_REG.test(file)) {
      pages.push({
        name: file.replace(PAGE_REG, '$1'),
        path: file,
        rewrite: true,
      });
    } else if (ROUTER_PAGE_REG.test(file)) {
      pages.push({
        name: 'router-index',
        path: file,
        rewrite: false,
      });
    }
  });
}

/**
 * 获取多页面入口
 * @returns
 */
export function getMPAInput(): Record<string, string> {
  initializePages();
  const inputs: Record<string, string> = {};
  pages.forEach((pageInfo: IPage) => {
    const { path } = pageInfo;
    inputs[pageInfo.name] = `${cwd}/${path}`;
  });
  return inputs;
}

/**
 * 获取默认打开页面
 * @param pages
 * @returns
 */
export function getOpenPage(): string {
  let path = '';
  const len: number = pages?.length || 0;
  for (let i = 0; i < len; i++) {
    const pageInfo: IPage = pages[i];
    if (pageInfo.name === 'router-index') {
      path = `${base}${pageInfo.path}`;
      break;
    } else if (pageInfo.name === 'index') {
      path = `${base}${pageInfo.path}`;
    } else if (!path) {
      path = `${base}${pageInfo.path}`;
    }
  }
  return path;
}

/**
 * 获取DevServer重定向
 */
export function getHistoryReWriteRuleList(viteEnv: ViteEnv): Rewrite[] {
  let rewrites: Rewrite[] = [];
  base = viteEnv.VITE_BASE_URL.replace(/^\./, '');

  // 跟页面跳转
  rewrites.push({
    from: new RegExp(`^${base}$`),
    to: getOpenPage(),
  });

  // 对页面进行重定向
  pages.forEach((pageInfo: IPage) => {
    if (!pageInfo.rewrite) return;
    const to = `${base}${pageInfo.path}`;

    let currRewrites: Rewrite[] = formatRewrites(`${base}/pages/`, pageInfo.name, to);
    rewrites = [...rewrites, ...currRewrites];
  });
  return rewrites;
}

/**
 * 格式化Rewrites
 * @returns
 */
function formatRewrites(base: string, pageName: string, to: string): Rewrite[] {
  const rewrites: Rewrite[] = [];
  const newBase: string = base.replace(/\/+/gi, '/');
  rewrites.push({
    from: new RegExp(`^${newBase}${pageName}/index.html/*`),
    to,
  });
  rewrites.push({
    from: new RegExp(`^${newBase}${pageName}/index.html$`),
    to,
  });
  rewrites.push({
    from: new RegExp(`^${newBase}${pageName}.html/*`),
    to,
  });
  rewrites.push({
    from: new RegExp(`^${newBase}${pageName}.html$`),
    to,
  });
  rewrites.push({
    from: new RegExp(`^${newBase}${pageName}$`),
    to,
  });
  rewrites.push({
    from: new RegExp(`^${newBase}${pageName}/*`),
    to,
  });
  return rewrites;
}
