const PackageModels = require('../models/PackageModels');
const BillSaleModels = require('../models/BillSaleModels');
const { Sequelize } = require('sequelize');

const Packag = {
    allPackages: async () => {
        try {
            const query = await PackageModels.findAll({
                order:[['price','desc']]
            });
            if(query.length > 0) {
                return {
                    statusCode: 200,
                    message:'success',
                    body: query
                }
            }else{
                throw { statusCode: 404, message: "Package not found" };
            }
        } catch (error) {
          throw { statusCode: error.statusCode || 400, message: error.message };
        }
    },
    createPackage: async(data) => {
        return await PackageModels.create(data);
    },
    countTotalBillSale: async(payload) => {
        try {
            const mydate = new Date()
            const m = mydate.getMonth() + 1
            const Op  = Sequelize.Op
            const results = await BillSaleModels.findAll({
                where:{
                    userId: payload.userId,
                    [Op.and] :[
                        Sequelize.fn('EXTRACT(MONTH FROM "createdAt") = ', m),
                    ]
                }
            });
            if(results.length > 0 ) {
                return {
                    statusCode:200,
                    message:'success',
                    countBill: results.length
                }
            }else{
                throw { statusCode: 404, message: "Bill not found" };
            }
        } catch (error) {
            throw{ statusCode: error.statusCode || 400, message: error.message}
        }
    }
}

module.exports = Packag;