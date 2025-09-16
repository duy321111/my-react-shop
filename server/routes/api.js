const express = require("express");
const router = express.Router();

// ví dụ route test
router.get("/test", (req, res) => {
  res.send("API working!");
});

module.exports = router;
