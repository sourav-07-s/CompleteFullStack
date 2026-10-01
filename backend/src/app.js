const express = require("express") 
const multer =require("multer")
const uploadFile = require("./services/storage.service")
const postModel = require("./models/post.model")

const app = express() ;
app.use(express.json());



 const upload =  multer({storage : multer.memoryStorage()})

app.post("/create_post", upload.single("Image") , async (req , res)=> {
  

    const result = await uploadFile(req.file.buffer) ;

     const post = await postModel.create({
        Image : result.url , 
        caption : req.body.caption 

        
     })
      console.log(result)  
     return res.status(201).json({
        message : " post created sucessfully" ,
        post 
     })


     
})

app.get("/posts" , async (req , res)=> { 

        const posts = await postModel.find() ;
        return res.status(200).json({

            message : "all posts fetched sucessfully" ,
            posts
        })

     } )
     

module.exports = app ;