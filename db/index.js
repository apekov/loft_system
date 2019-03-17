const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.dbConfig.database,
    config.dbConfig.username,
    config.dbConfig.password,
    config.dbConfig.conf);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const modelNames = fs.readdirSync(path.join(__dirname, './models')).sort();

for (const modelName of modelNames) {
    sequelize.import(`./models/${modelName}`);
}

for (const modelName of Object.keys(sequelize.models)) {
    if ('associate' in sequelize.models[modelName]) {
        sequelize.models[modelName].associate(sequelize.models);
    }
}
process.on('unhandledRejection', async(reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    process.exit(1);
});
module.exports.sequelize = sequelize;