const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());

const port = process.env.PORT || 4000;
// const db = process.env.MONGODB_URI;
let users = require("./routes/Users");
let notes = require("./routes/Notes");
let labels = require("./routes/Labels");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors());
// app.use(express.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
// mongoose.connect(db, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   autoIndex: false,
//   useFindAndModify: false,
// });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("Database is connected");
// });
// connection.on('error', err => console.log('Mongodb error: ' + err))

const db = require("./config/keys.js").mongoURI;  
mongoose
  .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      useFindAndModify: false,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database error: " + err));

console.log("database: " + db);
console.log("port: " + port);

app.use(users);
app.use(notes);
app.use(labels);

// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join((__dirname = "/client/build/index.html")));
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendFile(path.join((__dirname = "client/build/index.html")));
  });
}

//Route Operations...
app.get("/", (req, res) => {
  res.send("Root route of server");
});

app.listen(port, () => {
  console.log("Server is online");
});
