  
import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  type = "checkbox",
  name,
  label,
  checked = false,
  onChange
}) => (
  <input
    name={name}
    type={type}
    checked={checked}
    onChange={onChange}
    label={label}
  />
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;