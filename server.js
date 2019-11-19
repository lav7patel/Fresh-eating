const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const User = require("./models/user.js");
const Recipe = require("./models/recipe.js");

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

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
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./googlea43c6e0b72be7c07.html"))
);

// Define API routes here
app.post("/api/recipe", ({ body, user }, res) => {
  Recipe.create(body)
    .then(({ _id }) =>
      User.findOneAndUpdate(
        { username: user.username },
        { $push: { recipes: _id } },
        { new: true }
      )
    )
    .then(dbRecipe => {
      res.json(dbRecipe);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/recipe", (req, res) => {
  if (!req.user) {
    res.json("error");
  } else {
    const user = req.user.username;
    User.find({ username: user })
      .populate("recipes")
      .then(dbRecipe => {
        res.json(dbRecipe);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

// login routes
passport.use(
  new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid password" });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// Register User
app.post("/register", (req, res) => {
  const { password } = req.body;
  const { password2 } = req.body;

  User.getUserByUsername(req.body.username, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json("User already exists");
    } else {
      if (password == password2) {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        });

        User.createUser(newUser, (err, user) => {
          if (err) throw err;
          res.send(user).end();
        });
      } else {
        res
          .status(500)
          .send('{errors: "Passwords don\'t match"}')
          .end();
      }
    }
  });
});

// Endpoint to login
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

// Endpoint to get current user
app.get("/user", (req, res) => {
  res.send(req.user);
});

// Endpoint to logout
app.get("/logout", (req, res) => {
  req.logout();
  res.json("logged out");
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
