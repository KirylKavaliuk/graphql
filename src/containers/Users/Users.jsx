import React, { useState } from 'react';

import { Query } from 'react-apollo';

import Button from '../../components/Button';
import Input from '../../components/Input';

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
                <p>loading...</p>
              );
            }

            if(error) {
              return (
                <p>error! </p>
              );
            }

            return (
              <>
                <ul>list</ul>
                <Button label='load more'/>
              </>
            )
          }
        }}
      </Query>

      <ul className='users-list'>

      </ul>
    </section>
  );
}

export default Users;