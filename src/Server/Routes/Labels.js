const express = require('express')
const Label = require('../Schemas/Labels')
const Note = require('../Schemas/Notes')
const AuthMiddleware = require('../Middleware/auth')

const router = express.Router()

router.post('/NewLabel',AuthMiddleware,async (req,res)=>{
    try {
        const label = new Label(req.body);
        await label.save()
        res.status(201).send()
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/Labels',AuthMiddleware,async (req,res)=>{
    try {
        const labels = await Label.find({});
        res.send(labels)
    } catch (error) {
        res.send(error.message)
    }
})

router.delete('/DeleteLabel/:id',AuthMiddleware,async (req,res)=>{
    const id = req.params.id
    try {
        await Label.findByIdAndDelete(id)
        await Note.ClearLabels(id)
        res.send()
    } catch (error) {
        res.send(error.message)
    }
})

router.patch('/ChangeLabel/:id',AuthMiddleware,async (req,res)=>{
    try {
        await Label.findByIdAndUpdate(req.params.id,req.body)
        res.send()
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router