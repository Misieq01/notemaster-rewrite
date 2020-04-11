const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT;
const db = process.env.MONGODB_URI;
let users = require("./routes/Users");
let notes = require("./routes/Notes");
let labels = require('./routes/Labels')

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false,
    useFindAndModify: false,
  });
  
console.log(db)
console.log(PORT);

  const connection = mongoose.connection;
  
  connection.once("open", () => {
    console.log("Database is connected");
  });
  connection.on('error', err => console.log('Mongodb error: ' + err))
  
  app.use(users);
  app.use(notes);
  app.use(labels);

  app.use(express.static(path.join(__dirname, "client/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join((__dirname, "/client/build/index.html")));
  });
  
app.listen(PORT, () => {
  console.log("Server is online");
});
