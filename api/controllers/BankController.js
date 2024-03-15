const BankModel = require('../models/BankModel');

module.exports = {
    all: async() => {
        try{
            console.log('eee')
        }catch(e){
            throw { statusCode:400 || e.statusCode, message:e.message}
        }
    }
}