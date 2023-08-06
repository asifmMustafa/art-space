const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");
const ArtistModel = require("./models/artist.model");
const ArtworkModel = require("./models/artwork.model");

mongoose.connect("mongodb://127.0.0.1:27017/art-space"); // replace localhost with http://127.0.0.1/ if server crashes

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/createArtist", async (req, res) => {
  try {
    await ArtistModel.create({
      ...req.body,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to create artist." });
  }
});

app.post("/api/createUser", async (req, res) => {
  try {
    await UserModel.create({
      ...req.body,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to create user." });
  }
});

app.post("/api/loginArtist", async (req, res) => {
  const artist = await ArtistModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (artist) {
    res.json({ status: "ok", id: artist._id });
  } else {
    res.json({ status: "error", message: "Failed to login." });
  }
});

app.post("/api/loginUser", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.json({ status: "ok", id: user._id });
  } else {
    res.json({ status: "error", message: "Failed to login." });
  }
});

app.post("/api/getUser", async (req, res) => {
  const user = await UserModel.findById(req.body.id);
  if (user) {
    res.json({ status: "ok", data: user });
  } else {
    res.json({ status: "error", message: "Failed to find user." });
  }
});

app.get("/api/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json({ status: "ok", data: users });
  } catch (error) {
    res.json({ status: "error", message: "Failed to get users." });
  }
});

app.get("/api/getArtists", async (req, res) => {
  try {
    const artists = await ArtistModel.find({});
    res.json({ status: "ok", data: artists });
  } catch (error) {
    res.json({ status: "error", message: "Failed to get artists." });
  }
});

app.post("/api/addArtwork", async (req, res) => {
  try {
    await ArtworkModel.create({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      date: req.body.date,
      imageURL: req.body.imageURL,
      artist: new mongoose.Types.ObjectId(req.body.artist),
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to add artwork." });
  }
});

app.post("/api/getArtwork", async (req, res) => {
  const artwork = await ArtworkModel.findById(req.body.id);
  if (artwork) {
    res.json({ status: "ok", data: artwork });
  } else {
    res.json({ status: "error", message: "Failed to find artwork." });
  }
});

app.get("/api/getArtworks", async (req, res) => {
  try {
    const artworks = await ArtworkModel.find({});
    res.json({ status: "ok", data: artworks });
  } catch (error) {
    res.json({ status: "error", message: "Failed to get artworks." });
  }
});

app.post("/api/getMyArtworks", async (req, res) => {
  try {
    const artworks = await ArtworkModel.find({
      artist: req.body.id,
    });
    res.json({ status: "ok", data: artworks });
  } catch (error) {
    res.json({ status: "error", message: "Failed to get artworks." });
  }
});

app.post("/api/getArtist", async (req, res) => {
  const artist = await ArtistModel.findById(req.body.id);
  if (artist) {
    res.json({ status: "ok", data: artist });
  } else {
    res.json({ status: "error", message: "Failed to find artist." });
  }
});

app.post("/api/updateArtist", async (req, res) => {
  try {
    const updatedArtist = await ArtistModel.updateOne(
      { _id: req.body._id },
      { ...req.body }
    );

    if (updatedArtist.modifiedCount === 0) {
      return res.json({
        status: "error",
        message: "Update failed. Artist not found.",
      });
    }

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Update failed." });
  }
});

app.post("/api/addToFavorites", async (req, res) => {
  const user_id = req.body.user_id;
  const artwork_id = req.body.artwork_id;

  try {
    const user = await UserModel.findById(user_id);

    if (user.favorites.includes(artwork_id)) {
      return res.json({
        status: "error",
        message: "Artwork already added to favorites.",
      });
    }

    user.favorites.push(artwork_id);
    await user.save();

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to add to favorites." });
  }
});

app.post("/api/deleteArtist", async (req, res) => {
  try {
    const response = await ArtistModel.deleteOne({ _id: req.body.id });
    if (response.deletedCount === 0) {
      res.json({ status: "error", message: "Failed to delete artist." });
    } else {
      res.json({ status: "ok" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Failed to delete artist." });
  }
});

app.post("/api/deleteUser", async (req, res) => {
  try {
    const response = await UserModel.deleteOne({ _id: req.body.id });
    if (response.deletedCount === 0) {
      res.json({ status: "error", message: "Failed to delete user." });
    } else {
      res.json({ status: "ok" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Failed to delete user." });
  }
});

app.post("/api/deleteArtwork", async (req, res) => {
  try {
    const response = await ArtworkModel.deleteOne({ _id: req.body.id });
    if (response.deletedCount === 0) {
      res.json({ status: "error", message: "Failed to delete artwork." });
    } else {
      res.json({ status: "ok" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Failed to delete artwork." });
  }
});

app.post("/api/approveArtwork", async (req, res) => {
  try {
    const artwork = await ArtworkModel.findById(req.body.id);

    artwork.approved = true;
    await artwork.save();

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to approve artwork." });
  }
});

app.listen(4000, async () => {
  console.log("SERVER IS RUNNING.");
});
