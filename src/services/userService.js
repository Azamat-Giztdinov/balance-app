const { User } = require('../utils/db');

const updateBalance = async (userId, amount) => {
  let success = false;
  while (!success) {
    const user = await User.findByPk(userId);
    if (!user) {
      console.log("1")
      throw new Error('User not found');
    }

    const newBalance = user.balance + amount;
    if (newBalance < 0) {
      console.log("2")
      throw new Error('Insufficient funds');
    }

    const [updated] = await User.update(
      { balance: newBalance, version: user.version + 1 },
      {
        where: {
          id: userId,
          version: user.version
        }
      }
    );
    if (updated) {
      success = true;
      return await User.findByPk(userId);
    }
  }
};

module.exports = {
  updateBalance
};
