import {ApolloClient, ApolloProvider, getApolloContext} from '@apollo/client';
import React from 'react';
import {cache} from './cache';
interface NetworkProviderProps {
  children: React.ReactNode;
}
export const useNetwork = () => {
  return getApolloContext();
};
export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  uri: 'https://apistaging.orderhanquoc.com/graphql',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
const NetworkProvider = ({children}: NetworkProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default NetworkProvider;
