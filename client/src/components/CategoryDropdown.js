import React, { useState } from "react";

const dropdownStyle = {
  width: "80%",
  marginBottom: "9px",
  height: "34px"
};

function CategoryDropdown(props) {
  const [dropValue, setDropValue] = useState("None");

  const handleChange = event => {
    setDropValue(event.target.value);
    if (props.version === "recipeCard") {
      props.addCategory(event.target.value);
    } else {
      props.filterRecipes(event.target.value);
    }
  };

  return (
    <select value={dropValue} onChange={handleChange} style={dropdownStyle}>
      {props.version === "recipeCard" ? (
        <option value="Add a Category">Add to Category</option>
      ) : (
        <>
          <option value="Pick a category to filter">
            Your Categories
          </option>
          <option value="All">All</option>
          <option value="Uncategorized">Uncategorized</option>
        </>
      )}

      {props.categories.map(category => (
        <option value={category}>{category}</option>
      ))}
    </select>
  );
}

export default CategoryDropdown;
