const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('jwt', 'root', '2458696357', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize