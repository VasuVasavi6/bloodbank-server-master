const mongoose = require("mongoose");

const PlasmaBank = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    labname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    opentime: { type: String, required: true },
    componentsavailable: { type: String, required: true },
    license: { type: String, required: true },
    licenseissuedate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlasmaBank", PlasmaBank);
