const express = require('express');
const musicController = require("../controllers/admin.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();


router.post("/upload", authMiddleware.authAdmin, upload.single("music"), musicController.createPMusics)

router.post("/album", authMiddleware.authAdmin, musicController.CreateAlbum)

router.get("/", authMiddleware.authUser, musicController.getAllmusics)

router.get("/albums" , authMiddleware.authUser, musicController.getAllAlbums)




module.exports = router;