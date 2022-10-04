const db = require('../db')

class userController{

async getUsers (req, res){
    try{
        const users = await db.query(`SELECT * FROM users`)
        console.log(users.rows)
        res.json(users.rows)

    }catch(e){
        console.log(e)
    }
} 
async getFriends (req, res){
    try{
        const id = req.params.id
    const friends = await db.query(`SELECT second_user,firstname,lastname FROM users, friendList WHERE friendList.first_user = $1 AND friendList.second_user = users.id`, [id])
    
    res.json(friends.rows)
    } catch(e){
        console.log(e)
    }
    
}


async getRequest (req, res){
    try{
        const id = req.params.id
    const request = await db.query(`SELECT second_user,firstname,lastname FROM users, request WHERE request.second_user = users.id AND request.first_user = $1 `, [id])
    
    res.json(request.rows)
    } catch(e){
        console.log(e)
    }
    
}
async addFriend (req, res) {
    try{
        const id = req.params.id
        const friend_id = req.params.friend_id
    const test = await db.query(`select * from request WHERE first_user = $1 AND second_user = $2`, [friend_id, id])
    if(test.rows.length == 0){
        const request = await db.query(`INSERT INTO request (first_user, second_user) VALUES ($1, $2) `, [friend_id, id])
        res.json(request.rows)
    }
    res.json('Вы уже отправили запрос')
     
    } catch(e){
        console.log(e)
    }
}
async acceptRequest (req, res) {
    try{
        const id = req.params.id
        const friend_id = req.params.friend_id
    const request = await db.query(`INSERT INTO friendList (first_user, second_user) VALUES ($1, $2) `, [id, friend_id])
    await await db.query(`DELETE FROM request WHERE first_user = $1 AND second_user = $2`, [id, friend_id])
    res.json('Пользователь был добавлен в друзья')
    } catch(e){
        console.log(e)
    }
}
async rejectRequest (req, res) {
    try{
        const id = req.params.id
        const friend_id = req.params.friend_id
    await await db.query(`DELETE FROM request WHERE first_user = $1 AND second_user = $2`, [id, friend_id])
    res.json('Запрос пользователя был отклонен')
    } catch(e){
        console.log(e)
    }
}
async deleteFriend (req, res) {
    try{
        const id = req.params.id
        const friend_id = req.params.friend_id
    await await db.query(`DELETE FROM friendList WHERE first_user = $1 AND second_user = $2`, [id, friend_id])
    res.json('Пользователь был удален из списка друзей')
    } catch(e){
        console.log(e)
    }
}
}

module.exports = new userController()