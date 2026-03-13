const userRepository = require("../repositories/userRepository");

const getStreak = async (req, res) => {
  try {
    const user = await userRepository.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.streak);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getStreak };