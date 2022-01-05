import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/v1/userInfo',
    timeout: 200,
    method: 'get',
    response: ({ body = {} }) => {
      console.log('body', body);
      return {
        code: 0,
        message: 'OK',
        data: {
          userName: 'admin',
          headThumb: 'http://xxx/avatars/profile.gif',
        },
      };
    },
  },
] as MockMethod[];
