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
})

Router.get('/list', Service.isLogin, async(req, res) => {
    try {
        const payload = {
            userId:req.member,
        }
        const result = await BillSaleController.SaleList(payload)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

Router.get('/currentBillInfo', Service.isLogin, async(req,res) => {
    try {
        const payload = {
            userId:req.member,
            status:'open'
        }
        const result = await BillSaleController.SaleInfo(payload)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})
Router.get('/endSale', Service.isLogin, async(req,res) => {
    try {
        const payload = {
            userId:req.member,
            status:'pay'
        }
        const result = await BillSaleController.EndSale(payload)
        return res.status(200).json(result)
    } catch (error) {
      console.log(error)
      return res.status(error.statusCode || 500).json({
          message: error.message ||'server error'
      });
    }
})

Router.get('/lastBill', Service.isLogin, async(req,res) => {
    try {
        const payload = {
            userId:req.member,
        }
        const result = await BillSaleController.LastBill(payload)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

Router.get('/todayBill', Service.isLogin, async(req,res) => {
    try {
        const payload = {
            userId:req.member,
        }
        const result = await BillSaleController.TodayBill(payload)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

Router.post('/sale', Service.isLogin, async(req,res) => { 
    try {
        const payload = {
            userId:req.member,
            status:'open'
        }
        const currentBill = await BillSaleController.SaleBill(payload,req.body)
        return res.status(200).json(currentBill)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

Router.put('/updateQty/:id',Service.isLogin, async(req,res) => {
    try {
        const updateQty = await BillSaleController.UpdateQty(req.body)
        return res.status(200).json(updateQty)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})

Router.delete('/deleteItemCart/:id', Service.isLogin, async(req,res) => {
    try {
        const DeleteCartItem = await  BillSaleController.DeleteCartItem(req.params.id)
        return res.status(200).json(DeleteCartItem)
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message ||'server error'
        })
    }
})


module.exports = Router;