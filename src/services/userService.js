const { User, sequelize } = require('../utils/db');

const updateBalance = async (userId, amount) => {
      return await sequelize.transaction(async (transaction) => {
          const user = await User.findOne({ where: { id: userId }, lock: true, transaction });

          if (!user) {
            throw new Error('User not found');
          }

          if (user.balance + amount < 0) {
              throw new Error('Insufficient funds');
          }

          user.balance += amount;
          await user.save({ transaction });
          return user
      });

};


module.exports = {
  updateBalance
};
