import React, { useState, useEffect } from "react";
import API from "../utils/API.js";
import RecipeCard from "./RecipeCard.js";

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

  const getSavedRecipes = () => {
    API.getSaved()
      .then(res => {
        if (res.data !== "error") {
          setRecipes(res.data.recipes);
        }

        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getSavedRecipes();
  }, []);

  return (
    <div style={container}>
      {recipes.length
        ? recipes.map(thisRecipe => {
            return <RecipeCard recipe={thisRecipe} />;
          })
        : null}
    </div>
  );
}

export default Favorites;