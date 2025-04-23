const express = require('express')
const authRouter = express.Router()
const User = require("../models/user.js")

const bcrypt = require("bcrypt")
const { validateSignUp } = require('../util/validation.js')

authRouter.get("/", (req,res) => {
  res.send("hello server is running")
}) 

authRouter.post("/signup", async (req, res) => {
    
    validateSignUp(req)
   
    const { firstName, lastName, emailId, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash
    })

     try{
        const savedUser = await user.save()
        const token = await savedUser.getJWT()
        res.cookie("token", token,  { expires: new Date(Date.now() + 8 * 3600000)})

        res.json( {
            message: "user added successfully",
            data: savedUser
        })
     }
    catch(err){
        res.send("Error in saving user: " + err.message)
    }
      
})

authRouter.post("/login", async (req, res) => {
    try{
    const { emailId, password } = req.body
    
         const user = await User.findOne({ emailId: emailId})
        
         if(!user){
             throw new Error("Invalid credentials")
            }

            const isPasswordValid = await user.validatePassword(password)
            if(isPasswordValid){

                const token = await user.getJWT()
                res.cookie("token", token,  { expires: new Date(Date.now() + 8 * 3600000)})
                
                res.send(user)
            }
         else{
            throw new Error("Invalid credentials")
         }
     }
     catch(err){
        res.status(400).send("ERROR : "+ err.message)
     }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) })

     res.send("logout successful!!")
     
})

module.exports = authRouter