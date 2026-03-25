const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const streakService = require("./streakService");
const emailService = require("./emailService");
const config = require("../config/env");

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const register = async (email, username, password) => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error("User with this email already exists");
  const hash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(email, username, hash);
  const token = crypto.randomBytes(32).toString("hex");
  await userRepository.setVerificationToken(user.id, token);
  await emailService.sendVerificationEmail(email, token);
  return { message: "Registration successful. Please check your email to confirm." };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("User not found");
  if (!user.is_verified) {
    throw new Error("Email not verified. Please check your inbox.");
  }
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid password");
  await streakService.updateStreak(user);
  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "1h" });
  return token;
};

const verifyEmail = async (token) => {
  const user = await userRepository.findByVerificationToken(token);
  if (!user) throw new Error("Invalid or expired token");
  await userRepository.verifyUser(user.id);
  return { message: "Email verified successfully. You can now log in." };
};

const forgotPassword = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) return { message: "If this email exists, a reset link has been sent." };
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  await userRepository.setResetToken(user.id, token, expires);
  await emailService.sendPasswordResetEmail(email, token);
  return { message: "If this email exists, a reset link has been sent." };
};

const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) throw new Error("Token is invalid or has expired");
  const hash = await bcrypt.hash(newPassword, 10);
  await userRepository.updatePassword(user.id, hash);
  return { message: "Password changed successfully." };
};

module.exports = { register, login, verifyEmail, forgotPassword, resetPassword };