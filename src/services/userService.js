const { User } = require('../utils/db');


const updateBalance = async (userId, amount) => {
  const user = await User.findByPk(userId, { lock: true, skipLocked: true });
  if (!user) {
    throw new Error('User not found');
  }
  
  const newBalance = user.balance + amount;
  if (newBalance < 0) {
    throw new Error('Insufficient funds');
  }

  user.balance = newBalance;
  await user.save();
  return user;
};

module.exports = {
  updateBalance
};
