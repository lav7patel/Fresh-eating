import React from "react";

const card = {
  width: "48%",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderBottom: "solid",
  borderWidth: "1px",
  color: "black",
  padding: " 10px"
  /*boxShadow: "5px 10px 18px #888888"*/
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
        <img src={props.recipe.image} alt={props.recipe.title} />
        <div className="recipe-info">
          <ul>
            <li>Ready In:{props.recipe.readyInMinutes} Minutes</li>
            <li>Servings: {props.recipe.servings}</li>
          </ul>
          <ul>
            {props.recipe.diets.length
              ? props.recipe.diets.map(diet => {
                  return <li key={diet}>{diet}</li>;
                })
              : null}
          </ul>
        </div>
        <div className="recipe-source-save">
          <p>Source: {props.recipe.sourceName}</p>
          <button onClick={() => props.saveRecipe(props.recipe)}>
            Save to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
