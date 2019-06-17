import gql from 'graphql-tag';

export const getRepos = gql`
  fragment ReposData on Repository {
    id
    name
    viewerHasStarred
    stargazers(first: 1) {
      totalCount
    }
    primaryLanguage {
      id
      name
      color
    }
  }

  query ($login: String!, $cursor: String) {
    repositoryOwner(login: $login) {
      id
      login
      repositories(affiliations: OWNER, first: 20, after: $cursor) {
        edges {
          node {
            ...ReposData
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
