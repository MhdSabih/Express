const express = require('express');

const parser = require('body-parser');
require("./db/connection")

const user = require('./models/user')

const app = express();

const port = process.env.PORT || 3000;

// const jsonParser = parser.json()
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`You are at HomePage!`)
})

app.post('/users', async (req, res) => {

    try {
        const User = new user(req.body);
        // console.log(`beforeAwait!`);
        const createUser = await User.save()
        // await console.log(`afterAwait!`);
        console.log(createUser)
        // console.log(req.body);
        res.status(200).send(createUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
    console.log(`User Created!`);
    // res.send('`Hello from the other side by Sabih');
});


app.get('/users', async (req, res) => {
    try {
        const UserData = await user.find();
        res.send(UserData).status(200);;
    } catch (err) {
        res.send(err).status(400)
    }
    // res.User()
})

app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await user.findById(_id)
        if (!getUser) {
            res.status(404).send(`User not found!`);
        } else {
            res.send(getUser).status(200);
        }
    } catch (error) {
        res.send(error).status(400)
    }
})

// app.get('/users/:name', async (req, res) =>{
//     try {     const _name = req.params.name;
//         const userData = await user.findOne({
//             name: {
//                 $regex: _name,
//                 $options: 'i'
//             }
//         });
//         if (!userData) {
//             res.status(404).send(`User not found!`);
//         }else{
//             res.send(userData).status(200);
//         }}catch(err){
//             res.send(err).status(400)
//         }
// })

app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteUser = await user.findByIdAndRemove(_id);
        if(!_id){
            return res.status(400).send();
        }
        res.send(`User Deleted! ${deleteUser}`).status(200);
    } catch (error) {
        res.send(error).status(404)
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})