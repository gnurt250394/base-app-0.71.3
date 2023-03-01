import {gql} from '@apollo/client';

export const GET_WALLET = gql`
  query getWallet($wallet: InputWalletGet!) {
    getWallet(wallet: $wallet) {
      success
      result {
        ...WalletInfo
        __typename
      }
      __typename
    }
  }

  fragment WalletInfo on Wallet {
    id
    capital
    saleProfit
    referralCommision
    missionBonus
    affiliateBonus
    totalBalance
    withdrew
    __typename
  }
`;

export const CREATE_WALLET = gql`
  mutation createWithdrawalRequest(
    $withdrawalRequest: InputWithdrawalRequestCreate!
  ) {
    createWithdrawalRequest(withdrawalRequest: $withdrawalRequest) {
      success
      result {
        id
        code
        wallet {
          id
          capital
          saleProfit
          referralCommision
          totalBalance
          withdrew
          __typename
        }
        balanceBefore
        amount
        status
        reason
        __typename
      }
      __typename
    }
  }
`;

export const GET_REQUEST_WALLET = gql`
  query getWithdrawalRequests($filters: InputPagingRequest) {
    getWithdrawalRequests(filters: $filters) {
      success
      result {
        docs {
          id
          code
          amount
          status
          balanceBefore
          bankAccountId
          bankAccountName
          bankName
          reason
          createdAt
          __typename
        }
        page
        totalPages
        totalDocs
        limit
        prevPage
        nextPage
        __typename
      }
      __typename
    }
  }
`;
