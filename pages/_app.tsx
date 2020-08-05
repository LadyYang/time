import React from 'react';
import { AppProps } from 'next/app';

import '../styles/globals.css';

const _app: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return <Component {...pageProps} />;
};

export default _app;
