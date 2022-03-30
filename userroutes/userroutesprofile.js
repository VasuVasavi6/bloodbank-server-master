const User = require("../models/user");
const Profile = require("../models/Profile");
const router = require("express").Router();

router.post("/addprofile", async (req, res) => {
  try {
    const profileData = new Profile({
      userid: req.body.userid,
      bio: req.body.bio,
      weight: req.body.weight,
      lastdonationdate: req.body.lastdonationdate,
      mobilenumber: req.body.mobilenumber,
      disease: req.body.disease,
      availability: req.body.availability,
      state: req.body.state,
      district: req.body.district,
      city: req.body.city,
    });

    await profileData.save();
    res.status(200).json({ staus: "ok", message: "saved successfully" });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});

router.get("/getprofiles", async (req, res) => {
  try {
    const profileData = await Profile.find();
    console.log(profileData);
    res.status(200).json({ staus: "ok", result: profileData });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});

router.post("/findprofile", async (req, res) => {
  try {
    const profileData = await Profile.find({ userid: req.body.id });
    res.status(200).json({ staus: "ok", result: profileData });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});

router.post("/updateprofile", async (req, res) => {
  try {
    const id = req.body.id;

    const obj = {
      bio: req.body.bio,
      weight: req.body.weight,
      lastdonationdate: req.body.lastdonationdate,
      mobilenumber: req.body.mobilenumber,
      disease: req.body.disease,
      availability: req.body.availability,
      state: req.body.state,
      district: req.body.district,
      city: req.body.city,
    };
    let doc = await Profile.findOneAndUpdate({ userid: id }, obj, {
      upsert: true,
    });

    res.status(200).json({ status: "ok", message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});

router.post("/deleteprofile", async (req, res) => {
  try {
    const id = req.body.userid;

    const profileData = await Profile.deleteOne({ userid: id });
    res.status(200).json({ status: "ok", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});
module.exports = router;
