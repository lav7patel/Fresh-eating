import React, { useState, useEffect } from "react";

const dropdownStyle = {
  width: "80%",
  margin: "auto",
  height: "2rem"
};

function Dropdown(props) {
  const [dropValue, setDropValue] = useState("None");

  const handleChange = event => {
    setDropValue(event.target.value);
    console.log(event.target.value);
    props.handleDietChange(event.target.value);
  };

  return (
    <select value={dropValue} onChange={handleChange} style={dropdownStyle}>
      <option value="None">None</option>
      <option value="Vegan">Vegan</option>
      <option value="Vegetarian">Vegetarian</option>
      <option value="Lacto Vegetarian">Lacto Vegetarian</option>
      <option value="Ovo Vegetarian">Ovo Vegetarian</option>
      <option value="Pescatarian">Pescatarian</option>
    </select>
  );
}

export default Dropdown;