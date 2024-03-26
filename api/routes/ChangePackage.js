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


Router.post('/save', Service.isLogin, async(req, res) => {
    try {
        const response = await ChangePackage.SavePackage(req.body)
        return res.status(200).json(response)        
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Service not found'
        });
    }
});

Router.post('/reportSumSalePerDay', Service.isLogin, async(req,res) => {
    try {
        const payload = {
            userId:req.member,
            mounth:req.body.month,
            year:req.body.year
        }
        const response = await ChangePackage.ReportSumSalePerDay(payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

module.exports = Router