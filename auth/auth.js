const router = require("express").Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  res.status(200).json({ message: "ok" });
});

module.exports = router;
