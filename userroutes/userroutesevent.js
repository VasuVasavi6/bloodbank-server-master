const User = require("../models/user");
const Profile = require("../models/Profile");
const Event = require("../models/Event");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const eventData = new Event({
      userid: req.body.userid,
      eventtitle: req.body.eventtitle,
      eventdescription: req.body.eventdescription,
      eventdate: req.body.eventdate,
      interested: req.body.interested,
    });

    await eventData.save();
    res.status(200).json({ status: "ok", message: "saved successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const eventData = await Event.find();
    console.log(eventData);
    res.status(200).json({ status: "ok", result: eventData });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;

    const eventData = await Event.deleteOne({ _id: id });
    res.status(200).json({ status: "ok", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/updateinterested", async (req, res) => {
  try {
    const id = req.body.eventid;
    const interested = req.body.interested;
    const usersinterested = req.body.usersinterested;

    if (interested) {
      const eventData = await Event.updateOne(
        { _id: id },
        { $inc: { interested: 1 }, usersinterested: usersinterested }
      );
    } else {
      const eventData = await Event.updateOne(
        { _id: id },
        { $inc: { interested: -1 }, usersinterested: usersinterested }
      );
    }
    res
      .status(200)
      .json({ status: "ok", message: "Updated interested successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});

module.exports = router;
