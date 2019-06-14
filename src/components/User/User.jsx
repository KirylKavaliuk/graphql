import React from 'react';
import { Link } from 'react-router-dom';

import './User.css';

const User = ({ login, repos }) => {
  const { totalCount } = repos;

  return (
    <li className='user'>
      <Link to={ `/user/${login}` }>
        <h3 className='user-login'>{ login }</h3>
      </Link>
      <span className='user-repos-count'>repos: { totalCount }</span>
    </li>
  );
}

export default User;