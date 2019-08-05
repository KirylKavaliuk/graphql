import React from 'react';
import { Link } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import { addStar, removeStar } from './mutations';

import Star from '../Star';

import './Repo.css';

const Repo = ({ 
  owner,
  name,
  primaryLanguage,
  stargazers,
	viewerHasStarred,
	addStar,
	removeStar,
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
			<Star
				active={ viewerHasStarred }
				stargazers={ totalCount }
				onClick={ viewerHasStarred ? removeStar : addStar }
			/>
    </li>
  );
}

const setStarrableId = props => ({ 
	variables: { 
		starrableId: props.id,
	},
});

export default compose(
	graphql(addStar, { name: 'addStar', options: setStarrableId }),
	graphql(removeStar, { name: 'removeStar',  options: setStarrableId }),
)(Repo);
