import {InMemoryCache} from '@apollo/client';
import {offsetLimitPagination} from '@apollo/client/utilities';
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getNotifications: {
          keyArgs: ['page'],
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing, incoming) {
            if (!existing) {
              return incoming;
            }
            return {
              ...incoming,
              result: {
                ...incoming.result,
                docs: [...incoming.result.docs, ...existing.result.docs],
              },
            };
          },
        },
      },
    },
  },
});
