import React from 'react';
import { Redirect } from 'react-router-dom';

import { graphql } from 'react-apollo';

import { getRepo } from './queries';

import './RepoPage.css';

const RepoPage = ({ match, getRepo }) =>  {
	const { params: { repo } } = match;
	const { error, loading, repository: data } = getRepo;

	const RepoData = () => {
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
			const { description, object } = data;

			if(object) {
				const html = `${object.text.replace(/\n/g, '<br>')}`

				return(
					<div className='git-info' dangerouslySetInnerHTML={{ __html: html }}></div>
				);
			}

			return(
				<div className='git-info'>{ description }</div>
			);
		}

		return (
			<Redirect to='/'/>
		);
	}

  return(
    <section className='repo-page'>
    <h1 className='repo-name-header'>{ repo }</h1>
    <RepoData/>
    </section>
  );
};

export default graphql(
	getRepo, { 
		name: 'getRepo', 
		options: ({ match }) => {
			const { params: { login: owner, repo } } = match;

			return {
				variables: {
					owner, 
					repo,
				},
			};
		},
	},
)(RepoPage);
