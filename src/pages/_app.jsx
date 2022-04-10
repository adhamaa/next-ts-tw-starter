import { Router } from 'next/router';
import nProgress from 'nprogress';
import { SWRConfig } from 'swr';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import axiosClient from '@/lib/axios';

import DismissableToast from '@/components/DismissableToast';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

// EXPANSION CHANGES: 3 lines below
Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DismissableToast />

      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
