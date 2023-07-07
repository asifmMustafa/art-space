const mongoose = require("mongoose");

const Artwork = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  category: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  imageURL: { type: String, required: true },
});

const ArtworkModel = mongoose.model("Artwork", Artwork);

module.exports = ArtworkModel;
