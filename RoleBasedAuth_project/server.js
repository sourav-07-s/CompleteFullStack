require("dotenv").config();


const app =  require('./src/app') ;
const dbConnect = require('./src/db/db') ;






dbConnect() ;   

app.listen(3000 ,()=>{
    console.log("server is running on port 3000") ;
})