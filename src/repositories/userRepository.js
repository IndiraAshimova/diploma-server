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

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateXP,
  updateStreak
};