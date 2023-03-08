const mongoose = require('mongoose')
const User = require('../models/userModel')

const getUser = async(req, res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No user found"})
    }
    
    const user = await User.findById(id)
    if (!user){
        return res.status(404).json({error: "No user found"})
    }
    res.status(200).json(user)
}

const deleteUser = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No user found"})
    }
    const user = await User.findOneAndDelete({_id:id})
    if (!user){
        return res.status(404).json({error: "No user found"})
    }
    res.status(200).json(user)
}

const updateUser = async(req, res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No user found"})
    }
    const user = await User.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if (!user){
        return res.status(404).json({error: "No user found"})
    }
    res.status(200).json(user) 
}


const createUser = async(req, res)=>{
    const {username, password, email} = req.body

    let emptyFields = []
    if (!username){
        emptyFields.push('username')
    }
    if (!password){
        emptyFields.push('password')
    }
    if (!email){
        emptyFields.push('email')
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields!", emptyFields})
    }
    try{
        const user = await User.create({username, password, email})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getUsers = async(req, res)=>{ //Sorting the parties by their date
    const users = await User.find({}).sort({date:-1})
    res.status(200).json(users)
}

module.exports={
    getUser,
    deleteUser,
    updateUser,
    createUser,
    getUsers
}