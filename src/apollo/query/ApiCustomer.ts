import {gql} from '@apollo/client';

export const GET_LIST_CUSTOMER = gql`
  query getUserCustomers($filters: InputPagingRequest) {
    getUserCustomers(filters: $filters) {
      success
      message
      result {
        docs {
          ...UserCustomerInfo
          __typename
        }
        page
        totalPages
        prevPage
        nextPage
        totalDocs
        limit
        __typename
      }
      __typename
    }
  }

  fragment UserCustomerInfo on UserCustomer {
    id
    name
    phone
    email
    address {
      ...AddressFull
      __typename
    }
    __typename
  }

  fragment AddressFull on Address {
    ...AddressInfo
    cityId
    districtId
    wardId
    __typename
  }

  fragment AddressInfo on Address {
    isDefault
    cityName
    districtName
    wardName
    street
    __typename
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($customer: InputUserCustomerCreate!) {
    createCustomer(customer: $customer) {
      success
      message
      result {
        ...UserCustomerInfo
        __typename
      }
      __typename
    }
  }

  fragment UserCustomerInfo on UserCustomer {
    id
    name
    phone
    email
    address {
      ...AddressFull
      __typename
    }
    __typename
  }

  fragment AddressFull on Address {
    ...AddressInfo
    cityId
    districtId
    wardId
    __typename
  }

  fragment AddressInfo on Address {
    isDefault
    cityName
    districtName
    wardName
    street
    __typename
  }
`;
export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($customer: InputUserCustomerUpdate!) {
    updateCustomer(customer: $customer) {
      success
      result {
        ...UserCustomerInfo
        __typename
      }
      __typename
    }
  }

  fragment UserCustomerInfo on UserCustomer {
    id
    name
    phone
    email
    address {
      ...AddressFull
      __typename
    }
    __typename
  }

  fragment AddressFull on Address {
    ...AddressInfo
    cityId
    districtId
    wardId
    __typename
  }

  fragment AddressInfo on Address {
    isDefault
    cityName
    districtName
    wardName
    street
    __typename
  }
`;
export const DELETE_CUSTOMER = gql`
  mutation deleteMyCustomer($ids: InputUserCustomerDelete!) {
    deleteCustomer(customer: $ids) {
      success
      result {
        id
        __typename
      }
      __typename
    }
  }
`;
export const ADD_ORDER_CUSTOMER = gql`
  mutation adOrderCustomer($order: InputAdOrderUpdate!) {
    response: updateAdOrder(order: $order) {
      success
      message
      result {
        id
        userCustomerId
        __typename
      }
      __typename
    }
  }
`;
