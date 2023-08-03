const mongoose = require('mongoose')
const Party = require('../models/partyModel')

const getParties = async(req, res)=>{ //Sorting the parties by their date
    const parties = await Party.find({}).sort({date:1})
    res.status(200).json(parties)
}


const getParty = async(req, res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No party found"})
    }
    
    const party = await Party.findById(id)
    if (!party){
        return res.status(404).json({error: "No party found"})
    }
    res.status(200).json(party)
}

const createParty = async(req, res)=>{
    const {title, school, date, max_occupancy, address, theme, host, description, picture} = req.body
    let emptyFields = []
    if (!title){
        emptyFields.push('title')
    }
    if (!school){
        emptyFields.push('school')
    }
    if (!date){
        emptyFields.push('date')
    }
    if (!max_occupancy){
        emptyFields.push('max_occupancy')
    }
    if (!address){
        emptyFields.push('address')
    }
    if (!theme){
        emptyFields.push('theme')
    }

    if (emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields!", emptyFields})
    }
    try{
        const party = await Party.create({title, school, date, max_occupancy, address, theme, host, description, picture})
        //picture shows here, but isn't added in party
        res.status(200).json(party)
    }catch(error){
        res.status(400).json({ error: error.message, emptyFields })
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