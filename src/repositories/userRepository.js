const pool = require("../config/db");

// CREATE USER
const createUser = async (email, username, passwordHash) => {
  const result = await pool.query(
    `INSERT INTO users (email, username, password_hash, xp, level, streak, is_verified)
     VALUES ($1, $2, $3, 0, 1, 1, false)
     RETURNING *`,
    [email, username, passwordHash]
  );

  return result.rows[0];
};

// VERIFY USER
const verifyUser = async (id) => {
  await pool.query(
    `UPDATE users 
     SET is_verified = true, verification_token = NULL 
     WHERE id = $1`,
    [id]
  );
};

// TOKEN HELPERS
const setVerificationToken = async (id, token) => {
  await pool.query(
    `UPDATE users SET verification_token = $1 WHERE id = $2`,
    [token, id]
  );
};

const findByVerificationToken = async (token) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE verification_token = $1`,
    [token]
  );

  return result.rows[0];
};

// RESET PASSWORD
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

const updatePassword = async (id, hash) => {
  await pool.query(
    `UPDATE users 
     SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL 
     WHERE id = $2`,
    [hash, id]
  );
};

module.exports = {
  createUser,
  verifyUser,
  setVerificationToken,
  findByVerificationToken,
  setResetToken,
  findByResetToken,
  updatePassword
};