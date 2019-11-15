const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: String,
  categories: Array
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
