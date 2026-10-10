const express = require("express") ;
const adminController = require("../controllers/admin.controller");

const multer = require("multer")



const upload = multer({
    storage : multer.memoryStorage()
})


const router = express.Router() ;

router.post("/upload-admin" ,upload.single("music") , adminController.createPMusics)

router.post("/create-album" , adminController.CreateAlbum)

router.get("/" , adminController.getAllmusics)



module.exports = router ;