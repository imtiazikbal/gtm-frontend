// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 1. Global Head settings */}
      <Head>
        <title>GTM Automation Tester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Tag Manager - Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5M5VQSGZ');
            `,
          }}
        />
        {/* End Google Tag Manager - Script */}
      </Head>

      {/* Google Tag Manager - Noscript Fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5M5VQSGZ"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* End Google Tag Manager - Noscript Fallback */}

      {/* 2. The Main Page Content */}
      <Component {...pageProps} />
    </>
  );
}