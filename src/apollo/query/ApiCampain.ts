import { gql } from '@apollo/client';

export const GET_MISSIONS = gql`
query getMissions($filters: InputPagingRequest) {
  missions: getMissions(filters: $filters) {
    result {
      docs {
        ...CTVMissionBasicFields
        __typename
      }
      page
      totalPages
      __typename
    }
    __typename
  }
}

fragment CTVMissionBasicFields on Mission {
  id
  name
  missionType
  bonus
  startDate
  endDate
  __typename
}
`;
export const GET_CONTENT_MISSIONS = gql`
query getAdditionalMissionFields($mission: InputMissionGet!) {
  getMission(mission: $mission) {
    result {
      id
      description
      __typename
    }
    __typename
  }
}
`;
export const GET_STATUS_MISSIONS = gql`
query getMissionClaim($filters: InputPagingRequest) {
  getMissionClaims(filters: $filters) {
    success
    result {
      docs {
        ...CTVMissionClaimBasicFields
        __typename
      }
      page
      nextPage
      __typename
    }
    __typename
  }
}

fragment CTVMissionClaimBasicFields on MissionClaim {
  id
  missionId
  status
  link
  content
  reason
  images
  bonus
  __typename
}
`;
export const GET_DETAIL_MISSIONS = gql`
query getAdditionalMissionClaimFields($missionClaim: InputMissionClaimGet!) {
  getMissionClaim(missionClaim: $missionClaim) {
    result {
      id
      link
      content
      reason
      images
      bonus
      __typename
    }
    __typename
  }
}
`;
export const UPDATE_CAMPAIN = gql`
mutation updateMissionClaim($missionClaim: InputMissionClaimUpdate!) {
  updateMissionClaim(missionClaim: $missionClaim) {
    success
    result {
      id
      ...CTVMissionClaimDataFields
      __typename
    }
    __typename
  }
}

fragment CTVMissionClaimDataFields on MissionClaim {
  id
  status
  link
  reason
  content
  images
  bonus
  __typename
}
`;
export const CREATE_CAMPAIN = gql`
mutation createMissionClaim($missionClaim: InputMissionClaimCreate!) {
  createMissionClaim(missionClaim: $missionClaim) {
    success
    result {
      ...CTVMissionClaimBasicFields
      __typename
    }
    __typename
  }
}

fragment CTVMissionClaimBasicFields on MissionClaim {
  id
  missionId
  status
  __typename
}
`;

