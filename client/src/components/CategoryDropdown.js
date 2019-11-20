import React, { useState, useEffect } from "react";

const dropdownStyle = {
  width: "80%",
  margin: "auto",
  height: "2rem"
};

function CategoryDropdown(props) {
  const [dropValue, setDropValue] = useState("None");

  const handleChange = event => {
    setDropValue(event.target.value);
    if (props.version === "recipeCard") {
      props.addCategory(event.target.value);
    }
  };

  return (
    <select value={dropValue} onChange={handleChange} style={dropdownStyle}>
      <option value="choose a category to add">Choose a category to add</option>
      {props.categories.map(category => (
        <option value={category}>{category}</option>
      ))}
    </select>
  );
}

export default CategoryDropdown;
