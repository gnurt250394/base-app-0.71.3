import {gql} from '@apollo/client';

export const GET_RATING = gql`
  query getProductRatings($filters: InputPagingRequest) {
    productRatings: getProductRatings(filters: $filters) {
      message
      result {
        docs {
          id
          productId
          orderId
          rating
          displayName
          images
          message
          __typename
        }
        nextPage
        __typename
      }
      __typename
    }
  }
`;
export const createProductRating = gql`
  mutation createProductRating($productRating: InputProductRatingCreate!) {
    createProductRating(productRating: $productRating) {
      success
      message
      result {
        id
        productId
        orderId
        rating
        message
        images
        __typename
      }
      __typename
    }
  }
`;
