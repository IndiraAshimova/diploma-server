const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify-email", authController.verifyEmail);      // GET Ч переход по ссылке из письма
router.get("/test-email", async (req, res) => {
  await emailService.sendVerificationEmail(
    "indira20041104@gmail.com",
    "test-token"
  );

  res.send("sent");
});
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;