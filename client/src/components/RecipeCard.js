import React, { useState, useEffect } from "react";

const card = {
  width: "48%",
  backgroundColor: "#2b0c064a;",
  border: "solid",
  color:"black",
  border: "1px solid",
  padding:" 10px",
  boxShadow: "5px 10px 18px #888888"

};

const cardContents = {
  display: "flex",
  justifyContent: "space-between"
};

function RecipeCard(props) {
  return (
    <div style={card}>
      <a href={props.recipe.sourceUrl}>
        <h2>{props.recipe.title}</h2>
      </a>
      <div style={cardContents}>
        <img src={props.recipe.image} />
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
        </div>
        <div>
          <p>Source: {props.recipe.sourceName}</p>
          <button onClick={() => props.saveRecipe(props.recipe)}>Save to Favorites</button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
