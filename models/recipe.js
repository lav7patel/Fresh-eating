const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: String,
  sourceURL: String,
  imageURL: String,
  credit: String,
  prepTime: Number,
  servings: Number,
  pricePerServing: Number,
  diets: Array,
  categories: Array
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
