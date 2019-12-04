  
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
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // gets favorites from database
  const getSavedRecipes = () => {
    setRecipes([]);
    API.getSaved()
      .then(res => {
        if (res.data !== "error") {
          setRecipes(res.data[0].recipes);
          setFilteredRecipes(res.data[0].recipes);
          setCategories(res.data[0].categories);
        }

        console.log(res.data[0].categories);
      })
      .catch(err => console.log(err));
  };

  // add a new category option to the use object
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

  // when somehting is clicked on dropdown to filter
  const filterRecipes = category => {
    if (category === "All") {
      setFilteredRecipes(recipes);
    } else if (category === "Uncategorized") {
      console.log("test");
      const uncategorized = recipes.filter(recipe => {
        if (recipe.categories.length < 1) {
          return true;
        }
        return false;
      });
      setFilteredRecipes(uncategorized);
    } else {
      const filtered = recipes.filter(recipe => {
        if (recipe.categories.includes(category)) {
          return true;
        }
        return false;
      });
      setFilteredRecipes(filtered);
    }
  };

  // text box to add a new category handler
  const handleChange = event => {
    setNewCategory(event.target.value);
  };

  // basically component did mount
  useEffect(() => {
    getSavedRecipes();
  }, []);

  return (
    <>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <br></br>
        <div className="favorites-dropdown">
        <h1 className="display-4">Fresh-Eats</h1>
        <br></br>
        <div className= "favorites-cont">
        <h6> Welcome to Your Favorites</h6>
        </div>
          <CategoryDropdown
            categories={categories}
            version="main"
            filterRecipes={filterRecipes}
          />
          <div className="or">
          <h7>-OR-</h7>
          </div>
          <div className="create-category">
          <label>
            <input
              className="category-input"
              placeholder="Create a New Category"
              type="text"
              value={newCategory}
              onChange={handleChange}
              name="username"
          
            />
          </label>
          <button onClick={addNewCategoryToUser}>Save</button>
          </div>
          </div>
        </div>
        <br></br>
        </div>
          <div style={container}>
            {filteredRecipes.length
              ? filteredRecipes.map(thisRecipe => {
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