const express = require("express") ;
const adminRoutes = require("../controllers/admin.controller");
const adminController = require("../controllers/admin.controller");


const router = express.Router ;

router.post("/upload-admin" , adminController.createPannel)



module.exports = router ;