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
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    label={label}
  />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;