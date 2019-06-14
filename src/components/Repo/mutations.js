import gql from 'graphql-tag';

export const removeStar = gql`
mutation ($starrableId: ID!) {
  removeStar(input: { starrableId: $starrableId }) {
    starrable {
      id
      stargazers(first:1){
        totalCount
      }
      viewerHasStarred
    }
  }
}
`;

export const addStar = gql`
mutation ($starrableId: ID!) {
  addStar(input: { starrableId: $starrableId }) {
    starrable {
      id
      stargazers(first:1){
        totalCount
      }
      viewerHasStarred
    }
  }
}
`;