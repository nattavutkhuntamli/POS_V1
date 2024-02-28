const PackageModels = require('../models/PackageModels');

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
    createPackage: (data) => {
        return PackageModels.create(data);
    }
}

module.exports = Packag;