import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, Suspense } from "react";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import SearchWordProvider from "../contexts/searchwordContext";
import NotificationProvider from "../contexts/notificationContext";
import LanguageContextProvider from "../contexts/languageContext";
import { ThemeProvider } from "@material-tailwind/react";

const queryClient = new QueryClient();
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function MyApp(
  { Component, pageProps }: AppPropsWithLayout,
  session: any
) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <NotificationProvider>
            <LanguageContextProvider>
              <SearchWordProvider>
                <main className="min-h-screen">
                  {getLayout(<Component {...pageProps} />)}
                </main>
              </SearchWordProvider>
            </LanguageContextProvider>
          </NotificationProvider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
