const express = require('express');
const{
 getUser,
 deleteUser,
 updateUser,
 createUser,
 getUsers
} = require('../controllers/userControllers');


const router = express.Router()
router.get('/:id', getUser) //displays a user

//TEST POST REQ FOR NOW, LATER MAKE IT IN /REGISTER
router.post("/", createUser)

router.delete('/:id', deleteUser) //DELETE a user

router.patch('/:id', updateUser) //Updates a user

//TEST GET ALL REQS
router.get('/', getUsers)
module.exports = router