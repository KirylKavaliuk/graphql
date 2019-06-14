import React from 'react';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { getRepos } from './queries';

import Button from '../../components/Button';
import Repo from '../../components/Repo';

import './Repos.css';

const Repos = ({ match }) => {
  const { params: { login } } = match;

  const loadMoreHandler = (fetchMore, endCursor) => {
    fetchMore({
      variables: {
        cursor: endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { repositoryOwner: { repositories: { edges: newEdges, pageInfo } } } = fetchMoreResult;   

        if(!fetchMoreResult) {
          return previousResult;
        }

        return Object.assign({}, previousResult, {
          repositoryOwner: {
            ...previousResult.repositoryOwner,
            repositories: {
              ...previousResult.repositoryOwner.repositories,
              edges: [...previousResult.repositoryOwner.repositories.edges, ...newEdges],
              pageInfo,
            },
          }
        });
      }
    })
  };

  return (
    <section className='repos'>
      <h1 className='owner-login'>{ login }</h1>
      <Query
        query={ getRepos }
        variables={{ login }}
      >
       { ({ error, loading, data, fetchMore }) => {
          if(loading) {
            return (
              <p className='message'>loading...</p>
            );
          }

          if(error) {
            return (
              <p className='message'>error!</p>
            );
          }

          if(data.repositoryOwner) {
            const { repositoryOwner: { repositories } } = data;
            const { edges: repos, pageInfo: { hasNextPage, endCursor } } = repositories;
            
            return(
              <>
                <ul className='repos-list'>
                  { repos.map(repo => {
                    const { node, node: { id } } = repo;
                    
                    return (
                      <Repo 
                        key={ id }
                        { ...node }
                        owner={ login }
                      />
                    );
                  }) }
                </ul>
                { hasNextPage && <Button onClick={ () => loadMoreHandler(fetchMore, endCursor) } label='load more'/> }
              </>
            );
          }
          
          return <>
            <p className='message'>repositories are not found</p>
            <Link to='/'><Button label='back to main'/></Link>
          </>
       } }
      </Query>
    </section>
  );
}

export default Repos;