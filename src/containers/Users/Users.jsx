import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import User from '../../components/User';

import { graphql, compose } from 'react-apollo';
import { searchUsers } from './queries';

import './Users.css';

const getSearchParam = (history) => {
	const { location: { search: query } } = history;
	const params = query.slice(query.indexOf('?')).split('&');
	const searchParam = params.find(param => param.includes('query'));

	return searchParam ? searchParam.slice(7) : '';
}

const Users = ({ history, searchUsers }) => {
  const [search, setSearch] = useState('');
	const { error, loading, search: data, fetchMore } = searchUsers;

	useEffect(() => {
		setSearch(getSearchParam(history));
	}, [history]);

	const loadMoreHandler = () => {
		const endCursor = data ? data.pageInfo.endCursor : undefined;

		fetchMore({
			variables: {
				cursor: endCursor
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				const { search: { edges: newEdges, pageInfo } } = fetchMoreResult;

				if(!fetchMoreResult) {
					return previousResult;
				}

				return Object.assign({}, previousResult, {
					search: {
						...fetchMoreResult.search,
						edges: [...previousResult.search.edges, ...newEdges],
						pageInfo,
					}
				});
			}
		})
	}

  const onChangeSearchHadler = (event) => {
    const { target: { value } } = event;

		const { location: { pathname } } = history;

    history.replace({
      pathname,
      search: `query=${value}`
    });

    setSearch(value);
	}

	const UsersList = () => {
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
			const  { edges: users, pageInfo: { hasNextPage, endCursor } } = data;

			return (
				<>
					<ul className='users-list'>
						{ users.map(user => {
							const { node: { id, login, repositories } } = user;

							return (
								<User 
									key={ `${id}${login}` }
									login={ login }
									repos={ repositories }
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
		return <>
			<p className='message'>users are not found</p>
			<Button label='clear search field' onClick={ () => setSearch('') }/>
		</>
	}

  return (
    <section className='users'>
      <div className='search-wrapper'>
        <Input
          type='search'
          hint='search'
          value={ search }
          onChange={ onChangeSearchHadler }
        />
      </div>
			<UsersList/>
    </section>
  );
}

export default compose(
	withRouter,
	graphql(
		searchUsers, { 
			name: 'searchUsers', 
			options: ({ history }) => ({
				variables: {
					searchValue: getSearchParam(history),
				},
			}),
		},
	),
)(Users);
