const AdminModel = require("../models/admin.model")
const albumModel = require("../models/album.model")
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
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);

              if(decoded.role !== "admin"){
                return res.status(401).json({
                    message: "UnAuthorised Access Denied "
                })
              }

              

      const {title} = req.body
      const file = req.file 

      const result = await uploadFile(file.buffer.toString("base64"))

      const Pannel =  await AdminModel.create({
        uri : result.url,
        title ,
        admin : decoded.id ,

      })

      res.status(201).json({
        message : "Pannel Created Sucessfully" ,

        adminInfo : {
            id : Pannel.id,
            uri : Pannel.uri ,
            title : Pannel.title ,
            Admin : Pannel.admin ,

        }
      })

       } 
       catch (error) {
    console.log("ERROR:", error);

    return res.status(401).json({
        message: "Unauthorised",
        error: error.message
    });
}
      


}


async function createAlbum(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorised access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(401).json({ message: "UnAuthorised Access Denied" });
        }

        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            musics,
            admin: decoded.id,
        });

        res.status(201).json({
            message: "Album Created Successfully",
            album: {
                id: album.id,
                title: album.title,
                musics: album.musics,
                admin: album.admin,
            }
        });

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = {createPannel, createAlbum}