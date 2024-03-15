const Router = require('express').Router();
const Service = require('../controllers/Service');
const BankController = require('../controllers/BankController');

Router.get('/', async(req,res) => {
    try {
        const response = await BankController.all()
        return res.status(200).json({
            message:"Welcome to bank`",
            response: response
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

module.exports = Router;