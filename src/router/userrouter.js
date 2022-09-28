const express = require('express');
const router = express.Router();
const {userValidation} = require('../validator/validation');
const user = require('../models/user');


router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const result = await userValidation.validateAsync(body);
        const User = new user(result);
        const createUser = await User.save()
        console.log(createUser)
        res.status(200).send(`User Created!
        ${createUser}`);
    } catch (err) {
        res.status(500).send(err);
        }
    });
 
 router.get('/', async (req, res) => {
    try {
        const UserData = await user.find();
        res.send(UserData).status(200);;
    } catch (err) {
        res.send(err).status(400)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await user.findById(_id)
        if (!getUser) {
            res.status(404).send(`User not found!`);
        } else {
            res.send(getUser).status(200);
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUser = await user.findByIdAndUpdate({_id}, req.body, {
            new: true
        });
        res.send(updateUser).status(200);
    } catch (error) {
        res.send(error).status(400)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteUser = await user.findByIdAndDelete(_id);
        if(!deleteUser){
            return res.status(400).send(`No user found with that Id!`);
        }
        res.send(`User Deleted! ${deleteUser}`).status(200);
    } catch (error) {
        res.send(error).status(404)
    }
})

module.exports = router;