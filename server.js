
const express = require("express");
const bodyParser = require("body-parser");
const userroute = require("./routes/userRoutes");
const mysqlConnection= require("./connection");

var app= express();
app.use(bodyParser.json());
app.use("/api", userroute);

app.listen(3000);