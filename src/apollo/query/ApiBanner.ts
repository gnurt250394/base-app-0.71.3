import {gql} from '@apollo/client';

export const GET_POPUP = gql`
  query getPopups($filters: InputPagingRequest) {
    getPopups(filters: $filters) {
      result {
        docs {
          id
          name
          url
          image
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

export const BANNERS_QUERY = gql`
  query ($filters: InputPagingRequest) {
    getBanners(filters: $filters) {
      success
      message
      result {
        docs {
          id
          name
          url
          image
          isDel
        }
        totalDocs
        limit
        hasPrevPage
        hasNextPage
        page
        totalPages
        offset
        prevPage
        nextPage
        pagingCounter
        meta
      }
    }
  }
`;
