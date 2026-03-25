const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const streakService = require("./streakService");
const emailService = require("./emailService");
const config = require("../config/env");

// Валидация email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const register = async (email, username, password) => {
  // Проверка формата email
  if (!isValidEmail(email)) {
    throw new Error("Некорректный формат email");
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error("Пользователь с таким email уже существует");

  const hash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(email, username, hash);

  // Генерируем токен верификации
  const token = crypto.randomBytes(32).toString("hex");
  await userRepository.setVerificationToken(user.id, token);

  // Отправляем письмо
  await emailService.sendVerificationEmail(email, token);

  return { message: "Регистрация успешна. Проверьте почту для подтверждения." };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("Пользователь не найден");

  // Проверяем подтверждён ли email
  if (!user.is_verified) {
    throw new Error("Email не подтверждён. Проверьте вашу почту.");
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Неверный пароль");

  await streakService.updateStreak(user);

  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "1h" });
  return token;
};

const verifyEmail = async (token) => {
  const user = await userRepository.findByVerificationToken(token);
  if (!user) throw new Error("Неверный или устаревший токен");

  await userRepository.verifyUser(user.id);
  return { message: "Email успешно подтверждён. Теперь вы можете войти." };
};

const forgotPassword = async (email) => {
  const user = await userRepository.findByEmail(email);
  // Не сообщаем существует ли email — защита от перебора
  if (!user) return { message: "Если email существует, письмо отправлено." };

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 час

  await userRepository.setResetToken(user.id, token, expires);
  await emailService.sendPasswordResetEmail(email, token);

  return { message: "Если email существует, письмо отправлено." };
};

const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) throw new Error("Токен недействителен или истёк");

  const hash = await bcrypt.hash(newPassword, 10);
  await userRepository.updatePassword(user.id, hash);

  return { message: "Пароль успешно изменён." };
};

module.exports = { register, login, verifyEmail, forgotPassword, resetPassword };