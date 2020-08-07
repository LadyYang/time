import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import { getCookie } from '../utils';
import { isLogin } from '../server';

const _app: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  // 判断是否登录
  useEffect(() => {
    if (router.pathname !== '/login') {
      (async () => {
        const token = getCookie('token');

        const resp = await isLogin(token || '');
        if (resp.code !== 0) {
          router.replace('/login');
        }
      })();
    }
  }, []);

  return <Component {...pageProps} />;
};

export default _app;
