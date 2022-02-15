
const TEST_PATH_REG = /test/gi;

/**
 * 测试路径检测
 * @param code 代码
 */
export function testPath(code: string, isHtml = false) {
  //   if (TEST_PATH_REG.test(code)) {
  //     process.exit();
  //   }
  return isHtml ? code : { code };
}
