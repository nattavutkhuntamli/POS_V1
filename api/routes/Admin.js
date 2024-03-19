const router = require('express').Router();
const AdminController = require('../controllers/AdminControler')
const Service = require('../controllers/Service')

router.get('/list', async(req,res) => {
    try {
        const response = await AdminController.list();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(error.statusCode || 500 ).json({
            message: error.message ||'server error'
        })
    }
})
router.get('/info', Service.isLoginAdmin, async(req, res) => {
    try{
        const payload = {
            id:req.admin
        }
        const response =await AdminController.info(payload)
        return res.status(200).json(response)
    }catch(error){
        return res.status(error.statusCode || 500 ).json({
            message: error.message ||'server error'
        })
    }
})
router.post('/signin', async(req, res) => {
    try {
        const payload = {
            username:req.body.username,
            password:req.body.password
        }
        console.log(payload)
        const response = await AdminController.authenLogin(payload);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(error.statusCode || 500 ).json({
            message: error.message ||'server error'
        })
    }
})
module.exports = router;