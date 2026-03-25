require("dotenv").config();
const pool = require("./src/config/db");

const migrate = async () => {
  try {
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`);
    console.log("is_verified добавлен");

    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token TEXT;`);
    console.log("verification_token добавлен");

    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT;`);
    console.log("reset_token добавлен");

    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMPTZ;`);
    console.log("reset_token_expires добавлен");

    console.log("Миграция завершена успешно!");
    process.exit(0);
  } catch (err) {
    console.error("Ошибка миграции:", err.message);
    process.exit(1);
  }
};

migrate();

