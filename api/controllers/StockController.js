const StockModels = require('../models/StockModels')

module.exports = {
    list: async(payload) => {
        try {
            return await {
                statusCode: 200,
                message: 'ดึงข้อมูลสำเร็จ',
                data: await StockModels.findAll({
                    where: {
                        userId: payload.userId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message}
        }
    }
}