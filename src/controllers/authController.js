const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log("[register] попытка регистрации:", email);
    const result = await authService.register(email, username, password);
    console.log("[register] успех:", email);
    res.status(201).json(result);
  } catch (err) {
    console.error("[register] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[login] попытка входа:", email);
    const token = await authService.login(email, password);
    console.log("[login] успех:", email);
    res.json({ token });
  } catch (err) {
    console.error("[login] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("[verifyEmail] токен:", token);
    const result = await authService.verifyEmail(token);
    console.log("[verifyEmail] успех");
    res.json(result);
  } catch (err) {
    console.error("[verifyEmail] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("[forgotPassword] запрос для:", email);
    const result = await authService.forgotPassword(email);
    console.log("[forgotPassword] успех");
    res.json(result);
  } catch (err) {
    console.error("[forgotPassword] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log("[resetPassword] попытка сброса пароля");
    const result = await authService.resetPassword(token, newPassword);
    console.log("[resetPassword] успех");
    res.json(result);
  } catch (err) {
    console.error("[resetPassword] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, verifyEmail, forgotPassword, resetPassword };