const Router = require('express').Router();

Router.get('/list', async(req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to POS API'
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || 'Server error'
    })
  }
})

module.exports = Router;