import {gql, useMutation, useQuery} from '@apollo/client';
import snackbarUtils from 'utils/snackbar-utils';
export const LOGIN_QUERY = gql`
  mutation login($user: InputAuthLogin!) {
    login(user: $user) {
      ...AuthResponse
      __typename
    }
  }

  fragment AuthResponse on authResponse {
    success
    token
    role {
      name
      __typename
    }
    user {
      ...UserCollab
      deliveryLocation
      __typename
    }
    __typename
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
export const REGISTER_QUERY = gql`
  mutation register($user: InputAuthRegister!) {
    register(user: $user) {
      ...AuthResponse
      __typename
    }
  }

  fragment AuthResponse on authResponse {
    success
    token
    role {
      name
      __typename
    }
    user {
      ...UserCollab
      deliveryLocation
      __typename
    }
    __typename
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

export const CHECK_AUTH_QUERY = gql`
  query checkAuth($input: InputAuthToken) {
    checkAuth(token: $input) {
      ...AuthResponse
      __typename
    }
  }

  fragment AuthResponse on authResponse {
    success
    token
    role {
      name
      __typename
    }
    user {
      ...UserCollab
      deliveryLocation
      __typename
    }
    __typename
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
export const LOGOUT_QUERY = gql`
  mutation logout {
    logout {
      success
      __typename
    }
  }
`;

export const VERIFY_CODE_QUERY = gql`
  mutation ($user: InputUserVerifyResetPassToken!) {
    verifyResetPassToken(user: $user) {
      success
      result {
        username
        __typename
      }
      __typename
    }
  }
`;
export const FORGOT_PASSWORD_QUERY = gql`
  mutation ($user: InputUserForgotPass!) {
    forgotPass(user: $user) {
      success
      message
      __typename
    }
  }
`;

export const CHANGE_PASS_QUERY = gql`
  mutation updatePassViaMail($user: InputUserUpdatePassViaMail!) {
    updatePassViaMail(user: $user) {
      success
      message
      result {
        id
        username
        avatar
        fullName
        email
        phone
        isWholeSale
        roleId
        permissionId
        address {
          ...AddressFull
          __typename
        }
        isDel
        __typename
      }
      __typename
    }
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
export const CHANGE_PASSWORD_OLD = gql`
  mutation changePass($user: InputUserChangePass!) {
    changePass(user: $user) {
      success
      message
      result {
        id
        username
        avatar
        fullName
        email
        phone
        address {
          ...AddressFull
          __typename
        }
        isWholeSale
        roleId
        permissionId
        isDel
        __typename
      }
      __typename
    }
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
// export const useLogin = (
//   username: string,
//   password: string,
//   isSave: boolean,
// ) => {
//   let params = {user: {identify: username, password, remember_me: isSave}};
//   const [onLogin, {data, loading, error}] = useMutation(LOGIN_QUERY, {
//     variables: params,
//   });
//   if (error?.message) {
//     snackbarUtils.show(error?.message, 'danger');
//   }
//   return [onLogin, {data, loading, error}];
// };
// export const useRegister = () => {
//   const [onPress, {data, loading, error}] = useMutation(REGISTER_QUERY);
//   if (error?.message) {
//     snackbarUtils.show(error?.message, 'danger');
//   }
//   return [onPress, {data, loading, error}];
// };
export const useCheckAuth = (token: string) => {
  const {data, error} = useQuery(CHECK_AUTH_QUERY, {
    variables: {
      input: {
        token,
      },
    },
  });
  if (error?.message) {
    return false;
  }

  return data;
};
