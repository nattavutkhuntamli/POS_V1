const conn = require('../config/connect')
const { DataTypes } = require('sequelize');

const UserModels = conn.define('user', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
         type: DataTypes.STRING,
    },
    user:{
         type: DataTypes.STRING,
    },
    pwd:{
         type: DataTypes.STRING,
    },
    level:{
         type: DataTypes.STRING,
    }
},{
    timestamps: false,
})

UserModels.sync({ alert: true })

module.exports = UserModels