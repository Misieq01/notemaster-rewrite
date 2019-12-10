const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const PORT = 4000;
const app = express();

let auth = require("./Routes/Users");

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

mongoose.connect("mongodb://localhost:27017/notemaster", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: false
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is connected");
});

app.use(auth);

app.listen(PORT, () => {
  console.log("Server is online");
});
