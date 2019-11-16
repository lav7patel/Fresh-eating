import React from 'react';
import PropTypes from 'prop-types';
import Search  from './Search';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input name={name} type={type}  checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox;