const mongoose = require('mongoose');

const validator = require('validator');
/* UserModel {
    firstname: string,
    Lastname: string,
    phone: Number,
    address: string,
    email: string,
    password: string,
*/
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 12,
        unique: [true, `PhoneNo already exists`]
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, `Email already exists!`],
        validate(valid){
            if(!validator.isEmail(valid)){
                throw new Error(`Email is inValid!`);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 12
}});

const UserDocument = new mongoose.model('User', userSchema);

module.exports = UserDocument;