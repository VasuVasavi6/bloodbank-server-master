const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require("./auth/auth.js");

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
