const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getActivityLogs
} = require("../controllers/ActivityLogController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getActivityLogs
);

module.exports = router;