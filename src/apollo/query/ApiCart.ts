import {gql, useQuery} from '@apollo/client';

export const CART_COUNT_QUERY = gql`
  query getCartCount {
    getCartCount {
      success
      result {
        orderCount
        adOrderCount
        __typename
      }
      __typename
    }
  }
`;

export const GET_ALL_CART_QUERY = gql`
  query getAllCart($filters: InputPagingRequest) {
    getAllCart(filters: $filters) {
      success
      message
      result {
        docs {
          ... on OrderDetail {
            Kind
            id
            orderId
            feeResale
            product {
              productInfo
              productOption
              productLink
              image
              price
              amount
              currencyUnit
              __typename
            }
            fee {
              subTotal
              purchaseFee
              subTotalWeb
              shippingFeeToReceivePlace
              shippingFeeToReceivePlacePerWeb
              shippingFeeAtPurchasePlace
              __typename
            }
            status
            customerNote
            createdAt
            updatedAt
            isDel
            __typename
          }
          ... on AdOrderDetail {
            Kind
            id
            orderId
            feeResale
            product {
              weight
              ...ProductUIFields
              ...WholesaleProductBasicFields
              __typename
            }
            amount
            fee {
              subTotal
              discount
              resaleTotal
              __typename
            }
            attributes {
              name
              value
              __typename
            }
            customerNote
            __typename
          }
          __typename
        }
        order {
          id
          paymentId
          payment {
            ...PaymentInfo
            __typename
          }
          user {
            ...OrderUserInfo
            __typename
          }
          createdAt
          complains {
            id
            complainNote
            resolveNote
            isResolved
            __typename
          }
          fee {
            total
            subTotal
            shippingFeeAtPurchasePlace
            shippingFeeToReceivePlace
            purchaseFee
            paid
            __typename
          }
          staff {
            customerCareStaff
            warehouseStaff
            orderStaff
            customerCare {
              ...OrderUserInfo
              __typename
            }
            warehouse {
              ...OrderUserInfo
              __typename
            }
            order {
              ...OrderUserInfo
              __typename
            }
            __typename
          }
          orderStatus: status
          deliveryLocation {
            ...AddressFull
            __typename
          }
          __typename
        }
        adOrder {
          id
          userCustomer {
            id
            __typename
          }
          paymentId
          payment {
            ...PaymentInfo
            __typename
          }
          isCustomerBearShippingFee
          user {
            ...AdOrderUserInfo
            __typename
          }
          createdAt
          complains {
            id
            complainNote
            resolveNote
            isResolved
            __typename
          }
          fee {
            total
            subTotal
            paid
            shippingFee
            discount
            resaleTotal
            __typename
          }
          staff {
            customerCareStaff
            warehouseStaff
            customerCare {
              ...AdOrderUserInfo
              __typename
            }
            warehouse {
              ...AdOrderUserInfo
              __typename
            }
            __typename
          }
          adOrderStatus: status
          deliveryLocation {
            ...AddressFull
            __typename
          }
          __typename
        }
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

  fragment PaymentInfo on Payment {
    id
    orderIds
    method
    status
    detail
    makePaymentAt
    __typename
  }

  fragment OrderUserInfo on OrderUser {
    id
    username
    fullName
    avatar
    email
    phone
    deliveryLocation {
      ...AddressFull
      __typename
    }
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

  fragment AdOrderUserInfo on AdOrderUser {
    id
    username
    fullName
    avatar
    email
    phone
    deliveryLocation {
      ...AddressFull
      __typename
    }
    isWholeSale
    __typename
  }
`;
export const ADD_CART_QUERY = gql`
  mutation ($cart: [InputAdCartCreate]!) {
    addAdCart(cart: $cart) {
      success
      message
      result {
        id
        orderId
        product {
          id
          slug
          name
          categoryIds
          images
          type
          price
          availableForShopping
          partnerId
          partner {
            id
            name
            phone
            email
            createdAt
            updatedAt
            isDel
            __typename
          }
          schedulers {
            id
            name
            productType
            discountType
            discountValue
            startTime
            endTime
            selectedDay
            productIds
            createdAt
            updatedAt
            isDel
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
        amount
        fee {
          subTotal
          discount
          resaleTotal
          __typename
        }
        attributes {
          name
          value
          __typename
        }
        customerNote
        createdAt
        updatedAt
        isDel
        __typename
      }
      __typename
    }
  }
`;
export const UPDATE_CART_QUERY = gql`
  mutation updateAdCart($input: InputAdCartUpdate!) {
    updateAdCart(cart: $input) {
      result {
        id
        amount
        feeResale
        fee {
          subTotal
          discount
          resaleTotal
          __typename
        }
        order {
          id
          fee {
            subTotal
            discount
            total
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const GET_SHIPPING = gql`
  mutation cartResaleShippingFee($order: InputAdOrderUpdateShippingFee!) {
    response: updateAdOrderShippingFee(order: $order) {
      success
      message
      result {
        id
        fee {
          shippingFee
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const DELETE_CART_QUERY = gql`
  mutation deleteAdCart($cart: InputAdCartDelete!) {
    deleteAdCart(cart: $cart) {
      success
      message
      result {
        id
        order {
          id
          fee {
            subTotal
            total
            paid
            shippingFee
            discount
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const MAKE_PAYMENT = gql`
  mutation makePayment(
    $method: PaymentMethod!
    $order: InputPaymentOrder
    $payment: InputPayment
    $redirectUrl: String
  ) {
    makePayment(
      order: $order
      method: $method
      payment: $payment
      redirectUrl: $redirectUrl
    ) {
      success
      message
      result {
        ...PaymentInfo
        __typename
      }
      __typename
    }
  }

  fragment PaymentInfo on Payment {
    id
    orderIds
    method
    status
    detail
    makePaymentAt
    __typename
  }
`;
export const SEND_PAYMENT_QUERY = gql`
  mutation cartPaymentAllVA($order: InputCartPayment!, $infoVA: InputInfoVA!) {
    cartPaymentAllVA(order: $order, infoVA: $infoVA) {
      success
      message
      result {
        ...cartPaymentAllVAFields
        __typename
      }
      __typename
    }
  }

  fragment cartPaymentAllVAFields on InfoVA {
    account_no
    account_name
    bank_code
    bank_name
    amount
    transactionType
    __typename
  }
`;
export const REFRESS_INFO_PAYMENT = gql`
  mutation refreshVAInfo($order: InputRefreshVAInfo!) {
    refreshVAInfo(order: $order) {
      success
      message
      result {
        response_code
        message
        account_no
        account_name
        bank_code
        bank_name
        map_id
        request_id
        start_date
        end_date
        amount
        transactionType
        description
        __typename
      }
      __typename
    }
  }
`;
export const UPDATE_CART = gql`
  mutation updateAdCart($input: InputAdCartUpdate!) {
    updateAdCart(cart: $input) {
      success
      result {
        id
        amount
        feeResale
        fee {
          subTotal
          discount
          resaleTotal
          __typename
        }
        order {
          id
          fee {
            subTotal
            discount
            total
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const CheckPaymentQuery = gql`
  query checkPayment($payment: InputPayment!) {
    checkPayment(payment: $payment) {
      success
      result {
        ...PaymentInfo
        __typename
      }
      __typename
    }
  }

  fragment PaymentInfo on Payment {
    id
    orderIds
    method
    status
    detail
    makePaymentAt
    __typename
  }
`;
export const useGetAllCart = () => {
  const data = useQuery(GET_ALL_CART_QUERY, {
    variables: {
      filters: {
        pagination: false,
        sort: {
          createAt: '-1',
        },
      },
    },
  });
  console.log('data: ', data);
  return data;
};
