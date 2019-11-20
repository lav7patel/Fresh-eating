import React from "react";
import PropTypes from "prop-types";

const checkboxStyle = {
  width: "1rem",
  height: "1rem",
  marginRight: ".05rem",
  marginLeft: ".5rem"
};

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
    style={checkboxStyle}
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
