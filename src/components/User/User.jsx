import React from 'react';
import { Link } from 'react-router-dom';

import './User.css';

const User = ({ login, repos: { totalCount }, onClick }) => (
  <li className='user'>
    <Link onClick={ onClick } to={ `/user/${login}` }>
      <h3 className='user-login'>{ login }</h3>
    </Link>
    <span className='user-repos-count'>repos: { totalCount }</span>
  </li>
);

export default User;
