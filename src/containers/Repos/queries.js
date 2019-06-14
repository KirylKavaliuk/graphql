import gql from 'graphql-tag';


export const getRepos = gql`
query($login: String!, $cursor:String) {
  repositoryOwner(login: $login) {
    id
    login
    repositories(affiliations:OWNER, first: 5, after: $cursor) {
      edges {
        node {
          ...on Repository {
            id
            name
            viewerHasStarred
            stargazers(first:1) {
              totalCount
            }
            primaryLanguage {
              id
              name
  						color
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;