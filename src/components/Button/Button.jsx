import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ label, onClick, className }) =>  (
  <button className={ `button ${className}` } onClick={ onClick }>{ label }</button>
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  label: '',
  onClick: () => {},
};

export default Button;
