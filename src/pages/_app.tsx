import '@/styles/globals.css';
import { trpc } from '@/utils/trpc';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(appWithTranslation(App));
