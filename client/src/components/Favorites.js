import React, { useState, useEffect } from "react";
import API from "../utils/API.js";
import FavoritesRecipeCard from "./FavoritesRecipCard";
import CategoryDropdown from "./CategoryDropdown";

const container = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  flexDirection: "row"
};

function Favorites(props) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const getSavedRecipes = () => {
    setRecipes([]);
    API.getSaved()
      .then(res => {
        if (res.data !== "error") {
          setRecipes(res.data[0].recipes);
          setCategories(res.data[0].categories);
        }

        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const addNewCategoryToUser = () => {
    const categoryObject = {
      category: newCategory
    };
    API.addCategoryToUser(categoryObject)
      .then(res => {
        if (res.data !== "error") {
          getSavedRecipes();
        }

        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleChange = event => {
    setNewCategory(event.target.value);
  };

  useEffect(() => {
    getSavedRecipes();
  }, []);

  return (
    <>
      <CategoryDropdown categories={categories} version="main" />
      <label>
        Add a Category
        <input
          type="text"
          value={newCategory}
          onChange={handleChange}
          name="username"
        />
      </label>
      <button onClick={addNewCategoryToUser}>Add new Category</button>
      <div style={container}>
        {recipes.length
          ? recipes.map(thisRecipe => {
              return (
                <FavoritesRecipeCard
                  recipe={thisRecipe}
                  categories={categories}
                  getSavedRecipes={getSavedRecipes}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default Favorites;
