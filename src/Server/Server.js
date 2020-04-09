const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const PORT = process.env.PORT || 4000;
const app = express();

let users = require("./Routes/Users");
let notes = require("./Routes/Notes");
let labels = require('./Routes/Labels')

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect(process.env.MONGODB_URI ||  "mongodb://localhost:27017/notemaster", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: false,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is connected");
});

app.use(users);
app.use(notes);
app.use(labels);

app.listen(PORT, () => {
  console.log("Server is online");
});
