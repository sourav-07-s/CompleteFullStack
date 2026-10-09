const express = require("express") ;
const adminController = require("../controllers/admin.controller");

const multer = require("multer")



const upload = multer({
    storage : multer.memoryStorage()
})


const router = express.Router() ;

router.post("/upload-admin" ,upload.single("music") , adminController.createPannel)

router.post("/create-album" , adminController.createAlbum)



module.exports = router ;