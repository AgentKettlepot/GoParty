const express = require('express');
const{
    getParties,
    getParty,
    createParty,
    deleteParty,
    updateParty
} = require('../controllers/partyController');


const router = express.Router()
router.get('/', getParties) //displays all the parties

router.get('/:id', getParty) //displays one party

router.post('/', createParty) //POST and create a new party

router.delete('/:id', deleteParty) //DELETE a party by id

router.patch('/:id', updateParty) //PATCH and update party
module.exports = router