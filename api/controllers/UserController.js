const UserModels = require('../models/UserModels')

module.exports = {
    all: async() => {
       try {
          const query = await UserModels.findAll(
              {
                  order:[['id','desc']],
                  attributes:['id','name','user','level']
              }
          );
          if(query.length > 0) {
              return {
                  statusCode: 200,
                  message:'success',
                  body: query
              }
          }else{
            throw { statusCode: 404, message: "User not found" };
          }
       } catch (error) {
        throw { statusCode: error.statusCode || 400, message: error.message };
       }
    },
    register: async (item) => {
        try {
            console.log(item)
            const isValidateUsername = await UserModels.findAll({
                where:{
                    user:item.username
                }
            })
            if(isValidateUsername.length > 0 ){
                throw { statusCode: 400, message: "Username already exists" };
            }
            const result = await UserModels.create({
                name: item.name,
                user: item.username,
                pwd: item.pwd,
                level: item.level
            });
             return {
                 statusCode: 201,
                 message:'เพิ่มข้อมูลสมาชิกสำเร็จ',
                 body: result
             }
        } catch (error) {
            throw { statusCode: error.statusCode || 400, message: error.message };

        }
    },
}