const userRepository = require("../repositories/userRepository");

const calculateLevel = (xp, level) => {

  let xpToNext = level * 100;

  while (xp >= xpToNext) {

    xp -= xpToNext;
    level++;

    xpToNext = level * 100;
  }

  return { xp, level };
};

const addXP = async (userId, amount) => {

  const user = await userRepository.findById(userId);

  let xp = user.xp + amount;
  let level = user.level;

  const result = calculateLevel(xp, level);

  await userRepository.updateXP(userId, result.xp, result.level);

  return result;
};

module.exports = { addXP };