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
    recipes: [],
    searchTerm: ""
  };

  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  searchAPI = (query, diets, intolerances) => {
    API.search(query)
      .then(res => {
        this.setState({ recipes: res.data.results });
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <input
          className="form-control"
          type="text"
          placeholder="Search for a recipe"
          name="search"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={() => this.searchAPI(this.state.searchTerm)}>
          Search
        </button>
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
