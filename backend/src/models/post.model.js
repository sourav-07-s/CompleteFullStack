const mongoose = require("mongoose") ;

  const postSchema = mongoose.Schema({

    Image : String ,
    Caption : String ,

  })

   const postModel = mongoose.model("post" , postSchema)

   module.exports = postModel