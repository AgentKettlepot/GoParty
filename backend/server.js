require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express();
app.use(express.json())

mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Listening on Port 4000!!!")
    })
}).catch((error)=>{
    console.log(error)
})