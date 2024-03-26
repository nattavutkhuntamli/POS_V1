const ChangePackage = require('../models/ChangePackageModel')
const Package = require('../models/PackageModels');
const MemberModels = require('../models/MemberModels');
const { Sequelize } = require("sequelize");

module.exports = {
    ListPackage: async () => {
        try{
            ChangePackage.belongsTo(Package)
            ChangePackage.belongsTo(MemberModels, {
                foreignKey:{
                    name:"userId"
                }
            })
            const results = await ChangePackage.findAll({
                order:[['id','desc']],
                include:[
                    {
                        model:Package,
                    },
                    {
                        model:MemberModels,
                    }
                ],
                where:{
                    status:'wait'
                }
            });
            if(results.length > 0) {
                return {
                    statusCode: 200,
                    message:'success',
                    body: results
                }
            }else{
                throw { statusCode: 404, message: "Package not found" };
            }
        }catch(e){
            throw {statusCode:e.statusCode, message:e.message}
        }
    },
    SavePackage: async ( payload) => {
        try{
            const isChanagePackage = await ChangePackage.findOne({
                where:{
                    id:payload.id
                }
            })
            if(isChanagePackage != undefined){
                const MemberId = isChanagePackage.userId;
                const PackageId = isChanagePackage.packageId;
                const updateChangePackage = await ChangePackage.update(
                    {
                        status: payload.status,
                        payDate: payload.payDate,
                        payHour: payload.hour,
                        payMinute: payload.minute,
                        payRemark:payload.remark
                    },
                    {
                        where:{
                            id:payload.id
                        }
                    }
                )
                if(updateChangePackage) {
                    const updateMember = await MemberModels.update(
                        {
                             packageId: PackageId
                        },
                        {
                            where:{
                                id:MemberId
                            }
                        }
                    )
                    return {
                        statusCode: 200,
                        message:'อัพเดทข้อมูลสำเร็จ',
                    }
                }else{
                    throw { statusCode: 400, message: "อัพเดทข้อมูลไม่สำเร็จ" };
                }
            }else{
                throw { statusCode: 400, message: "ไม่พบข้อมูล Package ที่ต้องการอัพเดท" };
            }
        }catch(error) {
            throw { statusCode: 400, message: error.message };
        }
    }, 
    ReportSumSalePerDay : async(payload) => {
        try {
            // console.log(payload)   userId year month
            let arr = [];
            let y = payload.year;
            let m = payload.mounth;
            let daysInMonth = new Date(y,m,0).getDate() //ดึงวันของเดือนนั้นว่ามีกี่วัน
            const Op = Sequelize.Op;
            console.log(daysInMonth)
            
            ChangePackage.belongsTo(Package);
            ChangePackage.belongsTo(MemberModels,{
                foreignKey:{
                    name:"userId"
                }
            });
            for(let i = 1; i <= daysInMonth; i++) {
                const results = await ChangePackage.findAll({
                    where:{
                        [Op.and]: [
                            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "changepackages"."createdAt"')), '=', y),
                            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "changepackages"."createdAt"')), '=', m),
                            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('DAY FROM "changepackages"."createdAt"')), '=', i),
                          ]
                    },
                    include:[
                        {
                            model:Package,
                            attributes:['name']
                        },
                        {
                            model:MemberModels,
                            attributes:['name']
                        }
                    ]
                })
                arr.push({ results:results})
            }
            return {
                statusCode: 200,
                message:'success',
                body: arr
            }

        } catch (error) {
            throw { statusCode: 400, message: error.message };
        }
    }
}