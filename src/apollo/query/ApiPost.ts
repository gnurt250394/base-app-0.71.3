import {gql} from '@apollo/client';
export const GET_LIST_POST_QUERY = gql`
  query getBlogs($filters: InputPagingRequest) {
    getBlogs(filters: $filters) {
      success
      message
      result {
        docs {
          id
          name
          type
          image
          slug
          content
          shortDescription
          updatedAt
          isDel
          __typename
        }
        hasNextPage
        page
        totalDocs
        limit
        nextPage
        totalPages
        __typename
      }
      __typename
    }
  }
`;
export const GET_DETAIL_POST_QUERY = gql`
  query getBlog($blog: InputBlogGet!) {
    getBlog(blog: $blog) {
      success
      message
      result {
        id
        name
        type
        image
        slug
        content
        shortDescription
        updatedAt
        isDel
        __typename
        __typename
      }
      __typename
    }
  }
`;
