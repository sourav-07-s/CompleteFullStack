const mongoose = require("mongoose" ) ;


const MusicsSchema =  new mongoose.Schema({
    uri : {
        type : String ,
        required : true
    } ,

    title :{
        type : String ,
        required : true 
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user" ,
        required : true 
    }
})


const MusicsModel =  mongoose.model("musics", MusicsSchema) ;

module.exports = MusicsModel ;