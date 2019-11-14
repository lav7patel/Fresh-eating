import React, { useState, useEffect } from "react";

const card = {
  width: "48%",
  backgroundColor: "green"
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
          <ul>
            {props.recipe.cuisines.length
              ? props.recipe.cuisines.map(cuisine => {
                  return <li>{cuisine}</li>;
                })
              : null}
          </ul>
          <p>{props.recipe.sourceName}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
