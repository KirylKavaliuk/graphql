import gql from 'graphql-tag';

export const getRepo = gql`
  query ($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo){
      description
      object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`; 
