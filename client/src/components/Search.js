import { Component } from "react";
import Checkbox from "./Checkbox";
import React from "react";
import API from "../utils/API.js";
import RecipeCard from "./RecipeCard.js";
import Dropdown from "./Dropdown";
import Modal from "./Modal.js";
import { SSL_OP_SINGLE_DH_USE } from "constants";

let container = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  flexDirection: "row",
 
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
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showActionFilterList: false,
      checkedDiets: new Map(),
      checkedIntolerances: new Map(),
      recipes: [],
      searchTerm: "",
      diet: "",
      show: false
    };

    this.handleDietChange = this.handleDietChange.bind(this);
    this.handleIntoleranceCheckChange = this.handleIntoleranceCheckChange.bind(
      this
    );
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showList = () =>
    this.setState(prevState => ({
      showActionFilterList: !prevState.showActionFilterList
    }));

  // handles diet dropdown
  handleDietChange(diet) {
    this.setState({ diet });
  }
  // handles all the intolerance checkboxes
  handleIntoleranceCheckChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedIntolerances: prevState.checkedIntolerances.set(item, isChecked)
    }));
    console.log(this.state.checkedIntolerances);
  }

  // handles the searchbox
  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  // queries the api
  searchAPI = (query, diets, intolerances) => {
    API.search(query, diets, intolerances)
      .then(res => {
        this.setState({ recipes: res.data.results });
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  // run when search is clicked, crates the object to send to the API
  searchClick = () => {
    const query = this.state.searchTerm;
    let diet = this.state.diet;
    let intolerances = "";
    for (let key of this.state.checkedIntolerances.keys()) {
      intolerances += `${key},`;
    }
    if (diet !== "None" || diet !== "Choose A Diet") {
      this.searchAPI(query, diet, intolerances);
    } else {
      diet = "";
      this.searchAPI(query, diet, intolerances);
    }
  };

  // saves recipe to the database
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
      .then(res => {
        this.showModal();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <div className="searchbox">
          <div className="jumbotron jumbotron-fluid">
           <div className="container">
              <br></br>
              <div className= "checkbox">
                <h1 className="display-4">Fresh-Eats</h1>
                <div className= "searchbardislplay">
              <div className="searchpart">
                <div className="dropbox">
                  <Dropdown handleDietChange={this.handleDietChange} />
                  </div>
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
                      <div className="search-button">
                      <i class="fa fa-search"></i>
                      </div>
                    </button>
                    </div>
                  </div>
                  <br></br>
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
          <br></br>
          </div>
        </div>
        <div style={container}>
          {this.state.recipes.length
            ? this.state.recipes.map(thisRecipe => {
                return (
                  <RecipeCard
                    key={thisRecipe.title}
                    recipe={thisRecipe}
                    saveRecipe={this.saveRecipe}
                  />
                );
              })
            : null}
        </div>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          title="modal Title"
        >
          <h2>Successfully Saved</h2>
          <p>You can now view this recipe in your favorites</p>
        </Modal>
      </>
    );
  }
}
export default Search;