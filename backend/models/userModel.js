const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    parties:{
        type:Array,
        default:[]
    }
}, {timestamps:true, type: mongoose.Types.String})

module.exports = mongoose.model('User', userSchema)