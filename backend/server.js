require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const passport = require("passport")
const partyRoutes = require('./routes/partyRouter')
const userRoutes = require('./routes/userRouter')
const authRoutes = require("./routes/auth")


const app = express();
app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
app.use(bodyParser.json())
app.use((req,res,next) => {
    console.log(req.path, req.methood) //displays each request
    next()
})
app.use(passport.initialize())
require("./config/passport")(passport)

app.use('/goParty/', partyRoutes)
app.use('/user/', userRoutes)
app.use("/auth", authRoutes)

mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Listening on Port 4000!!!")
    })
}).catch((error)=>{
    console.log(error)
})