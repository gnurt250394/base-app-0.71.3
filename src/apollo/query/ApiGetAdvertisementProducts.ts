import {gql, useQuery} from '@apollo/client';
export const GETPRODUCTRATING = gql`
  query getProductRatings($filters: InputPagingRequest) {
    productRatings: getProductRatings(filters: $filters) {
      message
      result {
        docs {
          id
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
export const SECTIONS_QUERY = gql`
  query getProducts($filters: InputPagingRequest) {
    getProducts(filters: $filters) {
      success
      message
      result {
        docs {
          ...ProductUIFields
          ...WholesaleProductBasicFields
          __typename
        }
        page
        hasNextPage
        __typename
      }
      __typename
    }
  }

  fragment ProductUIFields on Product {
    id
    slug
    name
    images
    type
    price
    estimateShippingTimeFrom
    estimateShippingTimeTo
    link
    schedulers {
      ...ProductSchedulerFields
      __typename
    }
    __typename
  }

  fragment ProductSchedulerFields on ProductScheduler {
    name
    productType
    discountType
    discountValue
    startTime
    endTime
    startDate
    endDate
    selectedDay
    __typename
  }

  fragment WholesaleProductBasicFields on Product {
    forWholeSale
    priceWholeSale
    __typename
  }
`;

export const GET_DETAIL_PRODUCT_QUERY = gql`
  query getProduct($product: InputProductGet!) {
    getProduct(product: $product) {
      success
      message
      result {
        facebookTemplates {
          name
          content
        }
        ...ProductUIFields
        ...WholesaleProductBasicFields
        __typename
      }
    }
    __typename
  }

  fragment PartnerFeild on Partner {
    id
    name
    address {
      isDefault
      cityId
      cityName
      districtId
      districtName
      wardId
      wardName
      street
    }
    phone
    email
  }
  fragment ProductUIFields on Product {
    id
    slug
    name
    images
    reviewImages
    description
    categoryIds
    shortDescription
    forSale
    forWholeSale
    moreInformation
    discountWholeSaleLevel1
    weight
    deliveryType
    partner {
      ...PartnerFeild
    }
    availableForShopping
    type
    price
    estimateShippingTimeFrom
    estimateShippingTimeTo
    link
    schedulers {
      ...ProductSchedulerFields
      __typename
    }
    attributes {
      name
      type
      value
      __typename
    }
    __typename
  }

  fragment ProductSchedulerFields on ProductScheduler {
    name
    productType
    discountType
    discountValue
    startTime
    endTime
    startDate
    endDate
    selectedDay
    __typename
  }

  fragment WholesaleProductBasicFields on Product {
    forWholeSale
    priceWholeSale
    __typename
  }
`;
export const useAdvertisementProducts = (
  forWholeSale: boolean,
  page: number,
  size: number,
) => {
  let query: any = {
    availableForShopping: true,
    isDel: false,
  };

  if (forWholeSale) {
    query.forWholeSale = forWholeSale;
  } else {
    query.forSale = !forWholeSale;
  }
  let params = {
    filters: {
      page: page,
      query: query,
      limit: size,
      sort: {
        createdAt: 'desc',
      },
      populate: ['schedulers'],
    },
  };
  const data = useQuery(SECTIONS_QUERY, {
    variables: params,
  });
  return data;
};
