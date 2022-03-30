const User = require("../models/user");
const Profile = require("../models/Profile");
const PlasmaBank = require("../models/PlasmaBank");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const plasmaBankData = new PlasmaBank({
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

    await plasmaBankData.save();

    res.status(200).json({ status: "ok", message: "saved successfully" });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});
router.get("/get", async (req, res) => {
  try {
    const plasmaBankData = await PlasmaBank.find();
    res.status(200).json({ staus: "ok", result: plasmaBankData });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const id = req.body.userid;

    const plasmaBankData = await PlasmaBank.deleteOne({ userid: id });
    res.status(200).json({ status: "ok", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ staus: "not ok", message: "Server error" });
  }
});

module.exports = router;
