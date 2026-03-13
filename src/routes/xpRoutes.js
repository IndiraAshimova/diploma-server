const express = require("express");
const router = express.Router();
const { addXP } = require("../controllers/xpController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addXP);

module.exports = router;