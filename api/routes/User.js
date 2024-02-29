const router = require('express').Router();
const UserController = require('../controllers/UserController')
const Service = require('../controllers/Service')
router.get('/list', Service.isLogin, async (req, res) => {
    try {
        const ShowUser = await UserController.all()
        return res.status(200).json(ShowUser)
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || 'server error'
        })
    }
})

router.post('/insert', Service.isLogin, async (req, res) => {
    try {
        // console.log(req.body)
        const insertUser = await UserController.register(req.body)
        return res.status(200).json(insertUser)
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || 'server error'
        })
    }
})

router.put('/edit/:id', Service.isLogin, async (req, res) => {

})


router.delete('/delete/:id', Service.isLogin, async (req, res) => {

})

module.exports = router;