const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  tokens: [
    {
      token: { type: String }
    }
  ]
});

// This method apply to every request of getting user data
// Becasue toJSON is called with every data request
userSchema.methods.toJSON = function() {
  // "this" keyword containt user data which execute this method
  const user = this;

  // Return pure user data object (like the userSchema) with data of passed user
  // So in otherwords it cuts all properties and methods added to this object by database
  // And leave only ones that are declared in userSchema (firstName,lastName,email,etc.)
  const userObject = user.toObject();

  // Deleting fields that should be hidden
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Simple method to return full name of user
userSchema.methods.GetFullName = function() {
  // "this" keyword containt user data which execute this method
  const user = this;

  return user.firstName + user.lastName;
};

userSchema.methods.DeleteNote = async function(noteId) {
  const user = this;
  console.log(user)
  const index = user.notes.indexOf(noteId);
  user.notes.splice(index, 1);
  return user;
};

userSchema.methods.GenerateAuthToken = async function() {
  // "this" keyword containt user data which execute this method
  const user = this;

  // Creating user session token based on user id with the help of json web token library
  const token = jwt.sign({ _id: user._id.toString() }, "venividivici");

  //Adding token to user data to allow him to access his account
  //And all routes that require authentication
  user.tokens = user.tokens.concat({ token });

  //Saving updated data
  await user.save();

  return token;
};

userSchema.statics.FindByCredentials = async (email, password) => {
  //Finding user by his email
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("There is no registered user on this email");
  }
  //Checking for correct password
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw Error("Incorrect email or password");
  }

  //If all good send back user
  return user;
};

//This method fires each time user document is saved
userSchema.pre("save", async function(next) {
  // "this" keyword containt user data which execute this method
  const user = this;

  // Checking for password update
  // Simply this is true when creating account or changing password
  if (user.isModified("password")) {
    //Hashing user password for security reason
    user.password = await bcryptjs.hash(user.password, 8);
  }

  //It's working like middleware so we need to tell program to move on
  next();
});

//Defining user data model
const User = mongoose.model("User", userSchema);

module.exports = User;
