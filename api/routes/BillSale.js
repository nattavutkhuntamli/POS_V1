const Router = require('express').Router();
const Service = require('../controllers/Service');
const BillSaleController = require('../controllers/BillSaleController'); 
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
Router.get('/openBill', Service.isLogin, async(req,res) => {
    try {
        const payload = {
            userId:req.member,
            status:'open'
        }
        const result = await BillSaleController.OpenBill(payload)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
} )

module.exports = Router;