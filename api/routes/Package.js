const express = require('express')
const router  =  express.Router()
const PackageControle =require('../controllers/PackageController');

router.get('/list', async(req, res) => {
    try {
        const package = await PackageControle.allPackages();
        return res.status(200).json(package);
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || ' server error'
        })
    }
})

module.exports = router