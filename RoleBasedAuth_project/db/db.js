const mongoose = require('mongoose') ;


 async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
         console.log("db connected successfully") ;
    }
    catch(error){
         console.log("error in connecting to db",error) ;
    }
 }

 module.exports = connectDb ;