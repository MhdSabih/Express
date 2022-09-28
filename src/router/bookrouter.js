const express = require('express');
const router = express.Router();
const {bookValidation} = require('../validator/validation');
const book = require('../models/books');

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const result = await bookValidation.validateAsync(body)
        const bookData = new book(result);
        const createBook = await bookData.save();
        console.log(createBook);
        res.status(200).json(createBook);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const bookData = await book.find()
        res.status(200).json(bookData);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const _id = req.params.id;
        const bookData = await book.findById(_id);
        if(!bookData){
            res.status(404).send('No book with that id');
        }else{
            res.status(200).send(bookData);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedData = await book.findByIdAndUpdate({_id}, req.body, {
            new: true
        });
        res.status(200).json(updatedData);
    }catch(error){
        res.status(500).send(error);
        }
})

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedBook = await book.findByIdAndRemove(_id);
        if(!deletedBook){
            return res.status(404).send(`No Book found with that Id`);
        }
        res.status(200).json(deletedBook);
    }
    catch (error){
        res.status(500).send(error);
}})
module.exports = router;