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
        "x-rapidapi-key": "a59f0571fbmsh4ee374c9e48291fp12d0bdjsna458c493e660"
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
  }
};
