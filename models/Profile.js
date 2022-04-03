const mongoose = require("mongoose");

const Profile = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    weight: { type: String, required: true },
    lastdonationdate: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    disease: { type: String, required: true },
    availability: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    lat: { type: String, required: true },
    city: { type: String, required: true },
    long: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", Profile);
