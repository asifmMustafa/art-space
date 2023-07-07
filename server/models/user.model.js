const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
