import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import Toast from "@/components/Toast";
import UserContextProvider from "../context/user";
import "@/styles/tailwind.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ApolloProvider client={apolloClient}>
      <UserContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </UserContextProvider>
      <Toast />
    </ApolloProvider>
  );
}
