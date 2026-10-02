
const express = require('express');

const app = express();
const authRoutes = require("./Routes/auth.routes") ;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api/auth', authRoutes) ; // Mount the auth routes at /api/auth



module.exports = app;