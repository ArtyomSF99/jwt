const db = require('../db')
const bcryptjs = require('bcryptjs')
const userService = require('../service/user-service')
const cookieParser = require('cookie-parser')
const { validationResult, cookie } = require('express-validator')

class AuthController {
    async registration (req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.json({message:"Ошибка при регистрации", errors})
            }
            const {email, password, firstname, lastname} = req.body
            const userData = await userService.registration(email, password, firstname,lastname)
            res.cookie('refreshtoken', userData.refreshToken, {maxAge:30* 24*60*60*1000, httpOnly:true})
            return res.json(userData)
        } catch(e) {
            console.log(e)
        }
    }
    async login (req, res) {
        try{
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshtoken', userData.refreshToken, {maxAge:30* 24*60*60*1000, httpOnly:true})
            res.json(userData)
            
        }
        catch (e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async active (req, res) {
        try{
            const activationLink = req.params.link;
            console.log(activationLink)
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        }
        catch (e){
            console.log(e)
        }
    }
    async logout (req, res) {
        try{
            const{refreshtoken} = req.cookies;
        
            const token = await userService.logout(refreshtoken);
            res.clearCookie('refreshtoken');
            return res.json('Вы вышли')
        }
        catch (e){
            console.log(e)
        }
    }

    async refresh (req, res) {
        try{
            const {refreshtoken} = req.cookies
            const userData = await userService.refresh(refreshtoken)
            res.cookie('refreshtoken', userData.refreshToken, {maxAge:30* 24*60*60*1000, httpOnly:true})
            return res.json(userData)

        }
        catch (e){
            
        }
    }

}

module.exports = new AuthController()

