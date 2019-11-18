import { Component } from "react";
import Checkbox from "./Checkbox";
import React from "react";
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

const dietCheckboxes = [
  {
    name: "Vegan",
    key: "checkBox1",
    label: "diet"
  },
  {
    name: "Vegetarian",
    key: "checkBox2",
    label: "diet"
  },
  {
    name: "Lacto Vegetarian",
    key: "checkBox3",
    label: "diet"
  },
  {
    name: "Ovo Vegetarian",
    key: "checkBox4",
    label: "diet"
  },
  {
    name: "Pescatarian",
    key: "checkBox5",
    label: "diet"
  }
];

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
      searchTerm: ""
    };

    this.handleDietCheckChange = this.handleDietCheckChange.bind(this);
    this.handleIntoleranceCheckChange = this.handleIntoleranceCheckChange.bind(
      this
    );
  }

  showList = () =>
    this.setState(prevState => ({
      showActionFilterList: !prevState.showActionFilterList
    }));

  handleDietCheckChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedDiets: prevState.checkedDiets.set(item, isChecked)
    }));
    console.log(this.state.checkedDiets);
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
    let diets = "";
    let intolerances = "";
    for (let key of this.state.checkedDiets.keys()) {
      diets += `${key},`;
    }
    for (let key of this.state.checkedIntolerances.keys()) {
      intolerances += `${key},`;
    }

    this.searchAPI(query, diets, intolerances);
    console.log(diets);
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
              <input
                className="form-control"
                type="text"
                placeholder="Search for a recipe"
                name="search"
                value={this.state.searchTerm}
                onChange={this.handleChange}
              />
                <div className="checkbox">
                  <div className="row">
                    <div className="col-5">
                    <h2> Diet </h2>
                      <div className="diet-boxes">
                        {dietCheckboxes.map(item => (
                          <label key={item.key}>
                          {item.name}
                            <Checkbox
                              checked={this.state.checkedDiets.get(item.name)}
                              name={item.name}
                              onChange={this.handleDietCheckChange}
                            />
                          </label>
                      ))}
                      </div>
                    </div>
                    <div class="col-6">
                      <h2> Intolerances </h2>
                        <div className="intolerance-boxes">
                          {intolerancesCheckboxes.map(item => (
                            <label key={item.key}>
                              {item.name}
                              <Checkbox
                                checked={this.state.checkedIntolerances.get(item.name)}
                                name={item.name}
                                onChange={this.handleIntoleranceCheckChange}
                            />
                            </label>
                          ))}
                        </div>
                    </div>
                </div>
                  <button onClick={() => this.searchClick()}>
                  <i class="fa fa-search"></i> Search
                </button>
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