// 静态路径处理
const STATIC_PATH_REG = /@public\//gi;

/**
 * 静态路径处理：开发模式和编译模式下，路径有差异
 * @param content
 */
export function pathRewrite(content: string, viteEnv: ViteEnv, isBuild: boolean) {
  let finalContent = content || '';
  if (finalContent) {
    let staticURL = viteEnv.VITE_BASE_URL.replace(/^\./gi, '/');
    if (isBuild) {
      staticURL = viteEnv.VITE_HOST + staticURL;
    }
    finalContent = finalContent.replace(STATIC_PATH_REG, staticURL);
  }
  return finalContent;
}
