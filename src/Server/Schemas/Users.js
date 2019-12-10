const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const userSchema = mongoose.Schema({
  firstName: { type: String, trim: true, require: true },
  lastName: { type: String, trim: true, require: true },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: { type: String, require: true, trim: true, minLength: 7 },
  data: { type: mongoose.Schema.Types.ObjectId, ref: "Data" },
  tokens: [
    {
      token: { type: String }
    }
  ]
});

// This method apply to every request of getting user data
// Becasue toJSON is called with every data request
userSchema.methods.toJSON = function() {
    //Passing user data with extra fields from mongoose processing to user constant
  const user = this

  // Return pure user data object (like the userSchema)
  const userObject = user.toObject();

  // Deleting fields that should be hidden
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};


// Simple method to return full name of user
userSchema.methods.GetFullName = function() {
  const user = this

  return user.firstName + user.lastName;
};

userSchema.methods.GenerateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},'venividivici')

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.statics.FindByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user) {throw new Error("There is no registered user on this email")}
    const isMatch = await bcryptjs.compare(password,user.password)
    if(!isMatch){throw new Error('Incorrect email or password')}

    return user
}

userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password,8)
    }

    next()
})

//Defining user data model
const User = mongoose.model("User", userSchema);

module.exports = User;
