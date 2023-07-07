const mongoose = require("mongoose");

const Artist = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  profilePictureURL: { type: String, required: true },
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  events: [
    {
      title: { type: String },
      description: { type: String },
      date: { type: Date },
    },
  ],
});

const ArtistModel = mongoose.model("Artist", Artist);

module.exports = ArtistModel;
