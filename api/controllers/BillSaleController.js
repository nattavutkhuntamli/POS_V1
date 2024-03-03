const BillSaleModels = require('../models/BillSaleModels')
const BillSaleDetailModels = require('../models/BillSaleDetailModels')

module.exports = {
    BillAll: async() => {
        try {
           console.log('ee')
        } catch (error) {
            throw { statusCode:400, message:error.message}
        }
    }
}