const userModel = require('../models/user.model') ;
const jwt = require('jsonwebtoken') ;



async function registerUser(req , res){
    const { username , email , password } = req.body ;


 const isAlreadyRegistered = await userModel.findOne({ email }) ;
    if(isAlreadyRegistered){
        return res.status(409).json({
            message : 'Email already registered'
        })
    }


    const user = await userModel.create({ username , email , password }) ;


    const token = jwt.sign({
        id : user._id
        
    },process.env.JWT_SECRET 
)
      res.cookie('token', token)


    res.status(201).json({
        message : 'User registered successfully' ,
        user ,
        token
    })
}


module.exports = { registerUser } ;