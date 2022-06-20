const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const verifyToken = require("./verifyToken");

const ADMIN_CREDENTIAL = {
  email: "lifesaver0606@gmail.com",
  password: "MilkyBar#1",
};

router.post("/login", async (req, res) => {
  try {
    //Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.json({
        status: "not ok",
        auth: false,
        message: "No email found",
      });
    // if (!user) return res.status(400).send("Email not found");

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.json({
        status: "not ok",
        auth: false,
        message: "Password is wrong",
      });
    }

    //Create and assign a token
    const id = user._id,
      email = user.email;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET);
    const result = user;
    let adminCheck = false;
    if (user.email === ADMIN_CREDENTIAL.email) {
      adminCheck = true;
    }
    console.log(user.email, user.password, "admincheck");
    res.json({
      status: "ok",
      auth: true,
      token: token,
      result: result,
      adminCheck: adminCheck,
      message: "Logged In successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/register", async (req, res) => {
  try {
    //Checking if the user is already registered
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.send({
        status: "not ok",
        message: "Email Already Registered",
      });

    //Hashing the password
    const salt = bcrypt.genSaltSync(10);
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const userData = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      dob: req.body.dob,
      gender: req.body.gender,
      bloodgroup: req.body.bloodgroup,
    });
    console.log(userData);
    await userData.save();
    res.status(200).json({ status: "ok", message: "register successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});

router.get("/login", verifyToken, async (req, res) => {
  try {
    if (req.userID) {
      return res.send({
        auth: true,
        loggedIn: true,
        id: req.userID,
        message: "Logged In successfully",
      });
    } else {
      return res.send({
        auth: false,
        loggedIn: false,
        message: "Failed to authenticate",
      });
    }
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const userData = await User.find({}, { password: 0 });
    res.status(200).json({ status: "ok", result: userData });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/getuserdob", async (req, res) => {
  try {
    const userData = await User.find({ _id: req.body.userid }, { password: 0 });
    res.status(200).json({ status: "ok", result: userData[0].dob });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/deleteuser", async (req, res) => {
  try {
    const id = req.body.id;
    const profileData = await User.deleteOne({ _id: id });
    res.status(200).json({ status: "ok", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});

router.post("/changepassword", async (req, res) => {
  try {
    const { userid, oldPassword, newPassword } = req.body;

    const userData = await User.findOne({ _id: userid });

    const validPass = await bcrypt.compare(oldPassword, userData.password);
    if (validPass) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      const updated = await User.findOneAndUpdate(
        { _id: userid },
        { password: hashedPassword }
      );
      console.log(updated);
      res
        .status(200)
        .json({ status: "ok", message: "changed Password successfully" });
    }
    res
      .status(201)
      .json({ status: "not ok", message: "Old Password did't match" });
  } catch (e) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
module.exports = router;
