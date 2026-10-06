const userModel = require("../models/admin.model")
const jwt = require("jsonwebtoken")



async function createPannel(req , res){

     const token = req.cookies.token ;

     if(!token){
        return res.status(401).json({
            message : "UnaAthorised access "
        })
     }

     try {
      const decoded =   jwt.verify(process.env.JWT_SECRET)

              if(decoded.role !== "admin"){
                return res.status(401).json({
                    message: "UnAuthorised Access Denied "
                })
              }



     } catch(error){
        return res.status(401).json({
            message : "UnAuthorised" , error
        })
     }


      const {title} = req.body
      const file = req.file 



}