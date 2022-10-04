const db = require('../db')
const jwt = require('jsonwebtoken')

class TokenService {
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCSESS_SECRET, {expiresIn:'15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
      
        return{
            accessToken,
            refreshToken
        }
        
    }

    validateAccsessToken(token){
        try{
            const userData = jwt.verify(token ,process.env.JWT_ACCSESS_SECRET)
            return userData;
        } catch(e){
            return null;
        }
    }
    validateRefrshToken(token){
        try{
            const userData = jwt.verify(token ,process.env.JWT_REFRESH_SECRET)
            return userData;
        } catch(e){
            
        }
    }

    async saveToken(userId, refreshToken) {
        try{
            const tokenData = await db.query(`SELECT userid FROM tokenTable WHERE userid = $1`, [userId])
            
            if(tokenData.rows.length>0){
                tokenData.refreshToken = refreshToken
                return await db.query(`UPDATE tokenTable SET refreshtoken = $1 `, [tokenData])
            }
            const token = await db.query(`INSERT INTO tokenTable (userid, refreshtoken) values ($1, $2) RETURNING *`, [userId, refreshToken])
            
            return token;
        }catch(e){
            console.log(e)
        }
        
    }

    async removeToken(refreshtoken){
        console.log(refreshtoken)
        const tokenData = await db.query(`DELETE FROM tokenTable WHERE refreshtoken = $1`, [refreshtoken]);
        return tokenData
    }
    async findToken(refreshtoken){
       
        const tokenData = await db.query(`SELECT * FROM tokenTable WHERE refreshtoken = $1`, [refreshtoken]);
        return tokenData
    }
}

module.exports = new TokenService()