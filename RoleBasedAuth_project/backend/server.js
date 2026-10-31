require("dotenv").config();


const app =  require('./src/app') ;
const dbConnect = require('./src/db/db') ;



const PORT = process.env.PORT || 3000;


dbConnect() ;   




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});