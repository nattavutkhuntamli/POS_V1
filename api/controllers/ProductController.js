const ProductModels = require('../models/ProductModels');
const Product = {
    all: async() => {
        try {
            const query = await ProductModels.findAll(
                {
                    order:[['id','desc']]
                }
            );
            if(query.length > 0) {
                return {
                    statusCode: 200,
                    message:'ข้อมูลสินค้า',
                    body: query
                }
            }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message };
        }
    },
    //12-03
    createProduct: async(item) => {
        try {
            console.log(item)
            const isValidateName = await ProductModels.findAll({
                where:{
                    barcode: item.barcode, 
                    name: item.name
                }
            })
            if(isValidateName.length > 0) {
                throw { statusCode: 400, message: "Product already exists or  barcode " };
            }else{
                const newProduct = await ProductModels.create(item);
                return {
                    statusCode: 200,
                    message:'เพิ่มรายการสินค้าสำเร็จ',
                    body: newProduct
                }
            }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message };
        }
    },
    updateProduct: async(id,item)=>{
        try {
            const isValidateId = await ProductModels.findAll({
                where:{
                    id:id, 
                }
            })
            if(isValidateId.length > 0) {
              
                const updateProduct = await ProductModels.update(
                    {
                       barcode:item.barcode,
                       name:item.name,
                       cost:item.cost,
                       price:item.price,
                       detail:item.detail
                    },
                    {
                    where: {
                        id: item.id
                    }
                    }
               );
                return {
                    statusCode: 200,
                    message:'อัพเดทรายการสินค้าสำเร็จ',
                    body: updateProduct
                }
            }else{
                throw { statusCode: 404, message: "Product not found" };
            }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message };
        }
    },
    deleteProduct: async(id) => {
        try {
            const isValidateId = await ProductModels.findOne({
                where:{
                    id: id
                }
            });
            if(!isValidateId){
                throw { statusCode: 404, message: "Product not found" };
            }
            await isValidateId.destroy({
                where:{
                    id: id
                }
            });
            return {
                statusCode: 200,
                message:'ลบรายการสินค้าสำเร็จ',
            }
            
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message };
        }
    }
}
module.exports = Product