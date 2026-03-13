const xpService = require("../services/xpService");

const addXP = async (req, res) => {

  try {

    const result = await xpService.addXP(
      req.userId,
      req.body.amount
    );

    res.json(result);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};

module.exports = { addXP };