const pool = require("../config/db");

const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const createUser = async (email, username, passwordHash) => {
  const result = await pool.query(
    "INSERT INTO users (email, username, password_hash, xp, level, streak) VALUES ($1,$2,$3,0,1,1) RETURNING *",
    [email, username, passwordHash]
  );

  return result.rows[0];
};

const updateXP = async (id, xp, level) => {
  await pool.query(
    "UPDATE users SET xp=$1, level=$2 WHERE id=$3",
    [xp, level, id]
  );
};

const updateStreak = async (id, streak) => {
  await pool.query(
    "UPDATE users SET streak=$1, last_login=CURRENT_DATE WHERE id=$2",
    [streak, id]
  );
};

// Найти по токену верификации
const findByVerificationToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE verification_token = $1",
    [token]
  );
  return result.rows[0];
};

// Найти по токену сброса пароля
const findByResetToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()",
    [token]
  );
  return result.rows[0];
};

// Подтвердить email
const verifyUser = async (id) => {
  await pool.query(
    "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = $1",
    [id]
  );
};

// Сохранить токен верификации при регистрации
const setVerificationToken = async (id, token) => {
  await pool.query(
    "UPDATE users SET verification_token = $1 WHERE id = $2",
    [token, id]
  );
};

// Сохранить токен сброса пароля
const setResetToken = async (id, token, expires) => {
  await pool.query(
    "UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE id = $3",
    [token, expires, id]
  );
};

// Обновить пароль и очистить токен
const updatePassword = async (id, passwordHash) => {
  await pool.query(
    "UPDATE users SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2",
    [passwordHash, id]
  );
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateXP,
  updateStreak,
  findByVerificationToken,  // новое
  findByResetToken,          // новое
  verifyUser,                // новое
  setVerificationToken,      // новое
  setResetToken,             // новое
  updatePassword,            // новое
};