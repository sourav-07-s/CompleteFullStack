const express = require("express");
const musicController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Admin only: signed token so the browser can upload directly to ImageKit
router.get(
  "/imagekit-auth",
  authMiddleware.authAdmin,
  musicController.getImagekitAuth
);

// Admin only: save title + ImageKit url (no file passes through the server)
router.post("/upload", authMiddleware.authAdmin, musicController.createPMusics);

router.post("/album", authMiddleware.authAdmin, musicController.CreateAlbum);

router.get("/", authMiddleware.authUser, musicController.getAllmusics);

router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);

router.get(
  "/albums/:id",
  authMiddleware.authUser,
  musicController.getAllAlbumById
);

module.exports = router;