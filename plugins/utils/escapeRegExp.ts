/**
 * 正则转义
 * @param value
 * @returns
 */
export function escapeRegExp(value: string): string {
  return value?.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
