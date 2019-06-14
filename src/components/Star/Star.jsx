import React from 'react';
import PropTypes from 'prop-types';

import './Star.css';

const Star = ({ active, stargazers, onClick }) =>  (
  <div 
    className={ `star ${active ? 'active' : '' }` }
    onClick={ onClick }
  >
    { stargazers }
  </div>
);

Star.propTypes = {
  active: PropTypes.bool,
  stargazers: PropTypes.number,
  onClick: PropTypes.func,
};

Star.defaultProps = {
  active: false,
  stargazers: 0,
  onClick: () => {},
};

export default Star;
