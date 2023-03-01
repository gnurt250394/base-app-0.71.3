import {gql} from '@apollo/client';

export const PRODUCT_CATTEGORIES_QUERY = gql`
  fragment ProductCategoryInfo on ProductCategory {
    id
    name
    slug
    image
    isDel
    parentId
    order
  }

  query ($filters: InputPagingRequest) {
    getProductCategories(filters: $filters) {
      success
      message
      result {
        docs {
          ...ProductCategoryInfo
          children {
            ...ProductCategoryInfo
          }
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

export const ADD_INFO_CUSTOMER_CATEGORY = gql`
  mutation SubmitCustomerContactForProduct(
    $advertisementProductCustomerContact: InputAdvertisementProductCustomerContactCreate!
  ) {
    createAdvertisementProductCustomerContact(
      advertisementProductCustomerContact: $advertisementProductCustomerContact
    ) {
      success
      message
      result {
        id
        productId
        name
        note
        phone
        email
        isDel
        __typename
      }
      __typename
    }
  }
`;
