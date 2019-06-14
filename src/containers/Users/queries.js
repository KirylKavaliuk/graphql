import gql from 'graphql-tag';

export const searchUsers = gql`
fragment UserData on User {
  id
  login
  repositories(first: 1) {
    totalCount
  }
}

query($searchValue: String!, $cursor: String) {
  search(query: $searchValue, first: 20, type: USER, after: $cursor) {
    edges {
      node {
        ...UserData
      } 
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`
