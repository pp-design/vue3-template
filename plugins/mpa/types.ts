/**
 * 页面接口
 */
export interface IPage {
  // 页面名
  name: string;
  // 页面源路径
  path: string;
  // 是否需要被重定向
  rewrite: boolean;
  // 路由
  routers?: IRouter[] | null;
}

/**
 * 路由接口
 */
export interface IRouter {
  // 路由名
  name: string;
  // 路由路径
  path: string;
  // 子路由
  children?: IRouter[] | null;
}

/**
 * 所有页面
 */
export class Pages {
  // 所有图片
  private pages: IPage[] = [];
}

/**
 * 页面数据
 */
export class Page implements IPage {
  public name = '';
  public path = '';
  public rewrite = false;
  public routers: IRouter[] | null = null;
}

/**
 * 路由数据
 */
export class Router implements IRouter {
  public name = '';
  public path = '';
  public children: IRouter[] | null = null;
}
