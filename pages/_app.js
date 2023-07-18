import "../index.css";
import Head from "next/head";
import { Layout } from "@/layout/Layout";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/lib/createEmotionCache";
import { useMuiTheme } from "@/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef, useEffect } from "react";

// client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const theme = useMuiTheme();
  const queryClient = useRef(new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {console.log(pageProps.revalidateDate)}
        <QueryClientProvider client={queryClient.current}>
          <CssBaseline />
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
