const express = require('express')
const cookieParser = require('cookie-parser') ;
const Authrouter = require("./routes/auth.route")
const adminrouter = require('./routes/admin.route')



  const app = express()

app.use(express.json()) ;
app.use(cookieParser()) ; 



 app.use('/api/auth',Authrouter) ;
 app.use('/api/admin' , adminrouter)



module.exports = app ;