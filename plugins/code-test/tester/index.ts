import { testPath } from './test-path';

export async function test(code: string, isHtml = false): Promise<any> {
  return testPath(code, isHtml);
}
