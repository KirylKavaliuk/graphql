import React from 'react';
import { Link } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { addStar, removeStar } from './mutations';

import Star from '../Star';

import './Repo.css';

const Repo = ({ 
  owner, 
  id,
  name, 
  primaryLanguage, 
  stargazers, 
  viewerHasStarred 
}) => {
  let langName = '', color = '#000';
  
  if(primaryLanguage) {
    langName = primaryLanguage.name;
    color = primaryLanguage.color;
  }
  
  const { totalCount } = stargazers;

  return (
    <li className='repo' style={{ borderColor: color }}>
      <Link to={ `/user/${owner}/repo/${name}` }><h3 className='repo-name'>{ name }</h3></Link>
      <div style={{ color }} className='repo-lang'>{ langName }</div>
      <Mutation
        mutation={ viewerHasStarred ? removeStar : addStar }
        variables={{ starrableId: id }}
      >
        { (toggleStar) => (
            <Star
              active={ viewerHasStarred }
              stargazers={ totalCount }
              onClick={ toggleStar }
            />
          )
        }
      </Mutation>
    </li>
  );
}

export default Repo;
