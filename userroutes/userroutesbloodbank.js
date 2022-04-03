const User = require("../models/user");
const Profile = require("../models/Profile");
const BloodBank = require("../models/BloodBank");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const bloodBankData = new BloodBank({
      userid: req.body.userid,
      labname: req.body.labname,
      email: req.body.email,
      address: req.body.address,
      mobilenumber: req.body.mobilenumber,
      landmark: req.body.landmark,
      city: req.body.city,
      pincode: req.body.pincode,
      opentime: req.body.opentime,
      componentsavailable: req.body.componentsavailable,
      license: req.body.license,
      licenseissuedate: req.body.licenseissuedate,
    });

    await bloodBankData.save();

    res.status(200).json({ status: "ok", message: "saved successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.get("/get", async (req, res) => {
  try {
    const bloodBankData = await BloodBank.find();
    res.status(200).json({ status: "ok", result: bloodBankData });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    const profileData = await BloodBank.deleteOne({ _id: id });
    res.status(200).json({ status: "ok", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
module.exports = router;
