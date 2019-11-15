const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const Recipe = require("./models/recipe.js");

//const db = mongojs( need a database URL here)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipes", {
  useNewUrlParser: true
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.post("/api/recipe", ({ body }, res) => {
  Recipe.create(body)
    .then(dbRecipe => {
      res.json(dbRecipe);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/recipe", (req, res) => {
  Recipe.find({})
    .then(dbRecipe => {
      res.json(dbRecipe);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
