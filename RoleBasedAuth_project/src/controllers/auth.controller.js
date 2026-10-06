const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const isuseralreadyExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isuseralreadyExist) {
    return res.status(409).json({
      message: " user already exists ",
    });
  }

  try {
  } catch (error) {}

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: " user registerd sucessfully",
    user: {
      id: user._id,
      username: user.username,
      emial: user.email,
      role: user.role,
    },
  });
}


  

 async function loginUser(req, res){
    
   const {username , email , password} = req.body ;


    const user = await userModel.findOne({
      $or : [
         {username} ,
         {email}
      ]

    })

   if(!user){
    return  res.status(401).json({
      message : " invalid cradentials "
    })
   }

   const isPasswordValid = await bcrypt.compare(password , user.password) ;

   if(!isPasswordValid){
     return  res.status(401).json({
      message : " invalid cradentials "
    })
   }

    const token = jwt.sign({
      id : user._id ,
      role : user.role
    } , process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
      message : "user login sucessfully" ,

      user : {
        id : user._id ,
        email : user.email ,
        username : user.username ,
        role: user.role
      }
    })

 }


 

module.exports = { registerUser , loginUser };

