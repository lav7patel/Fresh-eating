
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

const checkboxes = [
  {
    name: "Vegan",
    key: "checkBox1",
    label: "Check Box 1"
  },
  {
    name: "Vegetarian",
    key: "checkBox2",
    label: "Check Box 2"
  },
  {
    name: "Kosher",
    key: "checkBox3",
    label: "Check Box 3"
  },
  {
    name: "Halaal",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "Pescatarian",
    key: "checkBox1",
    label: "Check Box 1"
  },
  {
    name: "Dairy",
    key: "checkBox2",
    label: "Check Box 2"
  },
  {
    name: "Egg",
    key: "checkBox3",
    label: "Check Box 3"
  },
  {
    name: "Gluten",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "Peanut",
    key: "checkBox1",
    label: "Check Box 1"
  },
  {
    name: "Sesame",
    key: "checkBox2",
    label: "Check Box 2"
  },
  {
    name: "Seafood",
    key: "checkBox3",
    label: "Check Box 3"
  },
  {
    name: "Shellfish",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "Soy",
    key: "checkBox4",
    label: "Check Box 4"
  },

  {
    name: "Sulfite",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "Tree Nuts",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "Wheat",
    key: "checkBox4",
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
      checkedItems: new Map(),
      recipes: []
    };

    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  showList = () =>
    this.setState(prevState => ({
      showActionFilterList: !prevState.showActionFilterList
    }));

  handleCheckChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
  }

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

        <br />
        <div className= "check-boxes">
        {checkboxes.map(item => (
          <label key={item.key}>
            {item.name}
            <Checkbox
             checked={this.state.checkedItems.get(item.name)}
              name={item.name}
              onChange={this.handleCheckChange}
            />
          </label>
        ))}
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
        {/* <<div style={container}>*/}
          {this.state.recipes.length
            ? this.state.recipes.map(thisRecipe => {
                return <RecipeCard recipe={thisRecipe} />;
              })
            : null}
       {/* </div>*/}
     </div>
      </>
    )
  }
}

export default Search;
