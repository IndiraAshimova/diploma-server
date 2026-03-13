const express = require("express");
const router = express.Router();
const streakController = require("../controllers/streakController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, streakController.getStreak);

module.exports = router;