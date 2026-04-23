const pool = require("../config/db");

const cleanupUnverifiedUsers = async () => {
  try {
    const result = await pool.query(`
      DELETE FROM users
      WHERE is_verified = false
      AND created_at < NOW() - INTERVAL '5 minutes'
    `);

    console.log(`Cleanup done. Deleted: ${result.rowCount}`);
  } catch (err) {
    console.error("Cleanup error:", err.message);
  }
};

module.exports = cleanupUnverifiedUsers;