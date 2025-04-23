const validator = require("validator")

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body
       if(!firstName && !lastName){
           throw new Error("Enter valid username")
       }
       else if(!firstName > 4 && !lastName > 4){
         throw new Error("Username must be greater than 4 alphabets")
       }
       else if(!validator.isEmail(emailId)){
             throw new Error("Invalid Email Address")
       }
       else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password")
  }
}

const validateEditProfileData = (req) => {
      const allowedEditProfileData = [
          "firstName" ,
          "lastName",
          "about", 
          "gender" , 
          "photoURL",
          "emailId",
          "age",
          "skills"
      ]

      const isEditAllowed = Object.keys(req.body).every(field => allowedEditProfileData.includes(field))

      return isEditAllowed
    }

module.exports = {
    validateSignUp,
    validateEditProfileData
}