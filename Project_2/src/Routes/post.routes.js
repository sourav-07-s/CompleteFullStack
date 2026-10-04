const express = require('express') ;
const jwt = require('jsonwebtoken') ;



const router = express.Router() ;

router.post('/create',(req,res)=>{

    const token = req.cookies.token ;

    if(!token){
        return res.status(401).json({
            message : " unauthorized access , plese login "
        })
    }

     try {
        jwt.verify(token , process.env.JWT_SECRET) ;
            res.send({
              message : 'Post created successfully'
    })

     } catch (error) {
        return res.status(401).json({
            message : " invalid token "
        })
     }


   
} ) ;



module.exports = router ;