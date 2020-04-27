const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: { type: String, trim: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  tokens: [
    {
      token: { type: String },
    },
  ],
});

// This method apply to every request of getting user data
// Becasue toJSON is called with every data request
userSchema.methods.toJSON = function () {
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
userSchema.methods.GetFullName = function () {
  // "this" keyword containt user data which execute this method
  const user = this;

  return user.firstName + user.lastName;
};

userSchema.methods.DeleteNote = async function (noteId) {
  const user = this;
  const index = user.notes.indexOf(noteId);
  user.notes.splice(index, 1);
  await user.save();
  return user;
};

userSchema.methods.deleteLabel = async function (labelId) {
  const user = this;
  const index = user.labels.indexOf(labelId);
  user.labels.splice(index, 1);
  await user.save();
  return user;
};

userSchema.methods.GenerateAuthToken = async function () {
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

userSchema.methods.returnNotes = async function () {
  const user = this;

  const { notes } = await User.findById(user._id).populate({
    path: "notes",
    model: "Note",
    populate: {
      path: "labels",
      model: "Label",
      select: { name: 1, _id: 1 },
    },
  });
  return notes
};

userSchema.statics.validateData = async (data) => {
  const { firstName, lastName, email, password, passwordConf } = data;
  const isTaken = await User.findOne({ email: email });
  if (firstName.length <= 0) throw { message: "This field can't be empty", field: "firstName" };
  if (lastName.length <= 0) throw { message: "This field can't be empty", field: "lastName" };
  if (email.length <= 0) throw { message: "This field can't be empty", field: "email" };
  if (!validator.isEmail(email)) throw { message: "Invalid email", field: "email" };
  if (isTaken) throw { message: "Email is already taken", field: "email" };
  if (password.length < 8) throw { message: "Password doesn't meet requirements", field: "password" };
  if (password !== passwordConf) throw { message: "Passwords don't match", field: "passwordConf" };
  delete data.passwordConf;
  return data;
};

userSchema.statics.FindByCredentials = async (email, password) => {
  // Checking if email is valid
  if (!validator.isEmail(email)) {
    throw { message: "Email is invalid", field: "email" };
  }
  //Finding user by his email
  const user = await User.findOne({ email });
  if (!user) {
    throw { message: "There is no user registered on this email", field: "email" };
  }
  //Checking for correct password
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw { message: "Incorect password", field: "password" };
  }

  //If all good send back user
  return user;
};

//This method fires each time user document is saved
userSchema.pre("save", async function (next) {
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
