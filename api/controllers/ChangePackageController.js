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
    }
}