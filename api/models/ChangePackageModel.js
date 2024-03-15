const { DataTypes } = require('sequelize');
const client = require('../config/connect');

const ChangePackageModel = client.define('changepackage',{
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    packageId:{
        type:DataTypes.BIGINT,
    },
    userId:{
        type:DataTypes.BIGINT,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue: 'wait',
        allowNull:false
    }
})

ChangePackageModel.sync({alter: true})

module.exports = ChangePackageModel