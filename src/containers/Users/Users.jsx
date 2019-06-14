import React, { useState } from 'react';

import { Query } from 'react-apollo';

import Button from '../../components/Button';
import Input from '../../components/Input';
import User from '../../components/User';

import { searchUsers } from './queries';

import './Users.css';

const Users = () => {
  const [search, setSearch] = useState('');

  const onChangeSearchHadler = (event) => {
    const { target: { value } } = event;

    setSearch(value);
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
        
                return Object.assign({}, previousResult, {
                  search: {
                    edges: [...previousResult.search.edges, ...newEdges],
                    pageInfo,
                    __typename: fetchMoreResult.search.__typename,
                  }
                });
              }
            })
          }

          if(data.search) {
            const { search: { edges: users, pageInfo: { hasNextPage, endCursor } } } = data;

            return (
              <>
                <ul className='users-list'>
                  { users.map(user => {
                    const { node } = user;
                    const { id: key } = node;
                    const { login, repositories: repos } = node; 

                    return (
                      <User 
                        key={ `${key}${login}` }
                        login={ login }
                        repos={ repos }
                      />  
                    );
                  }) }
                </ul>
                { hasNextPage && <Button onClick={ () => loadMoreHandler(fetchMore, endCursor) } label='load more'/> }
              </>
            );
          } 

          return <p className='message'>users are not found</p>;
        } }
      </Query>
    </section>
  );
}

export default Users;
