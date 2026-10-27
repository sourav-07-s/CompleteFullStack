const mongoose = require('mongoose') ;

const modelSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true
    } ,

    email :{
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true
    } ,

    role:{
        type : String ,
        enum :['user','admin'] ,
        default : 'user'

    }
})

const userModel = mongoose.model('user',modelSchema) ;  

 module.exports = userModel ;