const BillSaleModels = require('../models/BillSaleModels')
const BillSaleDetailModels = require('../models/BillSaleDetailModels')
const ProductModels = require('../models/ProductModels')
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
    },
    SaleBill: async(payload,item) => {
        try {
            const currentBill = await BillSaleModels.findOne({ where:payload})
            if(currentBill != null){
               const payloadData = {
                  productId:item.id,
                  billSaleId:parseInt(currentBill.id),
                  userId:payload.userId,
                  price:item.price,
               }
            //    logging ture แสดงคำสั่ง sql
            //    const createdBill = await  BillSaleDetailModels.create(payloadData, {logging:true})
               //ค้นหาสินค้าก่อนว่ามีอยู่่หรือเปล่า
               const billSaleDetail = await BillSaleDetailModels.findOne({ where:payloadData})
               if(billSaleDetail == null) {
                    payloadData.qty =1;
                    const createdBill = await  BillSaleDetailModels.create(payloadData)
                    if(createdBill){
                        return {
                            statusCode: 200,
                            message: "เพิ่มลงตะกร้าสินค้าสำเร็จ",
                        }
                   }else{
                      throw { statusCode:400, message: 'Bill Sale Failed'}
                   }
               }else{
                    const updateBill  = await BillSaleDetailModels.update(
                        {
                            qty:parseInt(billSaleDetail.qty)+1,
                        },
                        {
                            where:{
                                productId:billSaleDetail.productId
                            }
                        }
                      
                    )
                    if(updateBill){
                        return {
                            statusCode: 200,
                            message: "เพิ่มลงตะกร้าสินค้าสำเร็จ",
                        }
                   }else{
                      throw { statusCode:400, message: 'Bill Sale Failed'}
                   }
               }
            }else{
                throw { statusCode:400, message: ' Bill Not Found'}
            }
        } catch (error) {
            throw { statusCode:400, message:error.message}
        }
    },
    SaleInfo: async(payload) => {
        try {
            BillSaleModels.hasMany(BillSaleDetailModels)
            BillSaleDetailModels.belongsTo(ProductModels)
            const result = await BillSaleModels.findOne({
                where:{
                    status:payload.status,
                    userId:payload.userId
                },
                include: {
                    model:BillSaleDetailModels,
                    attributes:['productId','price','qty'],
                    order:[['id','desc']],
                    include: {
                        model:ProductModels,
                        attributes:['name']
                    }
                },
              
            },{logging:true})
            if(result!= null){
                return {
                    statusCode: 200,
                    message:'success',
                    body: result
                }
            }else{
                throw { statusCode: 404, message: "Product not found" };
            }
        } catch (error) {
            throw { statusCode:400, message:error.message}
            
        }
    }
}