import { testPath } from './test-path';

export async function test(code: string): Promise<any> {
  return testPath(code);
}
