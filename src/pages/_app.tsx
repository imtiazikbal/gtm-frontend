// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 1. Global Head settings */}
      <Head>
        <title>GTM Automation Tester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Google Tag Manager - Noscript Fallback */}
<Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5M5VQSGZ');
          `,
            }}
          />
      {/* End Google Tag Manager - Noscript Fallback */}

      {/* 2. The Main Page Content */}
      <Component {...pageProps} />
    </>
  );
}