import {gql} from '@apollo/client';

export const GET_LIST_NOTIFICATION = gql`
  query getNotifications($filters: InputPagingRequest!) {
    getNotifications(filters: $filters) {
      success
      result {
        docs {
          ...CTVNotificationFields
        }
        page
        hasNextPage
        totalDocs
        totalPages
        __typename
        __typename
      }
      __typename
    }
  }

  fragment CTVNotificationFields on Notification {
    id
    target
    userId
    topic
    payload
    read
    createdAt
    updatedAt
    __typename
  }
`;
