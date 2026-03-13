const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");
const streakService = require("./streakService");

const config = require("../config/env");

const register = async (email, username, password) => {

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) throw new Error("User exists");

  const hash = await bcrypt.hash(password, 10);

  return userRepository.createUser(email, username, hash);
};

const login = async (email, password) => {

  const user = await userRepository.findByEmail(email);

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) throw new Error("Invalid password");

  await streakService.updateStreak(user);

  const token = jwt.sign(
    { id: user.id },
    config.jwtSecret,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { register, login };