import axios from "axios";
// search function with spoonacular complex search api
export default {
  search: function(query, diet, intolerances) {
    return axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_SPOONACULAR_API_KEY
      },
      params: {
        query: query,
        diet: diet,
        intolerances: intolerances,
        addRecipeInformation: "true",
        limitLicense: "false",
        offset: "0",
        number: "10"
      }
    });
  },
  // saves a recipe to the database
  saveRecipe: function(recipe) {
    return axios.post("/api/recipe", recipe);
  },
  // getts a users saved recipes from the database
  getSaved: function() {
    return axios.get("api/recipe");
  },
  // send it username, password, password2
  registerUser: function(userData) {
    return axios.post("/register", userData);
  },
  // send username and password
  login: function(userData) {
    return axios.post("/login", userData);
  },
  // route for logging a user out
  logout: function() {
    return axios.get("/logout");
  },
  // for getting user information,
  getUser: function() {
    return axios.get("/user");
  },
  // adds a new category to the user, for later adding to recipes
  addCategoryToUser: function(categoryName) {
    return axios.post("/api/usercategory", categoryName);
  },
  // adds a category to a recipe from the list in the user
  addCategoryToRecipe: function(categoryName) {
    return axios.post("/api/recipecategory", categoryName);
  },
  // removes a category from the recipe
  removeCategoryFromRecipe: function(category) {
    return axios.put("/api/recipe", category);
  }
};
