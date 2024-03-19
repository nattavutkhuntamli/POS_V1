const AdminModel = require('../models/AdminModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()
module.exports = {
    list:async() => {
        try{
            const listAdmin = await AdminModel.findAll();
            if(listAdmin.length > 0) {
                return {
                    statusCode: 200,
                    message:'ข้อมูลสำเร็จ',
                    body: listAdmin
                }
            }else{
                throw { statusCode: 404, message: "ไม่พบข้อมูลสำเร็จ" }
            }
        }catch(e){
            throw{statusCode:400 || e.statusCode, message:e.message}
        }
    },
    authenLogin:async(payload) => {
        try{
            const admin = await AdminModel.findOne({
                where: {
                    usr: payload.username,
                    pwd: payload.password
                }
            });
            if(admin != undefined){
                let token = jwt.sign({id:admin.id},  process.env.SECRET, { expiresIn: '1h' })
                admin.createdAt = new Date(admin.createdAt).toLocaleDateString('th-TH')
                admin.updatedAt = new Date(admin.updatedAt).toLocaleDateString('th-TH')
                return {
                    statusCode: 200,
                    message:'success',
                    body: admin,
                    token: token,
                    isLogin:true,
                }
            }else{
                throw { statusCode: 404, message: "กรุณาระบุ username หรือ password ให้ถูกต้อง" }
            }
        }catch(e){
            throw{statusCode:400 || e.statusCode, message:e.message}
        }
    }
}