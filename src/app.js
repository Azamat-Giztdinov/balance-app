const express = require('express');
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('./utils/db');
const { updateUserBalance } = require('./controllers/userController');
const validateRequest = require('./middlewares/validateRequest');
const { updateBalanceSchema } = require('./validators/userValidator');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const umzug = new Umzug({
    migrations: {
        glob: './src/migrations/*.js',
        resolve: ({name, path, context}) => {
            const migration = require(path);
            return {
                name,
                up: async () => {
                    await migration.up(context, sequelize);
                },
                down: async () => {
                    await migration.down(context, sequelize);
                },
            };
        },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

app.post('/update-balance', validateRequest(updateBalanceSchema), updateUserBalance);

(async () => {
  await umzug.up();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
})();
