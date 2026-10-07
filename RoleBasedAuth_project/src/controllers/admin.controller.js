const AdminModel = require("../models/admin.model")
const {uploadFile} = require("../services/storage.service")
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

      const result = await uploadFile(file.buffer.toString("base64"))

      const Pannel = AdminModel.create({
        uri : result.url,
        title ,
        admin : decoded._id ,

      })

      res.status(201).json({
        message : "Pannel Created Sucessfully" ,

        adminInfo : {
            id : Pannel._id,
            uri : Pannel.uri ,
            title : Pannel.title ,
            Admin : Pannel.admin ,

        }
      })


}


module.exports = {createPannel}