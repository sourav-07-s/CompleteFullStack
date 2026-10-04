
const express = require('express');

const app = express();
const authRoutes = require("./Routes/auth.routes") ;
const cookieParser = require('cookie-parser') ;
const postRoutes = require("./Routes/post.routes")


app.use(cookieParser()) ; // Middleware to parse cookies 
app.use(express.json()); // Middleware to parse JSON request bodies



app.use('/api/auth', authRoutes) ; // Mount the auth routes at /api/auth
app.use('/api/posts', postRoutes) ; // Mount the post routes at /api/posts
 



module.exports = app;