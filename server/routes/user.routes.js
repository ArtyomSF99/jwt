const { Router } = require('express')
const express = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddlware = require('../middlwares/auth-middlvare')

router.get('/users', userController.getUsers)
router.get('/friends/:id', userController.getFriends)
router.get('/request/:id',  userController.getRequest)
router.post('/request/:id/:friend_id',  userController.addFriend)
router.put('/request/:id/:friend_id',  userController.acceptRequest)
router.delete('/request/:id/:friend_id',  userController.rejectRequest)
router.delete('/friend/:id/:friend_id',  userController.deleteFriend)

module.exports = router