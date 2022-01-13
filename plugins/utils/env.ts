import { loadEnv } from 'vite';

// 数字正则
const NUMBER_REG = /^\d+$/gi;
// 路径正则
const HTTP_REG = /^http(s|):\/\//gi;

/**
 * 默认配置
 */
const defaultViteEnv = {
  // 将发布的项目目录
  VITE_BASE_URL: './',

  // 是否使用Mock数据
  VITE_USE_MOCK: true,

  // 是否使用多页面
  VITE_USE_MPA: true,

  // 是否接入蜘蛛
  VITE_USE_IED: false,

  // 是否使用html include功能
  VITE_USE_INC: false,
};

/**
 * 加载Vite环境变量
 * @param mode
 * @param cwd
 * @returns
 */
export function loadViteEnv(mode: string): ViteEnv {
  const cwd = process.cwd();
  const env: any = Object.assign(defaultViteEnv, loadEnv(mode, cwd));
  const keys: string[] = Object.keys(env);
  keys?.forEach((key: string) => {
    let value: any = env[key];
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (value === 'null' || value === 'undefined') {
      value = null;
    } else if (NUMBER_REG.test(value)) {
      value = Number(value);
    }
    env[key] = value;
  });

  // VITE_HOST 与 VITE_BASE_URL数据校正
  env.VITE_BASE_URL = env.VITE_BASE_URL || './';
  if (env.VITE_HOST) {
    HTTP_REG.lastIndex = 0;
    if (!HTTP_REG.test(env.VITE_HOST)) {
      env.VITE_HOST = `https://${env.VITE_HOST}`;
    }
    env.VITE_HOST = env.VITE_HOST.replace(HTTP_REG, 'https://');
    env.VITE_BASE_URL = env.VITE_BASE_URL.replace(/^\./gi, '');
  }

  // 如果是编译下，强制开启HTTPS
  if (mode === 'production') {
    env.VITE_HTTPS = true;
  }

  return env;
}
