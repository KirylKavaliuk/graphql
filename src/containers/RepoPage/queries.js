import gql from 'graphql-tag';

export const getRepo = gql`
  fragment File on Blob {
    text
  }

  query ($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo){
      description
      object(expression: "master:README.md") {
        ...File
      }
    }
  }
`; 
