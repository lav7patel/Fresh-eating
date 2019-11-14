import React, { Component } from "react";
import RecipeCard from "./RecipeCard.js";
import API from "../utils/API.js";

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

  componentDidMount() {
    API.search("lasagna")
      .then(res => {
        this.setState({ recipes: res.data.results });
        console.log(this.state.recipes);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={container}>
        {this.state.recipes.length
          ? this.state.recipes.map(thisRecipe => {
              return <RecipeCard recipe={thisRecipe} />;
            })
          : null}
      </div>
    );
  }
}

export default Search;
