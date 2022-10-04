const Router = require('express')
const authController = require('../controller/auth.controller')
const router = new Router()
const {check} = require('express-validator')


router.post('/registration',[
    check('email', "Email не должен быть пустым").notEmpty(),
    check('password', "Пароль не должен быть пустым").notEmpty()    
], authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.active)
router.get('/refresh', authController.refresh)


module.exports = router