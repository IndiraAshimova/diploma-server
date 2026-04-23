const pool = require("../config/db");

//
// =====================
// USERS CORE
// =====================
//

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

//
// =====================
// REGISTER (IMPORTANT FIX)
// создаём сразу с verification_token
// =====================
//

const createUser = async (email, username, passwordHash, token) => {
  const result = await pool.query(
    `INSERT INTO users 
    (email, username, password_hash, xp, level, streak, is_verified, verification_token)
    VALUES ($1, $2, $3, 0, 1, 1, false, $4)
    RETURNING *`,
    [email, username, passwordHash, token]
  );

  return result.rows[0];
};

//
// =====================
// XP / STREAK
// =====================
//

const updateXP = async (id, xp, level) => {
  await pool.query(
    "UPDATE users SET xp = $1, level = $2 WHERE id = $3",
    [xp, level, id]
  );
};

const updateStreak = async (id, streak) => {
  await pool.query(
    "UPDATE users SET streak = $1, last_login = CURRENT_DATE WHERE id = $2",
    [streak, id]
  );
};

//
// =====================
// EMAIL VERIFICATION
// =====================
//

const findByVerificationToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE verification_token = $1",
    [token]
  );
  return result.rows[0];
};

const verifyUser = async (id) => {
  await pool.query(
    `UPDATE users 
     SET is_verified = TRUE, verification_token = NULL 
     WHERE id = $1`,
    [id]
  );
};

const setVerificationToken = async (id, token) => {
  await pool.query(
    `UPDATE users 
     SET verification_token = $1 
     WHERE id = $2`,
    [token, id]
  );
};

//
// =====================
// RESET PASSWORD
// =====================
//

const setResetToken = async (id, token, expires) => {
  await pool.query(
    `UPDATE users 
     SET reset_token = $1, reset_token_expires = $2 
     WHERE id = $3`,
    [token, expires, id]
  );
};

const findByResetToken = async (token) => {
  const result = await pool.query(
    `SELECT * FROM users 
     WHERE reset_token = $1 
     AND reset_token_expires > NOW()`,
    [token]
  );
  return result.rows[0];
};

const updatePassword = async (id, passwordHash) => {
  await pool.query(
    `UPDATE users 
     SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL 
     WHERE id = $2`,
    [passwordHash, id]
  );
};

//
// =====================
// EXPORT
// =====================
//

module.exports = {
  findByEmail,
  findById,

  createUser,

  updateXP,
  updateStreak,

  findByVerificationToken,
  verifyUser,
  setVerificationToken,

  setResetToken,
  findByResetToken,
  updatePassword,
};