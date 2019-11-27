import axios from "axios";

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
  saveRecipe: function(recipe) {
    return axios.post("/api/recipe", recipe);
  },
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
  logout: function() {
    return axios.get("/logout");
  },
  getUser: function() {
    return axios.get("/user");
  },
  addCategoryToUser: function(categoryName) {
    return axios.post("/api/usercategory", categoryName);
  },
  addCategoryToRecipe: function(categoryName) {
    return axios.post("/api/recipecategory", categoryName);
  },
  removeCategoryFromRecipe: function(category) {
    return axios.put("/api/recipe", category);
  }
};
