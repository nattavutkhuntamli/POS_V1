const StockModels = require('../models/StockModels')
const ProductModels = require('../models/ProductModels')
module.exports = {
    list: async(payload) => {
        try {
            StockModels.belongsTo(ProductModels)
            const stockprd = await StockModels.findAll({
                where: {
                    userId: payload.userId
                },
                include: {
                    model: ProductModels,
                    attributes: ["name",'price','cost','barcode'],
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            if(stockprd.length > 0) {
                return {
                    statusCode: 200,
                    message: 'ดึงข้อมูลสำเร็จ',
                    results:stockprd
                }
            }else{
                throw { statusCode: 404, message: "ไม่พบข้อมูลสินค้า" }
            }
          
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message}
        }
    },
    SavePrd: async(payload) => {
        try {
            const isValidatedPrdId = await StockModels.findOne({
                where:{
                    productId:payload.productId,
                    userId:payload.userId
                }
            });
            if(isValidatedPrdId == undefined) {
                const SaveQtyPrd = await StockModels.create(payload)
                if (SaveQtyPrd) {
                    return {
                        statusCode: 200,
                        message: 'เพิ่มข้อมูลจำนวนสินค้าสำเร็จ',
                    }
                } else {
                    throw { statusCode: 400, message: 'เพิ่มข้อมูลจำนวนสินค้าไม่สำเร็จ' }
                }

            }else{
                const qty = parseInt(isValidatedPrdId.qty) + payload.qty;
                const updateQty = await StockModels.update(
                    {
                        qty: qty,
                    },
                    {
                        where:{
                            productId:payload.productId,
                            userId:payload.userId
                        }
                    }
                )
                if (updateQty) {
                    return {
                        statusCode: 200,
                        message: 'เพิ่มข้อมูลจำนวนสินค้าสำเร็จ',
                    }
                } else {
                    throw { statusCode: 400, message: 'เพิ่มข้อมูลจำนวนสินค้าไม่สำเร็จ' }
                }
            }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message}
            
        }
    },
    destroyItem: async(payload) => {
        try {
            const isValidatedPrdId = await StockModels.findOne({
                where:{
                    id:payload.id,
                    userId:payload.userId
                }
            });
            if(isValidatedPrdId != undefined) {
                const destroyStock = await StockModels.destroy({
                    where:{
                        id:payload.id,
                        userId:payload.userId
                    }
                })
                if (destroyStock) {
                    return {
                        statusCode: 200,
                        message: 'ลบข้อมูลจำนวนสินค้าสำเร็จ',
                    }
                }else{
                    throw { statusCode: 400, message: 'ลบข้อมูลจำนวนสินค้าไม่สำเร็จ' }
                }
            }else{
                throw { statusCode: 400, message:'ไม่พบ ID ที่ต้องการลบ' }
             
            }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message}
            
        }
    }
}