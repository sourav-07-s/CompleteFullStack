const express = require("express") ;
const adminController = require("../controllers/admin.controller");


const router = express.Router() ;

router.post("/upload-admin" , adminController.createPannel)



module.exports = router ;