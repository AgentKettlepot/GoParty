const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/userModel");

const router = express.Router()

router.post("/register", (req, res)=>{
    //Form Validation:
    const {errors, isValid} = validateRegisterInput(req.body)
    if (!isValid){
        return res.status(400).json(errors)
    }
    User.findOne({email:req.body.email}).then(user =>{
        if (user){
            return res.status(400).json({email:"Email with this account already exists"})
        }else{
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            })

        //Hashing Password for Storage:
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user=>res.json(user)).catch(
                    err=>console.log(err));
                
            })
        })
        }
    })
})

router.post("/login", (req, res)=>{
    const {errors, isValid} = validateLoginInput(req.body)
    if (!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    User.findOne({email}.then(user=>{
        if (!user){
            return res.status(400).json({Email:"Email not found!"})
        }

        //Checking hashed password
        bcrypt.compare(password, user.password).then(isMatch=>{
            if (isMatch){
                // Creating a JWT payload if it matches
                const payload = {
                    id:user.id,
                    name:user.name
                }

                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 //1 hr in seconds
                    },
                    (err, token)=>{
                        res.json({
                            success:true,
                            token:"Bearer " + token
                        })
                    }
                )
            }
            else{ //Passwords don't match
                return res.status(400).json({ passwordincorrect: "Password is incorrect"})
            }
        })
    }))
})

module.exports = router