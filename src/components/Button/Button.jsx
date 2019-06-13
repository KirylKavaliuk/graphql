import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ label, onClick }) =>  (
  <button className='button' onClick={ onClick }>{ label }</button>
);

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: '',
  onClick: () => {},
};

export default Button;
