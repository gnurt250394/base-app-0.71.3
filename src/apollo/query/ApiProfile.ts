import {gql} from '@apollo/client';

export const UPDATE_USER_QUERY = gql`
  mutation updateUser($user: InputUserUpdate!) {
    updateUser(user: $user) {
      success
      message
      result {
        ...UserBasic
        address {
          ...AddressInfo
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment UserBasic on User {
    id
    username
    fullName
    avatar
    email
    phone
    isWholeSale
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

export const REQUEST_WHOLE_SALE = gql`
  mutation requestWholeSale($user: InputUserRequestWholeSale!) {
    requestWholeSale(user: $user) {
      success
      message
      result {
        ...UserCollab
        __typename
      }
      __typename
    }
  }

  fragment UserCollab on User {
    ...UserBasic
    address {
      ...AddressFull
      __typename
    }
    isRequestingWholeSale
    bank {
      ...BankInfo
      __typename
    }
    referrerPhone
    referrer {
      ...UserBasic
      address {
        ...AddressFull
        __typename
      }
      __typename
    }
    __typename
  }

  fragment UserBasic on User {
    id
    username
    fullName
    avatar
    email
    phone
    isWholeSale
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

  fragment BankInfo on Bank {
    isDefault
    bankAccountId
    bankAccountName
    bankName
    __typename
  }
`;
export const REQUEST_UPDATE_USER = gql`
  mutation updateUser($user: InputUserUpdate!) {
    updateUser(user: $user) {
      success
      message
      result {
        ...UserBasic
        address {
          ...AddressFull
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment UserBasic on User {
    id
    username
    fullName
    avatar
    email
    phone
    isWholeSale
    extensionVersion
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
