const BillSaleModels = require('../models/BillSaleModels')
const BillSaleDetailModels = require('../models/BillSaleDetailModels')

module.exports = {
    BillAll: async() => {
        try {
           console.log('ee')
        } catch (error) {
            throw { statusCode:400, message:error.message}
        }
    },
    OpenBill: async(payload) => {
        try {
            const result = await BillSaleModels.findOne({
                where:payload
            })
            if(result  == null){
                result = await BillSaleModels.create(payload)
                return {
                    statusCode: 200,
                    message: "Bill Opened Successfully",
                }
            }else{
                return {
                    statusCode:200,
                    message:"Bill Already Opened",
                    result:result
                }
            }
         } catch (error) {
             throw { statusCode:400, message:error.message}
         }
    }
}