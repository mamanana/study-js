import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import Toast from "@/components/Toast";
import UserContextProvider from "../context/user";
import "@/styles/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
      <Toast />
    </ApolloProvider>
  );
}
