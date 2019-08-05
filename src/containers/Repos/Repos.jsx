import React from 'react';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import { getRepos } from './queries';

import Button from '../../components/Button';
import Repo from '../../components/Repo';

import './Repos.css';

const Repos = ({ match, getRepos }) => {
	const { params: { login } } = match;
	const { error, loading, repositoryOwner: data, fetchMore } = getRepos;

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
	
	const ReposList = () => {
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

		if(data) {
			const { repositories } = data;
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
					{ hasNextPage && <Button 
						className='button-load-more'
						onClick={ () => loadMoreHandler(fetchMore, endCursor) } 
						label='load more'
					/> }
				</>
			);
		}

		return (
			<>
				<p className='message'>repositories are not found</p>
				<Link to='/'><Button label='back to main'/></Link>
			</>
		);
	}

  return (
    <section className='repos'>
      <h1 className='owner-login'>{ login }</h1>
      <ReposList/>
    </section>
  );
}

export default graphql(
	getRepos, { 
		name: 'getRepos', 
		options: ({ match }) => {
			const { params: { login } } = match;

			return {
				variables: { login },
			};
		},
	},
)(Repos);