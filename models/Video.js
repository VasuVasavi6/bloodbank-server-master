const mongoose = require("mongoose");

const Video = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", Video);
