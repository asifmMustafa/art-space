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

app.listen(4000, async () => {
  console.log("SERVER IS RUNNING.");
});
