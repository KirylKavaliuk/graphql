import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import User from '../../components/User';

import { Query } from 'react-apollo';
import { searchUsers } from './queries';

import './Users.css';

const Users = ({ history }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const { location: { search: query } } = history;
    const params = query.slice(search.indexOf('?') + 1).split('&');
    const searchParam = params.find(param => param.includes('query'));

    setSearch(searchParam ? searchParam.slice(7) : '');
  }, [])

  const replaceHistory = () => {
    const { location: { pathname } } = history;

    history.replace({
      pathname,
      search: `query=${search}`
    });
  };

  const onChangeSearchHadler = (event) => {
    const { target: { value } } = event;

    setSearch(value);
  }

  const loadMoreHandler = (fetchMore, endCursor) => {
    fetchMore({
      variables: {
        cursor: endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { search: { edges: newEdges, pageInfo } } = fetchMoreResult;

        if(!fetchMoreResult) {
          return previousResult;
        }

        return Object.assign(previousResult, {
          search: {
            ...fetchMoreResult.search,
            edges: [...previousResult.search.edges, ...newEdges],
            pageInfo,
          }
        });
      }
    })
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

      <Query
        query={ searchUsers }
        variables={{ searchValue: search }}
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

          if(data.search) {
            const { search: { edges: users, pageInfo: { hasNextPage, endCursor } } } = data;

            return (
              <>
                <ul className='users-list'>
                  { users.map(user => {
                    const { node } = user;
                    const { id: key } = node;
                    const { login, repositories } = node; 

                    return (
                      <User 
                        onClick={ () => replaceHistory() }
                        key={ `${key}${login}` }
                        login={ login }
                        repos={ repositories }
                      />  
                    );
                  }) }
                </ul>
                { hasNextPage && <Button onClick={ () => loadMoreHandler(fetchMore, endCursor) } label='load more'/> }
              </>
            );
          } 

          return <>
            <p className='message'>users are not found</p>
            <Button label='clear search field' onClick={ () => setSearch('') }/>
          </>
        } }
      </Query>
    </section>
  );
}

export default withRouter(Users);
