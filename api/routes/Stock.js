const Router = require('express').Router();
const Service = require('../controllers/Service');
const StockController = require('../controllers/StockController');
Router.get('/list',Service.isLogin, async(req, res) => {
  try {
     const payload = {
        userId:req.member,
     }
     const results = await StockController.list(payload);
     return res.status(200).json(results)
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || 'Server error'
    })
  }
})

module.exports = Router;