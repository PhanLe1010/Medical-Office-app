const express = require("express");
const path = require("path");
const bodyParse = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require('./config/database');

const app = express();
var PORT = process.env.PORT || 8080;

// Connect To Database
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

//CORS middleware
app.use(cors());
//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//When the users request to any route, we will pass the controler to our Agular app
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

//start server
app.listen(PORT, () => {
  console.log("server started on port"+PORT);
})
