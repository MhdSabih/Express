const mongoose = require('mongoose');

const validator = require('validator');
/* UserModel {
    name: string,
    phone: Number,
    address: string
*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: Number,
        required: true,
        minlength: 11,
        unique: true
    },
    address: {
        type: String,
        required: true,
    }
});

const UserDocument = new mongoose.model('User', userSchema);

module.exports = UserDocument;