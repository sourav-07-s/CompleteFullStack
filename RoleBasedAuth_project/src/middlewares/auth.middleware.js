const jwt = require("jsonwebtoken")



async function authAdmin(req, res ,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "UnAuthorised Acess"
})
}

    try {

        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;

        if(decoded.role !== "admin"){
            return res.status(403).json({
                message : "You Do Not Have Admin Access"
            })
        }

         req.user =  decoded 

        next() ;

    } catch(error){
        return res.status(401).json({
            message: "Unauthorised",
            error: error.message
        });
    }
}


async function authUser(req, res ,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "UnAuthorised Acess"
        }) 
    }

    try {

        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;

        if(decoded.role !== "user" && decoded.role !== "admin"){
            return res.status(403).json({
                message : "You Do Not Have User Access"
            })
        }

        req.user =  decoded

        next() ;

    }
    catch(error){
        return res.status(401).json({
            message: "Unauthorised",
            error: error.message
        });
    }
}


   module.exports = {authAdmin , authUser}