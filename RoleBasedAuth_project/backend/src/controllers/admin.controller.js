const MusicsModel = require("../models/Musics.model")
const albumModel = require("../models/album.model")
const {uploadFile} = require("../services/storage.service")



async function createPMusics(req , res){

      const {title} = req.body
      const file = req.file 

      const result = await uploadFile(file.buffer.toString("base64"))

      const Pannel =  await MusicsModel.create({
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


   const musics = await MusicsModel.find().limit(20).populate("admin" , "username email role") ;


   res.status(200).json({
    message :  " Musics fetched sucessfully" ,
    musics : musics 
   })

}

async function getAllAlbums(req , res){

  const albums = await albumModel.find().select("title admin").populate("admin" , "username email ") ;

  res.status(200).json({
    message : "Albums fetched sucessfully" ,
    albums : albums
  })


}
 
async function getAllAlbumById(req , res){

 const  albumId = req.params.id

 const album = await albumModel.findById(albumId).populate("admin" , " username email").populate("musics" , "title uri") ;
  
 res.status(200).json({
    message : "Album fetched sucessfully" ,
    album : album
  })

}

module.exports = {createPMusics , CreateAlbum , getAllmusics , getAllAlbums , getAllAlbumById}