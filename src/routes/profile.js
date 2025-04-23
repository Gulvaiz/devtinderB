const express = require("express")
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../util/validation")
const user = require("../models/user")
const profileRouter = express.Router()
const validator = require('validator')


profileRouter.get("/profile", userAuth ,async (req, res) => {
    try{
    const user = req.user
     res.send(user)
}
catch(err){
    res.status(400).send("ERROR: "+ err.message)
}
})

profileRouter.patch("/profile/edit", userAuth ,async (req, res) => {
  
    try{
        if(!validateEditProfileData(req)){
              throw new Error("Update not allowed")
        }

       const loggedInUser = req.user
       

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

        await loggedInUser.save()

        res.json({
           message: `${loggedInUser.firstName}, your profile is updated successfully`,
           data : loggedInUser
        })
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
})

// profileRouter.put("/updatePassword", userAuth, async (req, res) => {
//      const loggedInUserPassword = req.user.password 
//      const { password } = req.body
//      const isPasswordValid =  validator.isPasswordValid(password)

//      try{
//         if(isPasswordValid){
//              loggedInUserPassword = password
//              await user.save()
//              res.send("Password  is updated successfully")
//         }

//      }
//      catch(err){
//          res.status(400).send("ERROR: " + err.message)
//      }
     

// })

module.exports = profileRouter