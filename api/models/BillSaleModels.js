const { DataTypes } = require('sequelize');
const client = require('../config/connect');


const BillSaleModels = client.define('billSale',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    payData:{
        type: DataTypes.STRING,
    },
  
    userId:{
        type:DataTypes.BIGINT,
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false
    },
})

BillSaleModels.sync({alter: true})

module.exports = BillSaleModels