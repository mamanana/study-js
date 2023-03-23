import '@/styles/tailwind.css'
import type { AppProps } from 'next/app'
import apolloClient from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
