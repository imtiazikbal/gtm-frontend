// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 1. Standard Google Analytics tracking */}
      <GoogleAnalytics trackPageViews gaMeasurementId="GTM-5M5VQSGZ" />

      {/* 2. Global Head settings */}
      <Head>
        <title>GTM Automation Tester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 3. The Main Page Content */}
      <Component {...pageProps} />
      
     
    </>
  );
}