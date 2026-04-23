require("dotenv").config();
const pool = require("./src/config/db");

const migrate = async () => {
  try {
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
    `);

    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS verification_token TEXT;
    `);

    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS reset_token TEXT;
    `);

    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMPTZ;
    `);

    console.log("Миграция завершена!");
  } catch (err) {
    console.error("Ошибка миграции:", err.message);
  }
};

module.exports = migrate;