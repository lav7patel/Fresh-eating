import { Component } from "react";
import Checkbox from "./Checkbox";
import React from "react";
import API from "../utils/API.js";
import RecipeCard from "./RecipeCard.js";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";

let container = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  flexDirection: "row"
};


const intolerancesCheckboxes = [
  {
    name: "Dairy",
    key: "checkBox6",
    label: "Check Box 2"
  },
  {
    name: "Egg",
    key: "checkBox7",
    label: "Check Box 3"
  },
  {
    name: "Gluten",
    key: "checkBox8",
    label: "Check Box 4"
  },
  {
    name: "Peanut",
    key: "checkBox9",
    label: "Check Box 1"
  },
  {
    name: "Sesame",
    key: "checkBox10",
    label: "Check Box 2"
  },
  {
    name: "Seafood",
    key: "checkBox11",
    label: "Check Box 3"
  },
  {
    name: "Shellfish",
    key: "checkBox12"
  },
  {
    name: "Soy",
    key: "checkBox13",
    label: "Check Box 4"
  },

  {
    name: "Sulfite",
    key: "checkBox14",
    label: "Check Box 4"
  },
  {
    name: "Tree Nuts",
    key: "checkBox15",
    label: "Check Box 4"
  },
  {
    name: "Wheat",
    key: "checkBox16",
    label: "Check Box 4"
  }
];

//function Search(props) {
// render() {
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showActionFilterList: false,
      checkedDiets: new Map(),
      checkedIntolerances: new Map(),
      recipes: [],
      searchTerm: "",
      diet: ""
    };

    this.handleDietChange = this.handleDietChange.bind(this);
    this.handleIntoleranceCheckChange = this.handleIntoleranceCheckChange.bind(
      this
    );
  }

  showList = () =>
    this.setState(prevState => ({
      showActionFilterList: !prevState.showActionFilterList
    }));

  handleDietChange(diet) {
    this.setState({ diet });
    console.log(diet);
  }

  handleIntoleranceCheckChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedIntolerances: prevState.checkedIntolerances.set(item, isChecked)
    }));
    console.log(this.state.checkedIntolerances);
  }

  handleChange = event => {
    console.log(event);
    this.setState({ searchTerm: event.target.value });
  };

  searchAPI = (query, diets, intolerances) => {
    API.search(query, diets, intolerances)
      .then(res => {
        this.setState({ recipes: res.data.results });
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  searchClick = () => {
    const query = this.state.searchTerm;
    let diet = this.state.diet;
    let intolerances = "";
    for (let key of this.state.checkedIntolerances.keys()) {
      intolerances += `${key},`;
    }
    if (diet !== "None") {
      this.searchAPI(query, diet, intolerances);
    } else {
      diet = "";
      this.searchAPI(query, diet, intolerances);
    }
  };

  saveRecipe = recipe => {
    const recipeForDB = {
      title: recipe.title,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image,
      sourceName: recipe.sourceName,
      preptime: recipe.readyInMinutes,
      servings: recipe.servings,
      pricePerServing: recipe.pricePerServing,
      diets: recipe.diets
    };

    console.log(recipeForDB);
    API.saveRecipe(recipeForDB)
      .then(res => {})
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <div className="searchbox">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Fresh-Eating</h1>
              <div classNAme= "searchbardislplay">
            <div className="searchpart">
                <Dropdown handleDietChange={this.handleDietChange} />
                
              <input
                className="form-control"
                type="text"
                placeholder="Search for a recipe"
                name="search"
                value={this.state.searchTerm}
                onChange={this.handleChange}
              />
                <div className="button">
                  <button onClick={() => this.searchClick()}>
                    <i class="fa fa-search"></i> Search
                  </button>
                  </div>
                </div>
                <br></br>
              <div className="checkbox">
                <div className="restrictions">
                    <h3> Restrictions </h3>
                    <div className="intolerance-boxes">
                      {intolerancesCheckboxes.map(item => (
                        <label key={item.key}>
                          <Checkbox
                            checked={this.state.checkedIntolerances.get(
                              item.name
                            )}
                            name={item.name}
                            onChange={this.handleIntoleranceCheckChange}
                          />
                          {item.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
            </div>
          </div>
        </div>
          <div style={container}>
            {this.state.recipes.length
              ? this.state.recipes.map(thisRecipe => {
                  return (
                    <RecipeCard
                      recipe={thisRecipe}
                      saveRecipe={this.saveRecipe}
                    />
                  );
                })
              : null}
          </div>
      </div>
      </>
    );
  }
}
export default Search;
