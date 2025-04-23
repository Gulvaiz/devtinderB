const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema  = mongoose.Schema({
     firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
     },
     lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
     },
     emailId: {
        type: String,
        lowerCase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
          if(!validator.isEmail(value)){
               throw new Error("Invalid Email Address "+ value)
          }
        }
     },
     password:{
        type: String,
        validate(value){
         if(!validator.isStrongPassword(value)){
              throw new Error("Enter strong password "+ value)
         }
       }
     },
     age:{
         type: Number,
         min: 18 
     },
     gender: {
        type: String,
        Validate(value){
         if(!["male", "female", "others"].includes(value)){
            res.status(403).send("error: "+err.message)
         }
        }
     },
     photoURL: {
       type: String,
       default: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
       validate(value){
         if(!validator.isURL(value)){
              throw new Error("Invalid URL"+ value)
         }
       }
     },
     about: {
      type: String,
      default: "This is default bio" 
     },
     skills: {
         type: [String]
     }

}, {timestamps: true})

userSchema.index({ firstName: 1, lastName: 1 })

userSchema.methods.getJWT = async function () {
  const user = this

   const token = await jwt.sign({_id: user._id}, "DEV@tinder",{ expiresIn: "7d" })

   return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
     const user = this

     const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
 
    return isPasswordValid
}

module.exports  = mongoose.model("User", userSchema);
