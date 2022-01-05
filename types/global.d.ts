/**
 * ViteEnv 数据接口
 */
declare interface ViteEnv {
  // 将发布的Host地址
  VITE_HOST: string;
  // 将发布的项目目录
  VITE_BASE_URL: string;

  // 是否支持多页面
  VITE_USE_MPA: boolean;

  // 是否使用Mock数据
  VITE_USE_MOCK: boolean;

  // 是否接入蜘蛛
  VITE_USE_IED: boolean;
  // 蜘蛛的CDN地址（如果需要接入蜘蛛，此项必填）
  VITE_IED_CDN: string;

  // 是否使用html include功能
  VITE_USE_INC: boolean;
}

/**
 * 挂载到Window上的变量
 */
declare interface Window {
  // 页面统计
  aegis?: any;
  // 点击上报
  PTTSendClick?: any;
}
