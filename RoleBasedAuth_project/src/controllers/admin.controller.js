const AdminModel = require("../models/admin.model")
const albumModel = require("../models/album.model")
const {uploadFile} = require("../services/storage.service")



async function createPMusics(req , res){

      const {title} = req.body
      const file = req.file 

      const result = await uploadFile(file.buffer.toString("base64"))

      const Pannel =  await AdminModel.create({
        uri : result.url,
        title ,
        admin : req.user.id ,

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

async function CreateAlbum(req , res){

  

    const {title , musics} = req.body ;


      const Album = await albumModel.create({
        title ,
        musics ,
        admin : req.user.id
      })
   
      res.status(201).json({
        message : " Album created sucessfully" ,

        AlbumInfo : {
            id : Album.id ,
            title : Album.title ,
            admin :Album.admin ,
            musics : Album.musics
          }
      })



}


async function getAllmusics(req , res){


   const musics = await AdminModel.find().populate("admin" , "username email role") ;


   res.status(200).json({
    message :  " Musics fetched sucessfully" ,
    musics : musics 
   })

}

async function getAllAlbums(req , res){

  const albums = await albumModel.find().select("title admin").populate("admin" , "username email role") ;

  res.status(200).json({
    message : "Albums fetched sucessfully" ,
    albums : albums
  })


}
 

module.exports = {createPMusics , CreateAlbum , getAllmusics , getAllAlbums}