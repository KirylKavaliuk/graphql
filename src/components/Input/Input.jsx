import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = ({ type, hint, value, onChange }) => (
  <input 
    type={ type } 
    value={ value }
    placeholder={ hint }
    className='input' 
    onChange={ onChange }
  />
);

Input.propTypes = {
  type: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  hint: '',
  value: '',
  onChange: () => {},
};

export default Input;
