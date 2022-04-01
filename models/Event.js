const mongoose = require("mongoose");

const Event = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    eventtitle: { type: String, required: true },
    eventdescription: { type: String, required: true },
    eventdate: { type: String, required: true },
    interested: { type: Number, required: true, default: 0 },
    usersinterested: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", Event);
