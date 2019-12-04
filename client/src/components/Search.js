import { Component } from "react";
import Checkbox from "./Checkbox";
import React from "react";
import API from "../utils/API.js";
import RecipeCard from "./RecipeCard.js";
import Dropdown from "./Dropdown";
import Modal from "./Modal.js";
import { SSL_OP_SINGLE_DH_USE } from "constants";

// gettin json with all the intolerances for the checkboxes
import intolerancesCheckboxes from "./data/Intolerances.json";

// some basic css for the section that shows the returned recipes
let container = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  flexDirection: "row",
 
};

//function Search(props) {
// render() {
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // for checkboxes
      // showActionFilterList: false,
      // map that holds the checkbox information
      checkedIntolerances: new Map(),
      //array for recipes from API
      recipes: [],
      // what the user enters in searchbox
      searchTerm: "",
      // diet user selects from dropdown
      diet: "",
      // for the modal informing user of successfully saving recipe to database
      show: false
    };

    this.handleDietChange = this.handleDietChange.bind(this);
    this.handleIntoleranceCheckChange = this.handleIntoleranceCheckChange.bind(
      this
    );
  }
  // function to show modal with recipe add confirmation
  showModal = () => {
    this.setState({ show: true });
  };
  // hides the same modal
  hideModal = () => {
    this.setState({ show: false });
  };

  /*   showList = () =>
    this.setState(prevState => ({
      showActionFilterList: !prevState.showActionFilterList
    })); */

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
    // gets search term and diet from the state
    const query = this.state.searchTerm;
    let diet = this.state.diet;
    // new varraiable to hold the list of intolerances, the list needs to be seperated by commas
    let intolerances = "";
    for (let key of this.state.checkedIntolerances.keys()) {
      // creating the string that will be sent to the api, gets every checkbox if it's checked and adds that name to the intolerances string
      intolerances += `${key},`;
    }
    console.log(intolerances);
    if (diet !== "None" || diet !== "Choose A Diet") {
      this.searchAPI(query, diet, intolerances);
    } else {
      // if they did not select a diet preference send an empty diet object
      diet = "";
      /// searhces the api with all of the preferences
      this.searchAPI(query, diet, intolerances);
    }
  };

  // saves recipe to the database
  saveRecipe = recipe => {
    // gets the info needed from the api object and creates a new object to match the model
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

    // saving recipe to database, using object just created
    API.saveRecipe(recipeForDB)
      .then(res => {
        this.showModal();
        console.log("recipe saved");
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