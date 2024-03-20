const Router  = require('express').Router();
const Service = require('../controllers/Service');
const ChangePackage = require('../controllers/ChangePackageController');
Router.get('/list' , Service.isLogin, async(req, res) => {
    try {
        const payload = {
            userId:req.member
        }
        const response = await ChangePackage.ListPackage()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Service not found'
        });
    }
});

module.exports = Router