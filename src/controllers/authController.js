const authService = require("../services/authService");

const register = async (req, res) => {

  try {

    const { email, username, password } = req.body;

    const user = await authService.register(
      email,
      username,
      password
    );

    res.status(201).json(user);

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.json({ token });

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

};

module.exports = { register, login };