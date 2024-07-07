const { updateBalance } = require('../services/userService');

const updateUserBalance = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await updateBalance(userId, amount);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateUserBalance
};
