import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import { trpc } from '@/utils/trpc';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default trpc.withTRPC(appWithTranslation(App));
