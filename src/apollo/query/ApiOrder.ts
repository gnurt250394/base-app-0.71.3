import {gql} from '@apollo/client';

export const GETT_ALL_ORDER = gql`
  query getAllOrders($filters: InputPagingRequest) {
    getAllOrders(filters: $filters) {
      success
      message
      result {
        docs {
          ... on Order {
            Kind
            id
            orderDetails {
              product {
                weight
                __typename
              }
              __typename
            }
            complains {
              id
              complainNote
              resolveNote
              isResolved
              __typename
            }
            fee {
              paid
              total
              subTotal
              purchaseFee
              shippingFeeToReceivePlace
              shippingFeeAtPurchasePlace
              __typename
            }
            exchangeRate {
              from
              to
              rate
              isWholeSale
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
            deliveryLocation {
              ...AddressFull
              __typename
            }
            orderStatus: status
            createdAt
            updatedAt
            isDel
            isWholeSale
            user {
              ...OrderUserInfo
              __typename
            }
            paymentId
            payment {
              ...PaymentInfo
              __typename
            }
            __typename
          }
          ... on AdOrder {
            Kind
            id
            isWholeSale
            isCustomerBearShippingFee
            isCustomerPaid
            userCustomer {
              name
              address {
                ...AddressFull
                __typename
              }
              phone
              __typename
            }
            complains {
              id
              complainNote
              resolveNote
              isResolved
              __typename
            }
            fee {
              paid
              total
              subTotal
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
            deliveryLocation {
              ...AddressFull
              __typename
            }
            adOrderStatus: status
            createdAt
            updatedAt
            isDel
            user {
              ...AdOrderUserInfo
              __typename
            }
            productRatings {
              id
              rating
              message
              images
              __typename
            }
            paymentId
            payment {
              ...PaymentInfo
              __typename
            }
            __typename
          }
          __typename
        }
        totalDocs
        totalPages
        limit
        hasPrevPage
        hasNextPage
        page
        prevPage
        nextPage
        pagingCounter
        meta
        __typename
      }
      __typename
    }
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

  fragment PaymentInfo on Payment {
    id
    orderIds
    method
    status
    detail
    makePaymentAt
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

export const GET_DETAIL_ORDER = gql`
  query getAdOrderDetails($filters: InputPagingRequest) {
    getAdOrderDetails(filters: $filters) {
      success
      result {
        docs {
          id
          orderId
          feeResale
          product {
            id
            slug
            priceWholeSale
            price
            name
            categoryIds
            images
            type
            price
            availableForShopping
            estimateShippingTimeFrom
            estimateShippingTimeTo
            isSpecialOffer
            partnerId
            partner {
              id
              name
              address {
                ...AddressInfo
                __typename
              }
              phone
              email
              createdAt
              updatedAt
              isDel
              __typename
            }
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
          status
          customerNote
          staffNote
          createdAt
          updatedAt
          isDel
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment AddressInfo on Address {
    isDefault
    cityName
    districtName
    wardName
    street
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
`;

export const CANCEL_ORDER = gql`
  mutation cancelAdOrder($order: InputAdOrderCancel!) {
    cancelAdOrder(order: $order) {
      success
      message
      result {
        id
        status
        isDel
        __typename
      }
      __typename
    }
  }
`;
export const CREATE_COMPLAIN = gql`
  fragment AdOrderStaff on AdOrderStaff {
    customerCareStaff
    warehouseStaff
    __typename
  }

  mutation ($order: InputUserAdOrderComplain!) {
    createUserAdOrderComplain(order: $order) {
      success
      message
      result {
        id
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
          ...AdOrderStaff
          __typename
        }
        status
        createdAt
        updatedAt
        isDel
        __typename
      }
      __typename
    }
  }
`;

export const GET_AD_ORDER = gql`
  query ($order: InputAdOrderGet!) {
    getAdOrder(order: $order) {
      success
      message
      result {
        id
        status
        isCustomerBearShippingFee
        isCustomerPaid
        isWholeSale
        paymentId
        payment {
          id
          orderIds
          method
          status
          detail
          makePaymentAt
          isDel
        }
        deliveryLocation {
          isDefault
          cityName
          districtName
          wardName
          street
          cityId
          districtId
          wardId
          __typename
        }
        userCustomer {
          id
          name
          phone
          email
          address {
            isDefault
            cityId
            cityName
            districtId
            districtName
            wardId
            wardName
            street
            __typename
          }
        }
        fee {
          subTotal
          total
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
            id
            username
            fullName
            avatar
            email
            phone
            isWholeSale
            createdAt
            updatedAt
            isDel
            __typename
          }
          warehouse {
            id
            username
            fullName
            avatar
            email
            phone
            isWholeSale
            createdAt
            updatedAt
            isDel
            __typename
          }
          __typename
        }
        status
        complainIds
        complains {
          id
          complainNote
          resolveNote
          isResolved
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        isDel
        user {
          id
          username
          fullName
          avatar
          email
          phone
          isWholeSale
          createdAt
          updatedAt
          isDel
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
