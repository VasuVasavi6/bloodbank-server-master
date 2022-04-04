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
const userRouterProfile = require("./userroutes/userroutesprofile.js");
const userRouterEvent = require("./userroutes/userroutesevent.js");
const userRouterBloodBank = require("./userroutes/userroutesbloodbank.js");
const userRouterPlasmaBank = require("./userroutes/userroutesplasmabank.js");
const userRouterVideo = require("./userroutes/userroutesvideo.js");

app.get("/", (req, res) => {
  res.send("Welcome to the application");
});
app.use("/api/auth", authRouter);
app.use("/api/userroutesprofile", userRouterProfile);
app.use("/api/userroutesevent", userRouterEvent);
app.use("/api/userroutesbloodbank", userRouterBloodBank);
app.use("/api/userroutesplasmabank", userRouterPlasmaBank);
app.use("/api/userroutesvideo", userRouterVideo);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
