import React from 'react';
import Head from 'next/head';
import { InstUISettingsProvider} from '@instructure/emotion';
import {canvas} from '@instructure/ui-themes'


export default function MyApp(props) {
  const defaultContextVal = new Map()
  const { Component, pageProps } = props;
  console.log('page render')
  
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <InstUISettingsProvider theme={canvas}>
        <Component {...pageProps} />
      </InstUISettingsProvider>
    </>
  );
}