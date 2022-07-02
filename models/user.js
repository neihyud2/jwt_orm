const { Sequelize } = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
}, { timestamp: true})

module.exports = User