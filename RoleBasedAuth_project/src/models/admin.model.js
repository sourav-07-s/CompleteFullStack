const mongoose = require("mongoose" ) ;


const adminSchema =  new mongoose.Schema({
    uri : {
        type : String ,
        required : true
    } ,

    title :{
        type : String ,
        required : true 
    },
    admin : {
        type : mongoose.Schema.types.ObjectId ,
        ref : "user" ,
        required : true 
    }
})


const AdminModel =  mongoose.model("admin", adminSchema) ;

module.exports = AdminModel ;