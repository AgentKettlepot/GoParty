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
    max_occupancy:{
        type: Number,
        required:true
    },
    current_occupancy:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    theme:{
        type: String,
    }
    }
)

module.exports = mongoose.model('Party', partySchema)