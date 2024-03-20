const ChangePackage = require('../models/ChangePackageModel')
const Package = require('../models/PackageModels');
const MemberModels = require('../models/MemberModels');
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
                ]
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
            // const update = await ChangePackage.update(
            //     {
            //         status: payload.status,
            //         payDate: payload.payDate,
            //         payHour: payload.hour,
            //         payMinute: payload.minute,
            //         payRemark:payload.remark
            //     },
            //     {
            //         where:{
            //             id:payload.id
            //         }
            //     }
            // );
            // if(update) {
            //     const updateMember = await MemberModels.update({
            //         packageId: payload.packageId
            //     })
            //     return {
            //         statusCode: 200,
            //         message:'success',
            //         body: update
            //     }
            // }else{
            //     throw { statusCode: 400, message: "Package update false" };

            // }

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
    }
}