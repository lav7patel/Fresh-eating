const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: String,
  sourceUrl: String,
  image: String,
  sourceName: String,
  readyInMinutes: Number,
  servings: Number,
  pricePerServing: Number,
  diets: Array,
  categories: Array
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
