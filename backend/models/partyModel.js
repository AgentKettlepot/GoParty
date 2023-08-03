const mongoose = require('mongoose');

const Schema = mongoose.Schema

const partySchema = new Schema({
    title:{
        type: String,
        required: true
    },
    school:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    max_occupancy:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    theme:{
        type: String,
    }, 
    host:{
        type: String,
        required:true
    },
    description:{
        type:String
    },
    picture:{
       type:String,
       required:true
    }
    }, {timestamps: true, type: mongoose.Types.String})

module.exports = mongoose.model('Party', partySchema)