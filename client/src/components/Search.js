import React, { Component } from "react";
import RecipeCard from "./RecipeCard.js";
import API from "../utils/API.js";
// import CheckboxContainer from "./checkboxContainer.js";

const container = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  flexDirection: "row"
};
class Search extends Component {
  state = {
    recipes: []
  };

  searchAPI = (query, diets, intolerances) => {
    API.search("lasagna")
      .then(res => {
        this.setState({ recipes: res.data.results });
        console.log(this.state.recipes);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <button onClick={() => this.searchAPI()}>Search</button>
        <div style={container}>
          {this.state.recipes.length
            ? this.state.recipes.map(thisRecipe => {
                return <RecipeCard recipe={thisRecipe} />;
              })
            : null}
        </div>
      </>
    );
  }
}

export default Search;
