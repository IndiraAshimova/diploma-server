// services/streakService.js
const userRepository = require("../repositories/userRepository");

const updateStreak = async (user) => {
  const today = new Date();
  const lastLogin = user.last_login ? new Date(user.last_login) : null;
  let streak = user.streak || 1;

  if (!lastLogin) {
    streak = 1;
  } else {
    const diffTime = today - lastLogin;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) streak += 1;
    else if (diffDays > 1) streak = 1;
  }

  await userRepository.updateStreak(user.id, streak);
  return streak;
};

// Новый метод для GET-запроса
const getUserStreak = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error("User not found");
  return user.streak;
};

module.exports = { updateStreak, getUserStreak };