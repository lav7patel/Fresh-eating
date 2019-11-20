import React, { useState, useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";
import API from "../utils/API.js";

const card = {
  width: "48%",
  backgroundColor: "#2b0c064a;",
  border: "solid",
  color: "black",
  border: "1px solid",
  padding: " 10px"
  /*boxShadow: "5px 10px 18px #888888"*/
};

const cardContents = {
  display: "flex",
  justifyContent: "space-between"
};

function FavoritesRecipeCard(props) {
  const addCategory = category => {
    const categoryObject = {
      _id: props.recipe._id,
      category: category
    };
    console.log(categoryObject);
    API.addCategoryToRecipe(categoryObject)
      .then(res => {
        props.getSavedRecipes();
      })
      .catch(err => console.log(err));
  };
  return (
    <div style={card}>
      <a href={props.recipe.sourceUrl}>
        <h2>{props.recipe.title}</h2>
      </a>
      <div style={cardContents}>
        <img src={props.recipe.image} className="img-fluid" />
        <div>
          <ul>
            <li>Ready In:{props.recipe.readyInMinutes} Minutes</li>
            <li>Servings: {props.recipe.servings}</li>
          </ul>
          <ul>
            {props.recipe.diets.length
              ? props.recipe.diets.map(diet => {
                  return <li>{diet}</li>;
                })
              : null}
          </ul>
          <ul>
            {props.recipe.categories.length
              ? props.recipe.categories.map(category => {
                  return <li>{category}</li>;
                })
              : null}
          </ul>
        </div>
        <div>
          <p>Source: {props.recipe.sourceName}</p>
          <CategoryDropdown
            categories={props.categories}
            addCategory={addCategory}
            version="recipeCard"
          />
        </div>
      </div>
    </div>
  );
}

export default FavoritesRecipeCard;
