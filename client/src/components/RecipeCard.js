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
        <img src={props.recipe.image} alt={props.recipe.title} 
        />
        <div className="recipe-info">
          <div className= "prep">
            <ul>
              <li><i class="fa fa-clock-o"></i> {props.recipe.readyInMinutes}  Minutes</li>
              <li><i class="fa fa-users"></i> Serves: {props.recipe.servings}</li>
            </ul>
            </div>
            <br></br>
            <ul>
            <div className = "dietary-list">
              {props.recipe.diets.length
                ? props.recipe.diets.map(diet => {
                    return <li><i class="fa fa-check"></i>{diet}</li>;
                      {/* return <li key={diet}>{diet}</li>;*/}
                  })
                : null}
                 </div>
            </ul>
        </div>
        <div className="recipe-source">
          <p>Source: {props.recipe.sourceName}</p>
          </div>
          < div className ="save-button">
          <button onClick={() => props.saveRecipe(props.recipe)}>
           Add to <i class="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
