const bcryptjs = require('bcryptjs')
const uuid = require('uuid')
const db = require('../db')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')


class UserService {
    async registration(email, password, firstname, lastname) {
        try{
            const candidate = await db.query(`SELECT email FROM users WHERE email = $1`, [email])
            
            if(candidate.rows.length !=0){
                return {message: "Пользователь c таким Email уже существует"}
            } 
            const activationLink = uuid.v4();
            const hashPassword = bcryptjs.hashSync(password,7)
            const newPerson = await db.query(`INSERT INTO users (email, password, firstname, lastname, activationLink) values ($1, $2, $3,$4, $5) RETURNING *`, [email, hashPassword, firstname, lastname, activationLink])
            
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            const userDto = new UserDto(newPerson.rows[0])
            
            const tokens = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
               
            
        }
        catch (e){
            console.log(e)

        }
    }
    async activate(activationLink){
        const user = await db.query(`SELECT activationlink FROM users WHERE activationlink = $1`, [activationLink])
        if(!user){
            throw new Error('Некорректная ссылка активации')
        }
        await db.query(`UPDATE users SET isactivated = $1`,[true])
       
    }
    async login(email, password){
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
      
            if(user.rows.length == 0){
                return res.json({message: "Пользователь c таким Email не существует"})
            }
            const validPassword =bcryptjs.compareSync(password, user.rows[0].password)
            if(!validPassword){
                throw Error({message: 'Введен неправильный пароль'})
            }
            const userDto = new UserDto(user.rows[0]);
            const tokens = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
    }
    async logout(refreshtoken){
        const token = await tokenService.removeToken(refreshtoken)
        return token
    }
    async refresh(refreshtoken){
        if(!refreshtoken){
            throw Error('пользователь не авторизован')
        }
        const userData = tokenService.validateRefrshToken(refreshtoken)
        const tokenFromDB = await tokenService.findToken(refreshtoken)
        if(!userData || !tokenFromDB){
            throw Error('Пользователь не авторизован')
        }
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [user.data.id])
        const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
    }
}

module.exports = new UserService()