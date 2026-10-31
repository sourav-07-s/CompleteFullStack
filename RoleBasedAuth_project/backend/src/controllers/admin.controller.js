const mongoose = require("mongoose");
const MusicsModel = require("../models/Musics.model");
const albumModel = require("../models/album.model");
const { getUploadAuth } = require("../services/storage.service");

// Admin only: gives the browser a signed token to upload straight to ImageKit
async function getImagekitAuth(req, res) {
  const auth = getUploadAuth(); // { token, expire, signature }

  return res.status(200).json({
    ...auth,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}

// Browser has already uploaded the file to ImageKit, so we only save title + url
async function createPMusics(req, res) {
  const { title, uri } = req.body || {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (typeof uri !== "string" || !uri.startsWith("https://")) {
    return res.status(400).json({ message: "A valid file url is required" });
  }

  const Pannel = await MusicsModel.create({
    uri,
    title: title.trim(),
    admin: req.user.id,
  });

  return res.status(201).json({
    message: "Pannel Created Sucessfully",

    adminInfo: {
      id: Pannel.id,
      uri: Pannel.uri,
      title: Pannel.title,
      Admin: Pannel.admin,
    },
  });
}

async function CreateAlbum(req, res) {
  const { title, musics } = req.body || {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ message: "Album title is required" });
  }

  if (
    !Array.isArray(musics) ||
    !musics.every((id) => mongoose.isValidObjectId(id))
  ) {
    return res.status(400).json({ message: "Invalid music list" });
  }

  const Album = await albumModel.create({
    title: title.trim(),
    musics,
    admin: req.user.id,
  });

  return res.status(201).json({
    message: " Album created sucessfully",

    AlbumInfo: {
      id: Album.id,
      title: Album.title,
      admin: Album.admin,
      musics: Album.musics,
    },
  });
}

async function getAllmusics(req, res) {
  const musics = await MusicsModel.find()
    .limit(20)
    .populate("admin", "username email role");

  return res.status(200).json({
    message: " Musics fetched sucessfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title admin")
    .populate("admin", "username email");

  return res.status(200).json({
    message: "Albums fetched sucessfully",
    albums: albums,
  });
}

async function getAllAlbumById(req, res) {
  const albumId = req.params.id;

  if (!mongoose.isValidObjectId(albumId)) {
    return res.status(400).json({ message: "Invalid album id" });
  }

  const album = await albumModel
    .findById(albumId)
    .populate("admin", "username email")
    .populate("musics", "title uri");

  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }

  return res.status(200).json({
    message: "Album fetched sucessfully",
    album: album,
  });
}

module.exports = {
  createPMusics,
  getImagekitAuth,
  CreateAlbum,
  getAllmusics,
  getAllAlbums,
  getAllAlbumById,
};