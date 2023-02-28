import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dark" className="bg-brand">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
