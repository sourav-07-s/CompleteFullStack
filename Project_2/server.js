const app = require('./src/app');
const connectDb = require("./db/db") 

connectDb() ;



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
