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

app.post("/api/addArtwork", async (req, res) => {
  try {
    await ArtworkModel.create({
      ...req.body,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to add artwork." });
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

app.listen(4000, async () => {
  console.log("SERVER IS RUNNING.");
});
