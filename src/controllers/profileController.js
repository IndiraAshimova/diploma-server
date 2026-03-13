const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT email, username, xp, level, streak FROM users WHERE id = $1",
      [req.userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result.rows[0];

    res.json({
  email: user.email,
  username: user.username,
  xp: user.xp,
  level: user.level,
  streak: user.streak
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile };
