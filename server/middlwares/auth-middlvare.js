const tokenService = require("../service/token-service");



module.exports = function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return('Пользователь не авторизован')
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next('Пользователь не авторизован')
        }
        const userData =tokenService.validateAccsessToken(accessToken)
        if(!userData){
            return next('Пользователь не авторизован')
        }
        req.user = userData;
        next()
    } catch(e){
        return next('Пользователь не авторизован')
    }
}