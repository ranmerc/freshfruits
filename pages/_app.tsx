// https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-pages-router-ts/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <CartProvider>
                <Header />
                <Component {...pageProps} />
              </CartProvider>
            </UserProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
