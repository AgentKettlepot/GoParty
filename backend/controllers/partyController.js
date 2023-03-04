const mongoose = require('mongoose')
const Party = require('../models/partyModel')

const getParties = async(req, res)=>{ //Sorting the parties by their date
    const parties = await Party.find({}).sort({date:-1})
    res.status(200).json(parties)
}

const getParty = async(req, res)=>{
    const {id} = req.params
    if (!mongoose.Type.ObjectId.isValid(id)){
        return res.status(404).json({error: "No party found"})
    }
    
    const party = await Party.findById(id)
    if (!party){
        return res.status(404).json({error: "No party found"})
    }
    res.status(200).json(party)
}

const createParty = async(req, res)=>{
    const {title, school, date, max_occupancy, current_occupancy, address, theme, host} = req.body
    try{
        const party = await Party.create({title, school, date, max_occupancy, current_occupancy, address, theme, host})
        res.status(200).json(party)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteParty = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No party found"})
    }
    const party = await Party.findOneAndDelete({_id:id})
    if (!party){
        return res.status(404).json({error: "No party found"})
    }
    res.status(200).json(party)
}

const updateParty = async(req, res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No party found"})
    }
    const party = await Party.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if (!party){
        return res.status(404).json({error: "No party found"})
    }
    res.status(200).json(party) 
}

module.exports={
    getParties,
    getParty,
    createParty,
    deleteParty,
    updateParty
}