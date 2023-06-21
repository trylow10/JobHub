const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
const init = require("./search/init")
const url = process.env.MONGO_LINK;
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

const app = express();
app.use(cors());
app.use(express.json({limit: '7mb'}));
con.on("open", () => console.log("Connected to DB"));

app.use("/api/login", require("./routes/login"));
app.use("/api/register", require("./routes/register"));
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/job", require("./routes/job"));
app.use("/api/application", require("./routes/application"));

if(process.env.SEARCH_INDEX){
  init()
  app.use("/api/search", require("./search/index"));
}

app.listen("5000", () => console.log("Server Started on Port: 5000"));
