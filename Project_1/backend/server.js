require("dotenv").config() ;
const  app = require("./src/app")
const conntectDb = require("./src/db/db")

conntectDb();


app.listen(3000, ()=> {
    console.log(" Server was Sucessfully running")
})