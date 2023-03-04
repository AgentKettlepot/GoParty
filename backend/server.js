require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const partyRoutes = require('./routes/partyRouter')


const app = express();
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.methood) //displays each request
    next()
})

app.use('/goParty/', partyRoutes)
mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Listening on Port 4000!!!")
    })
}).catch((error)=>{
    console.log(error)
})