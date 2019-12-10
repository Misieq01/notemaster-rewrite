const express = require("express");
const User = require('../Schemas/Users')
const AuthMiddleware = require('../Middleware/auth')

const router = express.Router();


router.post('/Signup', async(req,res) =>{
    const user = new User(req.body)
    try {
       await user.save()
       const token = await user.GenerateAuthToken();
       res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/Login', async(req,res)=>{
    try {
        const user = await User.FindByCredentials(req.body.email,req.body.password)
        console.log(user)
        const token = await user.GenerateAuthToken()
        res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/Logout',AuthMiddleware,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter(token=>{
            return req.token !== token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/Account',AuthMiddleware,async(req,res)=>{
    res.send(req.user)
})

module.exports = router;
