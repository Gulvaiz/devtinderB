const User = require('../models/user')
const jwt = require('jsonwebtoken')


const userAuth = async (req, res, next) => {
   try{
   const cookies = req.cookies
   const { token } = cookies

   const decodedMessage = await jwt.verify(token, "DEV@tinder")

   if(!token){
    return res.status(401).send("Please login!!")
 }

   const { _id } = decodedMessage

   const user = await User.findById(_id)

   if(!user){
       throw new Error("User not found")
   }

   req.user = user

   next()
}
catch(err){
   res.status(400).send("ERROR: "+ err.message)
}
}
 
module.exports = { userAuth };