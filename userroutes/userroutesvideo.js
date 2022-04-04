const router = require("express").Router();
const Video = require("../models/Video");

router.post("/add", async (req, res) => {
  try {
    const videoData = new Video({
      url: req.body.url,
    });
    await videoData.save();
    res.status(200).json({ status: "ok", message: "Video saved successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.get("/get", async (req, res) => {
  try {
    const videoData = await Video.find({});
    res.status(200).json({
      status: "ok",
      message: "Data fetched successfully",
      result: videoData,
    });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const videoData = await Video.deleteOne({ _id: req.body.urlid });
    res
      .status(200)
      .json({ status: "ok", message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "not ok", message: "Server error" });
  }
});

module.exports = router;
